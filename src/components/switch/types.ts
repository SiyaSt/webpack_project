import { Size, Type } from "src/shared/types/types";
import React from "react";

export interface SwitchProps {
  type?: Type;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  loading?: boolean;
  checkedLabel?: string;
  uncheckedLabel?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  className?: string;
}
