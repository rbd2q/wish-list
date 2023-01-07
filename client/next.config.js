/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/auth/register',
        destination: 'http://localhost:8000/api/auth/register',
      },
      {
        source: '/api/auth/login',
        destination: 'http://localhost:8000/api/auth/login',
      },
    ];
  },
};

module.exports = nextConfig;
