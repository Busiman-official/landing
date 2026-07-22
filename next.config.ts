import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mangen1.com",
      },
    ],
  },
};

export default nextConfig;
