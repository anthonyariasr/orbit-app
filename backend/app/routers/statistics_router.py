from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies.auth import get_current_user
from app.database.db_config import SessionLocal
from app.models.user import User
from app.services import statistics_service

router = APIRouter(prefix="/statistics", tags=["Statistics"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


"""
STATISTICS ROUTES

Provides analytical summaries of user academic progress, course distribution, 
credit loads, schedule intensity, and performance metrics.
"""


@router.get("/course-status")
def course_status(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Returns number of courses per status (approved, in_progress, failed).
    """
    return statistics_service.get_course_status_counts(current_user.id, db)


@router.get("/credits-by-term")
def credits_by_term(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Returns total credits per term for the current user.
    """
    return statistics_service.get_total_credits_by_term(current_user.id, db)


@router.get("/average-credits-per-term")
def avg_credits_per_term(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Returns the average number of credits taken per academic term.
    """
    return {
        "average_credits_per_term": statistics_service.get_average_credits_per_term(
            current_user.id, db
        )
    }


@router.get("/average-credits-per-course")
def avg_credits_per_course(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Returns the average number of credits per course.
    """
    return {
        "average_credits_per_course": statistics_service.get_average_credits_per_course(
            current_user.id, db
        )
    }


@router.get("/weighted-grade-average")
def weighted_grade_average(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Returns the weighted grade average (uses credits as weights).
    """
    return {
        "weighted_average": statistics_service.get_weighted_grade_average(
            current_user.id, db
        )
    }


@router.get("/weekly-class-hours")
def weekly_class_hours(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Returns the total number of class hours per week (only from the active term).
    """
    return {
        "weekly_class_hours": statistics_service.get_weekly_class_hours(
            current_user.id, db
        )
    }


@router.get("/busiest-day")
def busiest_day(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    Returns the day of the week with the most class hours in the active term.
    """
    return {"busiest_day": statistics_service.get_busiest_day(current_user.id, db)}


@router.get("/summary")
def get_statistics_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return {
        "average_credits_per_term": statistics_service.get_average_credits_per_term(
            current_user.id, db
        ),
        "average_credits_per_course": statistics_service.get_average_credits_per_course(
            current_user.id, db
        ),
        "weighted_grade_average": statistics_service.get_weighted_grade_average(
            current_user.id, db
        ),
        "weekly_class_hours": statistics_service.get_weekly_class_hours(
            current_user.id, db
        ),
        "course_status": statistics_service.get_course_status_counts(
            current_user.id, db
        ),
        "credits_by_term": statistics_service.get_total_credits_by_term(
            current_user.id, db
        ),
    }
