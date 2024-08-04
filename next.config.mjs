/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
        port: '',
        pathname: '/**',
      },
    ],
  },
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
