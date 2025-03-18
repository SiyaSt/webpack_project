import { FC, useState } from "react";
import { TabsProps } from "src/components/tabs/types";
import { classNames } from "src/shared/utils/ClassName";
import "./Tabs.scss";

export const Tabs: FC<TabsProps> = ({
  tabs = [],
  position = "top",
  size = "medium",
  color = "primary",
  orientation = "horizontal",
  activeTab = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(activeTab);

  if (tabs.length === 0) {
    return null;
  }

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
        {tabs.map(({ label, icon, disabled }, index) => (
          <button
            key={index}
            className={classNames("tab", {
              active: activeIndex === index,
              disabled: disabled,
            })}
            onClick={() => !disabled && setActiveIndex(index)}
            disabled={disabled}
          >
            <div className="tab-container">
              {icon && <span className="tab-icon">{icon}</span>}
              <span className="tab-lable">{label}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex]?.content}</div>
    </div>
  );
};
