/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.html$/,
        use: ['html-loader'],
      }
    );

    return config;
  },
};

module.exports = nextConfig;
