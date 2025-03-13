import { Size, Color, Option } from "src/shared/types/types";

export type Direction = "vertical" | "horizontal";
export interface RadioProps {
  id: string;
  name: string;
  value: string;
  label?: string;
  color?: Color;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: string) => void;
  direction?: Direction;
  className?: string;
}
export interface RadioGroupProps {
  name?: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  color?: Color;
  size?: Size;
  direction?: Direction;
  disabled?: boolean;
  className?: string;
}
