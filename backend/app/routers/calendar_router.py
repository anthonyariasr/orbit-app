from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List

from app.models.term import Term
from app.models.assignment import Assignment
from app.models.course import Course
from app.models.schedule_slot import ScheduleSlot
from app.schemas.calendar_schemas import CalendarEvent
from app.database.db_config import SessionLocal

router = APIRouter(prefix="/calendar", tags=["Calendar"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/term/{term_id}", response_model=List[CalendarEvent])
def get_calendar_events_for_term(term_id: int, db: Session = Depends(get_db)):
    term = db.query(Term).filter(Term.id == term_id).first()
    if not term:
        raise HTTPException(status_code=404, detail="Término no encontrado")

    events: List[CalendarEvent] = []

    # 1. Assignments
    assignments = db.query(Assignment).filter(Assignment.term_id == term_id).all()
    for a in assignments:
        # Usa directamente a.due_date como ya es tipo date
        start = datetime.combine(a.due_date, datetime.strptime("06:00", "%H:%M").time())

        events.append(
            CalendarEvent(
                title=f"{a.name}",
                start=start,
                type="assignment",
                color="#d4cdff",
            )
        )

    # 2. Clases (schedule_slots de los cursos del término)
    courses = db.query(Course).filter(Course.term_id == term_id).all()

    # Punto de partida: lunes de esta semana
    base_week = datetime.now()
    monday = base_week - timedelta(days=base_week.weekday())

    # Repetir durante 1 año
    MAX_WEEKS = 52

    day_to_index = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6,
    }

    for course in courses:
        for slot in course.schedule_slots:
            day_idx = day_to_index.get(slot.day_of_week, None)
            if day_idx is None:
                continue

            for week in range(MAX_WEEKS):
                event_date = monday + timedelta(days=day_idx, weeks=week)
                start = datetime.combine(event_date, slot.start_time)
                end = datetime.combine(event_date, slot.end_time)

                events.append(
                    CalendarEvent(
                        title=f"{course.name}",
                        start=start,
                        end=end,
                        type="class",
                        color="#6063c4",
                    )
                )

    return events
