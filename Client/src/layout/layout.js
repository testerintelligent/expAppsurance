import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <div className="mainApp">
      <aside className="w-[80px] float-left">
        <Sidebar />
      </aside>

      <main className="pages w-[calc(100%-80px)] float-right min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout