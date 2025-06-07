"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getNotebookById,
  updateNotebook,
  deleteNotebook,
} from "@/lib/api/notebook";
import { Notebook, NotebookPayload } from "@/lib/types";
import html2pdf from "html2pdf.js";
import DeleteNotebookModal from "./components/DeleteNotebookModal";
import NotebookHeader from "./components/NotebookHeader";
import NotebookEditor from "./components/NotebookEditor";
import NotebookViewer from "./components/NotebookViewer";
import "@/styles/markdown.css";

export default function NotebookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const articleRef = useRef<HTMLDivElement>(null);

  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (typeof id === "string") {
      getNotebookById(Number(id))
        .then((data) => {
          setNotebook(data);
          setContent(data.content);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async () => {
    if (!notebook) return;
    const payload: NotebookPayload = { title: notebook.title, content };
    const updated = await updateNotebook(notebook.id, payload);
    setNotebook(updated);
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (!notebook) return;
    await deleteNotebook(notebook.id);
    router.push("/notebooks");
  };

  const handleDownloadPDF = () => {
    if (articleRef.current) {
      const element = articleRef.current;

      const pxToIn = (px: number): number => px / 96;

      const width = pxToIn(element.scrollWidth);
      const height = pxToIn(element.scrollHeight);

      html2pdf()
        .set({
          margin: 0,
          filename: `${notebook?.title || "notebook"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: {
            unit: "in",
            format: [width, height],
            orientation: "portrait",
          },
        })
        .from(element)
        .save();
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;
  if (!notebook) return <p className="p-6">Notebook no encontrado.</p>;

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-6 py-8">
      <div className="bg-white rounded-xl shadow-sm pb-4">
        <NotebookHeader
          title={notebook.title}
          updatedAt={`Última edición: ${new Date(
            notebook.updated_at
          ).toLocaleDateString("es-CR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}`}
          editMode={editMode}
          onToggleEdit={() => setEditMode((prev) => !prev)}
          onDelete={() => setShowDeleteModal(true)}
          onDownloadPDF={handleDownloadPDF}
        />

        {editMode ? (
          <NotebookEditor
            content={content}
            onChange={setContent}
            onCancel={() => setEditMode(false)}
            onSave={handleSave}
          />
        ) : (
          <NotebookViewer content={content} articleRef={articleRef} />
        )}
      </div>

      <DeleteNotebookModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
