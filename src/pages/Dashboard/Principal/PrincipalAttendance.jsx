// import {
//   CalendarCheck,
//   Users,
//   GraduationCap,
//   TrendingUp,
// } from "lucide-react";

// export default function PrincipalAttendance() {
//   const recentAttendance = [
//     {
//       name: "Class 10-A",
//       attendance: "96%",
//       status: "Excellent",
//     },
//     {
//       name: "Class 10-B",
//       attendance: "94%",
//       status: "Excellent",
//     },
//     {
//       name: "Class 9-A",
//       attendance: "92%",
//       status: "Good",
//     },
//     {
//       name: "Teachers",
//       attendance: "95%",
//       status: "Excellent",
//     },
//     {
//       name: "Staff",
//       attendance: "89%",
//       status: "Average",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">
//         Attendance Overview
//       </h2>

//       {/* Cards */}
//       <div className="grid md:grid-cols-4 gap-5">
//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Student Attendance
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 95%
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
//               <Users size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Teacher Attendance
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 97%
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//               <GraduationCap size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Overall Attendance
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 96%
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
//               <CalendarCheck size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Absent Today
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 12
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
//               <TrendingUp size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Monthly Progress */}
//       <div className="bg-white p-5 rounded-2xl shadow-sm">
//         <h3 className="text-lg font-bold mb-6">
//           Monthly Attendance Progress
//         </h3>

//         <div className="space-y-5">
//           <div>
//             <div className="flex justify-between text-sm mb-2">
//               <span>Students</span>
//               <span>95%</span>
//             </div>

//             <div className="w-full h-2 bg-gray-200 rounded-full">
//               <div className="h-2 w-[95%] bg-green-400 rounded-full"></div>
//             </div>
//           </div>

//           <div>
//             <div className="flex justify-between text-sm mb-2">
//               <span>Teachers</span>
//               <span>97%</span>
//             </div>

//             <div className="w-full h-2 bg-gray-200 rounded-full">
//               <div className="h-2 w-[97%] bg-blue-400 rounded-full"></div>
//             </div>
//           </div>

//           <div>
//             <div className="flex justify-between text-sm mb-2">
//               <span>Staff</span>
//               <span>89%</span>
//             </div>

