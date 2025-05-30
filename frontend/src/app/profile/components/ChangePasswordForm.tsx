// src/components/profile/ChangePasswordForm.tsx
"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function ChangePasswordForm() {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.new_password !== form.confirm_password) return;

    await api.post("/auth/change-password", {
      current_password: form.current_password,
      new_password: form.new_password,
    });

    setForm({ current_password: "", new_password: "", confirm_password: "" });
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
      <h3 className="text-xl font-semibold text-[#39439f] mb-4">Cambiar contraseña</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Contraseña actual"
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          value={form.current_password}
          onChange={(e) =>
            setForm({ ...form, current_password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          value={form.new_password}
          onChange={(e) => setForm({ ...form, new_password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          value={form.confirm_password}
          onChange={(e) =>
            setForm({ ...form, confirm_password: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-[#39439f] text-white px-6 py-2 rounded-lg hover:bg-[#2e336d]"
        >
          Cambiar contraseña
        </button>
      </form>
    </section>
  );
}
