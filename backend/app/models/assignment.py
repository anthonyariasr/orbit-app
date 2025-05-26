from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db_config import Base


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    due_date = Column(Date, nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=True)
    term_id = Column(Integer, ForeignKey("terms.id", ondelete="CASCADE"), nullable=False)

    course = relationship("Course", backref="assignments")
    term = relationship("Term", back_populates="assignments")
