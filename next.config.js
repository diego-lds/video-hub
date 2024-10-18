/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gnayrcyzxnrrcaqjmsky.supabase.co",
        pathname: "/**",
      },
    ],
  },
};
module.exports = nextConfig;
