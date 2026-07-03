
import { Link } from "react-router-dom";

function Navbar() {
  const schoolName = "Future Academy";
  const tagline = "School Management System";

  const menus = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/Pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-100 border-b border-gray-300 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-3 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo6.png"
            alt="Future Academy Logo"
            className="h-14 w-auto"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {schoolName}
            </h1>

            <p className="text-xs uppercase tracking-[2px] font-semibold text-red-600">
              {tagline}
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              to={menu.path}
              className="relative text-gray-700 font-medium transition-colors duration-300 hover:text-green-600
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
              after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {menu.name}
            </Link>
          ))}

          <Link
            to="/login"
            className="ml-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700
            px-6 py-3 font-semibold text-white shadow-lg
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-xl"
          >
            Login
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;