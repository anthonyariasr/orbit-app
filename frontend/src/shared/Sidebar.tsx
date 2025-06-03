"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import {
  Home,
  CalendarClock,
  BarChart2,
  Settings,
  Orbit,
  LogOut,
  Notebook,
  Timer,
  NotebookIcon,
} from "lucide-react";

const navItems = [
  { name: "Inicio", href: "/home", icon: <Home size={18} /> },
  { name: "Términos", href: "/terms", icon: <CalendarClock size={18} /> },
  { name: "Estadísticas", href: "/stats", icon: <BarChart2 size={18} /> },
  { name: "Apuntes", href: "/notebooks", icon: <NotebookIcon size={18} /> },
  { name: "Pomodoro", href: "/pomodoro", icon: <Timer size={18} /> },
  { name: "Perfil", href: "/profile", icon: <Settings size={18} /> },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("access_token"); // ✅ Elimina la cookie del JWT
    router.push("/login");
  };

  return (
    <nav className="h-full bg-[#F3F4F6] p-6 border-0 flex flex-col justify-between shadow-md">
      <div>
        <div className="flex items-center gap-2 text-2xl font-bold text-[#39439f] mb-8">
          <Orbit size={24} strokeWidth={2} />
          ORBIT
        </div>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                ${
                  pathname === item.href
                    ? "bg-[#E8E9F1] text-[#39439f]"
                    : "text-[#1E1E2F] hover:bg-[#E8E9F1]"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón cerrar sesión */}
      <button
        onClick={handleLogout}
        className="mt-6 flex justify-around gap-2 px-3 py-2 text-sm text-center font-medium cursor-pointer text-[#dc2626] border border-[#dc2626] rounded-lg hover:bg-[#ffe5e5] transition"
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Sidebar;
