function Navbar() {
  const schoolName = "Future Academy";
  const tagline = "School Management System";

  const menus = ["Home", "About", "Contact"];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-4">

          <img
            src="/images/logo6.png"
            alt="Logo"
            className="h-16 w-auto"
          />

          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {schoolName}
            </h1>

            <p className="text-xs font-semibold tracking-[2px] uppercase text-red-600">
              {tagline}
            </p>
          </div>

        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">

          {menus.map((menu, index) => (
            <a
              key={index}
              href="#"
              className="relative font-medium text-gray-700 transition duration-300 hover:text-green-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {menu}
            </a>
          ))}

          <button className="ml-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300">
            Login
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;