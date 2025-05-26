'use client';

import React from "react";

interface CourseCardProps {
  course: {
    id: number;
    name: string;
    code: string;
    credits: number;
    professor_name?: string;
    room?: string;
    status: "in_progress" | "approved" | "failed";
  };
  onClick?: (id: number) => void;
  editable?: boolean;
  showDetails?: boolean;
}

const statusColors: Record<string, string> = {
  in_progress: "#22c55e", // verde
  approved: "#3b82f6",    // azul
  failed: "#eab308",      // amarillo
};

const statusLabels: Record<string, string> = {
  in_progress: "En curso",
  approved: "Aprobado",
  failed: "Reprobado",
};

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onClick,
  editable = true,
  showDetails = true,
}) => {
  const borderColor = statusColors[course.status] || "#39439f";

  const handleClick = () => {
    if (editable && onClick) {
      onClick(course.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-lg px-5 py-6 border-l-4 shadow-sm transition-shadow duration-200 min-h-[180px] ${
        editable ? "cursor-pointer hover:shadow-md" : "cursor-default"
      }`}
      style={{ borderLeftColor: "#39439f" }}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-[#1E1E2F] line-clamp-2">
          {course.name}
        </h3>
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: borderColor }}
        >
          {statusLabels[course.status]}
        </span>
      </div>

      <p className="text-sm font-medium text-[#39439f] tracking-wide mb-1">
        {course.code}
      </p>

      {showDetails && course.professor_name && (
        <p className="text-sm text-gray-600">Profesor: {course.professor_name}</p>
      )}
      {showDetails && course.room && (
        <p className="text-sm text-gray-600">Aula: {course.room}</p>
      )}

      <p className="text-sm text-gray-600">Créditos: {course.credits}</p>
    </div>
  );
};

export default CourseCard;
