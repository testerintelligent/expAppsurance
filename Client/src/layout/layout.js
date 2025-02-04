import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;