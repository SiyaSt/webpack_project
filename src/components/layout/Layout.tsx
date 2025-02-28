import { Outlet } from "react-router-dom";
import { useTheme } from "src/hooks/useTheme";
import { classNames } from "src/shared/utils/ClassName";
import { Sidebar } from "src/components";
import "./Layout.scss";

export const Layout = () => {
  const { theme } = useTheme();
  return (
    <div className={classNames(`container ${theme}`)}>
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
