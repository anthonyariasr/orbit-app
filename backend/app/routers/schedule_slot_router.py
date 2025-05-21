from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schedule_slot_schemas import ScheduleSlotCreate, ScheduleSlotResponse
from app.controllers import schedule_slot_controllers

router = APIRouter(prefix="/schedule-slots", tags=["Schedule Slots"])

"""
SCHEDULE SLOT ROUTES

Manages weekly time slots assigned to courses:
- Create, retrieve, update, delete
- Filter by course
"""


@router.post("/", response_model=ScheduleSlotResponse)
def create_schedule_slot(slot: ScheduleSlotCreate):
    """
    Create a new schedule slot for a course (day and time range).
    """
    return schedule_slot_controllers.create_schedule_slot(slot)


@router.get("/", response_model=List[ScheduleSlotResponse])
def get_all_schedule_slots():
    """
    Retrieve all schedule slots in the system.
    """
    return schedule_slot_controllers.get_all_schedule_slots()


@router.get("/{slot_id}", response_model=ScheduleSlotResponse)
def get_schedule_slot_by_id(slot_id: int):
    """
    Retrieve a schedule slot by its ID.
    """
    return schedule_slot_controllers.get_schedule_slot_by_id(slot_id)


@router.get("/course/{course_id}", response_model=List[ScheduleSlotResponse])
def get_slots_by_course(course_id: int):
    """
    Retrieve all schedule slots associated with a specific course.
    """
    return schedule_slot_controllers.get_slots_by_course(course_id)


@router.put("/{slot_id}", response_model=ScheduleSlotResponse)
def update_schedule_slot(slot_id: int, updated_slot: ScheduleSlotCreate):
    """
    Update the data of a schedule slot.
    """
    return schedule_slot_controllers.update_schedule_slot(slot_id, updated_slot)


@router.delete("/{slot_id}")
def delete_schedule_slot(slot_id: int):
    """
    Delete a schedule slot by ID.
    """
    return schedule_slot_controllers.delete_schedule_slot(slot_id)
