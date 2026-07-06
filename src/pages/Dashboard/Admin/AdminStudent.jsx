import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserPlus,
} from "lucide-react";

export default function AdminStudent() {
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

  const stats = [
    {
      title: "Total Students",
      value: "2,540",
      icon: <Users size={28} />,
      color: "bg-red-500",
    },
    {
      title: "Active Students",
      value: "2,410",
      icon: <UserCheck size={28} />,
      color: "bg-green-600",
    },
    {
      title: "New Admissions",
      value: "130",
      icon: <UserPlus size={28} />,
      color: "bg-red-600",
    },
  ];

  return (
    <div>

      {/* Heading */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Student Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all students of Future Academy
          </p>

        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">

          <Plus size={18} />

          Add Student

        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center"
          >

            <div>

              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>

            </div>

            <div
              className={`${item.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center`}
            >
              {item.icon}
            </div>

          </div>

        ))}

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-sm mt-8 p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Student..."
            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-sm mt-8 overflow-hidden">

        <div className="p-5 border-b">

          <h2 className="text-xl font-semibold">
            Student List
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Name</th>

              <th>Class</th>

              <th>Roll</th>

              <th>Gender</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {student.name}
                </td>

                <td>{student.class}</td>

                <td>{student.roll}</td>

                <td>{student.gender}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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

                <td>

                  <div className="flex gap-2">

                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
                      Edit
                    </button>

                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
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
  );
}