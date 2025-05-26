'use client';

import { CalendarPlus } from "lucide-react";

interface EmptyTermViewProps {
  onCreate: () => void;
}

const EmptyTermView = ({ onCreate }: EmptyTermViewProps) => (
  <div className="flex-1 flex flex-col h-full">
    <div className="bg-gradient-to-l from-[#596d93] to-[#39439f] h-20 flex items-center px-8 justify-center lg:justify-start">
      <h2 className="text-center lg:text-left text-2xl font-bold text-white">
        No hay ningún término activo
      </h2>
    </div>
    <div className="flex-1 flex items-center justify-center h-full">
      <div
        onClick={onCreate}
        className="group flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 h-full p-8 rounded-xl text-[#9CA3AF] cursor-pointer hover:border-[#39439f] transition"
      >
        <CalendarPlus
          size={120}
          strokeWidth={1.2}
          className="mx-auto text-gray-400 transition group-hover:text-[#39439f]"
        />
        <p className="mt-6 text-2xl font-semibold text-gray-400 transition group-hover:text-[#39439f]">
          Crear término
        </p>
      </div>
    </div>
  </div>
);

export default EmptyTermView;
