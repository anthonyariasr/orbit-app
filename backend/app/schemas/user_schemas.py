# schemas/user_schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, Literal

class UserBase(BaseModel):
    username: str
    email: EmailStr
    career: str
    gender: Literal["m", "f", "o"]
    university: Optional[str] = None

class UserCreate(UserBase):
    password: str 

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
