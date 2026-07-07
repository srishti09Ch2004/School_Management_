
import { Search, Plus, Users, GraduationCap, BookOpen } from "lucide-react";

export default function AdminTeacher() {
  const stats = [
    {
      title: "Total Teachers",
      value: "185",
      icon: <Users size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Departments",
      value: "12",
      icon: <BookOpen size={20} />,
      color: "bg-green-600",
    },
    {
      title: "Class Teachers",
      value: "42",
      icon: <GraduationCap size={20} />,
      color: "bg-red-600",
    },
  ];

  const teachers = [
    {
      id: 1,
      name: "Amit Sharma",
      subject: "Mathematics",
      phone: "9876543210",
      experience: "8 Years",
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Gupta",
      subject: "Science",
      phone: "9123456780",
      experience: "6 Years",
      status: "Active",
    },
    {
      id: 3,
      name: "Rakesh Verma",
      subject: "English",
      phone: "9988776655",
      experience: "4 Years",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold">Teacher Management</h1>
          <p className="text-gray-500">Manage all teachers</p>
        </div>

        <button className="bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          Add Teacher
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {stats.map((item)=>(
          <div key={item.title} className="bg-white rounded-2xl shadow p-7 flex justify-between">

            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>

            <div className={`${item.color} w-11 h-11 rounded-2xl text-white flex items-center justify-center`}>
              {item.icon}
            </div>

          </div>
        ))}

      </div>

      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative w-90">

          <Search className="absolute left-4 top-4 text-gray-400" size={18}/>

          <input
            type="text"
            placeholder="Search Teacher..."
            className="w-full border rounded-xl py-2 pl-11"
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-8">Teacher</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {teachers.map((teacher)=>(

              <tr key={teacher.id} className="border-t hover:bg-green-50">

                <td className="p-8">{teacher.name}</td>
                <td className="text-center">{teacher.subject}</td>
                <td className="text-center">{teacher.phone}</td>
                <td className="text-center">{teacher.experience}</td>

                <td className="text-center">

                  <span className={`px-3 py-1 rounded-full ${
                    teacher.status==="Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}>
                    {teacher.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">
                      Edit
                    </button>

                    <button className="bg-red-500 text-white px-3 py-2 rounded-lg">
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}