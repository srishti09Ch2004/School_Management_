
import { useState } from "react";

import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

import AdminHome from "./AdminHome";
import AdminStudent from "./AdminStudent";
import AdminTeacher from "./AdminTeacher";
import AdminParent from "./AdminParent";
import AdminFees from "./AdminFees";
// import AdminExam from "./AdminExam";
// import AdminLibrary from "./AdminLibrary";
// import AdminTransport from "./AdminTransport";
// import AdminReports from "./AdminReports";
// import AdminSettings from "./AdminSettings";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const renderPage = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <AdminHome />;

      case "Students":
        return <AdminStudent />;

      case "Teachers":
        return <AdminTeacher />;

      case "Parents":
        return <AdminParent />;

      case "Fees":
        return <AdminFees />;

      case "Exams":
        return <AdminExam />;

      case "Library":
        return <AdminLibrary />;

      case "Transport":
        return <AdminTransport />;

      case "Reports":
        return <AdminReports />;

      case "Settings":
        return <AdminSettings />;

      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar
        role="admin"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main */}

      <div className="flex-1 flex flex-col">

        <Topbar
          role="Admin"
          title={activeMenu}
        />

        <main className="flex-1 p-8 overflow-y-auto">

          {renderPage()}

        </main>

      </div>

    </div>
  );
}