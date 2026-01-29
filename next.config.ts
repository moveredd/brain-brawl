import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * @type {boolean | 'error'}
   * If true, Next.js will show an error if you try to use the pages directory
   * when the app directory is detected.
   */
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
