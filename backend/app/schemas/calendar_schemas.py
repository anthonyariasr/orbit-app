from pydantic import BaseModel
from typing import Literal, Optional
from datetime import datetime


class CalendarEvent(BaseModel):
    title: str
    start: datetime
    end: Optional[datetime] = None
    color: Optional[str] = None
    type: Literal["assignment", "class"]

    class Config:
        orm_mode = True
