from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()


DATABASE_URL = "sqlite:///./test.db"

# DATABASE_URL = os.getenv("DATABASE_URL")
# Example: postgresql://user:password@localhost:5432/dbname

engine = create_engine(
    DATABASE_URL,
    echo=True,
    connect_args=(
        {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
    ),
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
