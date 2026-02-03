import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded transition ${
      isActive ? "bg-slate-600" : "hover:bg-slate-700"
    }`;

  return (
    <div className="p-4 flex flex-row md:flex-col gap-2">
      <NavLink to="/" end className={linkClass}>
        Dashboard
      </NavLink>

      <NavLink to="/users" className={linkClass}>
        Users
      </NavLink>
    </div>
  );
};

export default Sidebar;
