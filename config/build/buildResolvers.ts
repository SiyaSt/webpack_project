import { Configuration } from "webpack";
import { BuildOptions } from "config/build/types/types";

export function buildResolvers(options: BuildOptions): Configuration["resolve"] {
  return {
    alias: {
      src: options.paths.src
    },
    extensions: [".tsx", ".ts", ".js"]
  };
}