/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
  NEXT_PUBLIC_API_URL : "http://naturenest.local/graphql"
  }
};

export default nextConfig;
