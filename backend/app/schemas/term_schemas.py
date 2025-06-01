from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from app.schemas.course_schemas import CourseResponse, CourseBase


class TermBase(BaseModel):
    name: str
    is_active: Optional[bool] = True


class TermCreate(TermBase):
    pass


class TermResponse(TermBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class TermWithCoursesResponse(TermResponse):
    courses: List[CourseResponse]

    model_config = ConfigDict(from_attributes=True)
