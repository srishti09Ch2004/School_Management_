// import {
//   GraduationCap,
//   Users,
//   CalendarCheck,
//   Trophy,
// } from "lucide-react";

// export default function PrincipalTeachers() {
//   const teachers = [
//     {
//       name: "Priya Sharma",
//       department: "Mathematics",
//       classes: "10-A, 10-B",
//       attendance: "96%",
//       performance: "Excellent",
//     },
//     {
//       name: "Rohit Verma",
//       department: "Science",
//       classes: "9-A, 9-B",
//       attendance: "94%",
//       performance: "Very Good",
//     },
//     {
//       name: "Anjali Singh",
//       department: "English",
//       classes: "8-A, 8-B",
//       attendance: "98%",
//       performance: "Excellent",
//     },
//     {
//       name: "Amit Kumar",
//       department: "Computer",
//       classes: "11-A",
//       attendance: "92%",
//       performance: "Good",
//     },
//     {
//       name: "Neha Gupta",
//       department: "Social Science",
//       classes: "7-A, 7-B",
//       attendance: "95%",
//       performance: "Excellent",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">
//         Teachers Overview
//       </h2>

//       {/* Stats */}
//       <div className="grid md:grid-cols-4 gap-5">
//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Total Teachers
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 20
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
//                 Departments
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 8
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
//                 Attendance
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 95%
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
//                 Top Rating
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 A+
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
//               <Trophy size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Teachers Table */}
//       <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
//         <div className="p-5 border-b border-gray-100 flex justify-between items-center">
//           <h3 className="text-lg font-bold">
//             Teacher Records
//           </h3>

