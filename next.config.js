/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/my-chat-ui",     // ← Replace with your repo name
  assetPrefix: "/my-chat-ui/", // ← Same here
};

export default nextConfig;
