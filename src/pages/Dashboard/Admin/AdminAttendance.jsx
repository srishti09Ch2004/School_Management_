// // import { useState } from "react";
// // import {
// //   CalendarCheck,
// //   Download,
// //   Search,
// // } from "lucide-react";

// // export default function AdminAttendance() {
// //   const dates = Array.from(
// //     { length: 10 },
// //     (_, i) => i + 1
// //   );

// //   const [search, setSearch] =
// //     useState("");

// //   const [students, setStudents] =
// //     useState([
// //       {
// //         id: 1,
// //         roll: "101",
// //         name: "Rahul Sharma",
// //         attendance: {},
// //       },
// //       {
// //         id: 2,
// //         roll: "102",
// //         name: "Priya Singh",
// //         attendance: {},
// //       },
// //       {
// //         id: 3,
// //         roll: "103",
// //         name: "Ankit Verma",
// //         attendance: {},
// //       },
// //       {
// //         id: 4,
// //         roll: "104",
// //         name: "Neha Gupta",
// //         attendance: {},
// //       },
// //       {
// //         id: 5,
// //         roll: "105",
// //         name: "Aman Yadav",
// //         attendance: {},
// //       },
// //     ]);

// //   const toggleAttendance = (
// //     studentId,
// //     date
// //   ) => {
// //     setStudents((prev) =>
// //       prev.map((student) => {
// //         if (student.id !== studentId)
// //           return student;

// //         const current =
// //           student.attendance[date];

// //         let next = "P";

// //         if (current === "P")
// //           next = "A";
// //         else if (current === "A")
// //           next = "L";
// //         else if (current === "L")
// //           next = "";

// //         return {
// //           ...student,
// //           attendance: {
// //             ...student.attendance,
// //             [date]: next,
// //           },
// //         };
// //       })
// //     );
// //   };

// //   const getColor = (value) => {
// //     if (value === "P")
// //       return "bg-green-100 text-green-700";

// //     if (value === "A")
// //       return "bg-red-100 text-red-700";

// //     if (value === "L")
// //       return "bg-yellow-100 text-yellow-700";

// //     return "bg-gray-100 text-gray-500";
// //   };

// //   const filteredStudents =
// //     students.filter(
// //       (student) =>
// //         student.name
// //           .toLowerCase()
// //           .includes(
// //             search.toLowerCase()
// //           ) ||
// //         student.roll.includes(search)
// //     );

// //   const exportAttendance = () => {
// //     const headers = [
// //       "Roll No",
// //       "Student Name",
// //       ...dates.map(
// //         (d) => `Day ${d}`
// //       ),
// //     ];

// //     const rows = students.map(
// //       (student) => [
// //         student.roll,
// //         student.name,
// //         ...dates.map(
// //           (d) =>
// //             student.attendance[d] ||
// //             "-"
// //         ),
// //       ]
// //     );

// //     const csvContent = [
// //       headers.join(","),
// //       ...rows.map((r) =>
// //         r.join(",")
// //       ),
// //     ].join("\n");

// //     const blob = new Blob(
// //       [csvContent],
// //       {
// //         type:
// //           "text/csv;charset=utf-8;",
// //       }
// //     );

// //     const url =
// //       window.URL.createObjectURL(
// //         blob
// //       );

// //     const link =
// //       document.createElement("a");

// //     link.href = url;
// //     link.download =
// //       "attendance-sheet.csv";

// //     link.click();
// //   };

// //   const totalPresent =
// //     students.reduce(
// //       (acc, student) =>
// //         acc +
// //         Object.values(
// //           student.attendance
// //         ).filter(
// //           (x) => x === "P"
// //         ).length,
// //       0
// //     );

// //   const totalAbsent =
// //     students.reduce(
// //       (acc, student) =>
// //         acc +
// //         Object.values(
// //           student.attendance
// //         ).filter(
// //           (x) => x === "A"
// //         ).length,
// //       0
// //     );

// //   const totalLeave =
// //     students.reduce(
// //       (acc, student) =>
// //         acc +
// //         Object.values(
// //           student.attendance
// //         ).filter(
// //           (x) => x === "L"
// //         ).length,
// //       0
// //     );

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}

// //       <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-800">
// //             Attendance Sheet
// //           </h1>

// //           <p className="text-gray-500 mt-1">
// //             Excel Style Attendance
// //             Management
// //           </p>
// //         </div>

// //         <button
// //           onClick={
// //             exportAttendance
// //           }
// //           className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
// //         >
// //           <Download size={18} />
// //           Export Excel
// //         </button>
// //       </div>

