import Home from "src/shared/assets/home.svg";
import { CustomLink } from "src/components";
import About from "src/shared/assets/about.svg";
import "./Navigation.scss";
import { FC } from "react";
import { classNames } from "src/shared/utils/ClassName";

interface NavigationProps {
  isCollapsed: boolean;
}

export const Navigation: FC<NavigationProps> = ({ isCollapsed }) => {
  const collapsed = isCollapsed ? "collapsed" : "";
  return (
    <div className={classNames("navigation", `navigation--${collapsed}`)}>
      <CustomLink to="/" className="link">
        <Home />
        <span>Home</span>
      </CustomLink>

      <CustomLink to="/about" className="link">
        <About />
        <span>About</span>
      </CustomLink>
    </div>
  );
};
