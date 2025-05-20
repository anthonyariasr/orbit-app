# models/course.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db_config import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, nullable=True)
    name = Column(String, nullable=False)
    credits = Column(Integer, nullable=False)
    professor_name = Column(String, nullable=True)
    room = Column(String, nullable=True)
    status = Column(String, default="in_progress")  # "approved", "failed"
    term_id = Column(Integer, ForeignKey("terms.id"), nullable=False)

    term = relationship("Term", backref="courses")
