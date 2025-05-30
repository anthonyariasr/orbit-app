// src/components/profile/ChangePasswordModal.tsx
"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { current_password: string; new_password: string }) => void;
}

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    onSubmit({
      current_password: form.current_password,
      new_password: form.new_password,
    });

    setForm({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 lg:py-16 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6 text-center">
          Cambiar contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#1E1E2F]">
          <input
            type="password"
            placeholder="Contraseña actual"
            value={form.current_password}
            onChange={(e) => handleChange("current_password", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
          />

          <input
            type="password"
            placeholder="Nueva contraseña"
            value={form.new_password}
            onChange={(e) => handleChange("new_password", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
          />

          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={form.confirm_password}
            onChange={(e) => handleChange("confirm_password", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
