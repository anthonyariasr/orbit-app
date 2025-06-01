from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.db_config import Base


class Notebook(Base):
    """
    SQLAlchemy model for user-created notebooks.

    Each notebook belongs to a user and contains a title and markdown content.
    """

    __tablename__ = "notebooks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)  # Notebook title
    content = Column(Text, nullable=True)  # Markdown content

    created_at = Column(DateTime, default=datetime.utcnow)  # Timestamp when created
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )  # Timestamp when updated

    user_id = Column(
        Integer, ForeignKey("users.id"), nullable=False
    )  # Reference to the user who owns it
    user = relationship("User", back_populates="notebooks")  # Reverse relationship
