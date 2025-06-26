// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['bvbjvcbzprzhalczqhjc.supabase.co'], // ⚠️Supabase domain
  },
};

module.exports = nextConfig;

