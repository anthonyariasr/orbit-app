import api from "@/lib/axios";
import { TermPayload, TermResponse } from "@/lib/types";

export const createTerm = async (
  payload: TermPayload
): Promise<TermResponse> => {
  const response = await api.post("/terms/", payload);
  return response.data;
};

export const getActiveTerm = async (): Promise<TermResponse> => {
  const response = await api.get("/terms/active");
  return response.data;
};

export const getAllTerms = async (): Promise<TermResponse[]> => {
  const response = await api.get("/terms/");
  return response.data;
};

export const getTermById = async (termId: number): Promise<TermResponse> => {
  const response = await api.get(`/terms/${termId}`);
  return response.data;
};

export const updateTerm = async (
  termId: number,
  payload: TermPayload
): Promise<TermResponse> => {
  const response = await api.put(`/terms/${termId}`, payload);
  return response.data;
};

export const deleteTerm = async (termId: number): Promise<void> => {
  await api.delete(`/terms/${termId}`);
};
