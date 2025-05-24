'use client';

import { useState } from "react";
import Input from "./Input";
import { loginUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState(""); // puede ser email o username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor ingresá correo y contraseña.");
      return;
    }

    try {
      const data = await loginUser({ username, password });
      localStorage.setItem("token", data.access_token);
      router.push("/"); // redirigí a donde quieras
    } catch (err: any) {
      setError(err.response?.data?.detail || "Credenciales inválidas.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full text-sm text-[#1E1E2F]">
      <Input placeholder="Correo electrónico" value={username} type="email" onChange={setUsername} />
      <Input type="password" placeholder="Contraseña" value={password} onChange={setPassword} />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-[#39439f] text-white py-2 rounded-lg hover:bg-[#2e336d] transition font-medium"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
