
// import { useEffect, useState } from "react";

// import Sidebar from "../../../components/Sidebar";
// import Topbar from "../../../components/Topbar";

// import ParentHome from "./ParentHome";
// import ParentAttendance from "./ParentAttendance";
// import ParentFees from "./ParentFees";
// import ParentReportCard from "./ParentReportCard";
// import ParentChildProfile from "./ParentChildProfile";

// export default function ParentDashboard() {
//   const [activeMenu, setActiveMenu] = useState("Dashboard");

//   const [parent, setParent] = useState(null);
//   const [student, setStudent] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchParentProfile = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const storedUser = JSON.parse(
//           localStorage.getItem("user")
//         );

//         if (!storedUser || !storedUser.id) {
//           setError("Parent login information not found");
//           return;
//         }

//         const response = await fetch(
//             `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/parent/profile.php?user_id=${storedUser.id}`,
            
//           );

//         if (!response.ok) {
//           throw new Error("Unable to fetch parent profile");
//         }

//         const data = await response.json();

//         console.log(
//           "Parent Profile Response:",
//           JSON.stringify(data, null, 2)
//         );

//         if (!data.status) {
//           setError(
//             data.message || "Unable to fetch parent data"
//           );
//           return;
//         }

//         setParent(data.parent);
//         setStudent(data.student);

//       } catch (error) {
//         console.error("Parent Profile Error:", error);

//         setError("Unable to connect with server");

//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchParentProfile();
//   }, []);

//   const renderPage = () => {

//     if (loading) {
//       return (
//         <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-gray-500">
//           Loading parent information...
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-red-500">
//           {error}
//         </div>
//       );
//     }

//     if (!student) {
//       return (
//         <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-gray-500">
//           No student is associated with this parent.
//         </div>
//       );
//     }

//     switch (activeMenu) {

//       case "Dashboard":
//         return (
//           <ParentHome
//             parent={parent}
//             student={student}
//           />
//         );

//       case "Child Profile":
//         return (
//           <ParentChildProfile
//             parent={parent}
//             student={student}
//           />
//         );

//       case "Attendance":
//         return (
//           <ParentAttendance
//             parent={parent}
//             student={student}
//           />
//         );

//       case "Fees":
//         return (
//           <ParentFees
//             parent={parent}
//             student={student}
//           />
//         );

//       case "Report Card":
//         return (
//           <ParentReportCard
//             parent={parent}
//             student={student}
//           />
//         );

//       default:
//         return (
//           <ParentHome
//             parent={parent}
//             student={student}
//           />
//         );
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-slate-100">

//       <Sidebar
//         role="parent"
//         activeMenu={activeMenu}
//         setActiveMenu={setActiveMenu}
//       />

//       <div className="flex-1 flex flex-col">

//         <Topbar
//           role="Parent"
//           title={activeMenu}
//         />

//         <main className="flex-1 p-8 overflow-y-auto">
//           {renderPage()}
//         </main>

//       </div>

//     </div>
//   );
// }













import { useEffect, useState } from "react";

import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

import ParentHome from "./ParentHome";
import ParentAttendance from "./ParentAttendance";
import ParentFees from "./ParentFees";
import ParentReportCard from "./ParentReportCard";
import ParentChildProfile from "./ParentChildProfile";

export default function ParentDashboard() {

  // Active sidebar menu

  const [activeMenu, setActiveMenu] = useState("Dashboard");

// Parent + Student data

  const [parent, setParent] = useState(null);
  const [student, setStudent] = useState(null);

// Loading + Error

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// Fetch Parent Profile

  useEffect(() => {

    const fetchParentProfile = async () => {

      try {

        setLoading(true);
        setError("");


        // Get logged-in user from localStorage
        const storedUser = JSON.parse(
          localStorage.getItem("user")
        );


        // Check login information
        if (!storedUser || !storedUser.id) {

          setError(
            "Parent login information not found"
          );

          return;
        }

// Parent Profile API

        const response = await fetch(
          `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/parent/profile.php?user_id=${storedUser.id}`
        );


        // Check HTTP response
        if (!response.ok) {

          throw new Error(
            "Unable to fetch parent profile"
          );

        }

        // Convert response to JSON
        const data = await response.json();

        // Debug response
        console.log(
          "Parent Profile Response:",
          JSON.stringify(data, null, 2)
        );

        // Check API status
        if (!data.status) {

          setError(
            data.message ||
            "Unable to fetch parent data"
          );

          return;
        }

// Save Parent + Student data

        setParent(data.parent);
        setStudent(data.student);

      } catch (error) {

        console.error(
          "Parent Profile Error:",
          error
        );

        setError(
          "Unable to connect with server"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchParentProfile();
  }, []);

// Render Active Page

  const renderPage = () => {


    // Loading
    if (loading) {

      return (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-gray-500">
          Loading parent information...
        </div>
      );

    }
    // Error
    if (error) {

      return (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-red-500">
          {error}
        </div>
      );

    }

    // No child found
    if (!student) {

      return (
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-gray-500">
          No student is associated with this parent.
        </div>
      );

    }

// Sidebar Menu Routing

    switch (activeMenu) {

      // Dashboard
      case "Dashboard":

        return (
          <ParentHome
            parent={parent}
            student={student}
          />
        );

      // Child Profile
      case "Child Profile":

        return (
          <ParentChildProfile
            parent={parent}
            student={student}
          />
        );

      // Attendance
      case "Attendance":

        return (
          <ParentAttendance
            parent={parent}
            student={student}
          />
        );

      // Fees
      case "Fees":

        return (
          <ParentFees
            parent={parent}
            student={student}
          />
        );

      // Report Card
      case "Report Card":

        return (
          <ParentReportCard
            parent={parent}
            student={student}
          />
        );

      // Default
      default:

        return (
          <ParentHome
            parent={parent}
            student={student}
          />
        );
    }
  };
// Main UI

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar
        role="parent"
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}

        <Topbar
          role="Parent"
          title={activeMenu}
        />

        {/* Page Content */}

        <main className="flex-1 p-8 overflow-y-auto">

          {renderPage()}
        </main>
      </div>
    </div>
  );
}