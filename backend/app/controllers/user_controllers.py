from fastapi import HTTPException
from app.schemas.user_schemas import UserCreate, ChangePasswordRequest
from app.models.user import User
from app.database.db_config import SessionLocal
from sqlalchemy.orm import Session
import bcrypt

"""
Handles user profile operations including updates and password changes.
"""


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def get_all_users(db: Session = next(get_db())):
    return db.query(User).all()


def get_user_by_id(user_id: int, db: Session = next(get_db())):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def update_user(user_id: int, user_data: UserCreate, db: Session = next(get_db())):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.username = user_data.username
    user.email = user_data.email
    user.career = user_data.career
    user.gender = user_data.gender
    user.university = user_data.university
    user.hashed_password = hash_password(user_data.password)

    db.commit()
    db.refresh(user)
    return user


def delete_user(user_id: int, db: Session = next(get_db())):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}


def get_current_user():
    raise NotImplementedError("Will be implemented with auth/token system")


def change_password(
    user_id: int, payload: ChangePasswordRequest, db: Session = next(get_db())
):
    """
    Updates the user's password after validating current password.
    """
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(payload.current_password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Current password is incorrect")

    user.hashed_password = hash_password(payload.new_password)
    db.commit()
    return {"message": "Password updated successfully"}
