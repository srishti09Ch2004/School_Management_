import { Search, Plus, Users, UserCheck, UserPlus } from "lucide-react";

export default function AdminStudent() {
  const stats = [
    {
      title: "Total Students",
      value: "2,540",
      icon: <Users size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Active Students",
      value: "2,410",
      icon: <UserCheck size={20} />,
      color: "bg-green-600",
    },
    {
      title: "New Admissions",
      value: "130",
      icon: <UserPlus size={20} />,
      color: "bg-red-600",
    },
  ];

  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      class: "10-A",
      roll: "101",
      gender: "Male",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Singh",
      class: "9-B",
      roll: "102",
      gender: "Female",
      status: "Active",
    },
    {
      id: 3,
      name: "Ankit Verma",
      class: "8-C",
      roll: "103",
      gender: "Male",
      status: "Pending",
    },
    {
      id: 4,
      name: "Neha Gupta",
      class: "7-A",
      roll: "104",
      gender: "Female",
      status: "Active",
    },
    {
      id: 5,
      name: "Aman Yadav",
      class: "6-B",
      roll: "105",
      gender: "Male",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-9">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Student Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all students of Future Academy
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500">{item.title}</p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>
            </div>

            <div
              className={`${item.color} text-white w-11 h-11 rounded-2xl flex items-center justify-center`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow p-7 flex justify-between items-center">

        <div className="relative w-90">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Student..."
            className="w-full border rounded-xl py-2 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-xl font-semibold">
            Student List
          </h2>

          <span className="text-gray-500">
            Total : {students.length}
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-8 py-5 text-left">
                  Name
                </th>

                <th className="px-8 py-4 text-center">
                  Class
                </th>

                <th className="px-8 py-4 text-center">
                  Roll
                </th>

                <th className="px-8 py-4 text-center">
                  Gender
                </th>

                <th className="px-8 py-4 text-center">
                  Status
                </th>

                <th className="px-8 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student.id}
                  className="border-t hover:bg-green-50 transition"
                >

                  <td className="px-8 py-5 font-medium">
                    {student.name}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {student.class}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {student.roll}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {student.gender}
                  </td>

                  <td className="px-8 py-5 text-center">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : student.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>

                  </td>

                  <td className="px-8 py-5">

                    <div className="flex justify-center gap-3">

                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Edit
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">
                        Delete
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