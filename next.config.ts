import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dhuidtxkthlvkqyuxbkw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
