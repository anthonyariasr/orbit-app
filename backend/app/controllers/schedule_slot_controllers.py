from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.database.db_config import SessionLocal
from app.models.schedule_slot import ScheduleSlot
from app.models.course import Course
from app.schemas.schedule_slot_schemas import ScheduleSlotCreate

"""
Handles logic for managing schedule slots assigned to courses.
Each slot must reference an existing course.
"""


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def validate_course(course_id: int, db: Session):
    """
    Validates the existence of the course before assigning a schedule slot.
    """
    course = db.get(Course, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Associated course not found")


def create_schedule_slot(data: ScheduleSlotCreate, db: Session = next(get_db())):
    validate_course(data.course_id, db)

    new_slot = ScheduleSlot(
        day_of_week=data.day_of_week,
        start_time=data.start_time,
        end_time=data.end_time,
        course_id=data.course_id,
    )

    db.add(new_slot)
    db.commit()
    db.refresh(new_slot)
    return new_slot


def get_all_schedule_slots(db: Session = next(get_db())):
    return db.query(ScheduleSlot).all()


def get_schedule_slot_by_id(slot_id: int, db: Session = next(get_db())):
    slot = db.get(ScheduleSlot, slot_id)
    if not slot:
        raise HTTPException(status_code=404, detail="Schedule slot not found")
    return slot


def get_slots_by_course(course_id: int, db: Session = next(get_db())):
    validate_course(course_id, db)
    return db.query(ScheduleSlot).filter(ScheduleSlot.course_id == course_id).all()


def update_schedule_slot(
    slot_id: int, updated_data: ScheduleSlotCreate, db: Session = next(get_db())
):
    slot = db.get(ScheduleSlot, slot_id)
    if not slot:
        raise HTTPException(status_code=404, detail="Schedule slot not found")

    validate_course(updated_data.course_id, db)

    slot.day_of_week = updated_data.day_of_week
    slot.start_time = updated_data.start_time
    slot.end_time = updated_data.end_time
    slot.course_id = updated_data.course_id

    db.commit()
    db.refresh(slot)
    return slot


def delete_schedule_slot(slot_id: int, db: Session = next(get_db())):
    slot = db.get(ScheduleSlot, slot_id)
    if not slot:
        raise HTTPException(status_code=404, detail="Schedule slot not found")

    db.delete(slot)
    db.commit()
    return {"message": "Schedule slot deleted successfully"}
