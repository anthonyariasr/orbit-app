import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { User, UserPayload } from "@/lib/types";

interface Props {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: User) => void;
}

export default function EditUserModal({ user, isOpen, onClose, onUpdate }: Props) {
  const [form, setForm] = useState<UserPayload>({
    username: user.username,
    email: user.email,
    career: user.career,
    gender: user.gender,
    university: user.university ?? "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
        career: user.career,
        gender: user.gender,
        university: user.university ?? "",
      });
    }
  }, [user]);

  const handleChange = (key: keyof UserPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateUser(user.id, form);
    setLoading(false);

    if (result.success) {
      onUpdate(result.data);
      setError(null);
      onClose();
    } else {
      setError(result.error);
    }
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff]"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#39439f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2e336d] font-medium"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
