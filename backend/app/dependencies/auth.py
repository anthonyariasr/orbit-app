from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database.db_config import SessionLocal
from app.models.user import User
from app.utils.jwt_handler import verify_jwt_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> User:
    print("🔐 Received token:", token)
    payload = verify_jwt_token(token)
    user_id = payload.get("user_id")
    user = db.get(User, user_id)  # SQLAlchemy 2.0 style

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
