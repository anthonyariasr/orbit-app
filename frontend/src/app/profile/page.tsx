"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import EditUserModal from "./components/EditUserModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import api from "@/lib/axios";
import { User } from "@/lib/types";
import TermHeader from "@/shared/TermHeader";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F3F4F6] pb-10">
        <TermHeader title="Perfil del Usuario" />

        <div className="max-w-4xl mx-auto px-6">
          <section className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 mt-6 flex flex-col md:flex-row">
            <div className="basis-full md:basis-1/3 bg-gray-200 h-64 md:h-auto">
              <img
                src="/images/user-info.jpg"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="basis-full md:basis-2/3 p-8">
              {user ? (
                <div className="flex flex-col space-y-6 text-[#1E1E2F]">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">
                      Nombre
                    </h4>
                    <p className="text-lg font-medium">{user.username}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">
                      Correo electrónico
                    </h4>
                    <p className="text-lg font-medium">{user.email}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">
                      Carrera
                    </h4>
                    <p className="text-lg font-medium">{user.career}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">
                      Género
                    </h4>
                    <p className="text-lg font-medium">{user.gender}</p>
                  </div>

                  {user.university && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">
                        Universidad
                      </h4>
                      <p className="text-lg font-medium">{user.university}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic text-center">
                  Cargando datos...
                </p>
              )}

              <div className="flex flex-col sm:flex-row justify-start gap-4 pt-10">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-5 py-2 border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff] text-sm font-medium cursor-pointer"
                >
                  Editar información
                </button>
                {/*<button
                  onClick={() => setShowPasswordModal(true)}
                  className="px-5 py-2 border border-[#39439f] text-[#39439f] rounded-lg hover:bg-[#f0f1ff] text-sm font-medium cursor-pointer"
                >
                  Cambiar contraseña
                </button>*/
                /*This is missing a proper endpoint in order to validate and hash the new password, that's why this will be left for later*/}
              </div>
            </div>
          </section>
        </div>

        {user && (
          <EditUserModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            user={user}
            onUpdate={setUser}
          />
        )}

        <ChangePasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSubmit={(data) => {
            console.log("Enviar nueva contraseña al backend:", data);
          }}
        />
      </main>
    </AuthGuard>
  );
};

export default ProfilePage;
