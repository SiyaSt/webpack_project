import { Option, Size, Color, Variants } from "src/shared/types/types";

export interface SelectProps {
  color?: Color;
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  size?: Size;
  variant?: Variants;
  filterOption?: (option: Option, searchText: string) => boolean;
  onChange: (selectedOptions: Option | Option[] | null) => void;
  value?: Option | Option[] | null;
  className?: string;
}
