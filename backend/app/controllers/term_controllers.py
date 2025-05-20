# controllers/term_controllers.py

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.database.db_config import SessionLocal
from app.models.term import Term
from app.schemas.term_schemas import TermCreate

"""
Handles logic for creating, retrieving, updating, and deleting academic terms.
Each term must be associated with a user.
Only one term can be active per user at a time.
"""

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_term(term_data: TermCreate, db: Session = next(get_db())):
    """
    Creates a new academic term for a user.
    Ensures no more than one active term per user.
    """
    if term_data.is_active:
        existing_active = db.query(Term).filter(
            Term.user_id == term_data.user_id,
            Term.is_active == True
        ).first()
        if existing_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User already has an active term."
            )

    new_term = Term(
        name=term_data.name,
        is_active=term_data.is_active,
        user_id=term_data.user_id
    )

    db.add(new_term)
    db.commit()
    db.refresh(new_term)
    return new_term

def get_all_terms(db: Session = next(get_db())):
    """
    Returns all terms in the system.
    """
    return db.query(Term).all()

def get_term_by_id(term_id: int, db: Session = next(get_db())):
    """
    Retrieves a single term by ID.
    """
    term = db.get(Term, term_id)
    if not term:
        raise HTTPException(status_code=404, detail="Term not found")
    return term

def update_term(term_id: int, updated_data: TermCreate, db: Session = next(get_db())):
    """
    Updates the data of an existing term.
    Ensures only one term can be active for the same user.
    """
    term = db.get(Term, term_id)
    if not term:
        raise HTTPException(status_code=404, detail="Term not found")

    if updated_data.is_active:
        existing_active = db.query(Term).filter(
            Term.user_id == updated_data.user_id,
            Term.is_active == True,
            Term.id != term_id
        ).first()
        if existing_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Another active term already exists for this user."
            )

    term.name = updated_data.name
    term.is_active = updated_data.is_active
    term.user_id = updated_data.user_id

    db.commit()
    db.refresh(term)
    return term

def delete_term(term_id: int, db: Session = next(get_db())):
    """
    Deletes a term by its ID.
    """
    term = db.get(Term, term_id)
    if not term:
        raise HTTPException(status_code=404, detail="Term not found")

    db.delete(term)
    db.commit()
    return {"message": "Term deleted successfully"}

def get_terms_by_user(user_id: int, db: Session = next(get_db())):
    """
    Returns all terms associated with a specific user.
    """
    return db.query(Term).filter(Term.user_id == user_id).all()
