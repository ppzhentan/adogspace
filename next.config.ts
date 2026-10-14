import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep `next dev` artifacts separate from production builds. Both modes otherwise
  // share `.next`, so building while a dev server is running can leave mismatched chunks.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
