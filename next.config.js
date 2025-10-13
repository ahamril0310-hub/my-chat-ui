/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/my-chat-ui" : "",
  assetPrefix: isProd ? "/my-chat-ui/" : "",
  trailingSlash: true,
};

export default nextConfig;
