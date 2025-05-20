# schemas/term_schemas.py
from pydantic import BaseModel
from typing import Optional

class TermBase(BaseModel):
    name: str
    is_active: Optional[bool] = True

class TermCreate(TermBase):
    pass

class TermResponse(TermBase):
    id: int

    class Config:
        orm_mode = True
