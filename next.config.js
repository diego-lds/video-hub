/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gnayrcyzxnrrcaqjmsky.supabase.co",
        pathname: "/**",
      },

      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
        port: "54321",
      },
    ],
  },
};
module.exports = nextConfig;
