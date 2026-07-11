import { useState } from "react";

import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

import StudentHome from "./StudentHome";
import StudentAttendance from "./StudentAttendance";
import StudentTimetable from "./StudentTimetable";
import StudentHomework from "./StudentHomework";
import StudentResult from "./StudentResult";
import StudentFees from "./StudentFees";
import StudentNotice from "./StudentNotice";


export default function StudentDashboard() {
const [activeMenu, setActiveMenu] =
useState("Dashboard");

const renderPage = () => {
switch (activeMenu) {
case "Dashboard":
return <StudentHome />;


  case "Attendance":
    return <StudentAttendance />;

  case "Timetable":
    return <StudentTimetable />;

  case "Homework":
    return <StudentHomework />;

  case "Results":
    return <StudentResult />;

  case "Fees":
    return <StudentFees />;

  case "Notices":
    return <StudentNotice />;

  case "Profile":
    return <StudentProfile />;

  default:
    return <StudentHome />;
}


};

return ( <div className="flex min-h-screen bg-slate-100"> <Sidebar
     role="student"
     activeMenu={activeMenu}
     setActiveMenu={setActiveMenu}
   />


  <div className="flex-1 flex flex-col">
    <Topbar
      role="Student"
      title={activeMenu}
    />

    <main className="flex-1 p-8 overflow-y-auto">
      {renderPage()}
    </main>
  </div>
</div>


);
}
