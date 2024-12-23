/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during builds
  },
  reactStrictMode: false, // Disables React strict mode to prevent warnings
  webpack: (config) => {
    // Optional: Add custom webpack configuration if needed
    return config;
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;


