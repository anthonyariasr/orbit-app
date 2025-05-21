from sqlalchemy import Column, Integer, String, Time, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db_config import Base


class ScheduleSlot(Base):
    __tablename__ = "schedule_slots"

    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(String, nullable=False)  # Ej: "Monday", "Tuesday"
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)

    course = relationship("Course", backref="schedule_slots")
