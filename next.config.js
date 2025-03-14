/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '',
  outputFileTracingExcludes: {
    '*': ['app/(main)/**/*']
  }
};

module.exports = nextConfig; 