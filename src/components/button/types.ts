import { Color, Size } from "src/shared/types/types";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type IconPosition = "start" | "end";
export type ButtonVariant = "filled" | "outlined" | "text";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  variant?: ButtonVariant;
}
