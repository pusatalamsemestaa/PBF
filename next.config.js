/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Tetap simpan ini untuk produk lain
      },
      {
        protocol: "https",
        hostname: "th.bing.com", // Tambahkan domain baru di sini
      },
      {
        protocol: "https",
        hostname: "**.bing.net", // Contoh jika menggunakan domain bing.net
      },
    ],
  },
};

module.exports = nextConfig;