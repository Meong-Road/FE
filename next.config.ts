import type { NextConfig } from "next";

import { PATH } from "@/lib/constants/path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "torip.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },

  // API 프록시 설정
  // HttpOnly 쿠키를 사용하므로 프록시 비활성화
  async rewrites() {
    return [];
  },

  // 루트 경로를 정규 모임 페이지로 리다이렉트
  // async redirects() {
  //   return [
  //     {
  //       source: PATH.HOME,
  //       destination: PATH.REGULAR,
  //       permanent: false, // 307 임시 리다이렉트
  //     },
  //   ];
  // },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
