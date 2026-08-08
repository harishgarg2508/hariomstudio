/** @type {import('next').NextConfig} */
const nextConfig = {
  
  /* config options here */
  output: 'export',
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during builds
  },
  reactStrictMode: false, // Disables React strict mode to prevent warnings
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // CORRECT LOCATION for trailingSlash
  trailingSlash: true,
};

export default nextConfig;