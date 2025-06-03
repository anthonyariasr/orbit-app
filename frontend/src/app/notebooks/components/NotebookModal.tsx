"use client";

import { useState } from "react";
import { createNotebook } from "@/lib/api/notebook";
import { Notebook, NotebookPayload } from "@/lib/types";
import { defaultNotebookContent }  from "@/lib/defaultNotebook";


interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (newNotebook: Notebook) => void;
}

export default function NotebookModal({ open, onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: NotebookPayload = {
        title,
        content: defaultNotebookContent,
      };

      const newNotebook = await createNotebook(payload);
      onCreated(newNotebook);
      setTitle("");
      setError(null);
      onClose();
    } catch (err) {
      setError("Error creating notebook. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6 text-center">
          Crear nuevo notebook
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-sm text-[#1E1E2F]"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del notebook"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:ring-2 focus:ring-[#39439f]"
            required
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
              {loading ? "Creando..." : "Crear notebook"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
