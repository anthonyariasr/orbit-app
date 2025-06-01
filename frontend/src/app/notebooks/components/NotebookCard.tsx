"use client";

import { Notebook } from "@/lib/types";
import { useRouter } from "next/navigation";

type Props = {
  notebook: Notebook;
};

export default function NotebookCard({ notebook }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/notebooks/${notebook.id}`)}
      className="p-4 rounded-xl border hover:shadow-md cursor-pointer bg-white dark:bg-zinc-900 transition"
    >
      <h2 className="text-lg font-semibold">{notebook.title}</h2>
      <p className="text-sm text-zinc-500 mt-1">
        Updated: {new Date(notebook.updated_at).toLocaleString()}
      </p>
    </div>
  );
}
