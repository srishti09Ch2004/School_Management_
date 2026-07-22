import {
  Users,
  GraduationCap,
  IndianRupee,
  BookOpen,
  UserCheck,
  CalendarCheck,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function AdminHome() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);


  const stats = [
    {
      title: "Total Students",
      value: "2,540",
      // icon: <Users size={20} />,
      icon: Users,
      bg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Total Teachers",
      value: "185",
      // icon: <GraduationCap size={20} />,
      icon: GraduationCap,
      // color: "bg-green-100",
       bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Fees Collected",
      value: "₹12.4 L",
      // icon: <IndianRupee size={20} />,
      icon: IndianRupee,
      // color: "bg-red-100",
       bg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Library Books",
      value: "4,530",
      // icon: <BookOpen size={20} />,
      icon: BookOpen,
      // color: "bg-green-100",
       bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Staff Members",
      value: "62",
      // icon: <UserCheck size={20} />,
      icon: UserCheck,
      // color: "bg-red-100",
       bg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Today's Attendance",
      value: "95%",
      // icon: <CalendarCheck size={20} />,
      icon: CalendarCheck,
      // color: "bg-green-100",
      bg: "bg-green-100",
      iconColor: "text-green-600",
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
      {/* Welcome Card */}

      <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome Back, {user?.full_name}
            </h2>

            <p className="text-gray-500 mt-2">
              Logged in as {user?.role}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-red-50 px-5 py-3 rounded-2xl">
              <p className="text-xs text-gray-500">
                Total Students
              </p>

              <h3 className="font-bold text-red-600 text-lg">
                2,540
              </h3>
            </div>

            <div className="bg-green-50 px-5 py-3 rounded-2xl">
              <p className="text-xs text-gray-500">
                Attendance
              </p>

              <h3 className="font-bold text-green-600 text-lg">
                95%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  {item.value}
                </h3>
              </div>

              <div
                className={`${item.bg} w-11 h-11 rounded-2xl flex items-center justify-center`}
              >
                <Icon size={20} className={item.iconColor} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Attendance & Notifications */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Attendance */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-gray-800">
              Attendance Overview
            </h3>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Today : 95%
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Boys Attendance</span>
                <span>93%</span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[93%] h-full bg-red-400 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Girls Attendance</span>
                <span>97%</span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[97%] h-full bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Staff Attendance</span>
                <span>91%</span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[91%] h-full bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl mb-5 text-gray-800">
            Notifications
          </h3>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-2xl">
              <p className="font-medium">
                New Admission Added
              </p>

              <span className="text-sm text-gray-500">
                Rahul Sharma joined Class 10-A
              </span>
            </div>

            <div className="bg-green-50 p-4 rounded-2xl">
              <p className="font-medium">
                Fees Collection Updated
              </p>

              <span className="text-sm text-gray-500">
                ₹45,000 collected today
              </span>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="font-medium">
                Exam Schedule Released
              </p>

              <span className="text-sm text-gray-500">
                Mid-Term exam timetable published
              </span>
            </div>

            <div className="bg-yellow-50 p-4 rounded-2xl">
              <p className="font-medium">
                Attendance Report Generated
              </p>

              <span className="text-sm text-gray-500">
                Daily attendance report is ready.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Admissions */}

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">
            Recent Admissions
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Newly admitted students
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-5 text-left text-gray-700">
                  Student
                </th>

                <th className="px-8 py-5 text-left text-gray-700">
                  Class
                </th>

                <th className="px-8 py-5 text-left text-gray-700">
                  Admission No
                </th>

                <th className="px-8 py-5 text-left text-gray-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((student, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-8 py-5 font-medium text-gray-800">
                    {student.student}
                  </td>

                  <td className="px-8 py-5 text-gray-700">
                    {student.class}
                  </td>

                  <td className="px-8 py-5 text-gray-700">
                    {student.admission}
                  </td>

                  <td className="px-8 py-5">
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