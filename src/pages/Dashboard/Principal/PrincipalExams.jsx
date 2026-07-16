import { useState } from "react";
import {
  FileText,
  Award,
  ClipboardCheck,
  TrendingUp,
  Search,
} from "lucide-react";

export default function PrincipalExams() {
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const exams = [
    {
      exam: "Unit Test - I",
      class: "10-A",
      date: "15 July 2026",
      status: "Completed",
    },
    {
      exam: "Half Yearly Examination",
      class: "9-B",
      date: "22 August 2026",
      status: "Upcoming",
    },
    {
      exam: "Practical Examination",
      class: "12-A",
      date: "28 July 2026",
      status: "Scheduled",
    },
    {
      exam: "Final Examination",
      class: "11-B",
      date: "10 December 2026",
      status: "Upcoming",
    },
    {
      exam: "Periodic Test - II",
      class: "8-A",
      date: "05 September 2026",
      status: "Scheduled",
    },
    {
      exam: "Monthly Test",
      class: "10-A",
      date: "12 August 2026",
      status: "Completed",
    },
  ];

  const filteredExams = exams.filter((item) => {
    const classMatch =
      selectedClass === "All" ||
      item.class === selectedClass;

    const statusMatch =
      selectedStatus === "All" ||
      item.status === selectedStatus;

    return classMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Examination Management
      </h2>

      {/* Top Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Exams
              </p>

              <h3 className="text-xl font-bold mt-2">
                12
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h3 className="text-xl font-bold mt-2">
                7
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <ClipboardCheck size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Upcoming
              </p>

              <h3 className="text-xl font-bold mt-2">
                5
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Award size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Pass Rate
              </p>

              <h3 className="text-xl font-bold mt-2">
                95%
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header + Filters */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h3 className="text-lg font-bold">
            Examination Schedule
          </h3>

          <div className="flex flex-wrap gap-3">
            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(e.target.value)
              }
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none"
            >
              <option>All</option>
              <option>8-A</option>
              <option>9-B</option>
              <option>10-A</option>
              <option>11-B</option>
              <option>12-A</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Upcoming</option>
              <option>Scheduled</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm">
              <Search size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Examination
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Class
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Date
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredExams.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-5 font-medium">
                    {item.exam}
                  </td>

                  <td className="py-4 px-5">
                    {item.class}
                  </td>

                  <td className="py-4 px-5">
                    {item.date}
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredExams.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-gray-500"
                  >
                    No examinations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Summary */}
        <div className="grid md:grid-cols-3 gap-4 p-5 bg-gray-50 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">
              Next Examination
            </p>

            <p className="font-semibold text-sm mt-1">
              Half Yearly Examination
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Highest Pass Percentage
            </p>

            <p className="font-semibold text-sm mt-1">
              Class 10-A (98%)
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Results Published
            </p>

            <p className="font-semibold text-sm mt-1">
              7 / 12 Exams
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}