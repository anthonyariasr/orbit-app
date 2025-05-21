from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.assignment_schemas import AssignmentCreate, AssignmentResponse
from app.controllers import assignment_controllers

router = APIRouter(prefix="/assignments", tags=["Assignments"])

"""
ASSIGNMENT ROUTES

Handles operations related to tasks, exams, and projects:
- Create, retrieve, update, and delete assignments
- Assignments may or may not be linked to a course
"""


@router.post("/", response_model=AssignmentResponse)
def create_assignment(assignment: AssignmentCreate):
    """
    Create a new assignment. It can be linked to a course or exist independently.
    """
    return assignment_controllers.create_assignment(assignment)


@router.get("/", response_model=List[AssignmentResponse])
def get_all_assignments():
    """
    Retrieve all assignments from the system.
    """
    return assignment_controllers.get_all_assignments()


@router.get("/{assignment_id}", response_model=AssignmentResponse)
def get_assignment_by_id(assignment_id: int):
    """
    Retrieve an assignment by its ID.
    """
    return assignment_controllers.get_assignment_by_id(assignment_id)


@router.get("/course/{course_id}", response_model=List[AssignmentResponse])
def get_assignments_by_course(course_id: int):
    """
    Retrieve all assignments associated with a specific course.
    """
    return assignment_controllers.get_assignments_by_course(course_id)


@router.put("/{assignment_id}", response_model=AssignmentResponse)
def update_assignment(assignment_id: int, updated_data: AssignmentCreate):
    """
    Update the information of an assignment.
    """
    return assignment_controllers.update_assignment(assignment_id, updated_data)


@router.delete("/{assignment_id}")
def delete_assignment(assignment_id: int):
    """
    Delete an assignment by its ID.
    """
    return assignment_controllers.delete_assignment(assignment_id)
