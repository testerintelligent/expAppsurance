const Navbar = () => {
  return (
    <header className="h-12 w-full bg-amber-200 flex items-center justify-between px-4 shadow z-10">
      <div className="flex">
        <h1 className="font-semibold text-gray-500 p-2">GUIDEWIRE</h1>
        <h1 className="font-semibold text-blue-500 p-2">BillingCenter</h1>
      </div>

      <div>
        <p className="font-semibold text-blue-500">Logout</p>
      </div>
    </header>
  );
};

export default Navbar;
