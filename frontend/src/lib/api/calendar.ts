// src/lib/api/calendar.ts
import api from "@/lib/axios";
import { CalendarEvent } from "@/lib/types";

/**
 * Obtiene todos los eventos (tareas y clases) para un término específico.
 * @param termId ID del término
 * @returns Lista de eventos de calendario
 */
export const getCalendarEventsByTerm = async (termId: number): Promise<CalendarEvent[]> => {
  const response = await api.get(`/calendar/term/${termId}`);
  return response.data;
};