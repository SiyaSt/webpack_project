import { Option, Size, Color, Variants } from "src/shared/types/types";

export interface SelectProps {
  color?: Color;
  options: Option[];
  placeholder?: string;
  size?: Size;
  variant?: Variants;
  filterOption?: (option: Option, searchText: string) => boolean;
  onChange?: (selectedOptions: Option | null) => void;
  value?: Option | null;
  className?: string;
}
