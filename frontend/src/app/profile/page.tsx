"use client";

import AuthGuard from "@/components/AuthGuard";

const ProfilePage = () => {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <h1 className="text-2xl font-bold text-[#39439f]">
          Perfil del Usuario
        </h1>
      </main>
    </AuthGuard>
  );
};

export default ProfilePage;
