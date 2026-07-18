import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserPlus,
  Pencil,
  Trash2,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

// ---------- Generate a larger dataset (50 students) for real pagination ----------
const generateStudents = () => {
  const firstNames = ["Rahul", "Priya", "Ankit", "Neha", "Aman", "Kavya", "Arjun", "Sara", "Vikram", "Ananya", "Rohit", "Meera", "Karan", "Pooja", "Ajay"];
  const lastNames = ["Sharma", "Singh", "Verma", "Gupta", "Yadav", "Nair", "Reddy", "Khan", "Patel", "Iyer", "Mehta", "Joshi", "Malhotra", "Kumar"];
  const classes = ["10-A", "9-B", "8-C", "7-A", "6-B", "5-A", "4-C"];
  const genders = ["Male", "Female"];
  const statuses = ["Active", "Pending", "Inactive"];
  const fatherNames = ["Rajesh", "Arvind", "Manoj", "Amit", "Suresh", "Vikram", "Ranjit", "Imran", "Dinesh", "Krishnan", "Ashok", "Sanjay", "Deepak"];
  const motherNames = ["Indu", "Suman", "Kiran", "Sunita", "Meena", "Anita", "Rekha", "Sara", "Pooja", "Geeta", "Priya", "Neha", "Ritu"];
  const occupations = ["Engineer", "Doctor", "Businessman", "Professor", "Nurse", "Architect", "Software Engineer", "Lawyer", "Farmer", "Banker", "CA", "Journalist", "Teacher", "Hotelier"];

  const students = [];
  const startDate = new Date(2023, 0, 1); 
  const endDate = new Date(2026, 5, 30); 

  for (let i = 1; i <= 50; i++) {
    const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
    const cls = classes[i % classes.length];
    const roll = String(100 + i);
    const gender = genders[i % 2];
    const status = statuses[i % 3];
    const father = `Mr. ${fatherNames[i % fatherNames.length]} ${lastNames[i % lastNames.length]}`;
    const mother = `Mrs. ${motherNames[i % motherNames.length]} ${lastNames[i % lastNames.length]}`;
    const fatherOcc = occupations[i % occupations.length];
    const motherOcc = occupations[(i + 3) % occupations.length];

    // Random date between startDate and endDate
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    const joiningDate = randomDate.toISOString().slice(0, 10);

    students.push({
      id: i,
      name,
      class: cls,
      roll,
      gender,
      status,
      joiningDate,
      parents: {
        fatherName: father,
        fatherOccupation: fatherOcc,
        motherName: mother,
        motherOccupation: motherOcc,
      },
    });
  }
  return students;
};

const ALL_STUDENTS = generateStudents();

