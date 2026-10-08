import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating "N" badge Next.js overlays in dev mode - harmless (never ships in a production
  // build) but it was being mistaken for a real layout bug during review, so turning it off here.
  devIndicators: false,
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
