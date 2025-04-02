import { ComponentType } from "react";

export type Color = "primary" | "secondary" | "danger" | "link";
export type Size = "small" | "medium" | "large";
export type Variants = "outlined" | "filled" | "borderless" | "underlined";
export interface Option {
  id: string;
  value: string;
  label: string;
}
export interface NavigationLink {
  to: string;
  icon: ComponentType;
  label: string;
}
