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
  const [showAttendanceReport, setShowAttendanceReport] = useState(false);
  const [attendanceReports, setAttendanceReports] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [feeReports, setFeeReports] = useState([]);
  const [showFeeReport, setShowFeeReport] = useState(false);
  const [loadingFees, setLoadingFees] = useState(false);
  const [examReports, setExamReports] = useState([]);
const [showExamReport, setShowExamReport] = useState(false);
const [loadingExam, setLoadingExam] = useState(false);
  

useEffect(() => {
  const isAnyReportOpen =
    showStudentReport ||
    showAttendanceReport ||
    showFeeReport ||
    showExamReport;

  if (isAnyReportOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [
  showStudentReport,
  showAttendanceReport,
  showFeeReport,
  showExamReport,
]);
  
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


const fetchAttendanceReport = async () => {
  setLoadingAttendance(true);

  try {
    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/attendancereport.php"
    );

    const data = await response.json();

    if (data.status) {
      setAttendanceReports(data.data);
      setShowAttendanceReport(true);
    } else {
      alert(data.message || "Failed to load attendance report.");
    }
  } catch (error) {
    console.error("Attendance Report Error:", error);
    alert("Unable to load attendance report.");
  } finally {
    setLoadingAttendance(false);
  }
};

const fetchFeeReports = async () => {
  setLoadingFees(true);

  try {
    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/feereport.php"
    );

    const data = await response.json();

    if (data.status) {
      setFeeReports(data.data);
      setShowFeeReport(true);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Fee Report Error:", error);
    alert("Unable to fetch fee report.");
  } finally {
    setLoadingFees(false);
  }
};

const fetchExamReport = async () => {
  setLoadingExam(true);

  try {
    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/examreport.php"
    );

    const data = await response.json();

    if (data.status) {
      setExamReports(data.data);
      setShowExamReport(true);
    } else {
      alert(data.message || "Failed to load exam report.");
    }
  } catch (error) {
    console.error("Exam Report Error:", error);
    alert("Unable to load exam report.");
  } finally {
    setLoadingExam(false);
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

                      if (item.title === "Attendance Report") {
                        fetchAttendanceReport();
                      }

                      if (item.title === "Fee Report") {
                        fetchFeeReports();
                      }

                      if (item.title === "Exam Report") {
                        fetchExamReport();
                      }
                    }}
                    disabled={
                      (item.title === "Student Report" && loadingStudents) ||
                      (item.title === "Attendance Report" && loadingAttendance) ||
                      (item.title === "Fee Report" && loadingFees) ||
                      (item.title === "Exam Report" && loadingExam)
                    }
                    className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition font-medium disabled:opacity-50"
                  >
                    {item.title === "Student Report" && loadingStudents
                      ? "Loading..."
                      : item.title === "Attendance Report" && loadingAttendance
                      ? "Loading..."
                      : item.title === "Fee Report" && loadingFees
                      ? "Loading..."
                      : item.title === "Exam Report" && loadingExam
                      ? "Loading..."
                      : "Generate"}
                  </button>

                  <button
                    onClick={() => {
                      if (item.title === "Student Report") {
                        fetchStudentReport();
                      }

                      if (item.title === "Attendance Report") {
                        fetchAttendanceReport();
                      }

                      if (item.title === "Fee Report") {
                        fetchFeeReports();
                      }

                      if (item.title === "Exam Report") {
                        fetchExamReport();
                      }
                    }}
                    className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                    title={`View ${item.title}`}
                  >
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden">

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

      {showAttendanceReport && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[85vh] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Attendance Report
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Attendance records from the school database.
          </p>
        </div>

        <button
          onClick={() => setShowAttendanceReport(false)}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500">
            Total Records
          </p>

          <h3 className="text-xl font-bold text-gray-800 mt-1">
            {attendanceReports.length}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500">
            Present
          </p>

          <h3 className="text-xl font-bold text-green-600 mt-1">
            {
              attendanceReports.filter(
                (item) => item.status === "Present"
              ).length
            }
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500">
            Absent
          </p>

          <h3 className="text-xl font-bold text-red-600 mt-1">
            {
              attendanceReports.filter(
                (item) => item.status === "Absent"
              ).length
            }
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500">
            Leave
          </p>

          <h3 className="text-xl font-bold text-orange-600 mt-1">
            {
              attendanceReports.filter(
                (item) => item.status === "Leave"
              ).length
            }
          </h3>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[55vh]">

        <table className="min-w-full">

          <thead className="bg-gray-50 sticky top-0">
            <tr className="text-sm text-gray-600">

              <th className="px-5 py-4 text-left">
                Student
              </th>

              <th className="px-5 py-4 text-left">
                Admission No.
              </th>

              <th className="px-5 py-4 text-center">
                Class
              </th>

              <th className="px-5 py-4 text-center">
                Section
              </th>

              <th className="px-5 py-4 text-center">
                Date
              </th>

              <th className="px-5 py-4 text-center">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Attendance Type
              </th>

            </tr>
          </thead>

          <tbody>

            {attendanceReports.length > 0 ? (
              attendanceReports.map((record) => (
                <tr
                  key={record.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-4 font-medium text-gray-800">
                    {record.full_name || "-"}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {record.admission_no || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {record.class || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {record.section || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {record.attendance_date || "-"}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : record.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {record.status || "-"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {record.attendance_type || "-"}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No attendance records found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t flex justify-between items-center">

        <p className="text-sm text-gray-500">
          Total Records:{" "}
          <span className="font-semibold text-gray-800">
            {attendanceReports.length}
          </span>
        </p>

        <button
          onClick={() => setShowAttendanceReport(false)}
          className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
        >
          Close
        </button>

      </div>

    </div>
  </div>
)}

{showFeeReport && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Fee Report
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Student fee payment and pending fee details
          </p>
        </div>

        <button
          onClick={() => setShowFeeReport(false)}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Table */}
      <div className="p-6 overflow-x-auto">
        <table className="min-w-full">

          <thead>
            <tr className="bg-gray-50 text-sm text-gray-600">
              <th className="px-5 py-4 text-left">
                Student
              </th>

              <th className="px-5 py-4 text-right">
                Total Fee
              </th>

              <th className="px-5 py-4 text-right">
                Paid Fee
              </th>

              <th className="px-5 py-4 text-right">
                Due Fee
              </th>

              <th className="px-5 py-4 text-center">
                Payment Date
              </th>

              <th className="px-5 py-4 text-center">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {feeReports.map((fee) => (
              <tr
                key={fee.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      {fee.full_name || "Unknown Student"}
                    </p>

                    <p className="text-xs text-gray-400">
                      ID: {fee.student_id || "-"}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4 text-right text-gray-700">
                  ₹{Number(fee.total_fee).toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4 text-right text-green-600 font-medium">
                  ₹{Number(fee.paid_fee).toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4 text-right text-red-600 font-medium">
                  ₹{Number(fee.due_fee).toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4 text-center text-gray-600">
                  {fee.payment_date}
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      fee.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : fee.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {fee.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {/* No Records */}
        {feeReports.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No fee records found.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
        <button
          onClick={() => setShowFeeReport(false)}
          className="px-5 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

{showExamReport && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">

    <div className="bg-white w-full max-w-7xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Exam Report
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Exam schedule and examination details from the school database.
          </p>
        </div>

        <button
          onClick={() => setShowExamReport(false)}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600"
        >
          ✕
        </button>

      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[65vh]">

        <table className="min-w-full">

          <thead className="bg-gray-50 sticky top-0">
            <tr className="text-xs uppercase text-gray-500">

              <th className="px-5 py-4 text-left">
                Exam Name
              </th>

              <th className="px-5 py-4 text-center">
                Class
              </th>

              <th className="px-5 py-4 text-center">
                Section
              </th>

              <th className="px-5 py-4 text-left">
                Subject
              </th>

              <th className="px-5 py-4 text-center">
                Exam Date
              </th>

              <th className="px-5 py-4 text-center">
                Start Time
              </th>

              <th className="px-5 py-4 text-center">
                End Time
              </th>

              <th className="px-5 py-4 text-center">
                Total Marks
              </th>

              <th className="px-5 py-4 text-center">
                Passing Marks
              </th>

              <th className="px-5 py-4 text-center">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Created At
              </th>

            </tr>
          </thead>

          <tbody>

            {examReports.length > 0 ? (

              examReports.map((exam) => (

                <tr
                  key={exam.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-4 font-medium text-gray-800">
                    {exam.exam_name || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {exam.class || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {exam.section || "-"}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {exam.subject || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {exam.exam_date || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {exam.start_time || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {exam.end_time || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {exam.total_marks || "-"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-600">
                    {exam.passing_marks || "-"}
                  </td>

                  <td className="px-5 py-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exam.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : exam.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : exam.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {exam.status || "-"}
                    </span>

                  </td>

                  <td className="px-5 py-4 text-center text-gray-500 text-sm">
                    {exam.created_at || "-"}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="11"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No exam records found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">

        <p className="text-sm text-gray-500">
          Total Exams:{" "}
          <span className="font-semibold text-gray-800">
            {examReports.length}
          </span>
        </p>

        <button
          onClick={() => setShowExamReport(false)}
          className="px-5 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}