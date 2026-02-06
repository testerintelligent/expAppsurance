import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="h-12 w-full border-b-4 border-slate-600 bg-blue-500 flex items-center justify-between px-4 shadow z-10">
      <div className="flex">
        <h1 className="font-semibold text-white">
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
        <p className="font-semibold text-white">Logout</p>
      </div>
    </header>
  );
};

export default Navbar;
