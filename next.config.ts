import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  serverExternalPackages: ['undici', 'payload'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPayload(nextConfig)
// export default nextConfig;





