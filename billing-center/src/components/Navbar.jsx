import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/logout.js";
import NotificationButton from "./NotificationIcon";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // remove token
    navigate("/login"); // redirect to login page
  };
  return (
    <header className="h-14 w-full border-b-1 border-slate-600 bg-color flex items-center justify-between px-4 shadow z-10">
      <div className="flex">
        <h1 className="font-semibold text-white" onClick={() => navigate("/")}>
          Expleosurance BillingCenter
        </h1>
      </div>

      <nav className="flex items-center gap-8 flex-1 text-sm overflow-x-auto ml-16 text-slate-50">
        <NavLink
          to="/policy"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Policy
        </NavLink>
      </nav>
      <div>
        <NotificationButton />
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="text-white font-semibold px-4 py-2 rounded hover:text-red-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
