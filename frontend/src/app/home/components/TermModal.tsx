"use client";

import { useState } from "react";

interface TermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
}

const TermModal = ({ isOpen, onClose, onSubmit }: TermModalProps) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name: name.trim() });
      setName("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md backdrop-saturate-150 flex items-center justify-center px-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 min-h-[50vh] flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6 text-center">
          Crear nuevo término
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-sm text-[#1E1E2F]"
        >
          <input
            id="term-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Cuatrimestre II - 2025"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:outline-none focus:ring-2 focus:ring-[#39439f] bg-white"
            required
          />

          <div className="flex flex-col gap-2 pt-2 mt-4">
            <button
              type="submit"
              className="bg-[#39439f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2e336d] font-medium"
            >
              Crear
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#39439f] border border-[#39439f] rounded-lg hover:bg-[#f3f4f6] font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TermModal;
