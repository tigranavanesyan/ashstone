import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.codesupply.co',
        pathname: '/endpoint/react/images/**',
      },
    ],
  },
};

export default nextConfig;
