import { useState } from "react";
import {
  Search,
  Save,
  Upload,
  Trophy,
  BookOpen,
} from "lucide-react";

export default function TeacherMarks() {
  const [search, setSearch] = useState("");

  const [students, setStudents] = useState([
    {
      id: 1,
      roll: "101",
      name: "Rahul Sharma",
      marks: 89,
    },
    {
      id: 2,
      roll: "102",
      name: "Priya Singh",
      marks: 92,
    },
    {
      id: 3,
      roll: "103",
      name: "Ankit Verma",
      marks: 76,
    },
    {
      id: 4,
      roll: "104",
      name: "Sneha Gupta",
      marks: 95,
    },
  ]);

  const updateMarks = (id, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              marks: Number(value),
            }
          : student
      )
    );
  };

  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    return "F";
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.roll.includes(search)
  );

  const topper = [...students].sort(
    (a, b) => b.marks - a.marks
  )[0];

  const average =
    students.reduce(
      (sum, s) => sum + s.marks,
      0
    ) / students.length;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Marks Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and publish student results
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Upload size={18} />
          Publish Result
        </button>
      </div>

      {/* Filters */}

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="grid md:grid-cols-4 gap-4">
          <select className="border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-100">
            <option>Class 10-A</option>
            <option>Class 9-B</option>
            <option>Class 8-C</option>
          </select>

          <select className="border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-100">
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
          </select>

          <select className="border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-100">
            <option>Unit Test</option>
            <option>Mid Term</option>
            <option>Final Exam</option>
          </select>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search Student..."
              className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Trophy size={20} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Class Topper
              </p>

              <h3 className="font-bold text-lg">
                {topper.name}
              </h3>

              <p className="text-green-600">
                {topper.marks}/100
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <BookOpen size={20} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Class Average
              </p>

              <h3 className="font-bold text-lg">
                {average.toFixed(1)}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Marksheet */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-gray-800">
            Student Marksheet
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  Roll No
                </th>

                <th className="text-left p-4">
                  Student Name
                </th>

                <th className="text-center p-4">
                  Marks
                </th>

                <th className="text-center p-4">
                  Percentage
                </th>

                <th className="text-center p-4">
                  Grade
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map(
                (student) => (
                  <tr
                    key={student.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {student.roll}
                    </td>

                    <td className="p-4 font-medium">
                      {student.name}
                    </td>

                    <td className="p-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.marks}
                        onChange={(e) =>
                          updateMarks(
                            student.id,
                            e.target.value
                          )
                        }
                        className="w-24 border border-gray-200 rounded-lg p-2 text-center outline-none focus:ring-2 focus:ring-green-100"
                      />
                    </td>

                    <td className="p-4 text-center font-medium">
                      {student.marks}%
                    </td>

                    <td className="p-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        {getGrade(
                          student.marks
                        )}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t flex justify-end gap-3">
          <button className="px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
            <Save size={18} />
            Save Draft
          </button>

          <button className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
            <Upload size={18} />
            Publish Result
          </button>
        </div>
      </div>
    </div>
  );
}