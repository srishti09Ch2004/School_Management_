
import {
  Users,
  GraduationCap,
  CalendarCheck,
  IndianRupee,
  Trophy,
  Bell,
  UserCheck,
  School,
} from "lucide-react";

export default function PrincipalHome() {
  const stats = [
    {
      title: "Total Students",
      value: "2,540",
      icon: <Users size={20} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Total Teachers",
      value: "185",
      icon: <GraduationCap size={20} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Today's Attendance",
      value: "95%",
      icon: <CalendarCheck size={20} />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Pending Fees",
      value: "₹1.2L",
      icon: <IndianRupee size={20} />,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    {
      title: "Staff Members",
      value: "52",
      icon: <UserCheck size={20} />,
      bg: "bg-cyan-100",
      text: "text-cyan-600",
    },
    {
      title: "Total Classes",
      value: "32",
      icon: <School size={20} />,
      bg: "bg-pink-100",
      text: "text-pink-600",
    },
  ];

  const notices = [
    {
      title: "PTM Meeting",
      date: "20 July 2026",
    },
    {
      title: "Annual Function",
      date: "10 August 2026",
    },
    {
      title: "Sports Day",
      date: "15 August 2026",
    },
  ];

  const toppers = [
    {
      name: "Rahul Sharma",
      class: "10-A",
      percentage: "96%",
    },
    {
      name: "Priya Singh",
      class: "10-B",
      percentage: "95%",
    },
    {
      name: "Ankit Verma",
      class: "9-C",
      percentage: "94%",
    },
  ];

  const admissions = [
    {
      name: "Aarav Gupta",
      class: "8-A",
    },
    {
      name: "Riya Sharma",
      class: "9-B",
    },
    {
      name: "Aryan Singh",
      class: "6-C",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Principal Dashboard
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's your school overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-xl font-bold mt-2">
                  {item.value}
                </h3>
              </div>

              <div
                className={`w-11 h-11 rounded-xl ${item.bg} ${item.text} flex items-center justify-center`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notices + Performance */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Notices */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Bell size={18} />
            </div>

            <h3 className="text-lg font-bold">
              Recent Notices
            </h3>
          </div>

          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
              >
                <h4 className="font-medium">
                  {notice.title}
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  {notice.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Trophy size={18} />
            </div>

            <h3 className="text-lg font-bold">
              School Performance
            </h3>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Attendance</span>
                <span>95%</span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 w-[95%] bg-green-400 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Board Results</span>
                <span>92%</span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 w-[92%] bg-blue-400 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Fee Collection</span>
                <span>88%</span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 w-[88%] bg-orange-400 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Teacher Attendance</span>
                <span>97%</span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 w-[97%] bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Top Students */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-bold mb-5">
            Top Performing Students
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-sm text-gray-500">
                    Student
                  </th>

                  <th className="text-left py-3 text-sm text-gray-500">
                    Class
                  </th>

                  <th className="text-left py-3 text-sm text-gray-500">
                    %
                  </th>
                </tr>
              </thead>

              <tbody>
                {toppers.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100"
                  >
                    <td className="py-4 font-medium">
                      {student.name}
                    </td>

                    <td className="py-4">
                      {student.class}
                    </td>

                    <td className="py-4 font-semibold text-green-600">
                      {student.percentage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Admissions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-bold mb-5">
            Recent Admissions
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-sm text-gray-500">
                    Student
                  </th>

                  <th className="text-left py-3 text-sm text-gray-500">
                    Class
                  </th>
                </tr>
              </thead>

              <tbody>
                {admissions.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100"
                  >
                    <td className="py-4 font-medium">
                      {student.name}
                    </td>

                    <td className="py-4">
                      {student.class}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}