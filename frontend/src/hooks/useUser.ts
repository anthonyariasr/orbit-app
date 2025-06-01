// src/hooks/useUser.ts
import api from "@/lib/axios";
import { User, UserPayload } from "@/lib/types";

export const useUser = () => {
  const updateUser = async (userId: number, payload: UserPayload) => {
    try {
      const response = await api.put(`/users/${userId}`, payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error("Error al actualizar usuario:", error);
      const message =
        error?.response?.data?.detail || "No se pudo actualizar el usuario.";
      return { success: false, error: message };
    }
  };

  return {
    updateUser,
  };
};