//             <div className="w-full h-2 bg-gray-200 rounded-full">
//               <div className="h-2 w-[89%] bg-orange-400 rounded-full"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
//         <div className="p-5 border-b border-gray-100">
//           <h3 className="text-lg font-bold">
//             Recent Attendance Records
//           </h3>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Category
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Attendance
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {recentAttendance.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-gray-100 hover:bg-gray-50 transition"
//                 >
//                   <td className="py-4 px-5 font-medium">
//                     {item.name}
//                   </td>

//                   <td className="py-4 px-5 font-semibold text-green-600">
//                     {item.attendance}
//                   </td>

//                   <td className="py-4 px-5">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         item.status === "Excellent"
//                           ? "bg-green-100 text-green-700"
//                           : item.status === "Good"
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="grid md:grid-cols-3 gap-4 p-5 bg-gray-50 border-t border-gray-100">
//           <div>
//             <p className="text-xs text-gray-500">
//               Highest Attendance
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               Class 10-A (96%)
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Lowest Attendance
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               Staff (89%)
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Present Today
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               58 Members
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  Search,
  Users,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_BASE =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin";

const EMPTY_SUMMARY = {
  present: 0,
  absent: 0,
  leave: 0,
  total: 0,
};

export default function PrincipalAttendance() {
  const getLocalDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const today = getLocalDate();

  const [selectedDate, setSelectedDate] = useState(today);
  const [activeTab, setActiveTab] = useState("students");

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [summary, setSummary] = useState({
    students: EMPTY_SUMMARY,
    teachers: EMPTY_SUMMARY,
  });

  const [monthlySummary, setMonthlySummary] = useState({
    students: EMPTY_SUMMARY,
    teachers: EMPTY_SUMMARY,
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const currentData =
    activeTab === "students" ? students : teachers;

  const currentSummary =
    activeTab === "students"
      ? summary.students
      : summary.teachers;

  const currentMonthlySummary =
    activeTab === "students"
      ? monthlySummary.students
      : monthlySummary.teachers;

  /* ----------------------------------
     LOAD DAILY ATTENDANCE
  ---------------------------------- */

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const type =
        activeTab === "students"
          ? "students"
          : "teachers";

      const response = await fetch(
        `${API_BASE}/attendance.php?date=${selectedDate}&type=${type}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!result.status) {
        console.error(result.message);
        return;
      }

      if (type === "students") {
        setStudents(result.data || []);
      } else {
        setTeachers(result.data || []);
      }
    } catch (error) {
      console.error(
        "Principal attendance error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     LOAD DAILY SUMMARY
  ---------------------------------- */

  const loadSummary = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/attendance-summary.php?date=${selectedDate}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (result.status) {
        setSummary({
          students: result.students || EMPTY_SUMMARY,
          teachers: result.teachers || EMPTY_SUMMARY,
        });
      }
    } catch (error) {
      console.error(
        "Principal attendance summary error:",
        error
      );
    }
  };

  /* ----------------------------------
     LOAD MONTHLY SUMMARY
  ---------------------------------- */

  const loadMonthlySummary = async () => {
    try {
      const month = selectedDate.substring(0, 7);

      const response = await fetch(
        `${API_BASE}/attendance-monthly-summary.php?month=${month}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (result.status) {
        setMonthlySummary({
          students:
            result.students || EMPTY_SUMMARY,
          teachers:
            result.teachers || EMPTY_SUMMARY,
        });
      }
    } catch (error) {
      console.error(
        "Monthly attendance error:",
        error
      );
    }
  };

  /* ----------------------------------
     INITIAL + DATE/TAB REFRESH
  ---------------------------------- */

  useEffect(() => {
    loadAttendance();
    loadSummary();
    loadMonthlySummary();

    const interval = setInterval(() => {
      loadAttendance();
      loadSummary();
      loadMonthlySummary();
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedDate, activeTab]);

  /* ----------------------------------
     SEARCH
  ---------------------------------- */

  const filteredData = useMemo(() => {
    return currentData.filter((item) =>
      String(item.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [currentData, search]);

  /* ----------------------------------
     STATUS
  ---------------------------------- */

  const getStatus = (item) => {
    if (item.status) {
      return item.status;
    }

    if (item.attendance?.[selectedDate]) {
      return item.attendance[selectedDate];
    }

    return "";
  };

  /* ----------------------------------
     DAILY LISTS
  ---------------------------------- */

  const presentList = currentData.filter(
    (item) => getStatus(item) === "Present"
  );

  const absentList = currentData.filter(
    (item) => getStatus(item) === "Absent"
  );

  const leaveList = currentData.filter(
    (item) => getStatus(item) === "Leave"
  );

  const notMarkedList = currentData.filter(
    (item) => !getStatus(item)
  );

  /* ----------------------------------
     PIE DATA
  ---------------------------------- */

  const pieData = [
    {
      name: "Present",
      value: currentSummary.present || 0,
    },
    {
      name: "Absent",
      value: currentSummary.absent || 0,
    },
    {
      name: "Leave",
      value: currentSummary.leave || 0,
    },
  ];

  const PIE_COLORS = [
    "#22c55e",
    "#ef4444",
    "#eab308",
  ];

  /* ----------------------------------
     MONTHLY PERCENTAGE
  ---------------------------------- */

  const monthlyPercentage =
    currentMonthlySummary.total > 0
      ? Math.round(
          (currentMonthlySummary.present /
            currentMonthlySummary.total) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance Management
          </h1>

          <p className="text-gray-500 mt-1">
            Live Student & Teacher Attendance
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* TABS */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setActiveTab("students");
            setSearch("");
          }}
          className={`px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-medium ${
            activeTab === "students"
              ? "bg-green-600 text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          <GraduationCap size={18} />
          Students
        </button>

        <button
          onClick={() => {
            setActiveTab("teachers");
            setSearch("");
          }}
          className={`px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-medium ${
            activeTab === "teachers"
              ? "bg-green-600 text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          <Users size={18} />
          Teachers
        </button>
      </div>

      {/* TODAY STATS */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Present Today
              </p>

              <h2 className="text-2xl font-bold text-green-600 mt-2">
                {currentSummary.present}
              </h2>
            </div>

            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 size={19} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Absent Today
              </p>

              <h2 className="text-2xl font-bold text-red-600 mt-2">
                {currentSummary.absent}
              </h2>
            </div>

            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <XCircle size={19} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Leave Today
              </p>

              <h2 className="text-2xl font-bold text-yellow-500 mt-2">
                {currentSummary.leave}
              </h2>
            </div>

            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Clock3 size={19} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Not Marked
              </p>

              <h2 className="text-2xl font-bold text-gray-700 mt-2">
                {notMarkedList.length}
              </h2>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
              <CalendarCheck size={19} />
            </div>
          </div>
        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-5 rounded-3xl shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder={`Search ${
              activeTab === "students"
                ? "students"
                : "teachers"
            }`}
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="p-5 border-b flex items-center gap-3">
          <CalendarCheck
            className="text-green-600"
            size={21}
          />

          <div>
            <h2 className="font-semibold text-lg">
              Attendance For {selectedDate}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Live database records
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm">
                  Name
                </th>

                {activeTab === "students" && (
                  <th className="p-4 text-left text-sm">
                    Roll No
                  </th>
                )}

                <th className="p-4 text-center text-sm">
                  Status
                </th>

                <th className="p-4 text-center text-sm">
                  Total Present
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-500"
                  >
                    Loading attendance...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-500"
                  >
                    No attendance records found
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const status = getStatus(item);

                  return (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium">
                        {item.name}
                      </td>

                      {activeTab === "students" && (
                        <td className="p-4">
                          {item.roll_no || "-"}
                        </td>
                      )}

                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center min-w-[95px] h-9 px-3 rounded-xl text-sm font-semibold ${
                            status === "Present"
                              ? "bg-green-100 text-green-700"
                              : status === "Absent"
                              ? "bg-red-100 text-red-700"
                              : status === "Leave"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {status || "Not Marked"}
                        </span>
                      </td>

                      <td className="p-4 text-center font-bold text-green-600">
                        {Number(
                          item.total_present ?? 0
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* DAILY DETAILS */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-green-600 mb-4">
            Present ({presentList.length})
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {presentList.length === 0 ? (
              <p className="text-sm text-gray-500">
                No Records
              </p>
            ) : (
              presentList.map((item) => (
                <p
                  key={item.id}
                  className="text-sm"
                >
                  {item.name}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-red-600 mb-4">
            Absent ({absentList.length})
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {absentList.length === 0 ? (
              <p className="text-sm text-gray-500">
                No Records
              </p>
            ) : (
              absentList.map((item) => (
                <p
                  key={item.id}
                  className="text-sm"
                >
                  {item.name}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-yellow-600 mb-4">
            Leave ({leaveList.length})
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {leaveList.length === 0 ? (
              <p className="text-sm text-gray-500">
                No Records
              </p>
            ) : (
              leaveList.map((item) => (
                <p
                  key={item.id}
                  className="text-sm"
                >
                  {item.name}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-gray-600 mb-4">
            Not Marked ({notMarkedList.length})
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {notMarkedList.length === 0 ? (
              <p className="text-sm text-gray-500">
                No Records
              </p>
            ) : (
              notMarkedList.map((item) => (
                <p
                  key={item.id}
                  className="text-sm"
                >
                  {item.name}
                </p>
              ))
            )}
          </div>
        </div>

      </div>

      {/* MONTHLY + PIE */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* MONTHLY SUMMARY */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <h2 className="text-lg font-bold">
            Monthly Attendance Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {selectedDate.substring(0, 7)}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="bg-green-50 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">
                Present
              </p>

              <p className="text-2xl font-bold text-green-600 mt-1">
                {currentMonthlySummary.present}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">
                Absent
              </p>

              <p className="text-2xl font-bold text-red-600 mt-1">
                {currentMonthlySummary.absent}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">
                Leave
              </p>

              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {currentMonthlySummary.leave}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">
                Attendance %
              </p>

              <p className="text-2xl font-bold text-gray-800 mt-1">
                {monthlyPercentage}%
              </p>
            </div>

          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">
                Monthly Present Rate
              </span>

              <span className="font-semibold">
                {monthlyPercentage}%
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{
                  width: `${monthlyPercentage}%`,
                }}
              />
            </div>
          </div>

        </div>

        {/* PIE */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">

          <h2 className="text-lg font-bold">
            Today's Attendance
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {activeTab === "students"
              ? "Student"
              : "Teacher"}{" "}
            attendance distribution
          </p>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {pieData.map(
                    (entry, index) => (
                      <Cell
                        key={`pie-${index}`}
                        fill={
                          PIE_COLORS[index]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}



