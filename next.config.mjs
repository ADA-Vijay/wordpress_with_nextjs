/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
  NEXT_PUBLIC_API_URL : "https://naturenest.local/graphql"
  }
};

export default nextConfig;
