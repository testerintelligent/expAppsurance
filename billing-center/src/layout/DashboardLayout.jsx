// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// const DashboardLayout = () => {
//   return (
//     <div className="h-screen w-full flex flex-col">
//       {/* Full-width Navbar */}
//       <Navbar />

//       {/* Below Navbar */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside className="hidden md:block w-64 bg-slate-800 text-white">
//           <Sidebar />
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-64 bg-slate-100 border-r-grey-200">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
