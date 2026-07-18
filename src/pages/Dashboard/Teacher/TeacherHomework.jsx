import { useState } from "react";
import {
  BookOpen,
  Clock3,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Calendar,
  Users,
} from "lucide-react";

export default function TeacherHomework() {
  const [search, setSearch] = useState("");

  const homework = [
    {
      id: 1,
      title: "Chapter 5 Exercises",
      className: "10-A",
      subject: "Mathematics",
      due: "15 Jul 2026",
      submissions: 32,
      totalStudents: 40,
      status: "Active",
    },
    {
      id: 2,
      title: "Science Diagram",
      className: "9-B",
      subject: "Science",
      due: "16 Jul 2026",
      submissions: 18,
      totalStudents: 38,
      status: "Pending",
    },
    {
      id: 3,
      title: "Essay Writing",
      className: "8-C",
      subject: "English",
      due: "18 Jul 2026",
      submissions: 40,
      totalStudents: 40,
      status: "Completed",
    },
  ];

  const filteredHomework = homework.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.className.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    {
      title: "Total Homework",
      value: "24",
      icon: <BookOpen size={20} />,
    },
    {
      title: "Pending Review",
      value: "08",
      icon: <Clock3 size={20} />,
    },
    {
      title: "Submissions",
      value: "142",
      icon: <Users size={20} />,
    },
    {
      title: "Due Today",
      value: "03",
      icon: <Calendar size={20} />,
    },
  ];

  const getStatusColor = (status) => {
    if (status === "Completed")
      return "bg-green-100 text-green-700";

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";

    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Homework Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create and manage assignments
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
          <Plus size={18} />
          Create Homework
        </button>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {item.value}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search homework..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500"
          />
        </div>
      </div>

      {/* Homework List */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-gray-800">
            Homework List
          </h2>
        </div>

        {filteredHomework.map((item) => (
          <div
            key={item.id}
            className="p-4 border-b hover:bg-gray-50 transition"
          >
           <div className="flex items-start gap-6">
              <div className="flex-1 pl-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex gap-9 text-sm text-gray-500 mt-3 flex-wrap">
                  <span>
                    {item.subject}
                  </span>

                  <span>
                    Class {item.className}
                  </span>

                  <span>
                    Due : {item.due}
                  </span>
                </div>

                <div className="mt-4 max-w-sm">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>
                      Submission
                    </span>

                    <span>
                      {item.submissions}/
                      {item.totalStudents}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (item.submissions /
                            item.totalStudents) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-1 ml-auto pr-3">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Eye size={16} />
                </button>

                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Pencil size={16} />
                </button>

                <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity */}

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium">
              10-A Submitted Homework
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              32 students submitted
              Mathematics homework.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium">
              Homework Due Tomorrow
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              Science Diagram assignment
              is due tomorrow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}