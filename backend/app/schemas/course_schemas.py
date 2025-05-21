from pydantic import BaseModel
from typing import Optional, Literal


class CourseBase(BaseModel):
    code: Optional[str] = None
    name: str
    credits: int
    professor_name: Optional[str] = None
    room: Optional[str] = None
    status: Literal["in_progress", "approved", "failed"] = "in_progress"
    term_id: int


class CourseCreate(CourseBase):
    pass


class CourseResponse(CourseBase):
    id: int

    model_config = {"from_attributes": True}
