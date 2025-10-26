import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/mock-images/**',
      },
      {
        protocol: 'https',
        hostname: 'tunnel-strapi.denis-kim.dev',
        pathname: '/uploads/**',
      },      
    ],
  },
};

export default nextConfig;
