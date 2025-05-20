# controllers/auth_controllers.py

from fastapi import HTTPException, status
from app.schemas.user_schemas import UserCreate, UserResponse, UserLogin
from app.models.user import User
from app.database.db_config import SessionLocal
from sqlalchemy.orm import Session
from app.utils.jwt_handler import create_jwt_token
import bcrypt

"""
Handles user registration and login using bcrypt for password hashing.
"""

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password: str) -> str:
    """
    Hashes a plaintext password using bcrypt.
    """
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plaintext password against a hashed one.
    """
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def register_user(user_data: UserCreate, db: Session = next(get_db())) -> UserResponse:
    """
    Registers a new user, checking for email or username collisions.
    """
    existing = db.query(User).filter(
        (User.email == user_data.email) | (User.username == user_data.username)
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or username already exists"
        )

    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
        career=user_data.career,
        gender=user_data.gender,
        university=user_data.university,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schemas import UserLogin
from app.utils.jwt_handler import create_jwt_token, verify_password
from app.database.db_config import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def login_user(credentials: UserLogin, db: Session = next(get_db())):
    """
    Authenticates a user using bcrypt and returns a JWT token.
    Accepts either email or username and a password.
    """
    # Use email if provided, otherwise use username
    identifier = credentials.email or credentials.username
    password = credentials.password

    if not identifier or not password:
        raise HTTPException(status_code=400, detail="Missing credentials")

    # Find user by email or username
    user = db.query(User).filter(
        (User.email == identifier) | (User.username == identifier)
    ).first()

    # Check if user exists and password is correct
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT token with user_id payload
    token = create_jwt_token({"user_id": user.id})

    # Return the token in standard OAuth2-compatible format
    return {
        "access_token": token,
        "token_type": "bearer"
    }

