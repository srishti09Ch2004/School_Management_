// import { useState } from "react";

// export default function TeacherAttendance() {
// const [students, setStudents] = useState([
// {
// id: 1,
// roll: "101",
// name: "Rahul Sharma",
// status: "Present",
// },
// {
// id: 2,
// roll: "102",
// name: "Priya Singh",
// status: "Present",
// },
// {
// id: 3,
// roll: "103",
// name: "Ankit Verma",
// status: "Absent",
// },
// {
// id: 4,
// roll: "104",
// name: "Sneha Gupta",
// status: "Present",
// },
// ]);

// const updateAttendance = (id, status) => {
// setStudents(
// students.map((student) =>
// student.id === id
// ? { ...student, status }
// : student
// )
// );
// };

// return ( <div className="space-y-8">

// `
//   <div>
//     <h2 className="text-2xl font-bold text-gray-800">
//       Take Attendance
//     </h2>

//     <p className="text-gray-500 mt-2">
//       Mark today's student attendance.
//     </p>
//   </div>

//   <div className="bg-white rounded-3xl p-6 shadow">

//     <div className="grid md:grid-cols-3 gap-5">

//       <select className="border rounded-xl p-3 outline-none">
//         <option>Class 10-A</option>
//         <option>Class 9-B</option>
//         <option>Class 8-C</option>
//       </select>

//       <input
//         type="date"
//         className="border rounded-xl p-3 outline-none"
//       />

//       <button className="bg-green-600 text-white rounded-xl px-6">
//         Load Students
//       </button>

//     </div>

//   </div>

//   <div className="bg-white rounded-3xl p-6 shadow overflow-x-auto">

//     <table className="w-full">

//       <thead>
//         <tr className="border-b">
//           <th className="text-left py-4">
//             Roll No
//           </th>

//           <th className="text-left py-4">
//             Student Name
//           </th>

//           <th className="text-left py-4">
//             Attendance
//           </th>
//         </tr>
//       </thead>

//       <tbody>

//         {students.map((student) => (
//           <tr
//             key={student.id}
//             className="border-b"
//           >
//             <td className="py-5">
//               {student.roll}
//             </td>

//             <td className="py-5 font-medium">
//               {student.name}
//             </td>

//             <td className="py-5">
//               <div className="flex gap-3">

//                 <button
//                   onClick={() =>
//                     updateAttendance(
//                       student.id,
//                       "Present"
//                     )
//                   }
//                   className={`px-4 py-2 rounded-lg ${
//                     student.status === "Present"
//                       ? "bg-green-600 text-white"
//                       : "bg-gray-100"
//                   }`}
//                 >
//                   Present
//                 </button>

//                 <button
//                   onClick={() =>
//                     updateAttendance(
//                       student.id,
//                       "Absent"
//                     )
//                   }
//                   className={`px-4 py-2 rounded-lg ${
//                     student.status === "Absent"
//                       ? "bg-red-600 text-white"
//                       : "bg-gray-100"
//                   }`}
//                 >
//                   Absent
//                 </button>

//               </div>
//             </td>
//           </tr>
//         ))}

//       </tbody>

//     </table>

//     <div className="mt-8">
//       <button className="bg-green-600 text-white px-8 py-3 rounded-xl">
//         Save Attendance
//       </button>
//     </div>

//   </div>

// </div>


// );
// }













import { useState } from "react";
import {
  Fingerprint,
  ScanFace,
  Calendar,
  Users,
  UserCheck,
  UserX,
  Save,
  X,
} from "lucide-react";

