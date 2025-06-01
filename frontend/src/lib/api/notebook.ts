import api from "@/lib/axios";
import { Notebook, NotebookPayload } from "@/lib/types";

// Get all notebooks for the current user
export const getAllNotebooks = async (): Promise<Notebook[]> => {
  const res = await api.get("/notebooks");
  return res.data;
};

// Get a single notebook by ID
export const getNotebookById = async (id: number): Promise<Notebook> => {
  const res = await api.get(`/notebooks/${id}`);
  return res.data;
};

// Create a new notebook
export const createNotebook = async (
  data: NotebookPayload
): Promise<Notebook> => {
  const res = await api.post("/notebooks", data);
  return res.data;
};

// Update a notebook by ID
export const updateNotebook = async (
  id: number,
  data: NotebookPayload
): Promise<Notebook> => {
  const res = await api.put(`/notebooks/${id}`, data);
  return res.data;
};

// Delete a notebook by ID
export const deleteNotebook = async (id: number): Promise<void> => {
  await api.delete(`/notebooks/${id}`);
};
