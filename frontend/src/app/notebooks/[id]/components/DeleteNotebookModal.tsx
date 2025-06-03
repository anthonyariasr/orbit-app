"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteNotebookModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-[#39439f] mb-4 text-center">
          Eliminar Notebook
        </h2>
        <p className="text-sm text-zinc-700 mb-6 text-center">
          ¿Estás seguro de que querés eliminar este notebook? Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff] cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-[#39439f] text-white rounded-lg hover:bg-[#41399f] cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
