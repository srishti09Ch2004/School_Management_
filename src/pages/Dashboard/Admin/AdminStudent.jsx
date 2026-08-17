import { useState, useMemo, useEffect } from "react";
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

export default function AdminStudent() {
  // ---------- State ----------
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

const [formData, setFormData] = useState({
  full_name: "",
  email: "",
  password: "",
  class: "",
  section: "",
  roll_no: "",
  gender: "",
  dob: "",
  phone: "",
  address: "",
  status: "Active",
});

const fetchStudents = () => {
  fetch("http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/students.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        setStudents(data.data);
      }
    });
};

useEffect(() => {
  fetchStudents();
}, []);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------- Derived data: filtered students ----------
  // ---------- Derived data: filtered students ----------
const filteredStudents = useMemo(() => {
  let result = students;

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase().trim();

    result = result.filter(
      (s) =>
        s.full_name.toLowerCase().includes(query) ||
        String(s.roll_no).toLowerCase().includes(query)
    );
  }

  return result;
}, [students, searchQuery]);

// ---------- Pagination ----------
const totalItems = filteredStudents.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
const currentItems = filteredStudents.slice(startIndex, endIndex);

// Reset page when search changes
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery]);

 
  // ---------- Handlers ----------
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async () => {

  if (
    !formData.full_name ||
    !formData.email ||
    !formData.password ||
    !formData.class ||
    !formData.section ||
    !formData.roll_no ||
    !formData.gender ||
    !formData.dob ||
    !formData.phone ||
    !formData.address
  ) {
    alert("Please fill all fields");
    return;
  }

  const response = await fetch(
    "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/addStudent.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  alert(data.message);

  if (data.status) {
    setShowAddModal(false);

    setFormData({
      full_name: "",
      email: "",
      password: "",
      class: "",
      section: "",
      roll_no: "",
      gender: "",
      dob: "",
      phone: "",
      address: "",
      status: "Active",
    });

    fetchStudents();
    setCurrentPage(1);
  }
};

const handleView = async (id) => {
  try {
    setLoading(true);

    console.log("View Student ID:", id);

    const res = await fetch(
      `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/student-view.php?id=${id}`
    );

    const data = await res.json();

    console.log("View Student Response:", data);

    if (data.status) {
      setViewStudent(data.data);
    } else {
      alert(data.message || "Student details not found");
    }

  } catch (error) {
    console.error("View Student Error:", error);
    alert("Unable to fetch student details");
  } finally {
    setLoading(false);
  }
};

const handleUpdate = async () => {
  if (
    !formData.full_name ||
    !formData.email ||
    !formData.class ||
    !formData.section ||
    !formData.roll_no ||
    !formData.gender ||
    !formData.dob ||
    !formData.phone ||
    !formData.address
  ) {
    alert("Please fill all fields");
    return;
  }

  const response = await fetch(
    "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/updateStudent.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  alert(data.message);

  if (data.status) {
    setShowEditModal(false);

    setFormData({
      full_name: "",
      email: "",
      password: "",
      class: "",
      section: "",
      roll_no: "",
      gender: "",
      dob: "",
      phone: "",
      address: "",
    });

    fetchStudents();
  }
};


const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) return;

  const response = await fetch(
    "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/deleteStudent.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );

  const data = await response.json();

  alert(data.message);

  if (data.status) {
    fetchStudents();
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
  const totalStudents = students.length;
  const activeStudents = students.length;
  const newAdmissions = students.length;

  const stats = [
    { title: "Total Students", value: totalStudents.toLocaleString(), icon: <Users size={18} />, color: "bg-blue-100 text-blue-600" },
    { title: "Active Students", value: activeStudents.toLocaleString(), icon: <UserCheck size={18} />, color: "bg-green-100 text-green-600" },
    { title: "New Admissions", value: newAdmissions.toLocaleString(), icon: <UserPlus size={18} />, color: "bg-orange-100 text-orange-600" },
  ];

  

  return (
    <div className="space-y-7 max-w-[1600px] mx-auto p-1">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all institutional student metrics seamlessly.</p>
        </div>
        <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 transition shadow-sm"
          >
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
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search student by name or roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl py-2.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500 text-sm transition"
            />
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
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Admission No</th>
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
                    <td className="px-6 py-4.5 font-semibold text-gray-800">{student.full_name}</td>
                    <td className="text-center text-gray-600 text-sm">{student.class}</td>
                    <td className="text-center text-gray-600 text-sm">{student.roll_no}</td>
                    <td className="text-center text-gray-600 text-sm">{student.gender}</td>
                    <td className="text-center text-gray-500 text-sm">{student.admission_no}</td>
                    <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : student.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleView(student.id)}
                          className="w-8 h-8 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition"
                          title="View Detailed Info"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          onClick={() => {
                              setFormData({
                                id: student.user_id || student.id,
                                full_name: student.full_name,
                                email: student.email,
                                password: "",
                                class: student.class,
                                section: student.section,
                                roll_no: student.roll_no,
                                gender: student.gender,
                                dob: student.dob,
                                phone: student.phone,
                                address: student.address,
                                status: student.status,
                              });

                              setShowEditModal(true);

                          }}
                          className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() => handleDelete(student.user_id || student.id)}
                          className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
                          title="Delete Record"
                        >
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
     {viewStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-100">

            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-transparent flex justify-between items-center border-b border-gray-100">

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {viewStudent.full_name || "Student Details"}
                </h3>

                <p className="text-xs font-semibold text-gray-500 mt-1">
                  Class: {viewStudent.class || "N/A"} • Roll No: {viewStudent.roll_no || "N/A"}
                </p>
              </div>

              <button
                onClick={() => setViewStudent(null)}
                className="p-2 rounded-xl hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={18} />
              </button>

            </div>


            {/* Student Details */}
            <div className="p-6 space-y-6">

              {/* Basic Information */}
              <div>

                <h4 className="text-sm font-bold text-gray-800 mb-3">
                  Basic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">

                  <div>
                    <span className="text-xs text-gray-400 block">
                      Full Name
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.full_name || "N/A"}
                    </span>
                  </div>


                  <div>
                    <span className="text-xs text-gray-400 block">
                      Email
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.email || "N/A"}
                    </span>
                  </div>


                  <div>
                    <span className="text-xs text-gray-400 block">
                      Gender
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.gender || "N/A"}
                    </span>
                  </div>


                  <div>
                    <span className="text-xs text-gray-400 block">
                      Date of Birth
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.dob || "N/A"}
                    </span>
                  </div>

                </div>

              </div>


              {/* Academic Information */}
              <div>

                <h4 className="text-sm font-bold text-gray-800 mb-3">
                  Academic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">

                  <div>
                    <span className="text-xs text-gray-400 block">
                      Class
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.class || "N/A"}
                    </span>
                  </div>


                  <div>
                    <span className="text-xs text-gray-400 block">
                      Section
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.section || "N/A"}
                    </span>
                  </div>


                  <div>
                    <span className="text-xs text-gray-400 block">
                      Roll No
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.roll_no || "N/A"}
                    </span>
                  </div>


                  <div>
                    <span className="text-xs text-gray-400 block">
                      Admission No
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.admission_no || "N/A"}
                    </span>
                  </div>


                  <div>
                    <span className="text-xs text-gray-400 block">
                      Status
                    </span>

                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        viewStudent.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : viewStudent.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {viewStudent.status || "N/A"}
                    </span>

                  </div>

                </div>

              </div>


              {/* Contact Information */}
              <div>

                <h4 className="text-sm font-bold text-gray-800 mb-3">
                  Contact Information
                </h4>

                <div className="bg-gray-50 p-4 rounded-2xl space-y-4">

                  <div>
                    <span className="text-xs text-gray-400 block">
                      Phone
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.phone || "N/A"}
                    </span>
                  </div>


                  <div>
                    <span className="text-xs text-gray-400 block">
                      Address
                    </span>

                    <span className="font-semibold text-gray-700">
                      {viewStudent.address || "N/A"}
                    </span>
                  </div>

                </div>

              </div>

            </div>


            {/* Footer */}
            <div className="p-4 bg-gray-50/50 flex justify-end border-t border-gray-100">

              <button
                onClick={() => setViewStudent(null)}
                className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-sm"
              >
                Close View
              </button>

            </div>

          </div>

        </div>
      )}



      {showAddModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Add Student
        </h2>

        <button
          onClick={() => setShowAddModal(false)}
          className="text-2xl"
        >
          x
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="roll_no"
          placeholder="Roll No"
          value={formData.roll_no}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border rounded-xl p-3"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded-xl p-3 md:col-span-2"
          rows="3"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-xl p-3 md:col-span-2"
        >
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowAddModal(false)}
          className="px-5 py-2 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-xl"
        >
          Save Student
        </button>

      </div>

    </div>
  </div>
)}

{showEditModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Edit Student
        </h2>

        <button
          onClick={() => setShowEditModal(false)}
          className="text-2xl"
        >
          ×
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Leave blank to keep old password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="roll_no"
          placeholder="Roll No"
          value={formData.roll_no}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border rounded-xl p-3"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded-xl p-3 md:col-span-2"
          rows="3"
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowEditModal(false)}
          className="px-5 py-2 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
        >
          Update Student
        </button>

      </div>

    </div>
  </div>
)}

    </div>
  );
}