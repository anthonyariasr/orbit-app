"use client";

import AuthGuard from "@/components/AuthGuard";

const StatisticsPage = () => {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <h1 className="text-2xl font-bold text-[#39439f]">
          Estadísticas Académicas
        </h1>
      </main>
    </AuthGuard>
  );
};

export default StatisticsPage;
