import { FC, useEffect, useState } from "react";
import { useTheme } from "src/hooks/useTheme";
import LeftArrow from "src/shared/assets/left-arrow.svg";
import RightArrow from "src/shared/assets/right-arrow.svg";
import Moon from "src/shared/assets/moon-stars.svg";
import Sun from "src/shared/assets/sun.svg";
import { classNames } from "src/shared/utils/ClassName";
import { Button, Navigation } from "src/components";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import "./Sidebar.scss";

export const Sidebar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);
  const arrowIcon = isCollapsed ? <RightArrow /> : <LeftArrow />;
  const themeIcon = theme === "light" ? <Moon /> : <Sun />;
  return (
    <div
      className={classNames(
        `sidebar ${isCollapsed ? "collapsed" : ""} ${theme}`,
      )}
    >
      <div className="sidebar--header">
        <h2 className="sidebar-title">App</h2>
        <Button
          className="collapse-button"
          onClick={toggleCollapse}
          icon={arrowIcon}
          size="small"
        />
      </div>
      <div className="sidebar--content">
        <Navigation isCollapsed={isCollapsed} />
      </div>
      <div className="sidebar--footer">
        <Button
          className="theme-button"
          onClick={toggleTheme}
          size="small"
          icon={themeIcon}
        >
          <span className="sidebar-mode">
            {theme === "light" ? "Dark" : "Light"} Mode
          </span>
        </Button>
      </div>
    </div>
  );
};
