import { Orientation, Size, Color } from "src/shared/types/types";
import { ReactNode } from "react";

type TabPosition = "top" | "bottom" | "left" | "right";

export type TabItem = {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

export interface TabsProps {
  tabs: TabItem[];
  position?: TabPosition;
  size?: Size;
  color?: Color;
  orientation?: Orientation;
  activeTab?: number;
}
