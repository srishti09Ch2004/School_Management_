import {
  User,
  GraduationCap,
  Hash,
  CalendarCheck,
  CalendarX,
  Clock3,
} from "lucide-react";

export default function ParentAttendance() {
  const attendance = [
    { date: "01 Jul 2026", status: "Present" },
    { date: "02 Jul 2026", status: "Present" },
    { date: "03 Jul 2026", status: "Absent" },
    { date: "04 Jul 2026", status: "Present" },
    { date: "05 Jul 2026", status: "Leave" },
    { date: "06 Jul 2026", status: "Present" },
    { date: "07 Jul 2026", status: "Present" },
    { date: "08 Jul 2026", status: "Absent" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Child Attendance
      </h2>

      {/* Student Info */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Student Name
              </p>

              <h3 className="font-bold">
                Aarti Sharma
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <GraduationCap size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Class
              </p>

              <h3 className="font-bold">
                10-A
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Hash size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Roll Number
              </p>

              <h3 className="font-bold">
                18
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Present Days
              </p>

              <h3 className="text-xl font-bold mt-2">
                112
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Absent Days
              </p>

              <h3 className="text-xl font-bold mt-2">
                06
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <CalendarX size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Attendance %
              </p>

              <h3 className="text-xl font-bold text-green-600 mt-2">
                95%
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Clock3 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-5">
          Attendance Records
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-sm text-gray-500">
                  Date
                </th>

                <th className="text-left py-3 text-sm text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100"
                >
                  <td className="py-4 font-medium">
                    {item.date}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Absent"
                          ? "bg-red-100 text-red-700"
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

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">
              Present
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600">
              Absent
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-600">
              Leave
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}