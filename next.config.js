/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/a01bjbmceb/Prods/**',
      },
    ],
  },
}

module.exports = nextConfig