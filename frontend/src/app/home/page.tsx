"use client";

import { useState } from "react";
import { CalendarPlus, Plus } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// 🧪 Simulación de término activo
const mockTerm = {
  name: "Cuatrimestre I - 2025",
  courses: [
    { id: 1, name: "Estructuras de Datos", code: "CI-1322", progress: 0.6 },
    { id: 2, name: "Bases de Datos", code: "CI-2413", progress: 0.3 },
    { id: 3, name: "Programación Web", code: "CI-1234", progress: 1 },
    { id: 4, name: "Sistemas Operativos", code: "CI-2101", progress: 0.85 },
    {
      id: 5,
      name: "Arquitectura de Computadoras",
      code: "CI-1403",
      progress: 0.45,
    },
    { id: 6, name: "Programación Web", code: "CI-1234", progress: 1 },
    { id: 7, name: "Sistemas Operativos", code: "CI-2101", progress: 0.85 },
  ],
  progress: 0.45,
};

const HomePage = () => {
  const [term] = useState(mockTerm); // Cambiar a mockTerm para probar vista activa
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <main className="flex-1 min-h-screen bg-[#F3F4F6] lg:px-0 relative flex flex-col">
      {term ? (
        <div className="w-full">
          {/* Título del término */}
          <div className="bg-[#39439f] h-20 flex items-center px-8 justify-center lg:justify-start">
            <h2 className="text-center lg:text-left text-2xl font-bold text-white">
              {term.name}
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row px-8">
            <div className="mt-4 flex flex-col gap-4">
              <div>
                {/* Lista de cursos */}
                <h3 className="text-center lg:text-left text-xl font-bold text-[#5b5b5b] mt-10">
                  Cursos Matriculados: {term.courses.length}
                </h3>

                <div className="mt-6 flex flex-col gap-4 lg:w-80 lg:mb-20">
                  {term.courses.length > 0 ? (
                    term.courses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => setSelectedCourse(course.id)}
                        className="cursor-pointer bg-white rounded-lg px-5 py-6 border-l-4 border-[#39439f] shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <h3 className="text-base font-semibold text-[#1E1E2F] mb-1">
                          {course.name}
                        </h3>
                        <p className="text-sm font-medium text-[#39439f] tracking-wide">
                          {course.code}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-xl py-12 text-[#9CA3AF]">
                      <CalendarPlus
                        size={48}
                        strokeWidth={1.5}
                        className="mb-4"
                      />
                      <p className="text-lg font-semibold text-gray-500">
                        No hay cursos matriculados
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Tocá el botón flotante para agregar uno
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full lg:ml-8 mt-4">
              {/* Calendario simulado */}
              <h3 className="text-center lg:text-left text-xl font-bold text-[#5b5b5b] mt-10 ">
                Calendario Semanal
              </h3>
              <div className="bg-white mt-6 p-4 rounded-lg border-0 shadow-sm">
                <div className="text-gray-500 text-sm">
                  <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    height="auto"
                    allDaySlot={false}
                    slotMinTime="07:00:00"
                    slotMaxTime="20:00:00"
                    hiddenDays={[0, 6]}
                    headerToolbar={{
                      left: "title",
                      center: "",
                      right: isMobile ? "prev,next" : "prev,today,next",
                    }}
                    events={
                      [
                        /* tus eventos aquí */
                      ]
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Vista cuando no hay término

        <div className="flex-1 flex flex-col h-full">
          <div className="bg-[#39439f] h-20 flex items-center px-8">
            <h2 className="text-center  lg:text-left text-2xl font-bold text-white">
              No hay ningún término activo
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center h-full">
            <div
              onClick={() => console.log("Crear término")}
              className="group flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 h-full p-8 rounded-xl text-[#9CA3AF] cursor-pointer hover:border-[#39439f] transition"
            >
              <CalendarPlus
                size={120}
                strokeWidth={1.2}
                className="mx-auto text-gray-400 transition group-hover:text-[#39439f]"
              />
              <p className="mt-6 text-2xl font-semibold text-gray-400 transition group-hover:text-[#39439f]">
                Crear término
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante grande */}
      <button
        className="fixed bottom-6 right-6 bg-[#39439f] text-white w-16 h-16 rounded-full shadow-lg hover:bg-[#2e336d] flex items-center justify-center"
        title="Agregar"
        onClick={() => console.log("Abrir acción flotante")}
      >
        <Plus size={32} />
      </button>
    </main>
  );
};

export default HomePage;
