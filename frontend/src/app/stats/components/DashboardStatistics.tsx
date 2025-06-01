"use client";

import StatGroup from "./StatGroup";
import BarChartCredits from "./BarChartCredits";
import PieChartCourseStatus from "./PieChartCourseStatus";
import { useStatistics } from "@/hooks/useStatistics";

export default function DashboardStatistics() {
  const { stats, creditsByTerm, courseStatus, loading, error } =
    useStatistics();

  if (loading)
    return <p className="px-8 py-6 text-gray-500">Loading statistics...</p>;
  if (error) return <p className="px-8 py-6 text-red-500">{error}</p>;
  if (!stats)
    return <p className="px-8 py-6 text-red-500">No statistics available.</p>;

  return (
    <div className="py-6 px-8 space-y-8">
      <StatGroup
        stats={[
          {
            title: "Cursos Aprobados",
            value: stats.approvedCourses,
          },
          {
            title: "Promedio Ponderado",
            value:
              stats.weightedAverage > 0
                ? stats.weightedAverage.toFixed(1)
                : "—",
          },
          {
            title: "Horas de Clase Semanales",
            value: stats.weeklyHours > 0 ? `${stats.weeklyHours}h` : "—",
          },
          {
            title: "Promedio de Créditos por Término",
            value: stats.termAverage > 0 ? stats.termAverage.toFixed(1) : "—",
          },
        ]}
      />

      <div className="flex flex-col lg:flex-row w-full">
        <BarChartCredits data={creditsByTerm} />
        <PieChartCourseStatus data={courseStatus} />
      </div>
    </div>
  );
}
