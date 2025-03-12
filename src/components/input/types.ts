import { Size, Color, Variants } from "src/shared/types/types";
import { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  color?: Color;
  baseSize?: Size;
  variant?: Variants;
  onSearch?: (value: string | number | readonly string[]) => void;
  buttonSearchText?: string;
  icon?: ReactNode;
  loading?: boolean;
  errorText?: string;
}
