from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
import sqlite3

# Carga las variables del archivo .env
load_dotenv()

# Usa la variable DATABASE_URL desde el entorno
DATABASE_URL = os.getenv("DATABASE_URL")
print(DATABASE_URL)

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in .env file")

# Crea el motor dependiendo del tipo de base de datos
engine = create_engine(
    DATABASE_URL,
    echo=True,
    connect_args=(
        {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
    ),
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Solo activa claves foráneas si estás usando SQLite
@event.listens_for(Engine, "connect")
def enable_foreign_keys(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

# Dependencia para FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
