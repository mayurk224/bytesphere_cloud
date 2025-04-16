import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: 100 * 1024 * 1024, // 100 MB
    },
  },
  images: {
    domains: ["cloud.appwrite.io"],
  },
};

export default nextConfig;
