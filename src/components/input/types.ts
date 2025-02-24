import { Size, Type, Variants } from "src/shared/types/types";
import { ChangeEvent, ReactNode } from "react";

export interface InputProps {
  type?: Type;
  size?: Size;
  variant?: Variants;
  placeholder?: string;
  onSearch?: (value: string) => void;
  multiline?: boolean;
  buttonSearchText?: string;
  icon?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string;
  loading?: boolean;
  className?: string;
}
