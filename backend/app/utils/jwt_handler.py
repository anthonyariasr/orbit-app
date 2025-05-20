# app/utils/jwt_handler.py

import jwt
from fastapi import HTTPException, status
from datetime import datetime
from typing import Any

SECRET_KEY = "supersecret"  # Reemplaza esto por os.getenv(...) en producción
ALGORITHM = "HS256"

def create_jwt_token(data: dict) -> str:
    """
    Generates a JWT token from user data.
    """
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_jwt_token(token: str) -> dict[str, Any]:
    """
    Decodes and verifies the JWT token.
    Raises HTTP 401 if invalid.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
