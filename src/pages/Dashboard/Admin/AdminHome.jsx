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

  return (
    <div>

      <div className="mb-9">

        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h2>

        <p className="text-gray-500 mt-2">
          Welcome to Future Academy School Management System
        </p>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center"
          >

            <div>

              <p className="text-gray-500">
                {item.title}
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {item.value}
              </h3>

            </div>

            <div
              className={`${item.color} w-11 h-11 rounded-2xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>

          </div>

        ))}

      </div>

      {/* Recent Students */}

      <div className="bg-white mt-10 rounded-2xl shadow-sm">

        <div className="p-7 border-b">

          <h3 className="text-xl font-semibold">
            Recent Admissions
          </h3>

        </div>

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-8">Student</th>

              <th className="text-left">Class</th>

              <th className="text-left">Admission No</th>

              <th className="text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t">

              <td className="p-8">Rahul Sharma</td>

              <td>10-A</td>

              <td>1023</td>

              <td className="text-green-600 font-semibold">
                Active
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-8">Priya Singh</td>

              <td>9-B</td>

              <td>1048</td>

              <td className="text-green-600 font-semibold">
                Active
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-8">Ankit Verma</td>

              <td>8-C</td>

              <td>1011</td>

              <td className="text-yellow-500 font-semibold">
                Pending
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

