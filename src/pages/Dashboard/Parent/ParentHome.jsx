import {
  User,
  CalendarCheck,
  IndianRupee,
  Bell,
  Users,
  Trophy,
} from "lucide-react";

export default function ParentHome() {
  const notices = [
    {
      title: "PTM Meeting",
      date: "20 July 2026",
    },
    {
      title: "Unit Test Starts",
      date: "25 July 2026",
    },
    {
      title: "Independence Day Celebration",
      date: "15 August 2026",
    },
  ];

  const results = [
    {
      subject: "Mathematics",
      marks: "92/100",
    },
    {
      subject: "Science",
      marks: "89/100",
    },
    {
      subject: "English",
      marks: "95/100",
    },
    {
      subject: "Computer",
      marks: "98/100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Parent Dashboard
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's your child's latest information.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Student Name
              </p>

              <h3 className="text-xl font-bold mt-2">
                Aarav Sharma
              </h3>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <User size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Class
              </p>

              <h3 className="text-xl font-bold mt-2">
                10 - A
              </h3>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Attendance
              </p>

              <h3 className="text-xl font-bold mt-2">
                95%
              </h3>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CalendarCheck size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Pending Fees
              </p>

              <h3 className="text-xl font-bold mt-2">
                ₹8,000
              </h3>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <IndianRupee size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Notice + PTM */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Notices */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Bell size={20} />
            </div>

            <h3 className="text-xl font-bold">
              Important Notices
            </h3>
          </div>

          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
              >
                <h4 className="font-semibold">
                  {notice.title}
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  {notice.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PTM */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Users size={20} />
            </div>

            <h3 className="text-xl font-bold">
              Upcoming PTM
            </h3>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-100 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                Teacher
              </p>

              <h4 className="font-semibold mt-1">
                Priya Sharma
              </h4>
            </div>

            <div className="border border-gray-100 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                Date
              </p>

              <h4 className="font-semibold mt-1">
                20 July 2026
              </h4>
            </div>

            <div className="border border-gray-100 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                Time
              </p>

              <h4 className="font-semibold mt-1">
                11:00 AM
              </h4>
            </div>

            <div className="border border-gray-100 rounded-2xl p-4">
              <p className="text-sm text-gray-500">
                Room Number
              </p>

              <h4 className="font-semibold mt-1">
                A-204
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <Trophy size={20} />
          </div>

          <h3 className="text-xl font-bold">
            Latest Exam Results
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-sm text-gray-500">
                  Subject
                </th>

                <th className="text-left py-3 text-sm text-gray-500">
                  Marks
                </th>
              </tr>
            </thead>

            <tbody>
              {results.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100"
                >
                  <td className="py-4 font-medium">
                    {item.subject}
                  </td>

                  <td className="py-4 font-bold text-green-600">
                    {item.marks}
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