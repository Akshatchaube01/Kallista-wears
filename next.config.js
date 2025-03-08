/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {}, // Make sure this is empty
  trailingSlash: false,
  output: "standalone", // Ensures correct file serving on Vercel
};

module.exports = nextConfig;
