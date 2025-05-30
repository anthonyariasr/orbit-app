// src/app/statistics/page.tsx
"use client";

import { useEffect, useState } from "react";
import StatGroup from "./StatGroup";
import BarChartCredits from "./BarChartCredits";
import PieChartCourseStatus from "./PieChartCourseStatus";
import api from "@/lib/axios";

interface CreditTermData {
  term: string;
  credits: number;
}

interface CourseStatusData {
  name: string;
  value: number;
}

export default function DashboardStatistics() {
  const [stats, setStats] = useState<any>({});
  const [creditsByTerm, setCreditsByTerm] = useState<CreditTermData[]>([]);
  const [courseStatus, setCourseStatus] = useState<CourseStatusData[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [
        avgTerm,
        avgCourse,
        weighted,
        weekly,
        statusRes,
        creditsRes,
      ] = await Promise.all([
        api.get("/statistics/average-credits-per-term"),
        api.get("/statistics/average-credits-per-course"),
        api.get("/statistics/weighted-grade-average"),
        api.get("/statistics/weekly-class-hours"),
        api.get("/statistics/course-status"),
        api.get("/statistics/credits-by-term"),
      ]);

      setStats({
        promedio_ponderado: weighted.data.weighted_average,
        promedio_termino: avgTerm.data.average_credits_per_term,
        promedio_curso: avgCourse.data.average_credits_per_course,
        horas_semanales: weekly.data.weekly_class_hours,
        aprobados: statusRes.data.approved,
      });

      setCourseStatus([
        { name: "Aprobado", value: statusRes.data.approved },
        { name: "En curso", value: statusRes.data.in_progress },
        { name: "Reprobado", value: statusRes.data.failed },
      ]);

      setCreditsByTerm(
        Object.entries(creditsRes.data).map(([term, credits]) => ({
          term,
          credits: Number(credits),
        }))
      );
    };

    fetchAll();
  }, []);

  return (
    <div className="py-6 px-8 space-y-8">

      <StatGroup
        stats={[
          { title: "Cursos Aprobados", value: stats.aprobados ?? 0 },
          { title: "Promedio Ponderado", value: stats.promedio_ponderado ?? "—" },
          { title: "Clases del Término Actual", value: `${stats.horas_semanales ?? 0}h` },
          { title: "Prom. Créditos por Término", value: stats.promedio_termino ?? "—" },
        ]}
      />

      <div className="flex flex-col lg:flex-row w-full">
        <BarChartCredits data={creditsByTerm} />
        <PieChartCourseStatus data={courseStatus} />
      </div>
    </div>
  );
}
