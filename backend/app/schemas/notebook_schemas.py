from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# Shared base schema for notebook data
class NotebookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: Optional[str] = ""


# Schema for creating a new notebook
class NotebookCreate(NotebookBase):
    pass


# Schema for updating an existing notebook
class NotebookUpdate(NotebookBase):
    pass


# Schema for returning notebook data to the client
class NotebookResponse(NotebookBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
