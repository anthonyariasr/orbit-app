# routers/course_router.py

from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.course_schemas import CourseCreate, CourseResponse
from app.controllers import course_controllers

router = APIRouter(prefix="/courses", tags=["Courses"])

"""
COURSE ROUTES

Handles operations related to academic courses:
- Create, retrieve, update, and delete courses
- Filter courses by term or user
"""

@router.post("/", response_model=CourseResponse)
def create_course(course: CourseCreate):
    """
    Create a new course within a given academic term.
    """
    return course_controllers.create_course(course)

@router.get("/", response_model=List[CourseResponse])
def get_all_courses():
    """
    Retrieve a list of all courses in the system.
    """
    return course_controllers.get_all_courses()

@router.get("/{course_id}", response_model=CourseResponse)
def get_course_by_id(course_id: int):
    """
    Retrieve a course by its unique ID.
    """
    return course_controllers.get_course_by_id(course_id)

@router.get("/term/{term_id}", response_model=List[CourseResponse])
def get_courses_by_term(term_id: int):
    """
    Retrieve all courses associated with a specific term.
    """
    return course_controllers.get_courses_by_term(term_id)

@router.put("/{course_id}", response_model=CourseResponse)
def update_course(course_id: int, updated_course: CourseCreate):
    """
    Update information of an existing course.
    """
    return course_controllers.update_course(course_id, updated_course)

@router.delete("/{course_id}")
def delete_course(course_id: int):
    """
    Delete a course by its ID.
    """
    return course_controllers.delete_course(course_id)
