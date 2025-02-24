import React, { useState } from "react";
import { Orientation, Size, Type } from "src/shared/types/types";
import { classNames } from "src/shared/utils/ClassName";
import "./Tabs.scss";

type TabPosition = "top" | "bottom" | "left" | "right";

type TabItem = {
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  tabs: TabItem[];
  position?: TabPosition;
  size?: Size;
  color?: Type;
  orientation?: Orientation;
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  position = "top",
  size = "medium",
  color = "primary",
  orientation = "horizontal",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className={classNames("tabs-container", `tabs-container--${position}`)}
    >
      <div
        className={classNames(
          "tabs",
          `tabs--${size}`,
          `tabs--${color}`,
          `tabs--${orientation}`,
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={classNames("tab", {
              active: activeIndex === index,
              disabled: tab.disabled,
            })}
            onClick={() => !tab.disabled && setActiveIndex(index)}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex].content}</div>
    </div>
  );
};
