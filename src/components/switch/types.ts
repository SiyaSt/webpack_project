import { Size, Color } from "src/shared/types/types";
import React from "react";

export interface SwitchProps {
  color?: Color;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  loading?: boolean;
  label?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  className?: string;
}
