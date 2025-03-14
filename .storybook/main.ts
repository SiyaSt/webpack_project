import type { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import customWebpackConfig from "../webpack.config";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      fsCache: true,
      lazyCompilation: true,
    },
  },
  webpackFinal: async (config) => {
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;

      if (!test) {
        return false;
      }

      return test.test(".svg");
    }) as { [key: string]: unknown };

    imageRule.exclude = /\.svg$/;

    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ];
    }

    const customConfig = customWebpackConfig({
      mode: "development",
      port: null,
      analyzer: false,
    });
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules || []),
          ...(customConfig.module?.rules || []),
        ],
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...customConfig.resolve?.alias,
        },
      },
    };
  },
};

export default config;
