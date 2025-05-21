from pydantic import BaseModel, EmailStr, model_validator, field_validator
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

    model_config = {"from_attributes": True}


class UserLogin(BaseModel):
    """
    Schema for user login payload.
    Allows login using either email or username.
    """

    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: str

    @model_validator(mode="before")
    @classmethod
    def check_email_or_username(cls, values):
        if not values.get("email") and not values.get("username"):
            raise ValueError("Either 'email' or 'username' must be provided.")
        return values


class ChangePasswordRequest(BaseModel):
    """
    Schema for password change requests.
    Requires both current and new password.
    """

    current_password: str
    new_password: str
