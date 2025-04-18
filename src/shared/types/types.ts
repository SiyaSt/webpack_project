export type Color = "primary" | "secondary" | "danger" | "link";
export type Size = "small" | "medium" | "large";
export type Variants = "outlined" | "filled" | "borderless" | "underlined";
export type Orientation = "horizontal" | "vertical";
export interface Option {
  value: string;
  label: string;
}
export type ValidationRules = {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string;
  };
};
