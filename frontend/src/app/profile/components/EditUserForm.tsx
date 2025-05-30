// src/components/profile/EditUserForm.tsx
"use client";

import { useState } from "react";
import api from "@/lib/axios";

interface Props {
  user: { id: number; name: string; email: string } | null;
  onUpdated: (user: any) => void;
}

export default function EditUserForm({ user, onUpdated }: Props) {
  const [form, setForm] = useState({ name: "", email: "" });

  useState(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.put(`/users/${user?.id}`, form);
    onUpdated(res.data);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
      <h3 className="text-xl font-semibold text-[#39439f] mb-4">Editar información</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border rounded-lg border-gray-300"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button
          type="submit"
          className="bg-[#39439f] text-white px-6 py-2 rounded-lg hover:bg-[#2e336d]"
        >
          Guardar cambios
        </button>
      </form>
    </section>
  );
}
