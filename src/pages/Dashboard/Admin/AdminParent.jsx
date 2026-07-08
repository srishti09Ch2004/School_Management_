import { Search, Plus, Users, UserCheck, HeartHandshake } from "lucide-react";

export default function AdminParent() {
  const stats = [
    {
      title: "Total Parents",
      value: "1,850",
      icon: <Users size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Active Parents",
      value: "1,760",
      icon: <UserCheck size={20} />,
      color: "bg-green-600",
    },
    {
      title: "Linked Students",
      value: "2,540",
      icon: <HeartHandshake size={20} />,
      color: "bg-red-600",
    },
  ];

  const parents = [
    {
      id: 1,
      name: "Rajesh Sharma",
      relation: "Father",
      student: "Rahul Sharma",
      phone: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      name: "Sunita Singh",
      relation: "Mother",
      student: "Priya Singh",
      phone: "9876501234",
      status: "Active",
    },
    {
      id: 3,
      name: "Vijay Verma",
      relation: "Father",
      student: "Ankit Verma",
      phone: "9123456789",
      status: "Pending",
    },
    {
      id: 4,
      name: "Pooja Gupta",
      relation: "Mother",
      student: "Neha Gupta",
      phone: "9988776655",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Parent Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage Parents & Guardians
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
          <Plus size={18} />
          Add Parent
        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
          >

            <div>

              <p className="text-gray-500">{item.title}</p>

              <h2 className="text-2xl font-bold mt-2">
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

      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative w-90">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Parent..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="flex justify-between items-center p-7 border-b">

          <h2 className="text-xl font-semibold">
            Parent List
          </h2>

          <span className="text-gray-500">
            Total : {parents.length}
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-8 py-4 text-left">Parent Name</th>

                <th className="px-8 py-4 text-center">Relation</th>

                <th className="px-8 py-4 text-center">Student</th>

                <th className="px-8 py-4 text-center">Phone</th>

                <th className="px-8 py-4 text-center">Status</th>

                <th className="px-8 py-4 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {parents.map((parent) => (

                <tr
                  key={parent.id}
                  className="border-t hover:bg-green-50 transition"
                >

                  <td className="px-8 py-5 font-medium">
                    {parent.name}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {parent.relation}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {parent.student}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {parent.phone}
                  </td>

                  <td className="px-8 py-5 text-center">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        parent.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : parent.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {parent.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Edit
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
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