//           <span className="text-sm text-gray-500">
//             Total : 20 Teachers
//           </span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Teacher
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Department
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Classes
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Attendance
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Performance
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {teachers.map((teacher, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-gray-100 hover:bg-gray-50 transition"
//                 >
//                   <td className="py-4 px-5 font-medium">
//                     {teacher.name}
//                   </td>

//                   <td className="py-4 px-5">
//                     {teacher.department}
//                   </td>

//                   <td className="py-4 px-5">
//                     {teacher.classes}
//                   </td>

//                   <td className="py-4 px-5">
//                     <span className="font-semibold text-green-600">
//                       {teacher.attendance}
//                     </span>
//                   </td>

//                   <td className="py-4 px-5">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         teacher.performance === "Excellent"
//                           ? "bg-green-100 text-green-700"
//                           : teacher.performance === "Very Good"
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {teacher.performance}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Bottom Summary */}
//         <div className="grid md:grid-cols-3 gap-4 p-5 bg-gray-50 border-t border-gray-100">
//           <div>
//             <p className="text-xs text-gray-500">
//               Average Attendance
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               95%
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Best Performing Department
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               Mathematics
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Teachers on Leave Today
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               2 Teachers
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }















import { useEffect, useMemo, useState } from "react";
import {
  GraduationCap,
  Users,
  CalendarCheck,
  Trophy,
  RefreshCw,
  Search,
} from "lucide-react";

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin";

export default function PrincipalTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // ---------------------------------------
  // Get teachers from same API as Admin
  // ---------------------------------------
  const fetchTeachers = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(`${API}/teachers.php`);

      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }

      const result = await response.json();

      // Supports common API response structures
      let teacherData = [];

      if (Array.isArray(result)) {
        teacherData = result;
      } else if (Array.isArray(result?.data)) {
        teacherData = result.data;
      } else if (Array.isArray(result?.data?.teachers)) {
        teacherData = result.data.teachers;
      } else if (Array.isArray(result?.teachers)) {
        teacherData = result.teachers;
      }

      setTeachers(teacherData);
    } catch (err) {
      console.error("Principal Teachers Error:", err);
      setError("Unable to load teacher records.");
      setTeachers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchTeachers();

    // Auto refresh every 10 seconds
    const interval = setInterval(() => {
      fetchTeachers();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------
  // Normalize API fields
  // ---------------------------------------
  const normalizedTeachers = useMemo(() => {
    return teachers.map((teacher) => ({
      id: teacher.id,

      name:
        teacher.full_name ||
        teacher.teacher_name ||
        teacher.name ||
        "—",

      email: teacher.email || "—",

      employeeId:
        teacher.employee_id ||
        teacher.employeeId ||
        "—",

      department:
        teacher.department ||
        teacher.subject ||
        "—",

      qualification:
        teacher.qualification ||
        "—",

      designation:
        teacher.designation ||
        "Teacher",

      phone:
        teacher.phone ||
        "—",

      status:
        teacher.status ||
        "Active",

      // These are only used if backend already provides them.
      classes:
        teacher.classes ||
        teacher.assigned_classes ||
        teacher.class_sections ||
        "—",

      attendance:
        teacher.attendance_percentage ??
        teacher.attendance ??
        null,

      performance:
        teacher.performance ||
        null,
    }));
  }, [teachers]);

  // ---------------------------------------
  // Departments from DB
  // ---------------------------------------
  const departments = useMemo(() => {
    const list = normalizedTeachers
      .map((teacher) => teacher.department)
      .filter(
        (department) =>
          department &&
          department !== "—"
      );

    return ["All", ...new Set(list)];
  }, [normalizedTeachers]);

  // ---------------------------------------
  // Search + Department Filter
  // ---------------------------------------
  const filteredTeachers = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return normalizedTeachers.filter((teacher) => {
      const matchesSearch =
        !searchText ||
        teacher.name.toLowerCase().includes(searchText) ||
        teacher.email.toLowerCase().includes(searchText) ||
        teacher.employeeId.toLowerCase().includes(searchText) ||
        teacher.department.toLowerCase().includes(searchText);

      const matchesDepartment =
        departmentFilter === "All" ||
        teacher.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [
    normalizedTeachers,
    search,
    departmentFilter,
  ]);

  // ---------------------------------------
  // Dynamic Stats
  // ---------------------------------------
  const totalTeachers = normalizedTeachers.length;

  const totalDepartments = new Set(
    normalizedTeachers
      .map((teacher) => teacher.department)
      .filter(
        (department) =>
          department && department !== "—"
      )
  ).size;

  // Only calculate attendance if API actually provides it.
  const attendanceValues = normalizedTeachers
    .map((teacher) => {
      const value = parseFloat(teacher.attendance);
      return Number.isFinite(value) ? value : null;
    })
    .filter((value) => value !== null);

  const averageAttendance =
    attendanceValues.length > 0
      ? Math.round(
          attendanceValues.reduce(
            (sum, value) => sum + value,
            0
          ) / attendanceValues.length
        )
      : null;

  // Only use real performance/rating data if backend provides it.
  const performanceValues = normalizedTeachers
    .map((teacher) => teacher.performance)
    .filter(Boolean);

  const topRating =
    performanceValues.length > 0
      ? performanceValues[0]
      : "—";

  // ---------------------------------------
  // Helpers
  // ---------------------------------------
  const getPerformanceClass = (performance) => {
    if (!performance) {
      return "bg-gray-100 text-gray-600";
    }

    const value = performance.toLowerCase();

    if (
      value.includes("excellent") ||
      value.includes("a+")
    ) {
      return "bg-green-100 text-green-700";
    }

    if (
      value.includes("very good") ||
      value.includes("a")
    ) {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Teachers Overview
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Live teacher records from the school database
          </p>
        </div>

        <button
          onClick={() => fetchTeachers(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={
              refreshing ? "animate-spin" : ""
            }
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-5">

        {/* Total Teachers */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Total Teachers
              </p>

              <h3 className="text-xl font-bold mt-2">
                {loading ? "..." : totalTeachers}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Departments
              </p>

              <h3 className="text-xl font-bold mt-2">
                {loading ? "..." : totalDepartments}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Attendance
              </p>

              <h3 className="text-xl font-bold mt-2">
                {loading
                  ? "..."
                  : averageAttendance !== null
                  ? `${averageAttendance}%`
                  : "—"}
              </h3>

              {!loading &&
                averageAttendance === null && (
                  <p className="text-xs text-gray-400 mt-1">
                    No attendance data
                  </p>
                )}
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
          </div>
        </div>

        {/* Top Rating */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Top Rating
              </p>

              <h3 className="text-xl font-bold mt-2">
                {loading ? "..." : topRating}
              </h3>

              {!loading &&
                performanceValues.length === 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    No performance data
                  </p>
                )}
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Trophy size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h3 className="text-lg font-bold">
                Teacher Records
              </h3>

              <span className="text-sm text-gray-500">
                Showing {filteredTeachers.length} of{" "}
                {totalTeachers} Teachers
              </span>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3">

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search teacher..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-full sm:w-64"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(e.target.value)
                }
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
              >
                {departments.map((department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ))}
              </select>

            </div>
          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Teacher
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Employee ID
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Department
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Qualification
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Classes
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Attendance
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Performance
                </th>

              </tr>
            </thead>

            <tbody>

              {/* Loading */}
              {loading && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-10 text-center text-gray-500"
                  >
                    Loading teacher records...
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!loading &&
                filteredTeachers.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-10 text-center text-gray-500"
                    >
                      {search ||
                      departmentFilter !== "All"
                        ? "No teachers found matching your search."
                        : "No teacher records found."}
                    </td>
                  </tr>
                )}

              {/* Teacher Rows */}
              {!loading &&
                filteredTeachers.map(
                  (teacher, index) => (
                    <tr
                      key={
                        teacher.id ??
                        teacher.employeeId ??
                        index
                      }
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >

                      <td className="py-4 px-5">
                        <div>
                          <p className="font-medium text-gray-800">
                            {teacher.name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {teacher.email}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        {teacher.employeeId}
                      </td>

                      <td className="py-4 px-5">
                        {teacher.department}
                      </td>

                      <td className="py-4 px-5">
                        {teacher.qualification}
                      </td>

                      <td className="py-4 px-5">
                        {teacher.classes}
                      </td>

                      <td className="py-4 px-5">
                        {teacher.attendance !== null ? (
                          <span className="font-semibold text-green-600">
                            {teacher.attendance}
                            {String(
                              teacher.attendance
                            ).includes("%")
                              ? ""
                              : "%"}
                          </span>
                        ) : (
                          <span className="text-gray-400">
                            —
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-5">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceClass(
                            teacher.performance
                          )}`}
                        >
                          {teacher.performance || "—"}
                        </span>

                      </td>

                    </tr>
                  )
                )}

            </tbody>
          </table>
        </div>

        {/* Bottom Summary */}
        <div className="grid md:grid-cols-3 gap-4 p-5 bg-gray-50 border-t border-gray-100">

          <div>
            <p className="text-xs text-gray-500">
              Average Attendance
            </p>

            <p className="font-semibold text-sm mt-1">
              {averageAttendance !== null
                ? `${averageAttendance}%`
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Departments
            </p>

            <p className="font-semibold text-sm mt-1">
              {totalDepartments}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Total Teachers
            </p>

            <p className="font-semibold text-sm mt-1">
              {totalTeachers}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

