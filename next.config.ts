import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['pickmate-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
}

export default nextConfig
