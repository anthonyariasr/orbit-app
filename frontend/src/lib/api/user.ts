import api from "@/lib/axios";
import { User, UserPayload } from "@/lib/types";

/**
 * Obtener todos los usuarios (uso administrativo).
 */
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/users/");
  return response.data;
};

/**
 * Obtener un usuario por ID.
 */
export const getUserById = async (userId: number): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

/**
 * Actualizar un usuario existente.
 */
export const updateUser = async (
  userId: number,
  payload: UserPayload
): Promise<User> => {
  const response = await api.put(`/users/${userId}`, payload);
  return response.data;
};

/**
 * Eliminar un usuario por ID.
 */
export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/users/${userId}`);
};

/**
 * Cambiar contraseña de un usuario.
 */
export const changePassword = async (
  userId: number,
  payload: { current_password: string; new_password: string }
): Promise<void> => {
  await api.patch(`/users/${userId}/password`, payload);
};
