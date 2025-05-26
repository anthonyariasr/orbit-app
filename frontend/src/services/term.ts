// src/services/term.ts
import api from "@/lib/axios"; // axios con auth preconfigurada

export const getActiveTerm = async () => {
  const response = await api.get("/terms/active");
  return response.data;
};

// src/services/assignment.ts
export const getAssignmentsByTerm = async (termId: number) => {
  const response = await api.get(`/assignments/term/${termId}`);
  return response.data;
};
