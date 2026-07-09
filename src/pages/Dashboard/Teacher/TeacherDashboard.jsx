import { useState } from "react";

import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

import TeacherHome from "./TeacherHome";
import TeacherAttendance from "./TeacherAttendance";
// import TeacherTimetable from "./TeacherTimetable";
// import TeacherHomework from "./TeacherHomework";
// import TeacherMarks from "./TeacherMarks";
// import TeacherNotice from "./TeacherNotice";
// import TeacherProfile from "./TeacherProfile";

export default function TeacherDashboard() {
const [activeMenu, setActiveMenu] =
useState("Dashboard");

const renderPage = () => {
switch (activeMenu) {
case "Dashboard":
return <TeacherHome />;

  case "Attendance":
    return <TeacherAttendance />;

  case "Timetable":
    return <TeacherTimetable />;

  case "Homework":
    return <TeacherHomework />;

  case "Marks":
    return <TeacherMarks />;

  case "Notices":
    return <TeacherNotice />;

  case "Profile":
    return <TeacherProfile />;

  default:
    return <TeacherHome />;
}


};

return ( <div className="flex min-h-screen bg-slate-100"> <Sidebar
     role="teacher"
     activeMenu={activeMenu}
     setActiveMenu={setActiveMenu}
   />


  <div className="flex-1 flex flex-col">
    <Topbar
      role="Teacher"
      title={activeMenu}
    />

    <main className="flex-1 p-8 overflow-y-auto">
      {renderPage()}
    </main>
  </div>
</div>


);
}
