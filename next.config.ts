/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], 
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "1337", 
      //   pathname: "/uploads/**", 
      // },
      {
        protocol: 'http',
        hostname: '13.201.70.21',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  assetPrefix: '.',
};

module.exports = nextConfig;
