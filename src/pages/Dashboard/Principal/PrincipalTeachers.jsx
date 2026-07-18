import {
  GraduationCap,
  Users,
  CalendarCheck,
  Trophy,
} from "lucide-react";

export default function PrincipalTeachers() {
  const teachers = [
    {
      name: "Priya Sharma",
      department: "Mathematics",
      classes: "10-A, 10-B",
      attendance: "96%",
      performance: "Excellent",
    },
    {
      name: "Rohit Verma",
      department: "Science",
      classes: "9-A, 9-B",
      attendance: "94%",
      performance: "Very Good",
    },
    {
      name: "Anjali Singh",
      department: "English",
      classes: "8-A, 8-B",
      attendance: "98%",
      performance: "Excellent",
    },
    {
      name: "Amit Kumar",
      department: "Computer",
      classes: "11-A",
      attendance: "92%",
      performance: "Good",
    },
    {
      name: "Neha Gupta",
      department: "Social Science",
      classes: "7-A, 7-B",
      attendance: "95%",
      performance: "Excellent",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Teachers Overview
      </h2>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Total Teachers
              </p>

              <h3 className="text-xl font-bold mt-2">
                20
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
                Departments
              </p>

              <h3 className="text-xl font-bold mt-2">
                8
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
                Attendance
              </p>

              <h3 className="text-xl font-bold mt-2">
                95%
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
                Top Rating
              </p>

              <h3 className="text-xl font-bold mt-2">
                A+
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Trophy size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold">
            Teacher Records
          </h3>

          <span className="text-sm text-gray-500">
            Total : 20 Teachers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Teacher
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Department
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Classes
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Attendance
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Performance
                </th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((teacher, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-5 font-medium">
                    {teacher.name}
                  </td>

                  <td className="py-4 px-5">
                    {teacher.department}
                  </td>

                  <td className="py-4 px-5">
                    {teacher.classes}
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-semibold text-green-600">
                      {teacher.attendance}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        teacher.performance === "Excellent"
                          ? "bg-green-100 text-green-700"
                          : teacher.performance === "Very Good"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {teacher.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Summary */}
        <div className="grid md:grid-cols-3 gap-4 p-5 bg-gray-50 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">
              Average Attendance
            </p>

            <p className="font-semibold text-sm mt-1">
              95%
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Best Performing Department
            </p>

            <p className="font-semibold text-sm mt-1">
              Mathematics
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Teachers on Leave Today
            </p>

            <p className="font-semibold text-sm mt-1">
              2 Teachers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}