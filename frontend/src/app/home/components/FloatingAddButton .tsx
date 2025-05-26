'use client';

import { useState } from "react";
import { Plus, BookOpen, ClipboardList } from "lucide-react";

interface FloatingAddButtonProps {
  onAddCourse: () => void;
  onAddAssignment: () => void;
}

const FloatingAddButton = ({ onAddCourse, onAddAssignment }: FloatingAddButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 flex flex-col items-start space-y-2">
          <button
            onClick={() => {
              setOpen(false);
              onAddCourse();
            }}
            className="flex items-center gap-2 bg-white text-[#39439f] border border-[#39439f] px-4 py-2 rounded-lg shadow hover:bg-[#f0f1ff] text-sm"
          >
            <BookOpen size={16} /> Añadir curso
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onAddAssignment();
            }}
            className="flex items-center gap-2 bg-white text-[#39439f] border border-[#39439f] px-4 py-2 rounded-lg shadow hover:bg-[#f0f1ff] text-sm"
          >
            <ClipboardList size={16} /> Añadir pendiente
          </button>
        </div>
      )}

      <button
        className="bg-[#39439f] text-white w-16 h-16 rounded-full shadow-lg hover:bg-[#2e336d] flex items-center justify-center"
        onClick={() => setOpen(!open)}
        title="Agregar"
      >
        <Plus size={32} />
      </button>
    </div>
  );
};

export default FloatingAddButton;
