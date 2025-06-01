from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.notebook import Notebook
from app.models.user import User
from app.schemas.notebook_schemas import NotebookCreate, NotebookUpdate


# Create a new notebook for the current user
def create_notebook(notebook_data: NotebookCreate, user: User, db: Session) -> Notebook:
    new_notebook = Notebook(
        title=notebook_data.title,
        content=notebook_data.content,
        user_id=user.id,
    )
    db.add(new_notebook)
    db.commit()
    db.refresh(new_notebook)
    return new_notebook


# Get all notebooks for the current user
def get_user_notebooks(user: User, db: Session) -> list[Notebook]:
    return (
        db.query(Notebook)
        .filter(Notebook.user_id == user.id)
        .order_by(Notebook.updated_at.desc())
        .all()
    )


# Get a single notebook by ID, only if it belongs to the current user
def get_notebook_by_id(notebook_id: int, user: User, db: Session) -> Notebook:
    notebook = (
        db.query(Notebook)
        .filter(Notebook.id == notebook_id, Notebook.user_id == user.id)
        .first()
    )
    if not notebook:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return notebook


# Update an existing notebook
def update_notebook(
    notebook_id: int, notebook_update: NotebookUpdate, user: User, db: Session
) -> Notebook:
    notebook = get_notebook_by_id(notebook_id, user, db)
    notebook.title = notebook_update.title
    notebook.content = notebook_update.content
    db.commit()
    db.refresh(notebook)
    return notebook


# Delete a notebook
def delete_notebook(notebook_id: int, user: User, db: Session):
    notebook = get_notebook_by_id(notebook_id, user, db)
    db.delete(notebook)
    db.commit()
    return {"detail": "Notebook deleted successfully"}
