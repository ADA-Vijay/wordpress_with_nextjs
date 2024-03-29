/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
  NEXT_PUBLIC_API_URL : "https://nature.alphadigitall.com/graphql"
  },
  images: {
    domains: ["nature.alphadigitall.com"],
  },};

export default nextConfig;
