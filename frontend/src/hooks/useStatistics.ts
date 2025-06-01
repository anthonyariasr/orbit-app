import { useEffect, useState } from "react";
import { getStatisticsSummary } from "@/lib/api/statistics";

interface StatValues {
  weightedAverage: number;
  termAverage: number;
  courseAverage: number;
  weeklyHours: number;
  approvedCourses: number;
}

interface CreditPerTerm {
  term: string;
  credits: number;
}

interface CourseStatus {
  name: string;
  value: number;
}

export const useStatistics = () => {
  const [stats, setStats] = useState<StatValues | null>(null);
  const [creditsByTerm, setCreditsByTerm] = useState<CreditPerTerm[]>([]);
  const [courseStatus, setCourseStatus] = useState<CourseStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatisticsSummary();

        setStats({
          weightedAverage: data.weighted_grade_average ?? 0,
          termAverage: data.average_credits_per_term ?? 0,
          courseAverage: data.average_credits_per_course ?? 0,
          weeklyHours: data.weekly_class_hours ?? 0,
          approvedCourses: data.course_status?.approved ?? 0,
        });

        setCourseStatus([
          { name: "Approved", value: data.course_status?.approved ?? 0 },
          { name: "In Progress", value: data.course_status?.in_progress ?? 0 },
          { name: "Failed", value: data.course_status?.failed ?? 0 },
        ]);

        setCreditsByTerm(
          Object.entries(data.credits_by_term ?? {}).map(([term, credits]) => ({
            term,
            credits: Number(credits),
          }))
        );
      } catch (err) {
        console.error("Error loading statistics:", err);
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    creditsByTerm,
    courseStatus,
    loading,
    error,
  };
};
