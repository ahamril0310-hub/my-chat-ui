const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.REPO_NAME || "";

module.exports = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath: isProd && repoName ? `/${repoName}` : "",
  assetPrefix: isProd && repoName ? `/${repoName}/` : "",
};
