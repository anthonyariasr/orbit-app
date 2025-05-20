# controllers/auth_controllers.py

from fastapi import HTTPException, status
from schemas.user_schemas import UserCreate, UserResponse
from models.user import User
from database.db_config import SessionLocal
from sqlalchemy.orm import Session
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

def login_user(credentials: dict, db: Session = next(get_db())):
    """
    Authenticates a user using bcrypt verification.
    Accepts 'username' or 'email' and 'password'.
    """
    identifier = credentials.get("email") or credentials.get("username")
    password = credentials.get("password")

    if not identifier or not password:
        raise HTTPException(status_code=400, detail="Missing credentials")

    user = db.query(User).filter(
        (User.email == identifier) | (User.username == identifier)
    ).first()

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "user_id": user.id}
