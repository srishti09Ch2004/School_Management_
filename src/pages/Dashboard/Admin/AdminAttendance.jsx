
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Search,
  Users,
  GraduationCap,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminAttendance() {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
      const [summary, setSummary] = useState({
    students: {
      present: 0,
      absent: 0,
      leave: 0,
      total: 0,
    },
    teachers: {
      present: 0,
      absent: 0,
      leave: 0,
      total: 0,
    },
  });
    const today = new Date()

    .toISOString()
    .split("T")[0];

  const [selectedDate, setSelectedDate] =
    useState(today);

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("students");

       
const loadAttendance = async () => {
  try {
    setLoading(true);

    const type =
      activeTab === "students"
        ? "students"
        : "teachers";

    const response = await fetch(
      `http://localhost/school_management_system/backend/api/admin/attendance.php?date=${selectedDate}&type=${type}`
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
      "Admin attendance error:",
      error
    );
  } finally {
    setLoading(false);
  }
};

 
  const loadSummary = async () => {
    try {
      const response = await fetch(
        `http://localhost/school_management_system/backend/api/admin/attendance-summary.php?date=${selectedDate}`
      );

      const result = await response.json();

      if (result.status) {
        setSummary({
          students: result.students || {
            present: 0,
            absent: 0,
            leave: 0,
            total: 0,
          },
          teachers: result.teachers || {
            present: 0,
            absent: 0,
            leave: 0,
            total: 0,
          },
        });
      }
    } catch (error) {
      console.error(
        "Attendance summary error:",
        error
      );
    }
  };

  useEffect(() => {
  loadAttendance();
  loadSummary();
}, [selectedDate, activeTab]);

  const data =
    activeTab === "students"
      ? students
      : teachers;


    const filteredData = data.filter((item) =>
    String(item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  
  const getStatus = (item) => {
    if (item.status) {
      return item.status;
    }

    if (item.attendance?.[selectedDate]) {
      return item.attendance[selectedDate];
    }

    return "";
  };

  const totalPresent = data.filter(
    (item) => getStatus(item) === "Present"
  ).length;

  const totalAbsent = data.filter(
    (item) => getStatus(item) === "Absent"
  ).length;

  const totalLeave = data.filter(
    (item) => getStatus(item) === "Leave"
  ).length;

    const presentList = data.filter(
    (item) => getStatus(item) === "Present"
  );

  const absentList = data.filter(
    (item) => getStatus(item) === "Absent"
  );

  const leaveList = data.filter(
    (item) => getStatus(item) === "Leave"
  );
  

    const studentPieData = [
    {
      name: "Present",
      value: summary.students.present,
    },
    {
      name: "Absent",
      value: summary.students.absent,
    },
    {
      name: "Leave",
      value: summary.students.leave,
    },
  ];

  const teacherPieData = [
    {
      name: "Present",
      value: summary.teachers.present,
    },
    {
      name: "Absent",
      value: summary.teachers.absent,
    },
    {
      name: "Leave",
      value: summary.teachers.leave,
    },
  ];

    const PIE_COLORS = [
    "#22c55e",
    "#ef4444",
    "#eab308",
  ];


  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-7">
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Attendance Management
          </h1>

          <p className="text-gray-500 mt-1">
            Date Wise Student &
            Teacher Attendance
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() =>
            setActiveTab(
              "students"
            )
          }
          className={`px-5 py-3 rounded-xl flex items-center gap-2 ${
            activeTab ===
            "students"
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          <GraduationCap
            size={20}
          />
          Students
        </button>

        <button
          onClick={() =>
            setActiveTab(
              "teachers"
            )
          }
          className={`px-5 py-3 rounded-xl flex items-center gap-2 ${
            activeTab ===
            "teachers"
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          <Users size={20} />
          Teachers
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <p className="text-gray-500">
            Present
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {totalPresent}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <p className="text-gray-500">
            Absent
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">
            {totalAbsent}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <p className="text-gray-500">
            Leave
          </p>

          <h2 className="text-2xl font-bold text-yellow-500 mt-2">
            {totalLeave}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-5 rounded-3xl shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder={`Search ${activeTab}`}
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b flex items-center gap-3">
          <CalendarCheck
            className="text-green-600"
            size={22}
          />

          <h2 className="font-semibold text-lg">
            Attendance For{" "}
            {selectedDate}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                {activeTab ===
                  "students" && (
                  <th className="p-4 text-left">
                    Roll No
                  </th>
                )}

                {/* {activeTab ===
                  "teachers" && (
                  <th className="p-4 text-left">
                    Subject
                  </th>
                )} */}

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
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
                  filteredData.map(
                (item) => {
                  const status = getStatus(item);

                  const total = Number(
                    item.total_present ?? 0
                  );

                  return (
                    <tr
                      key={
                        item.id
                      }
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-4">
                        {item.name}
                      </td>

                      {activeTab ===
                        "students" && (
                        <td className="p-4">
                          {
                            item.roll_no
                          }
                        </td>
                      )}

                      {/* {activeTab ===
                        "teachers" && (
                        <td className="p-4">
                          {
                            item.subject
                          }
                        </td>
                      )} */}

                      <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-20 h-10 rounded-xl font-bold ${
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
                        {total}
                      </td>
                    </tr>
                  );
                }
              )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Date Wise Details */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-green-600 mb-4">
            Present (
            {presentList.length})
          </h3>

          <div className="space-y-2">
            {presentList.length ===
            0 ? (
              <p className="text-gray-500">
                No Records
              </p>
            ) : (
              presentList.map(
                (item) => (
                  <p
                    key={
                      item.id
                    }
                  >
                    {" "}
                    {
                      item.name
                    }
                  </p>
                )
              )
            )}
          </div>
        </div>

        

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-red-600 mb-4">
            Absent (
            {absentList.length})
          </h3>

          <div className="space-y-2">
            {absentList.length ===
            0 ? (
              <p className="text-gray-500">
                No Records
              </p>
            ) : (
              absentList.map(
                (item) => (
                  <p
                    key={
                      item.id
                    }
                  >
                    {" "}
                    {
                      item.name
                    }
                  </p>
                )
              )
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-yellow-600 mb-4">
            Leave (
            {leaveList.length})
          </h3>

          <div className="space-y-2">
            {leaveList.length ===
            0 ? (
              <p className="text-gray-500">
                No Records
              </p>
            ) : (
              leaveList.map(
                (item) => (
                  <p
                    key={
                      item.id
                    }
                  >
                    {" "}
                    {
                      item.name
                    }
                  </p>
                )
              )
            )}
          </div>
        </div>
      </div>
            {/* Overall Attendance Charts */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Student Overall Attendance */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="text-lg font-bold mb-2">
            Overall Student Attendance
          </h2>

          <p className="text-gray-500 text-sm mb-4">
            Total Records: {summary.students.total}
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {studentPieData.map((entry, index) => (
                    <Cell
                      key={`student-${index}`}
                      fill={PIE_COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Teacher Overall Attendance */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="text-lg font-bold mb-2">
            Overall Teacher Attendance
          </h2>

          <p className="text-gray-500 text-sm mb-4">
            Total Records: {summary.teachers.total}
          </p>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={teacherPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {teacherPieData.map((entry, index) => (
                    <Cell
                      key={`teacher-${index}`}
                      fill={PIE_COLORS[index]}
                    />
                  ))}
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