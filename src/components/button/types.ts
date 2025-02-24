import { Size, Type } from "src/shared/types/types";
import { ReactNode } from "react";

export type IconPosition = "start" | "end";
export type ButtonVariant = "filled" | "outlined" | "text";

export type ButtonProps = {
  type?: Type;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  variant?: ButtonVariant;
  className?: string;
};
