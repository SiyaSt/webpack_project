import { Size, Type } from "src/shared/types/types";
import { ReactNode } from "react";

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  type?: Type;
  size?: Size;
  icon?: ReactNode;
  className?: string;
}
