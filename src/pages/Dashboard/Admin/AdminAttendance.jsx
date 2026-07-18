
import { useState } from "react";
import {
  CalendarCheck,
  Search,
  Users,
  GraduationCap,
} from "lucide-react";

export default function AdminAttendance() {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [selectedDate, setSelectedDate] =
    useState(today);

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("students");

  const [students, setStudents] =
    useState([
      {
        id: 1,
        roll: "101",
        name: "Rahul Sharma",
        attendance: {},
      },
      {
        id: 2,
        roll: "102",
        name: "Priya Singh",
        attendance: {},
      },
      {
        id: 3,
        roll: "103",
        name: "Ankit Verma",
        attendance: {},
      },
      {
        id: 4,
        roll: "104",
        name: "Neha Gupta",
        attendance: {},
      },
      {
        id: 5,
        roll: "105",
        name: "Aman Yadav",
        attendance: {},
      },
    ]);

  const [teachers, setTeachers] =
    useState([
      {
        id: 1,
        name: "Amit Sir",
        subject: "Math",
        attendance: {},
      },
      {
        id: 2,
        name: "Neha Ma'am",
        subject: "Science",
        attendance: {},
      },
      {
        id: 3,
        name: "Rohit Sir",
        subject: "English",
        attendance: {},
      },
    ]);

  const data =
    activeTab === "students"
      ? students
      : teachers;

  const setData =
    activeTab === "students"
      ? setStudents
      : setTeachers;

  const toggleAttendance = (id) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id !== id)
          return item;

        const current =
          item.attendance[selectedDate];

        let next = "P";

        if (current === "P")
          next = "A";
        else if (current === "A")
          next = "L";
        else if (current === "L")
          next = "";

        return {
          ...item,
          attendance: {
            ...item.attendance,
            [selectedDate]: next,
          },
        };
      })
    );
  };

  const getColor = (value) => {
    if (value === "P")
      return "bg-green-100 text-green-700";

    if (value === "A")
      return "bg-red-100 text-red-700";

    if (value === "L")
      return "bg-yellow-100 text-yellow-700";

    return "bg-gray-100 text-gray-500";
  };

  const filteredData =
    data.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalPresent =
    data.filter(
      (item) =>
        item.attendance[
          selectedDate
        ] === "P"
    ).length;

  const totalAbsent =
    data.filter(
      (item) =>
        item.attendance[
          selectedDate
        ] === "A"
    ).length;

  const totalLeave =
    data.filter(
      (item) =>
        item.attendance[
          selectedDate
        ] === "L"
    ).length;

  const presentList =
    data.filter(
      (item) =>
        item.attendance[
          selectedDate
        ] === "P"
    );

  const absentList =
    data.filter(
      (item) =>
        item.attendance[
          selectedDate
        ] === "A"
    );

  const leaveList =
    data.filter(
      (item) =>
        item.attendance[
          selectedDate
        ] === "L"
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-7">
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Attendance Management
          </h1>

          <p className="text-gray-500 mt-1">
            Date Wise Student &
            Teacher Attendance
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() =>
            setActiveTab(
              "students"
            )
          }
          className={`px-5 py-3 rounded-xl flex items-center gap-2 ${
            activeTab ===
            "students"
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          <GraduationCap
            size={20}
          />
          Students
        </button>

        <button
          onClick={() =>
            setActiveTab(
              "teachers"
            )
          }
          className={`px-5 py-3 rounded-xl flex items-center gap-2 ${
            activeTab ===
            "teachers"
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          <Users size={20} />
          Teachers
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <p className="text-gray-500">
            Present
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {totalPresent}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <p className="text-gray-500">
            Absent
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">
            {totalAbsent}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <p className="text-gray-500">
            Leave
          </p>

          <h2 className="text-2xl font-bold text-yellow-500 mt-2">
            {totalLeave}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-5 rounded-3xl shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder={`Search ${activeTab}`}
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b flex items-center gap-3">
          <CalendarCheck
            className="text-green-600"
            size={22}
          />

          <h2 className="font-semibold text-lg">
            Attendance For{" "}
            {selectedDate}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                {activeTab ===
                  "students" && (
                  <th className="p-4 text-left">
                    Roll No
                  </th>
                )}

                {activeTab ===
                  "teachers" && (
                  <th className="p-4 text-left">
                    Subject
                  </th>
                )}

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Total Present
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map(
                (item) => {
                  const status =
                    item.attendance[
                      selectedDate
                    ] || "";

                  const total =
                    Object.values(
                      item.attendance
                    ).filter(
                      (x) =>
                        x ===
                        "P"
                    ).length;

                  return (
                    <tr
                      key={
                        item.id
                      }
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-4">
                        {item.name}
                      </td>

                      {activeTab ===
                        "students" && (
                        <td className="p-4">
                          {
                            item.roll
                          }
                        </td>
                      )}

                      {activeTab ===
                        "teachers" && (
                        <td className="p-4">
                          {
                            item.subject
                          }
                        </td>
                      )}

                      <td className="p-4 text-center">
                        <button
                          onClick={() =>
                            toggleAttendance(
                              item.id
                            )
                          }
                          className={`w-11 h-11 rounded-xl font-bold ${getColor(
                            status
                          )}`}
                        >
                          {status ||
                            "-"}
                        </button>
                      </td>

                      <td className="p-4 text-center font-bold text-green-600">
                        {total}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Date Wise Details */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-green-600 mb-4">
            Present (
            {presentList.length})
          </h3>

          <div className="space-y-2">
            {presentList.length ===
            0 ? (
              <p className="text-gray-500">
                No Records
              </p>
            ) : (
              presentList.map(
                (item) => (
                  <p
                    key={
                      item.id
                    }
                  >
                    {" "}
                    {
                      item.name
                    }
                  </p>
                )
              )
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-red-600 mb-4">
            Absent (
            {absentList.length})
          </h3>

          <div className="space-y-2">
            {absentList.length ===
            0 ? (
              <p className="text-gray-500">
                No Records
              </p>
            ) : (
              absentList.map(
                (item) => (
                  <p
                    key={
                      item.id
                    }
                  >
                    {" "}
                    {
                      item.name
                    }
                  </p>
                )
              )
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-yellow-600 mb-4">
            Leave (
            {leaveList.length})
          </h3>

          <div className="space-y-2">
            {leaveList.length ===
            0 ? (
              <p className="text-gray-500">
                No Records
              </p>
            ) : (
              leaveList.map(
                (item) => (
                  <p
                    key={
                      item.id
                    }
                  >
                    {" "}
                    {
                      item.name
                    }
                  </p>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}