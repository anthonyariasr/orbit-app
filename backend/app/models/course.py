from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db_config import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, nullable=True)
    name = Column(String, nullable=False)
    credits = Column(Integer, nullable=False)
    professor_name = Column(String, nullable=True)
    room = Column(String, nullable=True)
    status = Column(String, default="in_progress")
    term_id = Column(Integer, ForeignKey("terms.id", ondelete="CASCADE"), nullable=False)
    grade = Column(Float, nullable=True)


    term = relationship("Term", back_populates="courses")

    schedule_slots = relationship(
        "ScheduleSlot",
        back_populates="course",
        cascade="all, delete-orphan"
    )