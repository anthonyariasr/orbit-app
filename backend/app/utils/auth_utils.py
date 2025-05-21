import bcrypt


def hash_password(password: str) -> str:
    """
    Hashes a plaintext password using bcrypt.
    """
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    """
    Verifies a plaintext password against a hashed password.
    """
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
