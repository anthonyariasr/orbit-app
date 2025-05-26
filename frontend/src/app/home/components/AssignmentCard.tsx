import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Assignment } from "@/lib/types";

interface Props {
  assignment: Assignment & { course_name?: string };
  onClick?: () => void;
}

const AssignmentCard = ({ assignment, onClick }: Props) => {
  const dueDate = new Date(assignment.due_date);
  const day = format(dueDate, "dd", { locale: es });
  const month = format(dueDate, "MMM", { locale: es }).toUpperCase();

  return (
    <button
      onClick={onClick}
      className="flex w-full rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer"
    >
      {/* Fecha (estilo Orbit) */}
      <div className="bg-[#e5e8fc] w-20 flex flex-col items-center justify-center py-4">
        <span className="text-sm font-semibold text-[#39439f]">{month}</span>
        <span className="text-3xl font-bold text-[#2c3e50]">{day}</span>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 py-3 text-left">
        <h3 className="text-base font-semibold text-gray-800">
          {assignment.name}
        </h3>

        {assignment.course_name && (
          <p className="text-sm text-[#39439f] mt-1">{assignment.course_name}</p>
        )}
      </div>
    </button>
  );
};

export default AssignmentCard;
