"use client";

import AuthGuard from "@/components/AuthGuard";
import DashboardStatistics from "./components/DashboardStatistics"; 
import TermHeader from "@/shared/TermHeader";

const StatisticsPage = () => {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F3F4F6] p-0">
        <TermHeader title="Estadísticas académicas"></TermHeader>
        <DashboardStatistics />
      </main>
    </AuthGuard>
  );
};

export default StatisticsPage;
