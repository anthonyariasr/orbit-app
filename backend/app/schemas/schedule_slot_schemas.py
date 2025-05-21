from pydantic import BaseModel
from typing import Literal
from datetime import time


class ScheduleSlotBase(BaseModel):
    day_of_week: Literal[
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ]
    start_time: time
    end_time: time
    course_id: int


class ScheduleSlotCreate(ScheduleSlotBase):
    pass


class ScheduleSlotResponse(ScheduleSlotBase):
    id: int

    model_config = {"from_attributes": True}
