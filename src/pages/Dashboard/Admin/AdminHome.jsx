import {
  Users,
  GraduationCap,
  IndianRupee,
  BookOpen,
  UserCheck,
  CalendarCheck,
} from "lucide-react";

export default function AdminHome() {
  const stats = [
    {
      title: "Total Students",
      value: "2,540",
      icon: <Users size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Total Teachers",
      value: "185",
      icon: <GraduationCap size={20} />,
      color: "bg-green-600",
    },
    {
      title: "Fees Collected",
      value: "₹12.4 L",
      icon: <IndianRupee size={20} />,
      color: "bg-red-600",
    },
    {
      title: "Library Books",
      value: "4,530",
      icon: <BookOpen size={20} />,
      color: "bg-green-500",
    },
    {
      title: "Staff Members",
      value: "62",
      icon: <UserCheck size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Today's Attendance",
      value: "95%",
      icon: <CalendarCheck size={20} />,
      color: "bg-green-600",
    },
  ];

  const admissions = [
    {
      student: "Rahul Sharma",
      class: "10-A",
      admission: "1023",
      status: "Active",
    },
    {
      student: "Priya Singh",
      class: "9-B",
      admission: "1048",
      status: "Active",
    },
    {
      student: "Ankit Verma",
      class: "8-C",
      admission: "1011",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h2>

        <p className="text-gray-500 mt-2">
          Welcome to Future Academy School Management System
        </p>
      </div>

      {/* Statistics Cards */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition duration-300"
          >
            <div>
              <p className="text-sm text-gray-500">
                {item.title}
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {item.value}
              </h3>
            </div>

            <div
              className={`${item.color} w-11 h-11 rounded-xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Admissions */}

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">
            Recent Admissions
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Newly admitted students
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-8 py-5 text-left font-semibold text-gray-700 w-[35%]">
                  Student
                </th>

                <th className="px-8 py-5 text-left font-semibold text-gray-700 w-[18%]">
                  Class
                </th>

                <th className="px-8 py-5 text-left font-semibold text-gray-700 w-[25%]">
                  Admission No
                </th>

                <th className="px-8 py-5 text-left font-semibold text-gray-700 w-[22%]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((student, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-8 py-6 font-medium text-gray-800">
                    {student.student}
                  </td>

                  <td className="px-8 py-6 text-gray-700">
                    {student.class}
                  </td>

                  <td className="px-8 py-6 text-gray-700">
                    {student.admission}
                  </td>

                  <td className="px-8 py-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {student.status}
                    </span>
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