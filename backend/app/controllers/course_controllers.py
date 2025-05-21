from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database.db_config import SessionLocal
from app.models.course import Course
from app.models.term import Term
from app.models.user import User
from app.schemas.course_schemas import CourseCreate


"""
Handles operations related to academic courses:
- Create, retrieve, update, delete
- Courses are always associated with a term
"""


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def validate_term(term_id: int, db: Session):
    """
    Validates that a term exists before associating a course with it.
    """
    term = db.get(Term, term_id)
    if not term:
        raise HTTPException(status_code=404, detail="Associated term not found")
    return term


def create_course(
    course_data: CourseCreate, current_user: User, db: Session = next(get_db())
):
    term = db.get(Term, course_data.term_id)
    if not term:
        raise HTTPException(status_code=404, detail="Associated term not found")
    if term.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to add course to this term"
        )

    new_course = Course(
        code=course_data.code,
        name=course_data.name,
        credits=course_data.credits,
        professor_name=course_data.professor_name,
        room=course_data.room,
        status=course_data.status,
        term_id=course_data.term_id,
    )

    try:
        db.add(new_course)
        db.commit()
        db.refresh(new_course)
        return new_course
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Course code must be unique")


def get_all_courses(db: Session = next(get_db())):
    """
    Returns all courses in the system.
    """
    return db.query(Course).all()


def get_course_by_id(course_id: int, db: Session = next(get_db())):
    """
    Retrieves a course by its unique ID.
    """
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


def get_courses_by_term(term_id: int, db: Session = next(get_db())):
    """
    Returns all courses associated with a specific term.
    """
    validate_term(term_id, db)
    return db.query(Course).filter(Course.term_id == term_id).all()


def update_course(
    course_id: int,
    updated_data: CourseCreate,
    current_user: User,
    db: Session = next(get_db()),
):
    """
    Updates an existing course with new information.
    Only allows update if the user owns the associated term.
    """
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Validar que el curso pertenece al usuario
    term = db.get(Term, course.term_id)
    if not term or term.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this course"
        )

    course.code = updated_data.code
    course.name = updated_data.name
    course.credits = updated_data.credits
    course.professor_name = updated_data.professor_name
    course.room = updated_data.room
    course.status = updated_data.status
    course.term_id = updated_data.term_id

    db.commit()
    db.refresh(course)
    return course


def delete_course(course_id: int, current_user: User, db: Session = next(get_db())):
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    term = db.get(Term, course.term_id)
    if not term or term.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this course"
        )

    db.delete(course)
    db.commit()
    return {"message": "Course deleted successfully"}