export default function TeacherAttendance() {
  const [method, setMethod] =
    useState(null);

  const [teacherMarked, setTeacherMarked] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState("10-A");

  const data = {
    "10-A": [
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
        status: "Absent",
      },
      {
        id: 3,
        roll: "103",
        name: "Ankit Verma",
        status: "Present",
      },
      {
        id: 4,
        roll: "104",
        name: "Sneha Gupta",
        status: "Present",
      },
    ],

    "9-B": [
      {
        id: 5,
        roll: "201",
        name: "Aman Yadav",
        status: "Present",
      },
      {
        id: 6,
        roll: "202",
        name: "Neha Gupta",
        status: "Absent",
      },
    ],

    "8-C": [
      {
        id: 7,
        roll: "301",
        name: "Rohit Singh",
        status: "Present",
      },
      {
        id: 8,
        roll: "302",
        name: "Pooja Verma",
        status: "Present",
      },
    ],
  };

  const [students, setStudents] =
    useState(data["10-A"]);

  const changeClass = (value) => {
    setSelectedClass(value);
    setStudents(data[value]);
  };

  const updateAttendance = (
    id,
    status
  ) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, status }
          : student
      )
    );
  };

  const markTeacherAttendance = () => {
    setTeacherMarked(true);
    setMethod(null);
  };

  const total = students.length;

  const present = students.filter(
    (s) => s.status === "Present"
  ).length;

  const absent = students.filter(
    (s) => s.status === "Absent"
  ).length;

  return (
    <div className="space-y-6">
      {/* Heading */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Attendance Management
        </h2>

        <p className="text-gray-500 mt-1">
          Mark your attendance and manage
          students.
        </p>
      </div>

      {/* Teacher Attendance */}

      <div className="bg-white rounded-3xl border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg">
              Teacher Attendance
            </h3>

            <p className="text-gray-500 text-sm">
              Verify using biometrics.
            </p>
          </div>

          {teacherMarked && (
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              Present Today
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div
            onClick={() =>
              setMethod("face")
            }
            className="border rounded-3xl p-7 cursor-pointer hover:border-green-500 transition"
          >
            <ScanFace
              size={45}
              className="text-green-600"
            />

            <h3 className="font-semibold text-lg mt-5">
              Face Recognition
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Verify attendance using
              camera.
            </p>
          </div>

          <div
            onClick={() =>
              setMethod("finger")
            }
            className="border rounded-3xl p-7 cursor-pointer hover:border-blue-500 transition"
          >
            <Fingerprint
              size={45}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-lg mt-5">
              Fingerprint
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Verify attendance using
              fingerprint scanner.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border shadow-sm">
          <Users
            className="text-blue-600 mb-4"
            size={26}
          />

          <p className="text-gray-500 text-sm">
            Total Students
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {total}
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-5 border shadow-sm">
          <UserCheck
            className="text-green-600 mb-4"
            size={26}
          />

          <p className="text-gray-500 text-sm">
            Present
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {present}
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-5 border shadow-sm">
          <UserX
            className="text-red-600 mb-4"
            size={26}
          />

          <p className="text-gray-500 text-sm">
            Absent
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {absent}
          </h3>
        </div>
      </div>

      {/* Filters */}

      <div className="bg-white rounded-3xl border p-6 shadow-sm">
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={selectedClass}
            onChange={(e) =>
              changeClass(
                e.target.value
              )
            }
            className="border rounded-xl p-3 outline-none"
          >
            <option>10-A</option>
            <option>9-B</option>
            <option>8-C</option>
          </select>

          <input
            type="date"
            className="border rounded-xl p-3 outline-none"
          />

          <button className="border rounded-xl font-medium">
            Load Students
          </button>
        </div>
      </div>

      {/* Student Attendance */}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h3 className="font-semibold text-lg">
            Class {selectedClass}
          </h3>
        </div>

        <div className="divide-y">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between px-6 py-5"
            >
              <div>
                <h4 className="font-medium text-gray-800">
                  {student.name}
                </h4>

                <p className="text-sm text-gray-500">
                  Roll No. {student.roll}
                </p>
              </div>

              <div className="bg-gray-100 rounded-full p-1 flex">
                <button
                  onClick={() =>
                    updateAttendance(
                      student.id,
                      "Present"
                    )
                  }
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    student.status ===
                    "Present"
                      ? "bg-green-600 text-white"
                      : ""
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
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    student.status ===
                    "Absent"
                      ? "bg-red-600 text-white"
                      : ""
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t">
          <button className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-2xl flex items-center gap-2">
            <Save size={18} />
            Save Attendance
          </button>
        </div>
      </div>

      {/* Face Modal */}

      {method === "face" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[430px] rounded-3xl p-8">
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">
                Face Recognition
              </h3>

              <button
                onClick={() =>
                  setMethod(null)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 h-56 rounded-3xl bg-gray-100 flex items-center justify-center">
              <ScanFace
                size={70}
                className="text-green-600"
              />
            </div>

            <button
              onClick={
                markTeacherAttendance
              }
              className="w-full mt-8 bg-green-600 text-white py-3 rounded-2xl"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      )}

      {/* Finger Modal */}

      {method === "finger" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[430px] rounded-3xl p-8">
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">
                Fingerprint Scan
              </h3>

              <button
                onClick={() =>
                  setMethod(null)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 h-56 rounded-3xl bg-gray-100 flex items-center justify-center">
              <Fingerprint
                size={80}
                className="text-blue-600"
              />
            </div>

            <button
              onClick={
                markTeacherAttendance
              }
              className="w-full mt-8 bg-blue-600 text-white py-3 rounded-2xl"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}