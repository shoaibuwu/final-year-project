/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    domains: ["https://etswvfzahypvypcemsuj.supabase.co"],
  },
};

module.exports = nextConfig;
