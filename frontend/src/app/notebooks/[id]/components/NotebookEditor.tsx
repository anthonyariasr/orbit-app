"use client";

type Props = {
  content: string;
  onChange: (newContent: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function NotebookEditor({ content, onChange, onSave, onCancel }: Props) {
  return (
    <>
      <textarea
        className="w-full h-96 p-4 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-[#39439f] text-[#1E1E2F]"
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-end gap-2 my-4 px-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff]"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="bg-[#39439f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2e336d] font-medium"
        >
          Guardar cambios
        </button>
      </div>
    </>
  );
}
