from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from app.schemas.notebook_schemas import (
    NotebookCreate,
    NotebookUpdate,
    NotebookResponse,
)
from app.models.user import User
from app.database.db_config import get_db
from app.dependencies.auth import get_current_user
from app.controllers import notebook_controller

router = APIRouter(prefix="/notebooks", tags=["Notebooks"])


# Create a new notebook
@router.post("/", response_model=NotebookResponse)
def create_notebook(
    notebook: NotebookCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return notebook_controller.create_notebook(notebook, current_user, db)


# Get all notebooks for the current user
@router.get("/", response_model=List[NotebookResponse])
def get_user_notebooks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return notebook_controller.get_user_notebooks(current_user, db)


# Get a single notebook by ID
@router.get("/{notebook_id}", response_model=NotebookResponse)
def get_notebook_by_id(
    notebook_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return notebook_controller.get_notebook_by_id(notebook_id, current_user, db)


# Update an existing notebook
@router.put("/{notebook_id}", response_model=NotebookResponse)
def update_notebook(
    notebook_id: int,
    notebook_update: NotebookUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return notebook_controller.update_notebook(
        notebook_id, notebook_update, current_user, db
    )


# Delete a notebook
@router.delete("/{notebook_id}")
def delete_notebook(
    notebook_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return notebook_controller.delete_notebook(notebook_id, current_user, db)
