import { useState } from "react";

import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

import PrincipalHome from "./PrincipalHome";
import PrincipalStudents from "./PrincipalStudents";
import PrincipalTeachers from "./PrincipalTeachers";
import PrincipalAttendance from "./PrincipalAttendance";
import PrincipalExams from "./PrincipalExams";
import PrincipalReports from "./PrincipalReports";
import PrincipalNotice from "./PrincipalNotice";
// import PrincipalProfile from "./PrincipalProfile";

export default function PrincipalDashboard() {
  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const renderPage = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <PrincipalHome />;

      case "Students":
        return <PrincipalStudents />;

      case "Teachers":
        return <PrincipalTeachers />;

      case "Attendance":
        return <PrincipalAttendance />;

      case "Exams":
        return <PrincipalExams />;

      case "Reports":
        return <PrincipalReports />;

      case "Notices":
        return <PrincipalNotice />;

      case "Profile":
        return <PrincipalProfile />;

      default:
        return <PrincipalHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        role="principal"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="flex-1 flex flex-col">
        <Topbar
          role="Principal"
          title={activeMenu}
        />

        <main className="flex-1 p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}