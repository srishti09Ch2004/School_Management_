import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const schoolName = "Future Academy";
  const tagline = "School Management System";

  const [menuOpen, setMenuOpen] = useState(false);

  const menus = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Modules", path: "/modules" },
    { name: "Demo", path: "/demo" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-100 border-b border-gray-300 shadow-md">
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo6.png"
            alt="Future Academy Logo"
            className="h-10 sm:h-12 md:h-14 w-auto"
          />

          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              {schoolName}
            </h1>

            <p className="text-[10px] sm:text-xs uppercase tracking-[2px] font-semibold text-red-600">
              {tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              to={menu.path}
              className="relative text-gray-700 font-medium transition duration-300 hover:text-green-600
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-green-600 after:transition-all
              after:duration-300 hover:after:w-full"
            >
              {menu.name}
            </Link>
          ))}

          <Link
            to="/login"
            className="rounded-xl bg-gradient-to-r from-green-600 to-green-700
            px-6 py-3 text-white font-semibold shadow-lg
            hover:-translate-y-1 hover:shadow-xl transition duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition"
        >
          {menuOpen ? (
            <X size={30} className="text-gray-800" />
          ) : (
            <Menu size={30} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col py-4">

            {menus.map((menu) => (
              <Link
                key={menu.name}
                to={menu.path}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition"
              >
                {menu.name}
              </Link>
            ))}

            <div className="px-6 pt-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center rounded-xl bg-gradient-to-r
                from-green-600 to-green-700 py-3 text-white
                font-semibold shadow-lg hover:shadow-xl transition"
              >
                Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;