/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  output: 'standalone',
  distDir: '.next',
  experimental: {
    outputFileTracingExcludes: {
      '*': ['app/(main)/**/*']
    }
  }
};

module.exports = nextConfig; 