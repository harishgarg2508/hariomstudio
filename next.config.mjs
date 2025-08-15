/** @type {import('next').NextConfig} */
const nextConfig = {
  
 
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  reactStrictMode: false, 
  webpack: (config) => {
    return config;
  },
  
};

export default nextConfig;


