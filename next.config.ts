/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization (for external images)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Turbopack optimizations (faster builds)
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
    typedRoutes: true,
    optimizeCss: true,
  },

  // Vercel/Production optimizations
  output: 'standalone',
  swcMinify: true,
  compress: true,

  // Bundle analyzer (remove in production)
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@/*': path.resolve(__dirname, 'src'),
  //   };
  //   return config;
  // },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

const nextConfigWithPlugins = {
  ...nextConfig,
};

module.exports = nextConfigWithPlugins;
