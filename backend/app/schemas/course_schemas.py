from pydantic import BaseModel, Field
from typing import Optional, Literal


class CourseBase(BaseModel):
    code: Optional[str] = None
    name: str
    credits: int
    professor_name: Optional[str] = None
    room: Optional[str] = None
    status: Literal["in_progress", "approved", "failed"] = "in_progress"
    term_id: int
    grade: Optional[float] = None


class CourseCreate(CourseBase):
    grade: None = None  


class CourseResponse(CourseBase):
    id: int

    model_config = {"from_attributes": True}


class CourseFinalize(BaseModel):
    status: Literal["approved", "failed"]
    grade: float = Field(..., ge=0, le=100, description="Final grade (required)")
