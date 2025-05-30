// src/app/profile/components/EditUserModal.tsx
"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/types";

interface Props {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: User) => void;
}

export default function EditUserModal({ user, isOpen, onClose, onUpdate }: Props) {
  const [form, setForm] = useState<User>(user);

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleChange = (key: keyof User, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6 text-center">
          Editar información
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#1E1E2F]">
          <input
            type="text"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="Nombre de usuario"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
          />
          <input
            type="text"
            value={form.career}
            onChange={(e) => handleChange("career", e.target.value)}
            placeholder="Carrera"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
          />
          <select
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
          >
            <option value="m">Masculino</option>
            <option value="f">Femenino</option>
            <option value="o">Otro</option>
          </select>
          <input
            type="text"
            value={form.university ?? ""}
            onChange={(e) => handleChange("university", e.target.value)}
            placeholder="Universidad (opcional)"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
          />
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#39439f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2e336d] font-medium"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
