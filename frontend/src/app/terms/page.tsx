"use client";

import TermHistory from "./components/TermHistory";
import AuthGuard from "@/components/AuthGuard";

const TermPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F3F4F6]">
        <TermHistory />
      </div>
    </AuthGuard>
  );
};

export default TermPage;
