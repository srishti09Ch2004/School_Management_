import { useEffect, useState } from "react";

import {
  FileText,
  Users,
  IndianRupee,
  ClipboardCheck,
  GraduationCap,
  Download,
  Eye,
} from "lucide-react";

export default function AdminReports() {
  const [reportStats, setReportStats] = useState({
    students: 0,
    revenue: 0,
    attendance: 0,
    results: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  const [studentReports, setStudentReports] = useState([]);
  const [showStudentReport, setShowStudentReport] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentClass, setStudentClass] = useState("All");
  const [loadingStudents, setLoadingStudents] = useState(false);
  
  // Fetch report statistics
  useEffect(() => {
    const fetchReportStats = async () => {
      try {
        const response = await fetch(
          "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/reportstats.php"
        );

        const data = await response.json();

        if (data.status) {
          setReportStats(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Report Stats Error:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchReportStats();
  }, []);

  const fetchStudentReport = async () => {
  try {
    setLoadingStudents(true);

    const response = await fetch(
        "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/studentreport.php"    );

    const data = await response.json();

    if (data.status) {
      setStudentReports(data.data);
      setShowStudentReport(true);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Student Report Error:", error);
    alert("Unable to load student report.");
  } finally {
    setLoadingStudents(false);
  }
};

const filteredStudentReports = studentReports.filter((student) => {
  const search = studentSearch.toLowerCase();

  const matchesSearch =
    String(student.full_name || "")
      .toLowerCase()
      .includes(search) ||
    String(student.admission_no || "")
      .toLowerCase()
      .includes(search) ||
    String(student.roll_no || "")
      .toLowerCase()
      .includes(search);

  const matchesClass =
    studentClass === "All" ||
    String(student.class) === String(studentClass);

  return matchesSearch && matchesClass;
});

const availableClasses = [
  ...new Set(
    studentReports
      .map((student) => student.class)
      .filter(Boolean)
  ),
];

  // Statistics cards
  const stats = [
    {
      title: "Students",
      value: loadingStats
        ? "..."
        : Number(reportStats.students).toLocaleString(),
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Revenue",
      value: loadingStats
        ? "..."
        : `₹${Number(reportStats.revenue).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Attendance",
      value: loadingStats
        ? "..."
        : `${reportStats.attendance}%`,
      icon: ClipboardCheck,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Results",
      value: loadingStats
        ? "..."
        : `${reportStats.results}%`,
      icon: GraduationCap,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  // Available reports
  const reports = [
    {
      title: "Student Report",
      icon: Users,
      color: "text-blue-600",
      description:
        "Student details and academic performance.",
    },
    {
      title: "Attendance Report",
      icon: ClipboardCheck,
      color: "text-purple-600",
      description:
        "Daily and monthly attendance summary.",
    },
    {
      title: "Fee Report",
      icon: IndianRupee,
      color: "text-green-600",
      description:
        "Fee collection and pending payments.",
    },
    {
      title: "Exam Report",
      icon: GraduationCap,
      color: "text-orange-600",
      description:
        "Exam results and performance analytics.",
    },
  ];

  // Recent reports
  const recentReports = [
    {
      name: "Annual Report.pdf",
      date: "15 Jan 2026",
    },
    {
      name: "Fee Collection.xlsx",
      date: "12 Jan 2026",
    },
    {
      name: "Attendance Report.pdf",
      date: "10 Jan 2026",
    },
  ];

  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reports
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Generate and manage school reports.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition shadow-sm">
          <Download size={16} />
          Export
        </button>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={18} />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-3">
                {item.value}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {item.title}
              </p>

            </div>
          );
        })}

      </div>

      {/* Generate Reports */}
      <div>

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-xl font-bold text-gray-800">
            Generate Reports
          </h2>

          <p className="text-sm text-gray-500">
            4 Reports Available
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          {reports.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >

                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">

                  <Icon
                    size={22}
                    className={item.color}
                  />

                </div>

                <h3 className="font-bold text-lg mt-4 text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {item.description}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => {
                      if (item.title === "Student Report") {
                        fetchStudentReport();
                      }
                    }}
                    className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition font-medium"
                  >
                    {item.title === "Student Report" && loadingStudents
                      ? "Loading..."
                      : "Generate"}
                  </button>

                  <button className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                    <Eye
                      size={18}
                      className="text-gray-600"
                    />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-xl font-bold text-gray-800">
            Recent Reports
          </h2>

          <button className="text-sm text-green-600 font-medium hover:text-green-700">
            View All
          </button>

        </div>

        <div className="space-y-4">

          {recentReports.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

                  <FileText
                    size={18}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <p className="font-medium text-gray-800">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.date}
                  </p>

                </div>

              </div>

              <button className="text-green-600 text-sm font-medium hover:text-green-700">
                Download
              </button>

            </div>
          ))}

        </div>

      </div>

          {showStudentReport && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden">

      {/* Modal Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Student Report
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Complete student information from the school database.
          </p>
        </div>

        <button
          onClick={() => setShowStudentReport(false)}
          className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
        >
          Close
        </button>
      </div>

      {/* Filters */}
      <div className="p-5 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-3">

          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, admission no. or roll no..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Classes</option>

            {availableClasses.map((className) => (
              <option key={className} value={className}>
                Class {className}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Report Count */}
      <div className="px-6 py-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {filteredStudentReports.length}
          </span>{" "}
          students
        </p>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[55vh]">

        <table className="min-w-full">

          <thead className="bg-gray-50 sticky top-0">
            <tr className="text-xs uppercase text-gray-500">

              <th className="px-5 py-4 text-left">
                Admission No.
              </th>

              <th className="px-5 py-4 text-left">
                Student
              </th>

              <th className="px-5 py-4 text-center">
                Class
              </th>

              <th className="px-5 py-4 text-center">
                Section
              </th>

              <th className="px-5 py-4 text-center">
                Roll No.
              </th>

              <th className="px-5 py-4 text-center">
                Gender
              </th>

              <th className="px-5 py-4 text-left">
                Phone
              </th>

              <th className="px-5 py-4 text-center">
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredStudentReports.length > 0 ? (
              filteredStudentReports.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-4 font-medium text-gray-800">
                    {student.admission_no || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-gray-800">
                        {student.full_name || "Unknown Student"}
                      </p>

                      <p className="text-xs text-gray-400">
                        ID: {student.user_id || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {student.class || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {student.section || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {student.roll_no || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {student.gender || "-"}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {student.phone || "-"}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status || "Unknown"}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  </div>
)}

    </div>
  );
}