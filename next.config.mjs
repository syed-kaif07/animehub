/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@consumet/extensions', 'got-scraping'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
