"use client";

import { useEffect, useState } from "react";
import { getAllNotebooks } from "@/lib/api/notebook";
import { Notebook } from "@/lib/types";
import NotebookList from "./components/NotebookList";

export default function NotebooksPage() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Notebooks</h1>

      {loading ? (
        <p>Loading...</p>
      ) : notebooks.length === 0 ? (
        <p>No notebooks yet. Create one!</p>
      ) : (
        <NotebookList notebooks={notebooks} />
      )}
    </div>
  );
}
