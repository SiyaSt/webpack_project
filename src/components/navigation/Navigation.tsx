import { CustomLink } from "src/components";
import { FC } from "react";
import { classNames } from "src/shared/utils";
import { NAVIGATION_LINKS } from "src/shared/constants";
import "./Navigation.scss";

interface NavigationProps {
  isCollapsed: boolean;
}

export const Navigation: FC<NavigationProps> = ({ isCollapsed }) => {
  const collapsed = isCollapsed ? "collapsed" : "";
  return (
    <div className={classNames("navigation", `navigation--${collapsed}`)}>
      {NAVIGATION_LINKS.map((link, index) => (
        <CustomLink to={link.to} className="link" key={index}>
          <link.icon />
          <span>{link.label}</span>
        </CustomLink>
      ))}
    </div>
  );
};
