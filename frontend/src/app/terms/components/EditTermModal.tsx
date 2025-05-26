"use client";

import { useState } from "react";
import { Term } from "@/lib/types";
import { updateTerm, deleteTerm } from "@/lib/api/term";

interface EditTermModalProps {
  isOpen: boolean;
  term: Term;
  onClose: () => void;
  onUpdated: () => void;
}

const EditTermModal = ({
  isOpen,
  term,
  onClose,
  onUpdated,
}: EditTermModalProps) => {
  const [name, setName] = useState(term.name);
  const [loading, setLoading] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false); // 👈 nuevo estado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await updateTerm(term.id, { name });
      onUpdated();
    } catch (err) {
      console.error("Error actualizando término:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    setLoading(true);
    try {
      await deleteTerm(term.id);
      onUpdated();
    } catch (err) {
      console.error("Error eliminando término:", err);
    } finally {
      setLoading(false);
      setConfirmingDelete(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 lg:py-16 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6 text-center">
          Editar Término
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-sm text-[#1E1E2F]"
        >
          <input
            type="text"
            placeholder="Nombre del término"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
          />

          <div className="flex justify-between gap-2 pt-6">
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              disabled={loading}
              className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
            >
              Eliminar
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#39439f] text-white px-4 py-2 rounded-lg hover:bg-[#2e336d] font-medium"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal visual de confirmación */}
      {confirmingDelete && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-[#1E1E2F] mb-4">
              ¿Estás seguro?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Esta acción eliminará el término y no se puede deshacer.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmingDelete(false)}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirmed}
                disabled={loading}
                className="px-4 py-2 text-sm bg-[#39439f] text-white rounded-lg hover:bg-[#2e336d] hover:cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTermModal;
