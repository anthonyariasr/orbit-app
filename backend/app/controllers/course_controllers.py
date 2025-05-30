from fastapi import HTTPException, Depends
from typing import List
from datetime import datetime, timedelta
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
from app.database.db_config import SessionLocal
from app.models.course import Course
from app.models.term import Term
from app.models.user import User
from app.models.schedule_slot import ScheduleSlot
from app.schemas.course_schemas import CourseCreate, CourseFinalize


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


def create_course(course_data: CourseCreate, db: Session):
    print(course_data)

    new_course = Course(
        code=course_data.code,
        name=course_data.name,
        credits=course_data.credits,
        professor_name=course_data.professor_name,
        room=course_data.room,
        status=course_data.status,
        term_id=course_data.term_id,
        grade=course_data.grade,
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    # Crea los schedule_slots si vienen en el payload
    if course_data.schedule_slots:
        for slot in course_data.schedule_slots:
            db.add(
                ScheduleSlot(
                    day_of_week=slot.day_of_week,
                    start_time=slot.start_time,
                    end_time=slot.end_time,
                    course_id=new_course.id,  # ahora sí lo tenemos
                )
            )
        db.commit()

    return new_course


def get_all_courses(current_user: User, db: Session = Depends(get_db)):
    """
    Returns all courses in the system.
    """
    return (
        db.query(Course)
        .options(joinedload(Course.schedule_slots))
        .filter(Course.user_id == current_user.id)
        .all()
    )


def get_course_by_id(course_id: int, db: Session = next(get_db())):
    """
    Retrieves a course by its unique ID.
    """
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


def get_courses_by_term(term_id: int, db: Session):
    """
    Returns all courses for a specific term as CourseResponse.
    """
    validate_term(term_id, db)
    
    courses = db.query(Course).filter(Course.term_id == term_id).all()
    
    return courses  # Cada objeto debe tener la relación .schedule_slots lista


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
    course.grade = updated_data.grade

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


def finalize_course(
    course_id: int,
    data: CourseFinalize,
    current_user: User,
    db: Session = next(get_db()),
):
    """
    Finalizes a course by updating its status and grade.
    Only 'in_progress' courses can be finalized.
    Grade is required and used later for weighted statistics.
    """
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    term = db.get(Term, course.term_id)
    if not term or term.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this course"
        )

    if course.status != "in_progress":
        raise HTTPException(
            status_code=400, detail="Only in-progress courses can be finalized"
        )

    if data.grade is None:
        raise HTTPException(
            status_code=400, detail="Final grade is required to finalize a course"
        )

    course.status = data.status
    course.grade = data.grade

    db.commit()
    db.refresh(course)
    return course
