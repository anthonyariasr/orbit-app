// lib/api/assignment.ts
import api from "@/lib/axios";
import { Assignment, AssignmentPayload } from "@/lib/types";

// Crear tarea
export const createAssignment = async (data: AssignmentPayload) => {
  const response = await api.post<Assignment>("/assignments", data);
  return response.data;
};

// Obtener todas las tareas
export const getAllAssignments = async () => {
  const response = await api.get<Assignment[]>("/assignments");
  return response.data;
};

// Obtener tareas por término
export const getAssignmentsByTerm = async (termId: number) => {
  const response = await api.get<Assignment[]>(`/assignments/term/${termId}`);
  return response.data;
};

// Obtener tareas por curso
export const getAssignmentsByCourse = async (courseId: number) => {
  const response = await api.get<Assignment[]>(`/assignments/course/${courseId}`);
  return response.data;
};

// Obtener una tarea por ID
export const getAssignmentById = async (id: number) => {
  const response = await api.get<Assignment>(`/assignments/${id}`);
  return response.data;
};

// Actualizar una tarea
export const updateAssignment = async (id: number, data: AssignmentPayload) => {
  const response = await api.put<Assignment>(`/assignments/${id}`, data);
  return response.data;
};

// Eliminar una tarea
export const deleteAssignment = async (id: number) => {
  await api.delete(`/assignments/${id}`);
};
