from pydantic import BaseModel, ConfigDict
from typing import Optional


class TermBase(BaseModel):
    name: str
    is_active: Optional[bool] = True


class TermCreate(TermBase):
    pass


class TermResponse(TermBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
