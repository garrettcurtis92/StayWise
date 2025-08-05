/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",    // GitHub
      "lh3.googleusercontent.com"        // Google
    ],
  },
};

module.exports = nextConfig;
