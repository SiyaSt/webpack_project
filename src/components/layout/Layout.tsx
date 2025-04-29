import { Outlet } from "react-router-dom";
import { Loader, Sidebar } from "src/components";
import "./Layout.scss";
import { Suspense } from "react";

export const Layout = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Suspense fallback={<Loader type="secondary" />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
