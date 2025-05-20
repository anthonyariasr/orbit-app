# schemas/term_schemas.py
from pydantic import BaseModel
from typing import Optional

class TermBase(BaseModel):
    name: str
    is_active: Optional[bool] = True
    user_id: int 

class TermCreate(TermBase):
    pass

class TermResponse(TermBase):
    id: int

    model_config = {
            "from_attributes": True
        }
        