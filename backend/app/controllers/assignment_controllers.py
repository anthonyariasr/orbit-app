from fastapi import HTTPException, status, Depends
from typing import List
from sqlalchemy.orm import Session
from app.database.db_config import SessionLocal
from app.models.assignment import Assignment
from app.models.course import Course
from app.models.term import Term
from app.schemas.assignment_schemas import AssignmentCreate

"""
Handles the logic for creating, updating, and deleting assignments.
Assignments can be linked to a course, or standalone (extracurricular).
"""


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def validate_course_if_provided(course_id: int, db: Session):
    """
    Checks if the course exists only if a course_id is provided.
    """
    if course_id is not None:
        course = db.query(Course).get(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Associated course not found")


def create_assignment(data: AssignmentCreate, db: Session = next(get_db())):
    """
    Creates a new assignment, optionally linked to a course.
    """

    if data.course_id:
        validate_course_if_provided(data.course_id, db)

    new_assignment = Assignment(
        name=data.name,
        due_date=data.due_date,
        course_id=data.course_id,
        term_id=data.term_id,
    )

    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment


def get_all_assignments(db: Session = next(get_db())):
    """
    Returns all assignments in the system.
    """
    return db.query(Assignment).all()


def get_assignment_by_id(assignment_id: int, db: Session = next(get_db())):
    """
    Retrieves an assignment by ID.
    """
    assignment = db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment


def get_assignments_by_term(term_id: int, db: Session = Depends(get_db)) -> List[dict]:
    """
    Returns assignment events formatted for the calendar view.
    """
    term = db.query(Term).filter(Term.id == term_id).first()
    if not term:
        raise HTTPException(status_code=404, detail="Término no encontrado")

    assignments = db.query(Assignment).filter(Assignment.term_id == term_id).all()

    return [
        {
            "id": a.id,
            "title": f"📝 {a.name}",
            "start": a.due_date.isoformat(),
            "type": "assignment",
            "color": "#205077",
        }
        for a in assignments
    ]


def get_assignments_by_term(term_id: int, db: Session = next(get_db())):
    """
    Retrieves all assignments associated with a specific term,
    including those not linked to a specific course.
    """
    # (Opcional) validar que el término exista
    term = db.query(Term).filter(Term.id == term_id).first()
    if not term:
        raise HTTPException(status_code=404, detail="Término no encontrado")

    return db.query(Assignment).filter(Assignment.term_id == term_id).all()


def update_assignment(
    assignment_id: int, updated_data: AssignmentCreate, db: Session = next(get_db())
):
    """
    Updates the assignment's data.
    """
    assignment = db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    validate_course_if_provided(updated_data.course_id, db)

    assignment.name = updated_data.name
    assignment.due_date = updated_data.due_date
    assignment.course_id = updated_data.course_id
    assignment.term_id = updated_data.term_id

    db.commit()
    db.refresh(assignment)
    return assignment


def delete_assignment(assignment_id: int, db: Session = next(get_db())):
    """
    Deletes an assignment by its ID.
    """
    assignment = db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    db.delete(assignment)
    db.commit()
    return {"message": "Assignment deleted successfully"}
