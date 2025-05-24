"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarClock,
  BarChart2,
  Settings,
  Orbit,
  LogOut
} from "lucide-react";

const navItems = [
  { name: "Inicio", href: "/", icon: <Home size={18} /> },
  { name: "Términos", href: "/terms", icon: <CalendarClock size={18} /> },
  { name: "Estadísticas", href: "/stats", icon: <BarChart2 size={18} /> },
  { name: "Perfil", href: "/profile", icon: <Settings size={18} /> },
];

const MobileNav = () => {
  const router = useRouter(); 
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/login");

    setOpen(false);
  };

  return (
    <div className="relative bg-[#F3F4F6] px-4 py-3 flex items-center justify-between border-b border-[#E0E0E5]">
      <div className="flex items-center gap-2 text-xl font-bold text-[#39439f]">
        <Orbit size={20} strokeWidth={2} />
        ORBIT
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl focus:outline-none text-[#39439f]"
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-[#F3F4F6] shadow-md z-50 border-t border-[#E0E0E5]">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm transition
                    ${pathname === item.href
                      ? "bg-[#E8E9F1] text-[#39439f]"
                      : "text-[#1E1E2F] hover:bg-[#E8E9F1]"}`
                  }
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón cerrar sesión */}
          <div className="px-4 py-2 border-t border-[#E0E0E5]">
            <button
              onClick={handleLogout}
              className="w-full flex justify-center items-center gap-2 px-3 py-2 text-sm text-center font-medium cursor-pointer text-[#dc2626] border border-[#dc2626] rounded-lg hover:bg-[#ffe5e5] transition"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
