from sqlalchemy import Column, Integer, String
from app.database.db_config import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    career = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    university = Column(String, nullable=True)
