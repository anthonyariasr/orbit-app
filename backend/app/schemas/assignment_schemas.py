from pydantic import BaseModel
from typing import Optional
from datetime import date


class AssignmentBase(BaseModel):
    name: str
    due_date: date
    course_id: Optional[int] = None
    term_id: int


class AssignmentCreate(AssignmentBase):
    pass


class AssignmentResponse(AssignmentBase):
    id: int

    model_config = {"from_attributes": True}
