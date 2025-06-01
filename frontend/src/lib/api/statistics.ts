import api from "@/lib/axios";

export const getStatisticsSummary = async () => {
  const response = await api.get("/statistics/summary");
  return response.data as {
    average_credits_per_term: number;
    average_credits_per_course: number;
    weighted_grade_average: number;
    weekly_class_hours: number;
    course_status: {
      approved: number;
      in_progress: number;
      failed: number;
    };
    credits_by_term: {
      [termName: string]: number;
    };
  };
};