// //       {/* Stats */}

// //       <div className="grid md:grid-cols-3 gap-5">
// //         <div className="bg-white rounded-3xl p-5 shadow-sm border">
// //           <p className="text-gray-500">
// //             Present
// //           </p>

// //           <h2 className="text-3xl font-bold text-green-600 mt-2">
// //             {totalPresent}
// //           </h2>
// //         </div>

// //         <div className="bg-white rounded-3xl p-5 shadow-sm border">
// //           <p className="text-gray-500">
// //             Absent
// //           </p>

// //           <h2 className="text-3xl font-bold text-red-600 mt-2">
// //             {totalAbsent}
// //           </h2>
// //         </div>

// //         <div className="bg-white rounded-3xl p-5 shadow-sm border">
// //           <p className="text-gray-500">
// //             Leave
// //           </p>

// //           <h2 className="text-3xl font-bold text-yellow-500 mt-2">
// //             {totalLeave}
// //           </h2>
// //         </div>
// //       </div>

// //       {/* Search */}

// //       <div className="bg-white p-5 rounded-3xl shadow-sm border">
// //         <div className="relative max-w-md">
// //           <Search
// //             size={18}
// //             className="absolute left-4 top-4 text-gray-400"
// //           />

// //           <input
// //             value={search}
// //             onChange={(e) =>
// //               setSearch(
// //                 e.target.value
// //               )
// //             }
// //             placeholder="Search Student..."
// //             className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
// //           />
// //         </div>
// //       </div>

// //       {/* Table */}

// //       <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
// //         <div className="p-5 border-b flex items-center gap-3">
// //           <CalendarCheck
// //             className="text-green-600"
// //             size={22}
// //           />

// //           <h2 className="font-semibold text-lg">
// //             Monthly Attendance
// //             Sheet
// //           </h2>
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="min-w-max w-full">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="sticky left-0 bg-gray-50 p-4 text-left min-w-[90px] z-20">
// //                   Roll
// //                 </th>

// //                 <th className="sticky left-[90px] bg-gray-50 p-4 text-left min-w-[220px] z-20">
// //                   Student Name
// //                 </th>

