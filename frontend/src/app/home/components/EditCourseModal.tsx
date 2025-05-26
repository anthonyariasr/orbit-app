"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/types";
import { getCourseById, updateCourse, deleteCourse } from "@/lib/api/course";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseId: number | null;
  termId: number;
  onUpdated: () => void;
}

const statusOptions = [
  { value: "in_progress", label: "En curso" },
  { value: "approved", label: "Aprobado" },
  { value: "failed", label: "Reprobado" },
];

const EditCourseModal = ({
  isOpen,
  onClose,
  courseId,
  termId,
  onUpdated,
}: Props) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    credits: 0,
    professor_name: "",
    room: "",
    status: "in_progress" as "in_progress" | "approved" | "failed",
    grade: "",
  });

  useEffect(() => {
    if (!courseId || !isOpen) return;

    const fetchCourse = async () => {
      try {
        const course = await getCourseById(courseId);
        setForm({
          name: course.name,
          code: course.code ?? "",
          credits: course.credits,
          professor_name: course.professor_name ?? "",
          room: course.room ?? "",
          status: course.status ?? "in_progress",
          grade: course.grade?.toString() ?? "",
        });
      } catch (err) {
        console.error("Error al cargar curso:", err);
      }
    };

    fetchCourse();
  }, [courseId, isOpen]);

  const handleChange = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;

    try {
      await updateCourse(courseId, {
        term_id: termId,
        name: form.name,
        code: form.code,
        credits: Number(form.credits),
        professor_name: form.professor_name,
        room: form.room,
        status: form.status,
        grade: form.grade ? Number(form.grade) : undefined,
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Error al actualizar curso:", err);
    }
  };

  const handleDelete = async () => {
    if (!courseId) return;
    try {
      await deleteCourse(courseId);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Error al eliminar curso:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6">
          Editar Curso
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4 text-sm text-[#1E1E2F]">
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            placeholder="Nombre"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5]"
          />

          <input
            type="text"
            value={form.code}
            onChange={(e) => handleChange("code", e.target.value)}
            placeholder="Código"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5]"
          />

          <input
            type="number"
            value={form.credits}
            onChange={(e) => handleChange("credits", Number(e.target.value))}
            placeholder="Créditos"
            required
            min={0}
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5]"
          />

          <input
            type="text"
            value={form.professor_name}
            onChange={(e) => handleChange("professor_name", e.target.value)}
            placeholder="Profesor"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5]"
          />

          <input
            type="text"
            value={form.room}
            onChange={(e) => handleChange("room", e.target.value)}
            placeholder="Aula"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5]"
          />

          <select
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5]"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={form.grade}
            onChange={(e) => handleChange("grade", e.target.value)}
            placeholder="Nota final"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5]"
            min={0}
            max={100}
          />

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

export default EditCourseModal;
