import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@privy-io/react-auth', '@supabase/supabase-js', 'framer-motion'],
    optimizeCss: true,
  },
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Enable SWC minification for faster builds
  swcMinify: true,
};

export default nextConfig;
