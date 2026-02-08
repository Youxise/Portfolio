/** @type {import('next').NextConfig} */
const nextConfig = {
  // Active l'export statique (nécessaire pour Netlify)
  output: 'export',
  
  // Pour éviter les problèmes de routing sur Netlify
  trailingSlash: true,
  
  // Désactive l'optimisation d'image (Netlify ne supporte pas le serveur d'images Next.js en mode export)
  images: {
    unoptimized: true,
  },
  
  // Si tu utilises App Router (Next.js 13+), désactive ces options
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