// //                 {dates.map(
// //                   (date) => (
// //                     <th
// //                       key={date}
// //                       className="p-4 text-center min-w-[60px]"
// //                     >
// //                       {date}
// //                     </th>
// //                   )
// //                 )}
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {filteredStudents.map(
// //                 (student) => (
// //                   <tr
// //                     key={
// //                       student.id
// //                     }
// //                     className="border-t hover:bg-gray-50"
// //                   >
// //                     <td className="sticky left-0 bg-white p-4 font-medium z-10">
// //                       {
// //                         student.roll
// //                       }
// //                     </td>

// //                     <td className="sticky left-[90px] bg-white p-4 z-10">
// //                       {
// //                         student.name
// //                       }
// //                     </td>

// //                     {dates.map(
// //                       (date) => {
// //                         const value =
// //                           student
// //                             .attendance[
// //                             date
// //                           ] ||
// //                           "";

// //                         return (
// //                           <td
// //                             key={
// //                               date
// //                             }
// //                             className="p-2 text-center"
// //                           >
// //                             <button
// //                               onClick={() =>
// //                                 toggleAttendance(
// //                                   student.id,
// //                                   date
// //                                 )
// //                               }
// //                               className={`w-10 h-10 rounded-lg font-bold transition ${getColor(
// //                                 value
// //                               )}`}
// //                             >
// //                               {value ||
// //                                 "-"}
// //                             </button>
// //                           </td>
// //                         );
// //                       }
// //                     )}
// //                   </tr>
// //                 )
// //               )}

// //               {filteredStudents.length ===
// //                 0 && (
// //                 <tr>
// //                   <td
// //                     colSpan={
// //                       dates.length +
// //                       2
// //                     }
// //                     className="text-center p-10 text-gray-500"
// //                   >
// //                     No Student Found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Legend */}

// //       <div className="bg-white p-5 rounded-3xl shadow-sm border">
// //         <div className="flex gap-6 flex-wrap text-sm">
// //           <div className="flex items-center gap-2">
// //             <div className="w-5 h-5 rounded bg-green-100"></div>
// //             Present (P)
// //           </div>

// //           <div className="flex items-center gap-2">
// //             <div className="w-5 h-5 rounded bg-red-100"></div>
// //             Absent (A)
// //           </div>

// //           <div className="flex items-center gap-2">
// //             <div className="w-5 h-5 rounded bg-yellow-100"></div>
// //             Leave (L)
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }











// import { useState } from "react";
// import {
//   CalendarCheck,
//   Download,
//   Search,
// } from "lucide-react";

// export default function AdminAttendance() {
//   const dates = Array.from(
//     { length: 10 },
//     (_, i) => i + 1
//   );

//   const [search, setSearch] = useState("");
//   const [selectedDate, setSelectedDate] =
//     useState(1);

//   const [students, setStudents] =
//     useState([
//       {
//         id: 1,
//         roll: "101",
//         name: "Rahul Sharma",
//         attendance: {},
//       },
//       {
//         id: 2,
//         roll: "102",
//         name: "Priya Singh",
//         attendance: {},
//       },
//       {
//         id: 3,
//         roll: "103",
//         name: "Ankit Verma",
//         attendance: {},
//       },
//       {
//         id: 4,
//         roll: "104",
//         name: "Neha Gupta",
//         attendance: {},
//       },
//       {
//         id: 5,
//         roll: "105",
//         name: "Aman Yadav",
//         attendance: {},
//       },
//     ]);

//   const toggleAttendance = (
//     studentId,
//     date
//   ) => {
//     setStudents((prev) =>
//       prev.map((student) => {
//         if (student.id !== studentId)
//           return student;

//         const current =
//           student.attendance[date];

//         let next = "P";

//         if (current === "P")
//           next = "A";
//         else if (current === "A")
//           next = "L";
//         else if (current === "L")
//           next = "";

//         return {
//           ...student,
//           attendance: {
//             ...student.attendance,
//             [date]: next,
//           },
//         };
//       })
//     );
//   };

//   const getColor = (value) => {
//     if (value === "P")
//       return "bg-green-100 text-green-700";

//     if (value === "A")
//       return "bg-red-100 text-red-700";

//     if (value === "L")
//       return "bg-yellow-100 text-yellow-700";

//     return "bg-gray-100 text-gray-500";
//   };

//   const filteredStudents =
//     students.filter(
//       (student) =>
//         student.name
//           .toLowerCase()
//           .includes(
//             search.toLowerCase()
//           ) ||
//         student.roll.includes(search)
//     );

//   const totalPresent =
//     students.filter(
//       (student) =>
//         student.attendance[
//           selectedDate
//         ] === "P"
//     ).length;

//   const totalAbsent =
//     students.filter(
//       (student) =>
//         student.attendance[
//           selectedDate
//         ] === "A"
//     ).length;

//   const totalLeave =
//     students.filter(
//       (student) =>
//         student.attendance[
//           selectedDate
//         ] === "L"
//     ).length;

//   const exportAttendance = () => {
//     const headers = [
//       "Roll No",
//       "Student Name",
//       ...dates.map(
//         (d) => `Day ${d}`
//       ),
//       "Total Present",
//     ];

//     const rows = students.map(
//       (student) => [
//         student.roll,
//         student.name,
//         ...dates.map(
//           (d) =>
//             student.attendance[d] ||
//             "-"
//         ),
//         Object.values(
//           student.attendance
//         ).filter(
//           (x) => x === "P"
//         ).length,
//       ]
//     );

//     const csvContent = [
//       headers.join(","),
//       ...rows.map((r) =>
//         r.join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob(
//       [csvContent],
//       {
//         type:
//           "text/csv;charset=utf-8;",
//       }
//     );

//     const url =
//       window.URL.createObjectURL(
//         blob
//       );

//     const link =
//       document.createElement("a");

//     link.href = url;
//     link.download =
//       "attendance-sheet.csv";

//     link.click();
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white p-6 rounded-3xl shadow-sm border flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Attendance Sheet
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Monthly Attendance
//             Management
//           </p>
//         </div>

//         <button
//           onClick={
//             exportAttendance
//           }
//           className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
//         >
//           <Download size={18} />
//           Export Excel
//         </button>
//       </div>

//       {/* Date Selector */}
//       <div className="bg-white p-5 rounded-3xl shadow-sm border flex items-center gap-4">
//         <label className="font-semibold">
//           Select Date :
//         </label>

//         <select
//           value={selectedDate}
//           onChange={(e) =>
//             setSelectedDate(
//               Number(
//                 e.target.value
//               )
//             )
//           }
//           className="border rounded-xl px-4 py-2 outline-none"
//         >
//           {dates.map((date) => (
//             <option
//               key={date}
//               value={date}
//             >
//               Day {date}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Selected Day Stats */}
//       <div className="grid md:grid-cols-3 gap-5">
//         <div className="bg-white rounded-3xl p-5 shadow-sm border">
//           <p className="text-gray-500">
//             Present on Day{" "}
//             {selectedDate}
//           </p>

//           <h2 className="text-3xl font-bold text-green-600 mt-2">
//             {totalPresent}
//           </h2>
//         </div>

//         <div className="bg-white rounded-3xl p-5 shadow-sm border">
//           <p className="text-gray-500">
//             Absent on Day{" "}
//             {selectedDate}
//           </p>

//           <h2 className="text-3xl font-bold text-red-600 mt-2">
//             {totalAbsent}
//           </h2>
//         </div>

//         <div className="bg-white rounded-3xl p-5 shadow-sm border">
//           <p className="text-gray-500">
//             Leave on Day{" "}
//             {selectedDate}
//           </p>

//           <h2 className="text-3xl font-bold text-yellow-500 mt-2">
//             {totalLeave}
//           </h2>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="bg-white p-5 rounded-3xl shadow-sm border">
//         <div className="relative max-w-md">
//           <Search
//             size={18}
//             className="absolute left-4 top-4 text-gray-400"
//           />

//           <input
//             value={search}
//             onChange={(e) =>
//               setSearch(
//                 e.target.value
//               )
//             }
//             placeholder="Search Student..."
//             className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
//         <div className="p-5 border-b flex items-center gap-3">
//           <CalendarCheck
//             className="text-green-600"
//             size={22}
//           />

//           <h2 className="font-semibold text-lg">
//             Monthly Attendance
//             Sheet
//           </h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-max w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="sticky left-0 bg-gray-50 p-4 text-left min-w-[90px] z-20">
//                   Roll
//                 </th>

//                 <th className="sticky left-[90px] bg-gray-50 p-4 text-left min-w-[220px] z-20">
//                   Student Name
//                 </th>

//                 {dates.map(
//                   (date) => (
//                     <th
//                       key={date}
//                       className="p-4 text-center min-w-[60px]"
//                     >
//                       {date}
//                     </th>
//                   )
//                 )}

//                 <th className="p-4 text-center min-w-[140px]">
//                   Total Present
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredStudents.map(
//                 (student) => (
//                   <tr
//                     key={
//                       student.id
//                     }
//                     className="border-t hover:bg-gray-50"
//                   >
//                     <td className="sticky left-0 bg-white p-4 font-medium z-10">
//                       {
//                         student.roll
//                       }
//                     </td>

//                     <td className="sticky left-[90px] bg-white p-4 z-10">
//                       {
//                         student.name
//                       }
//                     </td>

//                     {dates.map(
//                       (date) => {
//                         const value =
//                           student
//                             .attendance[
//                             date
//                           ] || "";

//                         return (
//                           <td
//                             key={
//                               date
//                             }
//                             className="p-2 text-center"
//                           >
//                             <button
//                               onClick={() =>
//                                 toggleAttendance(
//                                   student.id,
//                                   date
//                                 )
//                               }
//                               className={`w-10 h-10 rounded-lg font-bold transition ${getColor(
//                                 value
//                               )}`}
//                             >
//                               {value ||
//                                 "-"}
//                             </button>
//                           </td>
//                         );
//                       }
//                     )}

//                     <td className="p-4 text-center font-bold text-green-600">
//                       {
//                         Object.values(
//                           student.attendance
//                         ).filter(
//                           (x) =>
//                             x ===
//                             "P"
//                         ).length
//                       }
//                     </td>
//                   </tr>
//                 )
//               )}

//               {filteredStudents.length ===
//                 0 && (
//                 <tr>
//                   <td
//                     colSpan={
//                       dates.length +
//                       3
//                     }
//                     className="text-center p-10 text-gray-500"
//                   >
//                     No Student Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="bg-white p-5 rounded-3xl shadow-sm border">
//         <div className="flex gap-6 flex-wrap text-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-5 h-5 rounded bg-green-100"></div>
//             Present (P)
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-5 h-5 rounded bg-red-100"></div>
//             Absent (A)
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-5 h-5 rounded bg-yellow-100"></div>
//             Leave (L)
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













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
          className={`px-5 py-7 rounded-xl flex items-center gap-2 ${
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

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {totalPresent}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <p className="text-gray-500">
            Absent
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {totalAbsent}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <p className="text-gray-500">
            Leave
          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">
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
                          className={`w-12 h-12 rounded-xl font-bold ${getColor(
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