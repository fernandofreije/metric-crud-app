/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/metrics',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
