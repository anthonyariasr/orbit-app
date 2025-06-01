from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from app.schemas.term_schemas import TermCreate, TermResponse, TermWithCoursesResponse
from app.controllers import term_controllers
from app.dependencies.auth import get_current_user
from app.database.db_config import get_db
from app.models.user import User

router = APIRouter(prefix="/terms", tags=["Terms"])

"""
TERM ROUTES

Handles the creation, retrieval, update and deletion of academic terms.
All operations are scoped to the authenticated user.
"""

@router.post("/", response_model=TermResponse)
def create_term(
    term: TermCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return term_controllers.create_term(term, current_user, db)


@router.get("/", response_model=List[TermResponse])
def get_all_terms(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return term_controllers.get_all_terms(current_user, db)


@router.get("/active", response_model=TermResponse)
def get_active_term(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    term = term_controllers.get_active_term(current_user, db)
    if not term:
        raise HTTPException(status_code=404, detail="No hay término activo")
    return term


@router.get("/with-courses")
def get_terms_with_courses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return term_controllers.get_terms_with_courses(db, current_user)


@router.get("/{term_id}", response_model=TermResponse)
def get_term_by_id(
    term_id: int,
    db: Session = Depends(get_db),
):
    return term_controllers.get_term_by_id(term_id, db)


@router.put("/{term_id}", response_model=TermResponse)
def update_term(
    term_id: int,
    updated_term: TermCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return term_controllers.update_term(term_id, updated_term, current_user, db)


@router.delete("/{term_id}")
def delete_term(
    term_id: int,
    db: Session = Depends(get_db),
):
    return term_controllers.delete_term(term_id, db)
