# routers/term_router.py

from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.term_schemas import TermCreate, TermResponse
from app.controllers import term_controllers

router = APIRouter(prefix="/terms", tags=["Terms"])

"""
TERM ROUTES

Handles the creation, retrieval, update and deletion of academic terms.
"""

@router.post("/", response_model=TermResponse)
def create_term(term: TermCreate):
    """
    Create a new academic term.
    A user should only have one active term at a time.
    """
    return term_controllers.create_term(term)

@router.get("/", response_model=List[TermResponse])
def get_all_terms():
    """
    Retrieve a list of all academic terms in the system.
    """
    return term_controllers.get_all_terms()

@router.get("/{term_id}", response_model=TermResponse)
def get_term_by_id(term_id: int):
    """
    Retrieve a single academic term by its ID.
    """
    return term_controllers.get_term_by_id(term_id)

@router.put("/{term_id}", response_model=TermResponse)
def update_term(term_id: int, updated_term: TermCreate):
    """
    Update the information of an academic term.
    """
    return term_controllers.update_term(term_id, updated_term)

@router.delete("/{term_id}")
def delete_term(term_id: int):
    """
    Delete an academic term by ID.
    """
    return term_controllers.delete_term(term_id)

@router.get("/user/{user_id}", response_model=List[TermResponse])
def get_terms_by_user(user_id: int):
    """
    Retrieve all academic terms created by a specific user.
    """
    return term_controllers.get_terms_by_user(user_id)

