import api from "@/lib/axios";
import { RegisterPayload, LoginPayload } from "@/lib/types";

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/users/register", payload);
  return response.data;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post("/users/login", payload);
  return response.data;
};

export const getMyProfile = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
