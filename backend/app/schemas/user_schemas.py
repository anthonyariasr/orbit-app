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

    model_config = {
            "from_attributes": True
        }
        
        
class UserLogin(BaseModel):
    """
    Schema for user login payload.
    Allows login using either email or username.
    """
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: str

    def validate_credentials(self):
        if not self.email and not self.username:
            raise ValueError("Either 'email' or 'username' must be provided.")


class ChangePasswordRequest(BaseModel):
    """
    Schema for password change requests.
    Requires both current and new password.
    """
    current_password: str
    new_password: str