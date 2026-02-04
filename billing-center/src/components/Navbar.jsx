const Navbar = () => {
  return (
    <header className="h-12 w-full border-b-4 border-slate-600 bg-blue-500 flex items-center justify-between px-4 shadow z-10">
      <div className="flex">
        <h1 className="font-semibold text-white p-2">GUIDEWIRE</h1>
        <h1 className="font-semibold text-white p-2">BillingCenter</h1>
      </div>

      <div>
        <p className="font-semibold text-white">Logout</p>
      </div>
    </header>
  );
};

export default Navbar;
