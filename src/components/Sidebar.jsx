// import { NavLink } from "react-router-dom";

// export default function Sidebar({ role = "admin" }) {
//   const menus = {
//     admin: [
//       {
//         name: "Dashboard",
//         icon: "dashboard",
//         path: "/admin",
//       },
//       {
//         name: "Students",
//         icon: "school",
//         path: "/admin/students",
//       },
//       {
//         name: "Teachers",
//         icon: "co_present",
//         path: "/admin/teachers",
//       },
//       {
//         name: "Parents",
//         icon: "family_restroom",
//         path: "/admin/parents",
//       },
//       {
//         name: "Fees",
//         icon: "payments",
//         path: "/admin/fees",
//       },
//       {
//         name: "Exams",
//         icon: "fact_check",
//         path: "/admin/exams",
//       },
//       {
//         name: "Library",
//         icon: "library_books",
//         path: "/admin/library",
//       },
//       {
//         name: "Transport",
//         icon: "directions_bus",
//         path: "/admin/transport",
//       },
//       {
//         name: "Reports",
//         icon: "analytics",
//         path: "/admin/reports",
//       },
//       {
//         name: "Settings",
//         icon: "settings",
//         path: "/admin/settings",
//       },
//     ],
//   };

//   return (
//     <aside className="w-60 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">
//       {/* Logo */}

//       <div className="h-20 border-b border-gray-200 flex items-center justify-center gap-3 px-4">
//         <img
//           src="/images/logo6.png"
//           alt="Future Academy"
//           className="w-16 h-16 object-contain"
//         />

//         <h2 className="text-xl font-bold text-red-600">
//           Future Academy
//         </h2>
//       </div>

//       {/* Menu */}

//       <div className="flex-1 p-5 space-y-2">

//         {menus[role]?.map((menu) => (

//           <NavLink
//             key={menu.name}
//             to={menu.path}
//             end={menu.path === "/admin"}
//             className={({ isActive }) =>
//               `w-full flex items-center gap-5 px-4 py-3 rounded-xl transition-all duration-300 ${
//                 isActive
//                   ? "bg-green-600 text-white shadow-md"
//                   : "text-gray-700 hover:bg-green-50 hover:text-green-600"
//               }`
//             }
//           >
//             <span className="material-symbols-outlined text-[22px]">
//               {menu.icon}
//             </span>

//             <span className="font-medium">
//               {menu.name}
//             </span>

//           </NavLink>

//         ))}

//       </div>

//       {/* Logout */}

//       <div className="border-t border-gray-200 p-4">

//         <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition">

//           <span className="material-symbols-outlined">
//             logout
//           </span>

//           Logout

//         </button>

//       </div>

//     </aside>
//   );
// }









import React from "react";

export default function Sidebar({
  role = "admin",
  activeMenu,
  setActiveMenu,
}) {
  const menus = {
    admin: [
      { name: "Dashboard", icon: "dashboard" },
      { name: "Students", icon: "school" },
      { name: "Teachers", icon: "co_present" },
      { name: "Parents", icon: "family_restroom" },
      { name: "Fees", icon: "payments" },
      { name: "Exams", icon: "fact_check" },
      { name: "Library", icon: "library_books" },
      { name: "Transport", icon: "directions_bus" },
      { name: "Reports", icon: "analytics" },
      { name: "Settings", icon: "settings" },
    ],
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col">

      {/* Logo */}

      <div className="h-20 border-b flex items-center justify-center gap-3">

        <img
          src="/images/logo6.png"
          alt="logo"
          className="w-14 h-14"
        />

        <h2 className="text-xl font-bold text-red-600">
          Future Academy
        </h2>

      </div>

      {/* Menu */}

      <div className="flex-1 p-5 space-y-2">

        {menus[role].map((menu) => (

          <button
            key={menu.name}
            onClick={() => setActiveMenu(menu.name)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${
              activeMenu === menu.name
                ? "bg-green-600 text-white"
                : "hover:bg-green-50 text-gray-700"
            }`}
          >

            <span className="material-symbols-outlined">
              {menu.icon}
            </span>

            {menu.name}

          </button>

        ))}

      </div>

      {/* Logout */}

      <div className="border-t p-4">

        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50">

          <span className="material-symbols-outlined">
            logout
          </span>

          Logout

        </button>

      </div>

    </aside>
  );
}