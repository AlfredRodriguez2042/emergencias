/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["apod.nasa.gov"],
  },
};

module.exports = nextConfig;
