import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", 
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true, 
  },
  turbopack: {
    // Without this, Turbopack walks up and finds a lockfile in the user's home
    // directory, then refuses to use it and warns on every build.
    root: import.meta.dirname,
  },
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