export default function AdminStudent() {
  // ---------- State ----------
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedStudent, setSelectedStudent] = useState(null);

  // ---------- Derived data: filtered students ----------
  const filteredStudents = useMemo(() => {
    let result = ALL_STUDENTS;

    // Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.roll.toLowerCase().includes(query)
      );
    }

    // Year filter (based on joiningDate)
    if (selectedYear !== "All") {
      result = result.filter((s) => {
        const year = s.joiningDate.slice(0, 4);
        return year === selectedYear;
      });
    }

    // Month filter (based on joiningDate)
    if (selectedMonth !== "All") {
      result = result.filter((s) => {
        const month = s.joiningDate.slice(5, 7); // MM
        return month === selectedMonth;
      });
    }

    return result;
  }, [searchQuery, selectedYear, selectedMonth]);

  // ---------- Pagination ----------
  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredStudents.slice(startIndex, endIndex);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedMonth]);

  // ---------- Handlers ----------
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ---------- Generate page numbers with ellipsis ----------
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first, last, current and neighbours
      const left = Math.max(2, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);
      pages.push(1);
      if (left > 2) pages.push("...");
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  // ---------- Stats (computed from actual data) ----------
  const totalStudents = ALL_STUDENTS.length;
  const activeStudents = ALL_STUDENTS.filter(s => s.status === "Active").length;
  const newAdmissions = ALL_STUDENTS.filter(s => {
    const now = new Date();
    const join = new Date(s.joiningDate);
    return join.getMonth() === now.getMonth() && join.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    { title: "Total Students", value: totalStudents.toLocaleString(), icon: <Users size={18} />, color: "bg-blue-100 text-blue-600" },
    { title: "Active Students", value: activeStudents.toLocaleString(), icon: <UserCheck size={18} />, color: "bg-green-100 text-green-600" },
    { title: "New Admissions", value: newAdmissions.toLocaleString(), icon: <UserPlus size={18} />, color: "bg-orange-100 text-orange-600" },
  ];

  // ---------- Options for filters ----------
  const years = ["All", ...new Set(ALL_STUDENTS.map(s => s.joiningDate.slice(0, 4)))].sort();
  const months = [
    "All", "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];

  return (
    <div className="space-y-7 max-w-[1600px] mx-auto p-1">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all institutional student metrics seamlessly.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 transition shadow-sm font-medium text-sm w-full sm:w-auto justify-center">
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((item) => (
          <div key={item.title} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-sm font-medium text-gray-400">{item.title}</p>
              <h2 className="text-xl font-bold text-gray-800 mt-1">{item.value}</h2>
            </div>
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.color}`}>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student by name or roll no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl py-2.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500 text-sm transition"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-2xl px-3 py-2 bg-gray-50/50 w-full sm:w-auto">
            <Calendar size={16} className="text-gray-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 font-medium cursor-pointer w-full"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "All" ? "All Sessions" : `Session: ${year}`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-2xl px-3 py-2 bg-gray-50/50 w-full sm:w-auto">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 font-medium cursor-pointer w-full"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month === "All" ? "All Months" : new Date(2000, parseInt(month) - 1).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Student Profiles</h2>
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
            Active Batch Count: {filteredStudents.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Class</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Roll No.</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Admission Date</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400 text-sm">
                    No students found matching the filters.
                  </td>
                </tr>
              ) : (
                currentItems.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/80 transition">
                    <td className="px-6 py-4.5 font-semibold text-gray-800">{student.name}</td>
                    <td className="text-center text-gray-600 text-sm">{student.class}</td>
                    <td className="text-center text-gray-600 text-sm">{student.roll}</td>
                    <td className="text-center text-gray-600 text-sm">{student.gender}</td>
                    <td className="text-center text-gray-500 text-sm">{student.joiningDate}</td>
                    <td className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === "Active" ? "bg-green-50 text-green-700" :
                        student.status === "Pending" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="w-8 h-8 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition"
                          title="View Detailed Info"
                        >
                          <Eye size={15} />
                        </button>
                        <button className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition" title="Modify Record">
                          <Pencil size={15} />
                        </button>
                        <button className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition" title="Delete Record">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 border-t border-gray-100 bg-gray-50/30 gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Showing <span className="font-medium text-gray-700">{totalItems === 0 ? 0 : startIndex + 1}</span> to{" "}
            <span className="font-medium text-gray-700">{endIndex}</span> of{" "}
            <span className="font-medium text-gray-700">{totalItems}</span> profiles
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 0}
              className={`p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ChevronLeft size={16} />
            </button>

            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-xl border border-gray-100 transition-all scale-100 duration-200">
            <div className="p-6 bg-gradient-to-r from-green-50/70 to-transparent flex justify-between items-center border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h3>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">Grade Level: {selectedStudent.class} • Register No: {selectedStudent.roll}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-xl hover:bg-gray-200/80 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4 bg-gray-50/80 p-4 rounded-2xl text-sm">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Gender Info</span>
                  <span className="font-semibold text-gray-700">{selectedStudent.gender}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-medium">Admission Verified On</span>
                  <span className="font-semibold text-gray-700">{selectedStudent.joiningDate}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Family Profile Architecture</h4>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center border-b border-gray-100/70 pb-3">
                    <div>
                      <span className="text-xs text-gray-400 block">Father's Full Name</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedStudent.parents.fatherName}</span>
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-xl font-medium">
                      {selectedStudent.parents.fatherOccupation}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <div>
                      <span className="text-xs text-gray-400 block">Mother's Full Name</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedStudent.parents.motherName}</span>
                    </div>
                    <span className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-xl font-medium">
                      {selectedStudent.parents.motherOccupation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50/50 flex justify-end border-t border-gray-100/60">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}