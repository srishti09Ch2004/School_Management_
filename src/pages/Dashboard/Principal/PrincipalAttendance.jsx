import {
  CalendarCheck,
  Users,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

export default function PrincipalAttendance() {
  const recentAttendance = [
    {
      name: "Class 10-A",
      attendance: "96%",
      status: "Excellent",
    },
    {
      name: "Class 10-B",
      attendance: "94%",
      status: "Excellent",
    },
    {
      name: "Class 9-A",
      attendance: "92%",
      status: "Good",
    },
    {
      name: "Teachers",
      attendance: "95%",
      status: "Excellent",
    },
    {
      name: "Staff",
      attendance: "89%",
      status: "Average",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Attendance Overview
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Student Attendance
              </p>

              <h3 className="text-xl font-bold mt-2">
                95%
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Teacher Attendance
              </p>

              <h3 className="text-xl font-bold mt-2">
                97%
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Overall Attendance
              </p>

              <h3 className="text-xl font-bold mt-2">
                96%
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Absent Today
              </p>

              <h3 className="text-xl font-bold mt-2">
                12
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold mb-6">
          Monthly Attendance Progress
        </h3>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Students</span>
              <span>95%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 w-[95%] bg-green-400 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Teachers</span>
              <span>97%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 w-[97%] bg-blue-400 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Staff</span>
              <span>89%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 w-[89%] bg-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold">
            Recent Attendance Records
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Category
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Attendance
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentAttendance.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-5 font-medium">
                    {item.name}
                  </td>

                  <td className="py-4 px-5 font-semibold text-green-600">
                    {item.attendance}
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Excellent"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Good"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
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

        <div className="grid md:grid-cols-3 gap-4 p-5 bg-gray-50 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">
              Highest Attendance
            </p>

            <p className="font-semibold text-sm mt-1">
              Class 10-A (96%)
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Lowest Attendance
            </p>

            <p className="font-semibold text-sm mt-1">
              Staff (89%)
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Present Today
            </p>

            <p className="font-semibold text-sm mt-1">
              58 Members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}