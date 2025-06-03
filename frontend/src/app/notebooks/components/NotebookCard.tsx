"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Notebook } from "@/lib/types";
import { BookOpen } from "lucide-react";

interface Props {
  notebook: Notebook;
}

const NotebookCard = ({ notebook }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/notebooks/${notebook.id}`)}
      className="bg-gradient-to-br from-white to-[#f0f1fa] rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex flex-col aspect-[3/4] w-full min-w-[140px] max-w-[180px] overflow-hidden"
    >
      {/* Parte principal con ícono */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-[#e5e8fc] p-4 rounded-full">
          <BookOpen size={40} className="text-[#39439f]" />
        </div>
      </div>

      {/* Franja inferior con el título */}
      <div className="bg-[#39439f] w-full px-3 py-3 text-center">
        <h3 className="text-sm font-medium text-white line-clamp-2">
          {notebook.title}
        </h3>
      </div>
    </div>
  );
};

export default NotebookCard;
