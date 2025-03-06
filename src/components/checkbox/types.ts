import { Size, Color } from "src/shared/types/types";
import { ReactNode } from "react";

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  color?: Color;
  size?: Size;
  icon?: ReactNode;
  className?: string;
}
