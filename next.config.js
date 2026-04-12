/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["firebase"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Wajib untuk Google Avatar
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Wajib untuk GitHub Avatar
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com", // Untuk fallback avatar dari inisial nama
      },
    ],
  },
};

module.exports = nextConfig;