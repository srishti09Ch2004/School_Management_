import { useState } from "react";
import {
  Users,
  CalendarCheck,
  IndianRupee,
  Trophy,
} from "lucide-react";

export default function PrincipalStudents() {
  const [selectedClass, setSelectedClass] = useState("All");

  const students = [
    {
      name: "Rahul Sharma",
      class: "10-A",
      attendance: "95%",
      fees: "Paid",
      result: "96%",
      performance: "Excellent",
    },
    {
      name: "Priya Singh",
      class: "10-B",
      attendance: "93%",
      fees: "Pending",
      result: "94%",
      performance: "Excellent",
    },
    {
      name: "Ankit Verma",
      class: "9-C",
      attendance: "91%",
      fees: "Paid",
      result: "92%",
      performance: "Very Good",
    },
    {
      name: "Aarav Gupta",
      class: "8-A",
      attendance: "97%",
      fees: "Paid",
      result: "98%",
      performance: "Outstanding",
    },
    {
      name: "Riya Sharma",
      class: "10-A",
      attendance: "92%",
      fees: "Paid",
      result: "90%",
      performance: "Very Good",
    },
    {
      name: "Aryan Singh",
      class: "9-C",
      attendance: "89%",
      fees: "Pending",
      result: "87%",
      performance: "Good",
    },
  ];

  const classes = [
    "All",
    ...new Set(students.map((item) => item.class)),
  ];

  const filteredStudents =
    selectedClass === "All"
      ? students
      : students.filter(
          (student) =>
            student.class === selectedClass
        );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Students Overview
      </h2>

      {/* Top Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Total Students
              </p>

              <h3 className="text-3xl font-bold mt-2">
                50
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Avg Attendance
              </p>

              <h3 className="text-3xl font-bold mt-2">
                95%
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Pending Fees
              </p>

              <h3 className="text-3xl font-bold mt-2">
                ₹40,000
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <IndianRupee size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Overall Result
              </p>

              <h3 className="text-3xl font-bold mt-2">
                92%
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Trophy size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Student Records */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-bold">
            Student Records
          </h3>

          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(
                e.target.value
              )
            }
            className="border border-gray-200 rounded-xl px-4 py-2 outline-none text-sm"
          >
            {classes.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Student
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Class
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Attendance
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Fees
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Result
                </th>

                <th className="text-left py-4 px-5 text-sm text-gray-500">
                  Performance
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map(
                (student, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-5 font-medium">
                      {student.name}
                    </td>

                    <td className="py-4 px-5">
                      {student.class}
                    </td>

                    <td className="py-4 px-5 text-green-600 font-semibold">
                      {student.attendance}
                    </td>

                    <td className="py-4 px-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.fees ===
                          "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.fees}
                      </span>
                    </td>

                    <td className="py-4 px-5 font-semibold text-blue-600">
                      {student.result}
                    </td>

                    <td className="py-4 px-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.performance ===
                          "Outstanding"
                            ? "bg-purple-100 text-purple-700"
                            : student.performance ===
                              "Excellent"
                            ? "bg-green-100 text-green-700"
                            : student.performance ===
                              "Very Good"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {student.performance}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {filteredStudents.length}
            </span>{" "}
            students
            {selectedClass !== "All" &&
              ` from ${selectedClass}`}
            .
          </p>
        </div>
      </div>
    </div>
  );
}