"use client";

import { useState, useEffect } from "react";
import Input from "./Input";
import { loginUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Si ya está logueado, redirige fuera del login
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      router.replace("/home"); // o la ruta que uses como dashboard
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Por favor ingresá correo y contraseña.");
      setLoading(false);
      return;
    }

    try {
      const { access_token } = await loginUser({ username, password });

      // ✅ Guardar el token como cookie
      Cookies.set("access_token", access_token, {
        path: "/",
        sameSite: "lax",
        // secure: true, // habilitar si usás HTTPS
      });

      // ✅ Esperá un poco para asegurarte que la cookie esté seteada antes de redirigir
      setTimeout(() => {
        router.push("/home");
      }, 100);

    } catch (err: any) {
      setError(err.response?.data?.detail || "Credenciales inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 w-full text-sm text-[#1E1E2F]"
    >
      <Input
        placeholder="Correo electrónico"
        value={username}
        type="email"
        onChange={setUsername}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={setPassword}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg font-medium transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#39439f] text-white hover:bg-[#2e336d]"
        }`}
      >
        {loading ? "Iniciando..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
