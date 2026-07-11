import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
    <nav className="sticky top-0 z-50 border-b border-gray-300 bg-gray-100 shadow-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo6.png"
            alt="Future Academy Logo"
            className="h-10 w-auto sm:h-12 md:h-14"
          />

          <div>
            <h1 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
              {schoolName}
            </h1>

            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-red-600 sm:text-xs">
              {tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 xl:gap-10 lg:flex">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              end={menu.path === "/"}
              className={({ isActive }) =>
                `relative font-medium transition duration-300
                 after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:bg-green-600
                 after:transition-all after:duration-300
                 ${
                   isActive
                     ? "text-green-600 after:w-full"
                     : "text-gray-700 hover:text-green-600 after:w-0 hover:after:w-full"
                 }`
              }
            >
              {menu.name}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 transition hover:bg-gray-200 lg:hidden"
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
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-gray-200 bg-white shadow-lg">
          <div className="flex flex-col py-4">
            {menus.map((menu) => (
              <NavLink
                key={menu.name}
                to={menu.path}
                end={menu.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-3 font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`
                }
              >
                {menu.name}
              </NavLink>
            ))}

            <div className="px-6 pt-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-gradient-to-r from-green-600 to-green-700 py-3 text-center font-semibold text-white shadow-lg transition hover:shadow-xl"
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