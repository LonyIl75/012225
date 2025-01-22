import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // Ignore les erreurs TypeScript lors du build
  },
  eslint:{
    ignoreDuringBuilds: true, // Ignore les erreurs ESLint lors du build
  }
};

export default nextConfig;
