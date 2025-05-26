import api from "@/lib/axios";
import { ScheduleSlot, ScheduleSlotPayload } from "@/lib/types";

/**
 * Crea un nuevo horario para un curso.
 */
export const createScheduleSlot = async (data: ScheduleSlotPayload): Promise<ScheduleSlot> => {
  const response = await api.post("/schedule-slots", data);
  return response.data;
};

/**
 * Obtiene todos los horarios del sistema.
 */
export const getAllScheduleSlots = async (): Promise<ScheduleSlot[]> => {
  const response = await api.get("/schedule-slots");
  return response.data;
};

/**
 * Obtiene un horario por su ID.
 */
export const getScheduleSlotById = async (slotId: number): Promise<ScheduleSlot> => {
  const response = await api.get(`/schedule-slots/${slotId}`);
  return response.data;
};

/**
 * Obtiene todos los horarios de un curso específico.
 */
export const getSlotsByCourse = async (courseId: number): Promise<ScheduleSlot[]> => {
  const response = await api.get(`/schedule-slots/course/${courseId}`);
  return response.data;
};

/**
 * Actualiza un horario existente.
 */
export const updateScheduleSlot = async (
  slotId: number,
  data: ScheduleSlotPayload
): Promise<ScheduleSlot> => {
  const response = await api.put(`/schedule-slots/${slotId}`, data);
  return response.data;
};

/**
 * Elimina un horario por ID.
 */
export const deleteScheduleSlot = async (slotId: number): Promise<void> => {
  await api.delete(`/schedule-slots/${slotId}`);
};
