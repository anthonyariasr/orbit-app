# app.py
from fastapi import FastAPI
from database.db_config import Base, engine
# from routers import user_router 
from contextlib import asynccontextmanager
from database.db_config import Base, engine
# import models.user

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Academic Management API", lifespan=lifespan)

# app.include_router(user_router.router)
