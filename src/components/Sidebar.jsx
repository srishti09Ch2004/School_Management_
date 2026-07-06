import { useState } from "react";

export default function Sidebar({ role = "admin" }) {
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

    teacher: [
      { name: "Dashboard", icon: "dashboard" },
      { name: "Attendance", icon: "calendar_month" },
      { name: "My Classes", icon: "groups" },
      { name: "Homework", icon: "assignment" },
      { name: "Marks", icon: "grading" },
      { name: "Timetable", icon: "schedule" },
      { name: "Profile", icon: "person" },
    ],

    student: [
      { name: "Dashboard", icon: "dashboard" },
      { name: "Attendance", icon: "calendar_month" },
      { name: "Subjects", icon: "menu_book" },
      { name: "Homework", icon: "assignment" },
      { name: "Results", icon: "fact_check" },
      { name: "Fees", icon: "payments" },
      { name: "Timetable", icon: "schedule" },
      { name: "Profile", icon: "person" },
    ],

    parent: [
      { name: "Dashboard", icon: "dashboard" },
      { name: "My Child", icon: "child_care" },
      { name: "Attendance", icon: "calendar_month" },
      { name: "Homework", icon: "assignment" },
      { name: "Results", icon: "fact_check" },
      { name: "Fees", icon: "payments" },
      { name: "Profile", icon: "person" },
    ],

    principal: [
      { name: "Dashboard", icon: "dashboard" },
      { name: "Students", icon: "school" },
      { name: "Teachers", icon: "co_present" },
      { name: "Reports", icon: "analytics" },
      { name: "Analytics", icon: "monitoring" },
      { name: "Settings", icon: "settings" },
    ],
  };

  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="h-20 border-b border-gray-200 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">
          School ERP
        </h2>
      </div>

      {/* Menu */}
      <div className="flex-1 p-5 space-y-2">
        {menus[role]?.map((menu) => (
          <button
            key={menu.name}
            onClick={() => setActive(menu.name)}
            className={`w-full flex items-center gap-5 px-4 py-3 rounded-xl transition-all duration-300 ${
              active === menu.name
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-700 hover:bg-green-50 hover:text-green-600"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {menu.icon}
            </span>

            <span className="font-medium">{menu.name}</span>
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 p-4">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition">
          <span className="material-symbols-outlined">
            logout
          </span>

          Logout
        </button>
      </div>
    </aside>
  );
}