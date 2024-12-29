import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["example.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
