// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // ⛔ No detener el build por errores de ESLint
    ignoreDuringBuilds: true,
  },
  experimental: {
    allowedDevOrigins: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.1.103:3000", // Your network IP
    ],
    // Add other experimental flags here if you have them, e.g.,
    // appDir: true,
  } as any, // This 'as any' is crucial to bypass the TypeScript error
  reactStrictMode: true, // Example of another common config
  // Add other standard Next.js configurations here
};

export default nextConfig;