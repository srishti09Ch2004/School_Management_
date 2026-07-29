import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  Users,
  GraduationCap,
  BookOpen,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

export default function AdminTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewTeacher, setViewTeacher] = useState(null);
  const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  full_name: "",
  email: "",
  password: "",
  employee_id: "",
  department: "",
  qualification: "",
  phone: "",
  address: "",
});

  const stats = [
  {
    title: "Total Teachers",
    value: teachers.length,
    icon: <Users size={18} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Departments",
    value: new Set(teachers.map((t) => t.department)).size,
    icon: <BookOpen size={18} />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Qualified Teachers",
    value: teachers.length,
    icon: <GraduationCap size={18} />,
    color: "bg-orange-100 text-orange-600",
  },
];


  const fetchTeachers = () => {
  fetch("http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/teachers.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        setTeachers(data.data);
      }
    });
};

useEffect(() => {
  fetchTeachers();
}, []);

const filteredTeachers = useMemo(() => {

  let result = teachers;

  if (searchQuery.trim() !== "") {

    const query = searchQuery.toLowerCase();

    result = teachers.filter(
      (teacher) =>
        teacher.full_name.toLowerCase().includes(query) ||
        teacher.department.toLowerCase().includes(query) ||
        teacher.employee_id.toLowerCase().includes(query)
    );

  }

  return result;

}, [teachers, searchQuery]);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


const handleView = async (id) => {

  console.log(id);

  setLoading(true);

  const res = await fetch(
    `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/teacher-view.php?id=${id}`
  );

  const data = await res.json();

  console.log(data);

  if (data.status) {
    setViewTeacher(data.data);
  }

  setLoading(false);
};

const handleSubmit = async () => {

  if (
    !formData.full_name ||
    !formData.email ||
    !formData.password ||
    !formData.employee_id ||
    !formData.department ||
    !formData.qualification ||
    !formData.phone ||
    !formData.address
  ) {
    alert("Please fill all fields");
    return;
  }

  const response = await fetch(
    "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/addTeacher.php",
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
      employee_id: "",
      department: "",
      qualification: "",
      phone: "",
      address: "",
    });

    fetchTeachers();
  }
};

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage all teachers and departments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 transition shadow-sm font-medium text-sm"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold text-gray-800 mt-2">
                {item.value}
              </h2>
            </div>

            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex justify-between items-center">        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search teacher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            Teacher List
          </h2>

          <span className="text-sm text-gray-500">
            Total : {filteredTeachers.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Teacher
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Subject
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Phone
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Experience
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {teacher.full_name}
                  </td>

                  <td className="text-center text-gray-600">
                    {teacher.department}
                  </td>

                  <td className="text-center text-gray-600">
                    {teacher.phone}
                  </td>

                  <td className="text-center text-gray-600">
                    {teacher.qualification}
                  </td>

                  <td className="text-center">
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                      Active
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleView(teacher.id)}
                        className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200"
                      >
                        <Eye size={16}/>
                      </button>

                      <button>
                        <Pencil size={16}/>
                      </button>

                      <button>
                        <Trash2 size={16}/>
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-4xl p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Add Teacher
              </h2>

              <button
                onClick={() => setShowAddModal(false)}
                className="text-3xl"
              >
                x
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="employee_id"
              placeholder="Employee ID"
              value={formData.employee_id}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              onClick={() => setShowAddModal(false)}
              className="px-5 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              Add Teacher
            </button>

          </div>

          </div>
        </div>
      )}

      {viewTeacher && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

        <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-xl">

          <div className="flex justify-between items-center p-6 border-b">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {viewTeacher.full_name}
              </h2>

              <p className="text-sm text-gray-500">
                {viewTeacher.department}
              </p>

              <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                Active Teacher
              </span>
            </div>

            <button
              onClick={() => setViewTeacher(null)}
              className="text-2xl"
            >
              x
            </button>

          </div>
            

           <div className="p-6 grid grid-cols-2 gap-5">

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-semibold mt-1">{viewTeacher.email}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Employee ID</p>
              <p className="font-semibold mt-1">{viewTeacher.employee_id}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Department</p>
              <p className="font-semibold mt-1">{viewTeacher.department}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Qualification</p>
              <p className="font-semibold mt-1">{viewTeacher.qualification}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-semibold mt-1">{viewTeacher.phone}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 col-span-2">
              <p className="text-xs text-gray-500">Address</p>
              <p className="font-semibold mt-1">{viewTeacher.address}</p>
            </div>

          </div>

          <div className="p-5 border-t flex justify-end">

            <button
              onClick={() => setViewTeacher(null)}
              className="px-5 py-2 rounded-xl border"
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