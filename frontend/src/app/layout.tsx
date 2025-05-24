'use client';

import React from "react";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/shared/Sidebar";
import MobileNav from "@/shared/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata se ignora aquí al usar 'use client', solo sirve en server components

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNav = pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <div className="flex h-screen overflow-hidden">
          {!hideNav && (
            <aside className="hidden lg:block w-64 border-r border-gray-200">
              <Sidebar />
            </aside>
          )}

          <div className="flex-1 flex flex-col">
            {!hideNav && (
              <header className="block lg:hidden border-b border-gray-200">
                <MobileNav />
              </header>
            )}

            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
