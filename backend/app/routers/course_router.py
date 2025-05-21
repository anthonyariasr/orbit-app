from fastapi import APIRouter, Depends
from typing import List
from app.schemas.course_schemas import CourseCreate, CourseResponse
from app.controllers import course_controllers
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/courses", tags=["Courses"])

"""
COURSE ROUTES

Handles operations related to academic courses:
- Create, retrieve, update, and delete courses
- Filter courses by term
- Enforces that users can only manage their own courses
"""


@router.post("/", response_model=CourseResponse)
def create_course(course: CourseCreate, current_user: User = Depends(get_current_user)):
    """
    Create a new course within a given academic term.
    """
    return course_controllers.create_course(course, current_user)


@router.get("/", response_model=List[CourseResponse])
def get_all_courses(current_user: User = Depends(get_current_user)):
    """
    Retrieve a list of all courses belonging to the current user.
    """
    return course_controllers.get_all_courses(current_user)


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
def update_course(
    course_id: int,
    updated_course: CourseCreate,
    current_user: User = Depends(get_current_user),
):
    """
    Update information of an existing course.
    """
    return course_controllers.update_course(course_id, updated_course, current_user)


@router.delete("/{course_id}")
def delete_course(course_id: int, current_user: User = Depends(get_current_user)):
    """
    Delete a course by its ID.
    """
    return course_controllers.delete_course(course_id, current_user)
