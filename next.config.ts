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
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.yourdomain.com', // Uncomment and change if using a custom public domain for R2
      // },
    ],
  },
  serverExternalPackages: ['undici', 'payload'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPayload(nextConfig)
// export default nextConfig;





