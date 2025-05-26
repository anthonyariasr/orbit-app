"use client";

import { useEffect, useState } from "react";
import AssignmentModal from "./components/AssignmentModal";
import CourseList from "./components/CourseList";
import CourseModal from "./components/CourseModal";
import EmptyTermView from "./components/EmptyTermView";
import FloatingAddButton from "./components/FloatingAddButton ";
import TermCalendar from "./components/TermCalendar";
import TermHeader from "./components/TermHeader";
import TermModal from "./components/TermModal";

import { createTerm, getActiveTerm } from "@/lib/api/term";
import { createCourse, getCoursesByTerm } from "@/lib/api/course";
import { getCalendarEventsByTerm } from "@/lib/api/calendar";
import { Term, CalendarEvent } from "@/lib/types";

const HomePage = () => {
  const [term, setTerm] = useState<Term | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  // Cargar el término activo, cursos y eventos al montar
  useEffect(() => {
    const fetchTerm = async () => {
      try {
        const termResponse = await getActiveTerm();
        const coursesResponse = await getCoursesByTerm(termResponse.id);
        const calendarEvents = await getCalendarEventsByTerm(termResponse.id);

        setTerm({
          ...termResponse,
          courses: coursesResponse,
          progress: 0,
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.log("No hay término activo o error al obtener los datos.");
      }
    };

    fetchTerm();
  }, []);

  // Refrescar cursos
  const refreshCourses = async () => {
    if (!term) return;
    try {
      const updatedCourses = await getCoursesByTerm(term.id);
      setTerm((prev) => prev && { ...prev, courses: updatedCourses });
    } catch (error) {
      console.error("Error al refrescar los cursos:", error);
    }
  };

  // Refrescar eventos de calendario
  const refreshCalendarEvents = async () => {
    if (!term) return;
    try {
      const calendarEvents = await getCalendarEventsByTerm(term.id);
      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error al cargar eventos del calendario:", error);
    }
  };

  const handleCreateTerm = async (data: { name: string }) => {
    try {
      const response = await createTerm(data);
      setTerm({
        id: response.id,
        name: response.name,
        is_active: response.is_active,
        courses: [],
        progress: 0,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al crear el término:", error);
    }
  };

  return (
    <main className="flex-1 min-h-screen bg-[#F3F4F6] flex flex-col relative">
      {term ? (
        <>
          <TermHeader title={term.name} />
          <div className="flex flex-col lg:flex-row px-8">
            <CourseList courses={term.courses} onSelect={setSelectedCourse} />
            <TermCalendar events={events} />
          </div>
        </>
      ) : (
        <EmptyTermView onCreate={() => setIsModalOpen(true)} />
      )}

      <FloatingAddButton
        onAddCourse={() => setIsCourseModalOpen(true)}
        onAddAssignment={() => setIsAssignmentModalOpen(true)}
      />

      {term && (
        <CourseModal
          termId={term.id}
          isOpen={isCourseModalOpen}
          onClose={() => setIsCourseModalOpen(false)}
          onSubmit={async (data) => {
            try {
              await createCourse(data);
              await refreshCourses();
              await refreshCalendarEvents();
              setIsCourseModalOpen(false);
            } catch (error) {
              console.error("Error al crear curso:", error);
            }
          }}
        />
      )}

      <AssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        onSubmit={(data) => console.log("📌 Nuevo pendiente:", data)}
      />

      <TermModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTerm}
      />
    </main>
  );
};

export default HomePage;
