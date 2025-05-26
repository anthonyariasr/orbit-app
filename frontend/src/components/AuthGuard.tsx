"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // Mientras se verifica el auth, no renderices nada
  if (isAuthenticated === null) return null;

  return <>{children}</>;
}
