import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const fileLoader = {
    test: /\.(png|jpg|gif)$/,
    use:
      [
        {
          loader: "file-loader",
          options: {}
        }
      ]
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };


  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader"
    ]
  };
  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
          }),
          transpileOnly: true
        }
      }
    ],
    exclude: /node_modules/
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };
  return [assetsLoader, scssLoader, tsLoader, fileLoader, svgrLoader];
}