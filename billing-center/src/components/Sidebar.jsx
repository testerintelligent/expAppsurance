import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded transition ${
      isActive ? "bg-blue-500 text-white font-medium" : "text-gray-700"
    }`;

  return (
    <div className="flex flex-row md:flex-col gap-2 w-60 bg-white border-r-8 h-full  overflow-auto pb-2 pt-2">
      <NavLink to="/" end className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/policy" className={linkClass}>
        Policy
      </NavLink>

      <NavLink to="/users" className={linkClass}>
        Users
      </NavLink>
    </div>
  );
};

export default Sidebar;
