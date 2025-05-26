import { useEffect, useState } from "react";
import { getActiveTerm, updateTerm } from "@/lib/api/term";
import { getCoursesByTerm } from "@/lib/api/course";
import { getCalendarEventsByTerm } from "@/lib/api/calendar";
import { getAssignmentsByTerm } from "@/lib/api/assignment";
import { Term, CalendarEvent, Assignment } from "@/lib/types";

export const useActiveTerm = () => {
  const [term, setTerm] = useState<Term | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchTerm = async () => {
      try {
        const termResponse = await getActiveTerm();
        const coursesResponse = await getCoursesByTerm(termResponse.id);
        const calendarEvents = await getCalendarEventsByTerm(termResponse.id);
        const assignmentsResponse = await getAssignmentsByTerm(termResponse.id);

        setTerm({ ...termResponse, courses: coursesResponse, progress: 0 });
        setEvents(calendarEvents);
        setAssignments(assignmentsResponse);
      } catch (error) {
        console.log("No hay término activo o error al obtener los datos.");
      }
    };

    fetchTerm();
  }, []);

  const refreshCourses = async () => {
    if (!term) return;
    const updatedCourses = await getCoursesByTerm(term.id);
    setTerm((prev) => prev && { ...prev, courses: updatedCourses });
  };

  const refreshCalendarEvents = async () => {
    if (!term) return;
    const updatedEvents = await getCalendarEventsByTerm(term.id);
    setEvents(updatedEvents);
  };

  const refreshAssignments = async () => {
    if (!term) return;
    const updatedAssignments = await getAssignmentsByTerm(term.id);
    setAssignments(updatedAssignments);
  };

  const finishTerm = async () => {
    if (!term) return;
    try {
      // Marcar como inactivo
      await updateTerm(term.id, {
        ...term,
        is_active: false,
      });

      // Intentar cargar nuevo término activo
      try {
        const newTerm = await getActiveTerm();
        const courses = await getCoursesByTerm(newTerm.id);
        const calendarEvents = await getCalendarEventsByTerm(newTerm.id);
        const assignments = await getAssignmentsByTerm(newTerm.id);

        setTerm({ ...newTerm, courses, progress: 0 });
        setEvents(calendarEvents);
        setAssignments(assignments);
      } catch {
        // No hay término activo, se limpia el estado
        setTerm(null);
        setEvents([]);
        setAssignments([]);
      }
    } catch (error) {
      console.error("Error al finalizar el término:", error);
    }
  };

  return {
    term,
    events,
    assignments,
    setTerm,
    setEvents,
    refreshCourses,
    refreshCalendarEvents,
    refreshAssignments,
    finishTerm, // ✅ se exporta para que el componente lo use
  };
};
