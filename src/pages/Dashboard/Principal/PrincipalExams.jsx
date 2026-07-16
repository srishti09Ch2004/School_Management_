import {
  FileText,
  Award,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

export default function PrincipalExams() {
  const exams = [
    {
      exam: "Unit Test - 1",
      class: "10-A",
      date: "15 July 2026",
      status: "Completed",
    },
    {
      exam: "Half Yearly",
      class: "9-B",
      date: "22 August 2026",
      status: "Upcoming",
    },
    {
      exam: "Practical Exam",
      class: "12-A",
      date: "28 July 2026",
      status: "Scheduled",
    },
    {
      exam: "Final Exam",
      class: "11-B",
      date: "10 December 2026",
      status: "Upcoming",
    },
  ];

  return (
    <div className="space-y-8">

      <h2 className="text-3xl font-bold">
        Examination Management
      </h2>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow">
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Total Exams
              </p>

              <h3 className="text-4xl font-bold mt-2">
                18
              </h3>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <FileText size={24} />
            </div>

          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Completed
              </p>

              <h3 className="text-4xl font-bold mt-2">
                12
              </h3>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-600 text-white flex items-center justify-center">
              <ClipboardCheck size={24} />
            </div>

          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Upcoming
              </p>

              <h3 className="text-4xl font-bold mt-2">
                6
              </h3>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center">
              <Award size={24} />
            </div>

          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Result Rate
              </p>

              <h3 className="text-4xl font-bold mt-2">
                95%
              </h3>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center">
              <TrendingUp size={24} />
            </div>

          </div>
        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="p-8 border-b">
          <h3 className="text-2xl font-bold">
            Exam Schedule
          </h3>
        </div>

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-5 px-6">
                Exam
              </th>

              <th className="text-left py-5 px-6">
                Class
              </th>

              <th className="text-left py-5 px-6">
                Date
              </th>

              <th className="text-left py-5 px-6">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {exams.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-5 px-6 font-medium">
                  {item.exam}
                </td>

                <td className="py-5 px-6">
                  {item.class}
                </td>

                <td className="py-5 px-6">
                  {item.date}
                </td>

                <td className="py-5 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}