import { Size, Color } from "src/shared/types/types";

export interface LoaderProps {
  type?: Color;
  size?: Size;
  speed?: "slow" | "normal" | "fast";
  variant?: "spinner" | "dots" | "bar";
  label?: string;
  className?: string;
}
