import { Size, Type } from "src/shared/types/types";

export type Direction = "vertical" | "horizontal";
export interface RadioProps {
  id: string;
  name: string;
  value: string;
  label?: string;
  type?: Type;
  size?: Size;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: string) => void;
  direction?: Direction;
  className?: string;
}
