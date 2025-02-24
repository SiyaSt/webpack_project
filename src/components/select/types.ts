import { Option, Size, Type, Variants } from "src/shared/types/types";

export interface SelectProps {
  type?: Type;
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  size?: Size;
  variant?: Variants;
  filterOption?: (option: Option, searchText: string) => boolean;
  hideSelectedOptions?: boolean;
  onChange: (selectedOptions: Option | Option[] | null) => void;
  value?: Option | Option[] | null;
  className?: string;
}
