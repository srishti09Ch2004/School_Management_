import {
  Search,
  Plus,
  ClipboardCheck,
  CalendarDays,
  Award,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminExam() {
  const stats = [
    {
      title: "Total Exams",
      value: "18",
      icon: <ClipboardCheck size={22} />,
      color: "bg-red-500",
    },
    {
      title: "Upcoming Exams",
      value: "5",
      icon: <CalendarDays size={22} />,
      color: "bg-green-600",
    },
    {
      title: "Results Published",
      value: "13",
      icon: <Award size={22} />,
      color: "bg-blue-600",
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
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Exam Management
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage school examinations and results.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition">
          <Plus size={16} />
          Add Exam
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search exam..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Exam List
          </h2>

          <span className="text-sm text-gray-500">
            Total : {exams.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-4 text-left">
                  Exam Name
                </th>

                <th className="px-6 py-4 text-center">
                  Class
                </th>

                <th className="px-6 py-4 text-center">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {exams.map((exam) => (
                <tr
                  key={exam.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {exam.exam}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {exam.class}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {exam.date}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
                        <Pencil size={16} />
                      </button>

                      <button className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition">
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