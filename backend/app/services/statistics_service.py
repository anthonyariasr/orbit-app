from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.course import Course
from app.models.term import Term
from app.models.schedule_slot import ScheduleSlot

from datetime import datetime, date


def get_course_status_counts(user_id: int, db: Session) -> dict:
    """
    Returns the total number of courses per status for a given user.
    Useful for traffic light-style visualization.
    """
    results = (
        db.query(Course.status, func.count(Course.id))
        .join(Term)
        .filter(Term.user_id == user_id)
        .group_by(Course.status)
        .all()
    )
    result_dict = dict(results)
    return {
        "approved": result_dict.get("approved", 0),
        "in_progress": result_dict.get("in_progress", 0),
        "failed": result_dict.get("failed", 0),
    }


def get_total_credits_by_term(user_id: int, db: Session) -> dict:
    """
    Returns total credits grouped by term for a user.
    """
    results = (
        db.query(Term.name, func.sum(Course.credits))
        .join(Course)
        .filter(Term.user_id == user_id, Course.credits != None)
        .group_by(Term.name)
        .all()
    )
    return {term: credits or 0 for term, credits in results}


def get_average_credits_per_term(user_id: int, db: Session) -> float:
    """
    Calculates the average number of credits per term.
    """
    term_credits = (
        db.query(Term.id, func.sum(Course.credits))
        .join(Course)
        .filter(Term.user_id == user_id, Course.credits != None)
        .group_by(Term.id)
        .all()
    )
    if not term_credits:
        return 0.0
    total_credits = sum(credits or 0 for _, credits in term_credits)
    return round(total_credits / len(term_credits), 2)


def get_average_credits_per_course(user_id: int, db: Session) -> float:
    """
    Calculates the average number of credits per course.
    """
    total = (
        db.query(func.sum(Course.credits), func.count(Course.id))
        .join(Term)
        .filter(Term.user_id == user_id, Course.credits != None)
        .first()
    )
    total_credits, total_courses = total
    if not total_courses:
        return 0.0
    return round(total_credits / total_courses, 2)


def get_weighted_grade_average(user_id: int, db: Session) -> float:
    """
    Calculates the weighted average grade using course credits as weights.
    Only includes approved courses with non-null grades and credits.
    """
    courses = (
        db.query(Course)
        .join(Term)
        .filter(
            Term.user_id == user_id,
            Course.status != "in_progress",
            Course.grade != None,
            Course.credits != None,
        )
        .all()
    )
    total_weight = sum(c.credits for c in courses if c.credits is not None)
    if total_weight == 0:
        return 0.0
    weighted_sum = sum(
        c.grade * c.credits for c in courses if c.grade is not None and c.credits is not None
    )
    return round(weighted_sum / total_weight, 2)


def get_weekly_class_hours(user_id: int, db: Session) -> float:
    """
    Calculates the total number of hours per week for the active term.
    """
    active_term = (
        db.query(Term).filter(Term.user_id == user_id, Term.is_active == True).first()
    )
    if not active_term:
        return 0.0

    slots = (
        db.query(ScheduleSlot)
        .join(Course)
        .filter(Course.term_id == active_term.id)
        .all()
    )
    total_hours = 0.0
    for slot in slots:
        if slot.start_time and slot.end_time:
            delta = datetime.combine(date.today(), slot.end_time) - datetime.combine(
                date.today(), slot.start_time
            )
            total_hours += delta.total_seconds() / 3600
    return round(total_hours, 2)


def get_busiest_day(user_id: int, db: Session) -> str:
    """
    Returns the day of the week with the most class hours for the active term.
    """
    active_term = (
        db.query(Term).filter(Term.user_id == user_id, Term.is_active == True).first()
    )
    if not active_term:
        return "N/A"

    slots = (
        db.query(ScheduleSlot)
        .join(Course)
        .filter(Course.term_id == active_term.id)
        .all()
    )

    day_hours = {}
    for slot in slots:
        if slot.start_time and slot.end_time and slot.day_of_week:
            delta = datetime.combine(date.today(), slot.end_time) - datetime.combine(
                date.today(), slot.start_time
            )
            hours = delta.total_seconds() / 3600
            day_hours[slot.day_of_week] = day_hours.get(slot.day_of_week, 0) + hours

    if not day_hours:
        return "N/A"

    return max(day_hours.items(), key=lambda item: item[1])[0]
