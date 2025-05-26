"use client";

import { useState } from "react";
import { Course } from "@/lib/types";

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    due_date: string;
    course_id: number;
  }) => void;
  courses: Course[];
}

const AssignmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  courses,
}: AssignmentModalProps) => {
  const [form, setForm] = useState({
    name: "",
    due_date: "",
    course_id: 0, // default sin cursos
  });

  const handleChange = (
    key: "name" | "due_date" | "course_id",
    value: string | number
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.due_date || !form.course_id) return;
    onSubmit(form);
    setForm({ name: "", due_date: "", course_id: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 lg:py-16 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6 text-center">
          Añadir Pendiente
        </h2>

        {courses.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-4">
              No hay cursos disponibles. Crea un curso antes de añadir un
              pendiente.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-sm text-[#1E1E2F]"
          >
            <input
              type="text"
              placeholder="Nombre del pendiente"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
              required
            />

            <input
              type="date"
              value={form.due_date}
              onChange={(e) => handleChange("due_date", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
              required
            />

            <select
              value={form.course_id}
              onChange={(e) =>
                handleChange("course_id", Number(e.target.value))
              }
              className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
              required
            >
              <option value={0} disabled>
                Selecciona un curso
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#39439f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2e336d] font-medium"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AssignmentModal;
