from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, Literal, List
from datetime import time
from .schedule_slot_schemas import ScheduleSlotCreate, ScheduleSlotResponse


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
    schedule_slots: Optional[List[ScheduleSlotCreate]] = []


class CourseResponse(BaseModel):
    id: int
    code: Optional[str]
    name: str
    credits: int
    professor_name: Optional[str]
    room: Optional[str]
    status: str
    term_id: int
    grade: Optional[float]
    schedule_slots: List[ScheduleSlotResponse] = []

    model_config = ConfigDict(from_attributes=True)


class CourseFinalize(BaseModel):
    status: Literal["approved", "failed"]
    grade: float = Field(..., ge=0, le=100, description="Final grade (required)")
