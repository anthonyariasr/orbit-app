"use client";

import { useState } from "react";
import Input from "./Input";
import { registerUser } from "@/lib/api/auth";
import { RegisterPayload } from "@/lib/types";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    career: "",
    gender: "",
    university: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validación de campos requeridos
    if (
      !form.username ||
      !form.email ||
      !form.career ||
      !form.gender ||
      !form.password
    ) {
      setError("Por favor, completá todos los campos obligatorios.");
      setLoading(false);
      return;
    }

    try {
      await registerUser(form as RegisterPayload);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-sm text-[#1E1E2F]">
      <div>
        <Input
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={(v) => handleChange("username", v)}
        />
      </div>

      <div>
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(v) => handleChange("email", v)}
        />
      </div>

      <div>
        <Input
          placeholder="Carrera"
          value={form.career}
          onChange={(v) => handleChange("career", v)}
        />
      </div>

      <div>
        <select
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] bg-white focus:outline-none focus:ring-2 focus:ring-[#39439f]"
        >
          <option value="" disabled hidden>
            Seleccioná tu género
          </option>
          <option value="m">Masculino</option>
          <option value="f">Femenino</option>
          <option value="o">Otro</option>
        </select>
      </div>

      <div>
        <Input
          placeholder="Universidad (Opcional)"
          value={form.university}
          onChange={(v) => handleChange("university", v)}
        />
      </div>

      <div>
        <Input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(v) => handleChange("password", v)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-[#39439f] text-white py-2 rounded-lg hover:bg-[#2e336d] transition font-medium disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;
