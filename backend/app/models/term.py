# models/term.py
from sqlalchemy import Column, Integer, String, Boolean
from database.db_config import Base

class Term(Base):
    __tablename__ = "terms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
