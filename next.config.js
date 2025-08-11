/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  output: 'export',
  trailingSlash: true,
  outputFileTracingExcludes: {
    '*': ['node_modules/**/*']
  }
};

module.exports = nextConfig; 