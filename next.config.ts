import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React의 Strict Mode 활성화
  swcMinify: true, // SWC를 사용한 코드 최소화 활성화

  images: {
    domains: ["example.com"], // 외부 이미지 도메인 허용
  },
  compiler: {
    styledComponents: true, // Styled-Components 최적화 활성화
  },
};

export default nextConfig;
