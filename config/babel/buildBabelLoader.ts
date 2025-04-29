import { BuildOptions } from "../build/types/types";

export const buildBabelLoader = (options: BuildOptions) => {
  const isDev = options.mode === "development";

  return {
    test: /\.(?:js|mjs|cjs|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        plugins: [isDev && require.resolve("react-refresh/babel")].filter(
          Boolean,
        ),
      },
    },
  };
};
