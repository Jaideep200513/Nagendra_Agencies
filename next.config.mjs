/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Guarantees local and static images always load cleanly without sharp binary dependencies
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.imimg.com',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
