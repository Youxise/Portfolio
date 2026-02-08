/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove the deprecated appDir option - it's enabled by default in Next.js 14
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
};

module.exports = nextConfig;