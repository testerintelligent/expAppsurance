import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <aside className="w-64 bg-opacity-90 bg-gray-900 text-white shadow-lg">
        <Sidebar />
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
