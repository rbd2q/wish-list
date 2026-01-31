/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
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
      {
        source: '/api/users/current',
        destination: 'http://localhost:8000/api/users/current',
      },
      {
        source: '/api/wish',
        destination: 'http://localhost:8000/api/wish',
      },
      {
        source: '/api/wish/ideas',
        destination: 'http://localhost:8000/api/wish/ideas',
      },
      {
        source: '/api/wish/:id',
        destination: 'http://localhost:8000/api/wish/:id',
      },
      {
        source: '/api/wish/create',
        destination: 'http://localhost:8000/api/wish/create',
      },
      {
        source: '/api/analytics',
        destination: 'http://localhost:8000/api/analytics',
      },
    ];
  },
};

module.exports = nextConfig;
