import api from "@/lib/axios";

export const getCourseStatusCounts = async () => {
  const response = await api.get("/statistics/course-status");
  return response.data as {
    approved: number;
    in_progress: number;
    failed: number;
  };
};

export const getCreditsByTerm = async () => {
  const response = await api.get("/statistics/credits-by-term");
  return response.data as {
    [termName: string]: number;
  };
};

export const getAverageCreditsPerTerm = async () => {
  const response = await api.get("/statistics/average-credits-per-term");
  return response.data as {
    average_credits_per_term: number;
  };
};

export const getAverageCreditsPerCourse = async () => {
  const response = await api.get("/statistics/average-credits-per-course");
  return response.data as {
    average_credits_per_course: number;
  };
};

export const getWeightedGradeAverage = async () => {
  const response = await api.get("/statistics/weighted-grade-average");
  return response.data as {
    weighted_average: number;
  };
};

export const getWeeklyClassHours = async () => {
  const response = await api.get("/statistics/weekly-class-hours");
  return response.data as {
    weekly_class_hours: number;
  };
};

export const getBusiestDay = async () => {
  const response = await api.get("/statistics/busiest-day");
  return response.data as {
    busiest_day: string;
  };
};
