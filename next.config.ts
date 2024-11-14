import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|eot|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[hash][ext][query]",
      },
    });
    return config;
  },
  // Add other Next.js configurations here if needed
};

export default nextConfig;

