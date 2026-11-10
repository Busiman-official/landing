import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating "N" badge Next.js overlays in dev mode - harmless (never ships in a production
  // build) but it was being mistaken for a real layout bug during review, so turning it off here.
  devIndicators: false,
  // The old brand-by-brand comparison pages are gone. Send any link to them to the Compare hub.
  async redirects() {
    return [
      { source: "/compare/busiman-vs-:name", destination: "/compare", permanent: true },
      { source: "/alternatives/:path*", destination: "/compare", permanent: true },
    ];
  },
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
