"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/types";
import {
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "@/lib/api/assignment";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assignmentId: number | null;
  courses: Course[];
  termId: number;
  onUpdated: () => void;
}

const EditAssignmentModal = ({
  isOpen,
  onClose,
  assignmentId,
  courses,
  termId,
  onUpdated,
}: Props) => {
  const [form, setForm] = useState({
    name: "",
    due_date: "",
    course_id: courses[0]?.id ?? 0,
  });

  useEffect(() => {
    if (!assignmentId || !isOpen) return;

    const fetchAssignment = async () => {
      try {
        const assignment = await getAssignmentById(assignmentId);
        setForm({
          name: assignment.name,
          due_date: assignment.due_date,
          course_id: assignment.course_id!,
        });
      } catch (err) {
        console.error("Error al cargar pendiente:", err);
      }
    };

    fetchAssignment();
  }, [assignmentId, isOpen]);

  const handleChange = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentId) return;

    try {
      await updateAssignment(assignmentId, {
        ...form,
        term_id: termId,
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Error al actualizar pendiente:", err);
    }
  };

  const handleDelete = async () => {
    if (!assignmentId) return;
    try {
      await deleteAssignment(assignmentId);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Error al eliminar pendiente:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6">
          Editar Pendiente
        </h2>

        <form
          onSubmit={handleUpdate}
          className="space-y-4 text-sm text-[#1E1E2F]"
        >
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
          />

          <input
            type="date"
            value={form.due_date}
            onChange={(e) => handleChange("due_date", e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
          />

          <select
            value={form.course_id}
            onChange={(e) =>
              handleChange("course_id", Number(e.target.value))
            }
            required
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
            >
              Eliminar
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#39439f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2e336d]"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssignmentModal;
