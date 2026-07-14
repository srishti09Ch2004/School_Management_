import { useState } from "react";

import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

import ParentHome from "./ParentHome";
import ParentAttendance from "./ParentAttendance";
import ParentFees from "./ParentFees";
import ParentReportCard from "./ParentReportCard";
import ParentChildProfile from "./ParentChildProfile";

export default function ParentDashboard() {
  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const renderPage = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <ParentHome />;

      case "Child Profile":
        return <ParentChildProfile />;

      case "Attendance":
        return <ParentAttendance />;

      case "Fees":
        return <ParentFees />;

      case "Report Card":
        return <ParentReportCard />;

      default:
        return <ParentHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar
        role="parent"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="flex-1 flex flex-col">

        <Topbar
          role="Parent"
          title={activeMenu}
        />

        <main className="flex-1 p-8 overflow-y-auto">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}