"use client";

import { useEffect, useState } from "react";
import { getAllNotebooks } from "@/lib/api/notebook";
import { Notebook } from "@/lib/types";
import NotebookList from "./components/NotebookList";
import FloatingNotebookButton from "./components/FloatingNotebookButton";
import NotebookModal from "./components/NotebookModal";
import TermHeader from "@/shared/TermHeader";

export default function NotebooksPage() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const data = await getAllNotebooks();
        setNotebooks(data);
      } catch (error) {
        console.error("Error loading notebooks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotebooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <TermHeader title="Mis apuntes" />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {loading ? (
            <p className="text-center text-sm text-zinc-500">Cargando...</p>
          ) : notebooks.length === 0 ? (
            <p className="text-center text-sm text-zinc-500">
              No hay notebooks todavía. ¡Crea uno!
            </p>
          ) : (
            <NotebookList notebooks={notebooks} />
          )}
        </div>
      </div>

      <FloatingNotebookButton onAddNotebook={() => setShowModal(true)} />

      <NotebookModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreated={(newNotebook) => setNotebooks([newNotebook, ...notebooks])}
      />
    </div>
  );
}
