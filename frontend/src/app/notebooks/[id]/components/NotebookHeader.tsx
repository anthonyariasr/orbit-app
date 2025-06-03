"use client";

import React from "react";

type Props = {
  title: string;
  updatedAt: string;
  editMode: boolean;
  onToggleEdit: () => void;
  onDelete: () => void;
  onDownloadPDF: () => void;
};

export default function NotebookHeader({
  title,
  updatedAt,
  editMode,
  onToggleEdit,
  onDelete,
  onDownloadPDF,
}: Props) {
  return (
    <div className="bg-[#39439f] rounded-xl px-6 py-5 text-white mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onToggleEdit}
            className="text-sm border border-white px-3 py-1 rounded-lg hover:bg-white hover:text-[#39439f] transition"
          >
            {editMode ? "Cancelar" : "Editar"}
          </button>
          <button
            onClick={onDelete}
            className="text-sm border border-red-300 px-3 py-1 rounded-lg hover:bg-red-100 hover:text-red-700 transition text-red-100"
          >
            Eliminar
          </button>
          <button
            onClick={onDownloadPDF}
            className="text-sm border border-white px-3 py-1 rounded-lg hover:bg-white hover:text-[#39439f] transition"
          >
            Descargar PDF
          </button>
        </div>
      </div>

      <p className="text-xs mt-2 text-white/80">{updatedAt}</p>
    </div>
  );
}
