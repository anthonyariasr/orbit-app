'use client';

import { CalendarPlus } from "lucide-react";
import CourseCard from "@/shared/CourseCard";

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  professor_name?: string;
  room?: string;
  status: "in_progress" | "approved" | "failed";
}

interface Props {
  courses: Course[];
  onSelect: (id: number) => void;
}

const CourseList = ({ courses, onSelect }: Props) => (
  <div className="mt-4 flex flex-col">
    <h3 className="text-center lg:text-left text-xl font-bold text-[#5b5b5b] mt-10">
      Cursos Matriculados: {courses.length}
    </h3>

    <div className="mt-6 flex flex-col gap-4 lg:w-80 lg:mb-20">
      {courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard key={course.id} course={course} onClick={onSelect} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-xl py-12 text-[#9CA3AF]">
          <CalendarPlus size={48} strokeWidth={1.5} className="mb-4" />
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
);

export default CourseList;
