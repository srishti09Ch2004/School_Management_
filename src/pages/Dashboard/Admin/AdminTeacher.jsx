import {
  Search,
  Plus,
  Users,
  GraduationCap,
  BookOpen,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminTeacher() {
  const stats = [
    {
      title: "Total Teachers",
      value: "185",
      icon: <Users size={18} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Departments",
      value: "12",
      icon: <BookOpen size={18} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Class Teachers",
      value: "42",
      icon: <GraduationCap size={18} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const teachers = [
    {
      id: 1,
      name: "Amit Sharma",
      subject: "Mathematics",
      phone: "9876543210",
      experience: "8 Years",
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Gupta",
      subject: "Science",
      phone: "9123456780",
      experience: "6 Years",
      status: "Active",
    },
    {
      id: 3,
      name: "Rakesh Verma",
      subject: "English",
      phone: "9988776655",
      experience: "4 Years",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage all teachers and departments.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 transition shadow-sm">
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
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search teacher..."
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
            Total : {teachers.length}
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
              {teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {teacher.name}
                  </td>

                  <td className="text-center text-gray-600">
                    {teacher.subject}
                  </td>

                  <td className="text-center text-gray-600">
                    {teacher.phone}
                  </td>

                  <td className="text-center text-gray-600">
                    {teacher.experience}
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition">
                        <Pencil size={16} />
                      </button>

                      <button className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}