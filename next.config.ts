/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["api.ignitedcodeart.com"], 
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", 
        pathname: "/uploads/**", 
      },
      {
        protocol: 'https',
        hostname: 'api.ignitedcodeart.com',
        pathname: '/uploads/**',
      },
    ],
  },
  assetPrefix: '/', 
};



module.exports = nextConfig;
