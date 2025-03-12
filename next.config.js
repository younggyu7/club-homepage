/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                require("postcss-import"),
                require("tailwindcss"),
                require("autoprefixer"),
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;

