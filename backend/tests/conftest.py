import sys
import os
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.app import app
from app.database.db_config import Base, engine
from fastapi.testclient import TestClient

client = TestClient(app)


@pytest.fixture(scope="module", autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def client_fixture():
    return client


@pytest.fixture
def auth_headers():
    payload = {
        "username": "mainuser",
        "email": "main@example.com",
        "password": "secret123",
        "career": "CS",
        "gender": "m",
        "university": "TEC",
    }
    client.post("/users/register", json=payload)
    login = client.post(
        "/users/login", json={"email": "main@example.com", "password": "secret123"}
    )
    token = login.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def auth_headers_other_user():
    payload = {
        "username": "otheruser",
        "email": "other@example.com",
        "password": "pass456",
        "career": "Math",
        "gender": "f",
        "university": "UCR",
    }
    client.post("/users/register", json=payload)
    login = client.post(
        "/users/login", json={"email": "other@example.com", "password": "pass456"}
    )
    token = login.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def term_id(auth_headers):
    response = client.post(
        "/terms/", json={"name": "2025-B", "is_active": True}, headers=auth_headers
    )
    return response.json()["id"]
