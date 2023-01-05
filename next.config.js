/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['aitechnolog.com', 'themoviedb.org'],
  },
}

const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    
  },
  reactStrictMode: true,
});

module.exports = nextConfig
