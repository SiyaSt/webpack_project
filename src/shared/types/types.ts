export type Type = "primary" | "secondary" | "danger" | "link";
export type Size = "small" | "medium" | "large";
export type Variants = "outlined" | "filled" | "borderless" | "underlined";
export type Orientation = "horizontal" | "vertical";
export interface Option {
  value: string;
  label: string;
}
