// next.config.mjs

import createNextIntlPlugin from 'next-intl/plugin';
import pkg from 'next-videos';

// Create next-intl plugin instance
const withNextIntl = createNextIntlPlugin();

// Define a function to wrap next-videos configuration
const withVideos = (nextConfig = {}) => {
  let videosConfig = {};

  // Check if pkg is a function (this is specific to next-videos, adjust if necessary)
  if (typeof pkg === 'function') {
    videosConfig = pkg(nextConfig);
  } else if (typeof pkg.default === 'function') {
    videosConfig = pkg.default(nextConfig);
  } else {
    throw new Error('Cannot find withVideos function in next-videos module.');
  }

  return {
    ...nextConfig,
    ...videosConfig,
  };
};

// Define the default Next.js configuration object
const nextConfig = {};

// Apply next-intl plugin and next-videos configuration
const finalConfig = withNextIntl(withVideos(nextConfig));

// Export the final configuration
export default finalConfig;
