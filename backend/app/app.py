from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database.db_config import Base, engine

# Import models so that SQLAlchemy registers them
import app.models.user
import app.models.term
import app.models.course
import app.models.assignment
import app.models.schedule_slot

# Import routers
from app.routers import (
    user_router,
    term_router,
    course_router,
    assignment_router,
    schedule_slot_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    On application startup, create all tables if they don't exist.
    """
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="Academic Management API", lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(user_router.router)
app.include_router(term_router.router)
app.include_router(course_router.router)
app.include_router(assignment_router.router)
app.include_router(schedule_slot_router.router)
