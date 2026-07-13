
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Sidebar({
  
//   role = "admin",
//   activeMenu,
//   setActiveMenu,
// }) {
// const menus = {
// admin: [
// { name: "Dashboard", icon: "dashboard" },
// { name: "Students", icon: "school" },
// { name: "Teachers", icon: "co_present" },
// { name: "Parents", icon: "family_restroom" },
// { name: "Attendance", icon: "fact_check" },
// { name: "Fees", icon: "payments" },
// { name: "Exams", icon: "quiz" },
// { name: "Library", icon: "library_books" },
// { name: "Transport", icon: "directions_bus" },
// { name: "Reports", icon: "analytics" },
// { name: "Settings", icon: "settings" },
// ],

// teacher: [
// { name: "Dashboard", icon: "dashboard" },
// { name: "Attendance", icon: "fact_check" },
// { name: "Timetable", icon: "calendar_month" },
// { name: "Homework", icon: "assignment" },
// { name: "Marks", icon: "grading" },
// { name: "Profile", icon: "person" },
// ],

// student: [
// { name: "Dashboard", icon: "dashboard" },
// { name: "Attendance", icon: "fact_check" },
// { name: "Timetable", icon: "calendar_month" },
// { name: "Homework", icon: "assignment" },
// { name: "Results", icon: "workspace_premium" },
// { name: "Fees", icon: "payments" },
// { name: "Profile", icon: "person" },
// ],
// };


//   return (
//     <aside className="w-64 min-h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col">

//       {/* Logo */}

//       <div className="h-20 border-b border-gray-100 flex items-center justify-center gap-3">

//         <img
//           src="/images/logo6.png"
//           alt="logo"
//           className="w-14 h-12"
//         />

//         <h2 className="text-xl font-bold text-red-600">
//           Future Academy
//         </h2>

//       </div>

//       {/* Menu */}

//       <div className="flex-1 p-5 space-y-2">

//         {(menus[role] || []).map((menu) => (

//           <button
//             key={menu.name}
//             onClick={() => setActiveMenu(menu.name)}
//             className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${
//               activeMenu === menu.name
//                 ? "bg-green-600 text-white"
//                 : "hover:bg-green-50 text-gray-700"
//             }`}
//           >

//             <span className="material-symbols-outlined">
//               {menu.icon}
//             </span>

//             {menu.name}

//           </button>

//         ))}

//       </div>

//       {/* Logout */}

//       <div className="border-t border-gray-100 p-4">

//         <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50">

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
import { useNavigate } from "react-router-dom";

export default function Sidebar({
role = "admin",
activeMenu,
setActiveMenu,
}) {
const navigate = useNavigate();

const menus = {
admin: [
{ name: "Dashboard", icon: "dashboard" },
{ name: "Students", icon: "school" },
{ name: "Teachers", icon: "co_present" },
{ name: "Parents", icon: "family_restroom" },
{ name: "Attendance", icon: "fact_check" },
{ name: "Fees", icon: "payments" },
{ name: "Exams", icon: "quiz" },
{ name: "Library", icon: "library_books" },
{ name: "Transport", icon: "directions_bus" },
{ name: "Reports", icon: "analytics" },
{ name: "Settings", icon: "settings" },
],


teacher: [
  { name: "Dashboard", icon: "dashboard" },
  { name: "Attendance", icon: "fact_check" },
  { name: "Timetable", icon: "calendar_month" },
  { name: "Homework", icon: "assignment" },
  { name: "Marks", icon: "grading" },
  { name: "Notices", icon: "campaign" },
  { name: "Profile", icon: "person" },
],

student: [
  { name: "Dashboard", icon: "dashboard" },
  { name: "Attendance", icon: "fact_check" },
  { name: "Timetable", icon: "calendar_month" },
  { name: "Homework", icon: "assignment" },
  { name: "Results", icon: "workspace_premium" },
  { name: "Fees", icon: "payments" },
  { name: "Notices", icon: "campaign" },
],

parent: [
  { name: "Dashboard", icon: "dashboard" },
  { name: "Child Profile", icon: "person" },
  { name: "Attendance", icon: "fact_check" },
  { name: "Fees", icon: "payments" },
  { name: "Report Card", icon: "workspace_premium" },
],


};

return ( <aside className="w-72 min-h-screen bg-white border-r border-gray-200 shadow-xl flex flex-col">


  <div className="h-20 border-b border-gray-100 flex items-center justify-center gap-3">
    <img
      src="/images/logo6.png"
      alt="logo"
      className="w-14 h-12"
    />

    <h2 className="text-xl font-bold text-red-600">
      Future Academy
    </h2>
  </div>

  <div className="flex-1 p-5 space-y-2">

    {(menus[role] || []).map((menu) => (
      <button
        key={menu.name}
        onClick={() => setActiveMenu(menu.name)}
        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
          activeMenu === menu.name
            ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
            : "hover:bg-green-50 hover:translate-x-1 text-gray-700"
        }`}
      >
        <span className="material-symbols-outlined">
          {menu.icon}
        </span>

        {menu.name}
      </button>
    ))}
  </div>

  <div className="border-t border-gray-100 p-4">
    <button
      onClick={() => navigate("/")}
      className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
    >
      <span className="material-symbols-outlined">
        logout
      </span>

      Logout
    </button>
  </div>
</aside>


  );
}
