import { FC, useState } from "react";
import { TabsProps } from "src/components/tabs/types";
import { classNames } from "src/shared/utils/ClassName";
import "./Tabs.scss";

export const Tabs: FC<TabsProps> = ({
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
