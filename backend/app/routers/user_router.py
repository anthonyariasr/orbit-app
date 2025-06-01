from fastapi import APIRouter, Depends
from typing import List
from app.schemas.user_schemas import UserCreate, UserResponse, UserLogin, UserBase
from app.controllers import auth_controllers, user_controllers
from app.dependencies.auth import get_current_user, oauth2_scheme
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])

"""
AUTHENTICATION

Handles operations related to user authentication:
- Registering a new user
- Logging in an existing user

The logic is delegated to 'auth_controllers.py'.
"""


@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate):
    """
    Register a new user account.
    """
    return auth_controllers.register_user(user)


@router.post("/login")
def login_user(credentials: UserLogin):
    """
    Log in a user using email/username and password.
    Returns an access token for authenticated access.
    """
    return auth_controllers.login_user(credentials)


"""
SESSION AUTHENTICATION

Endpoint that returns the profile of the currently authenticated user:
- Requires a valid JWT token in the Authorization header
- Useful for frontend to retrieve user data after login

This route depends on token-based authentication using the OAuth2 bearer scheme.
"""


@router.get("/me", response_model=UserResponse)
def get_my_profile(current_user: User = Depends(get_current_user)):
    """
    Retrieve profile info of the currently authenticated user.
    """
    return current_user


"""
USER CRUD OPERATIONS

Basic operations for managing user records:
- Retrieving all users (e.g., for admin views)
- Getting a specific user by ID
- Updating user information
- Deleting a user account

All business logic is delegated to 'user_controllers.py'.
"""


@router.get("/", response_model=List[UserResponse])
def get_all_users():
    """
    Retrieve a list of all users in the system.
    """
    return user_controllers.get_all_users()


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int):
    """
    Retrieve a single user by their unique ID.
    """
    return user_controllers.get_user_by_id(user_id)


@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, updated_user: UserBase):
    """
    Update user profile information such as name, career, gender, etc.
    """
    return user_controllers.update_user(user_id, updated_user)


@router.delete("/{user_id}")
def delete_user(user_id: int):
    """
    Permanently delete a user account from the system.
    (Optional: can be implemented as logical deletion.)
    """
    return user_controllers.delete_user(user_id)


@router.patch("/{user_id}/password")
def change_password(user_id: int, payload: dict):
    """
    Change the password for a specific user.
    The payload should include current and new password.
    """
    return user_controllers.change_password(user_id, payload)
