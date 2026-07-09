import { useState } from "react";

export default function TeacherAttendance() {
const [students, setStudents] = useState([
{
id: 1,
roll: "101",
name: "Rahul Sharma",
status: "Present",
},
{
id: 2,
roll: "102",
name: "Priya Singh",
status: "Present",
},
{
id: 3,
roll: "103",
name: "Ankit Verma",
status: "Absent",
},
{
id: 4,
roll: "104",
name: "Sneha Gupta",
status: "Present",
},
]);

const updateAttendance = (id, status) => {
setStudents(
students.map((student) =>
student.id === id
? { ...student, status }
: student
)
);
};

return ( <div className="space-y-8">

`
  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      Take Attendance
    </h2>

    <p className="text-gray-500 mt-2">
      Mark today's student attendance.
    </p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow">

    <div className="grid md:grid-cols-3 gap-5">

      <select className="border rounded-xl p-3 outline-none">
        <option>Class 10-A</option>
        <option>Class 9-B</option>
        <option>Class 8-C</option>
      </select>

      <input
        type="date"
        className="border rounded-xl p-3 outline-none"
      />

      <button className="bg-green-600 text-white rounded-xl px-6">
        Load Students
      </button>

    </div>

  </div>

  <div className="bg-white rounded-3xl p-6 shadow overflow-x-auto">

    <table className="w-full">

      <thead>
        <tr className="border-b">
          <th className="text-left py-4">
            Roll No
          </th>

          <th className="text-left py-4">
            Student Name
          </th>

          <th className="text-left py-4">
            Attendance
          </th>
        </tr>
      </thead>

      <tbody>

        {students.map((student) => (
          <tr
            key={student.id}
            className="border-b"
          >
            <td className="py-5">
              {student.roll}
            </td>

            <td className="py-5 font-medium">
              {student.name}
            </td>

            <td className="py-5">
              <div className="flex gap-3">

                <button
                  onClick={() =>
                    updateAttendance(
                      student.id,
                      "Present"
                    )
                  }
                  className={`px-4 py-2 rounded-lg ${
                    student.status === "Present"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  Present
                </button>

                <button
                  onClick={() =>
                    updateAttendance(
                      student.id,
                      "Absent"
                    )
                  }
                  className={`px-4 py-2 rounded-lg ${
                    student.status === "Absent"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  Absent
                </button>

              </div>
            </td>
          </tr>
        ))}

      </tbody>

    </table>

    <div className="mt-8">
      <button className="bg-green-600 text-white px-8 py-3 rounded-xl">
        Save Attendance
      </button>
    </div>

  </div>

</div>


);
}
