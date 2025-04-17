import { Outlet } from "react-router-dom";
import { useTheme } from "src/hooks/useTheme";
import { classNames } from "src/shared/utils/ClassName";
import { Loader, Sidebar } from "src/components";
import "./Layout.scss";
import { Suspense } from "react";

export const Layout = () => {
  return (
    <div className={classNames(`container`)}>
      <Sidebar />
      <div className="content">
        <Suspense fallback={<Loader type="secondary" />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
