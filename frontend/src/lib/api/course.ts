import api from "@/lib/axios";
import { Course, CoursePayload, CourseFinalizePayload } from "@/lib/types";

/**
 * Crea un nuevo curso.
 */
export const createCourse = async (data: CoursePayload): Promise<Course> => {
  const response = await api.post("/courses", data);
  return response.data;
};

/**
 * Obtiene todos los cursos del usuario autenticado.
 */
export const getAllCourses = async (): Promise<Course[]> => {
  const response = await api.get("/courses");
  return response.data;
};

/**
 * Obtiene los cursos asociados a un término específico.
 */
export const getCoursesByTerm = async (termId: number): Promise<Course[]> => {
  const response = await api.get(`/courses/term/${termId}`);
  return response.data;
};

/**
 * Obtiene un curso por su ID.
 */
export const getCourseById = async (courseId: number): Promise<Course> => {
  const response = await api.get(`/courses/${courseId}`);
  return response.data;
};

/**
 * Actualiza un curso existente.
 */
export const updateCourse = async (
  courseId: number,
  updatedCourse: CoursePayload
): Promise<Course> => {
  const response = await api.put(`/courses/${courseId}`, updatedCourse);
  return response.data;
};

/**
 * Elimina un curso.
 */
export const deleteCourse = async (courseId: number): Promise<void> => {
  await api.delete(`/courses/${courseId}`);
};

/**
 * Finaliza un curso (estatus y nota final).
 */
export const finalizeCourse = async (
  courseId: number,
  data: CourseFinalizePayload
): Promise<Course> => {
  const response = await api.patch(`/courses/${courseId}/finalize`, data);
  return response.data;
};
