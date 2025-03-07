import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Ensure Vercel builds correctly
};

export default nextConfig;
