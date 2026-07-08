import { Search, Plus, ClipboardCheck, CalendarDays, Award } from "lucide-react";

export default function AdminExam() {
  const stats = [
    {
      title: "Total Exams",
      value: "18",
      icon: <ClipboardCheck size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Upcoming Exams",
      value: "5",
      icon: <CalendarDays size={20} />,
      color: "bg-green-600",
    },
    {
      title: "Results Published",
      value: "13",
      icon: <Award size={20} />,
      color: "bg-red-600",
    },
  ];

  const exams = [
    {
      id: 1,
      exam: "Mid Term",
      class: "10-A",
      date: "15 Aug 2026",
      status: "Upcoming",
    },
    {
      id: 2,
      exam: "Unit Test",
      class: "9-B",
      date: "20 Jul 2026",
      status: "Completed",
    },
    {
      id: 3,
      exam: "Final Exam",
      class: "8-C",
      date: "10 Dec 2026",
      status: "Scheduled",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Exam Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage school examinations and results
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Add Exam
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

              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {item.value}
              </h2>

            </div>

            <div
              className={`${item.color} w-11 h-11 rounded-2xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>

          </div>

        ))}

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative w-96">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Exam..."
            className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="flex justify-between items-center p-8 border-b">

          <h2 className="text-xl font-semibold">
            Exam List
          </h2>

          <span className="text-gray-500">
            Total : {exams.length}
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-8 py-4 text-left">
                  Exam Name
                </th>

                <th className="px-8 py-4 text-center">
                  Class
                </th>

                <th className="px-8 py-4 text-center">
                  Date
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

              {exams.map((exam) => (

                <tr
                  key={exam.id}
                  className="border-t hover:bg-green-50 transition"
                >

                  <td className="px-8 py-5 font-medium">
                    {exam.exam}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {exam.class}
                  </td>

                  <td className="px-8 py-5 text-center">
                    {exam.date}
                  </td>

                  <td className="px-8 py-5 text-center">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        exam.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : exam.status === "Upcoming"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {exam.status}
                    </span>

                  </td>

                  <td className="px-8 py-5">

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