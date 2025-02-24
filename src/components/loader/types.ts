import { Size, Type } from "src/shared/types/types";

export interface LoaderProps {
  type?: Type;
  size?: Size;
  speed?: "slow" | "normal" | "fast";
  variant?: "spinner" | "dots" | "bar";
  className?: string;
}
