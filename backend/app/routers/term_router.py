from fastapi import APIRouter, Depends
from typing import List
from app.schemas.term_schemas import TermCreate, TermResponse
from app.controllers import term_controllers
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/terms", tags=["Terms"])

"""
TERM ROUTES

Handles the creation, retrieval, update and deletion of academic terms.
All operations are scoped to the authenticated user.
"""


@router.post("/", response_model=TermResponse)
def create_term(term: TermCreate, current_user: User = Depends(get_current_user)):
    """
    Create a new academic term for the current user.
    A user should only have one active term at a time.
    """
    return term_controllers.create_term(term, current_user)


@router.get("/", response_model=List[TermResponse])
def get_all_terms(current_user: User = Depends(get_current_user)):
    """
    Retrieve all academic terms belonging to the current user.
    """
    return term_controllers.get_all_terms(current_user)


@router.get("/{term_id}", response_model=TermResponse)
def get_term_by_id(term_id: int):
    """
    Retrieve a single academic term by its ID.
    """
    return term_controllers.get_term_by_id(term_id)


@router.put("/{term_id}", response_model=TermResponse)
def update_term(
    term_id: int,
    updated_term: TermCreate,
    current_user: User = Depends(get_current_user),
):
    """
    Update the information of an academic term.
    Ensures only one term can be active per user.
    """
    return term_controllers.update_term(term_id, updated_term, current_user)


@router.delete("/{term_id}")
def delete_term(term_id: int):
    """
    Delete an academic term by ID.
    """
    return term_controllers.delete_term(term_id)
