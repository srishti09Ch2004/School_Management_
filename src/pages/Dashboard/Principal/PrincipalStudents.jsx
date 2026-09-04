// import { useState } from "react";
// import {
//   Users,
//   CalendarCheck,
//   IndianRupee,
//   Trophy,
// } from "lucide-react";

// export default function PrincipalStudents() {
//   const [selectedClass, setSelectedClass] = useState("All");

//   const students = [
//     {
//       name: "Rahul Sharma",
//       class: "10-A",
//       attendance: "95%",
//       fees: "Paid",
//       result: "96%",
//       performance: "Excellent",
//     },
//     {
//       name: "Priya Singh",
//       class: "10-B",
//       attendance: "93%",
//       fees: "Pending",
//       result: "94%",
//       performance: "Excellent",
//     },
//     {
//       name: "Ankit Verma",
//       class: "9-C",
//       attendance: "91%",
//       fees: "Paid",
//       result: "92%",
//       performance: "Very Good",
//     },
//     {
//       name: "Aarav Gupta",
//       class: "8-A",
//       attendance: "97%",
//       fees: "Paid",
//       result: "98%",
//       performance: "Outstanding",
//     },
//     {
//       name: "Riya Sharma",
//       class: "10-A",
//       attendance: "92%",
//       fees: "Paid",
//       result: "90%",
//       performance: "Very Good",
//     },
//     {
//       name: "Aryan Singh",
//       class: "9-C",
//       attendance: "89%",
//       fees: "Pending",
//       result: "87%",
//       performance: "Good",
//     },
//   ];

//   const classes = [
//     "All",
//     ...new Set(students.map((item) => item.class)),
//   ];

//   const filteredStudents =
//     selectedClass === "All"
//       ? students
//       : students.filter(
//           (student) =>
//             student.class === selectedClass
//         );

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">
//         Students Overview
//       </h2>

//       {/* Top Cards */}
//       <div className="grid md:grid-cols-4 gap-5">
//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Total Students
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 50
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//               <Users size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Avg Attendance
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 95%
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
//               <CalendarCheck size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Pending Fees
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 ₹40,000
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
//               <IndianRupee size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Overall Result
//               </p>

//               <h3 className="text-xl font-bold mt-2">
//                 92%
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
//               <Trophy size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Student Records */}
//       <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
//         <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <h3 className="text-lg font-bold">
//             Student Records
//           </h3>

//           {/* Class Filter */}
//           <select
//             value={selectedClass}
//             onChange={(e) =>
//               setSelectedClass(
//                 e.target.value
//               )
//             }
//             className="border border-gray-200 rounded-xl px-4 py-2 outline-none text-sm"
//           >
//             {classes.map((item) => (
//               <option
//                 key={item}
//                 value={item}
//               >
//                 {item}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Student
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Class
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Attendance
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Fees
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Result
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Performance
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredStudents.map(
//                 (student, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="py-4 px-5 font-medium">
//                       {student.name}
//                     </td>

//                     <td className="py-4 px-5">
//                       {student.class}
//                     </td>

//                     <td className="py-4 px-5 text-green-600 font-semibold">
//                       {student.attendance}
//                     </td>

//                     <td className="py-4 px-5">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           student.fees ===
//                           "Paid"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {student.fees}
//                       </span>
//                     </td>

//                     <td className="py-4 px-5 font-semibold text-blue-600">
//                       {student.result}
//                     </td>

//                     <td className="py-4 px-5">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           student.performance ===
//                           "Outstanding"
//                             ? "bg-purple-100 text-purple-700"
//                             : student.performance ===
//                               "Excellent"
//                             ? "bg-green-100 text-green-700"
//                             : student.performance ===
//                               "Very Good"
//                             ? "bg-blue-100 text-blue-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {student.performance}
//                       </span>
//                     </td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="p-5 bg-gray-50 border-t border-gray-100">
//           <p className="text-sm text-gray-600">
//             Showing{" "}
//             <span className="font-semibold">
//               {filteredStudents.length}
//             </span>{" "}
//             students
//             {selectedClass !== "All" &&
//               ` from ${selectedClass}`}
//             .
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }











import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  CalendarCheck,
  IndianRupee,
  Trophy,
  RefreshCw,
} from "lucide-react";

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin";

const getArrayFromResponse = (result) => {
  if (!result) return [];

  if (Array.isArray(result)) return result;

  if (Array.isArray(result.data)) return result.data;

  if (Array.isArray(result.data?.students))
    return result.data.students;

  if (Array.isArray(result.data?.fees))
    return result.data.fees;

  if (Array.isArray(result.data?.attendance))
    return result.data.attendance;

  if (Array.isArray(result.students))
    return result.students;

  if (Array.isArray(result.fees))
    return result.fees;

  if (Array.isArray(result.attendance))
    return result.attendance;

  return [];
};

const formatCurrency = (value) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? `₹${number.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })}`
    : "₹0";
};

const formatDate = (value) => {
  if (!value) return "N/A";

  const parts = String(value).slice(0, 10).split("-");

  if (parts.length !== 3) {
    return value;
  }

  const [year, month, day] = parts;

  return `${day}-${month}-${year}`;
};

const normalizeStudent = (student) => ({
  id: student?.id ?? student?.student_id ?? "",
  userId: student?.user_id ?? "",

  name:
    student?.full_name ||
    student?.name ||
    student?.student_name ||
    "Unknown Student",

  className:
    student?.class ||
    student?.class_name ||
    "-",

  section: student?.section || "",

  rollNo:
    student?.roll_no ||
    "-",

  gender:
    student?.gender ||
    "-",

  admissionNo:
    student?.admission_no ||
    student?.admission_number ||
    "-",

  admissionDate:
    student?.admission_date ||
    "",

  status:
    student?.status ||
    "Active",
});

const normalizeAttendance = (item) => ({
  studentId:
    item?.student_id ||
    item?.studentId ||
    "",

  date:
    item?.attendance_date ||
    item?.date ||
    "",

  status:
    item?.status ||
    "",
});

const normalizeFee = (fee) => ({
  studentId:
    fee?.student_id ||
    "",

  due:
    Number(
      fee?.due_fee ??
      fee?.pending_fee ??
      0
    ),
});

export default function PrincipalStudents() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [fees, setFees] = useState([]);

  const [selectedClass, setSelectedClass] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const fetchAPI = async (endpoint) => {
    const response = await fetch(
      `${API}/${endpoint}`
    );

    if (!response.ok) {
      throw new Error(
        `${endpoint} returned ${response.status}`
      );
    }

    const result = await response.json();

    if (result?.status === false) {
      throw new Error(
        result?.message ||
          `${endpoint} failed`
      );
    }

    return result;
  };

  const loadStudents = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) {
          setRefreshing(true);
        }

        const results =
          await Promise.allSettled([
            fetchAPI("students.php"),
            fetchAPI("attendance.php"),
            fetchAPI("fees.php"),
          ]);

        // STUDENTS

        if (
          results[0].status ===
          "fulfilled"
        ) {
          setStudents(
            getArrayFromResponse(
              results[0].value
            )
          );
        } else {
          console.error(
            "Principal Students API:",
            results[0].reason
          );

          setStudents([]);
        }

        // ATTENDANCE

        if (
          results[1].status ===
          "fulfilled"
        ) {
          setAttendance(
            getArrayFromResponse(
              results[1].value
            )
          );
        } else {
          console.error(
            "Principal Attendance API:",
            results[1].reason
          );

          setAttendance([]);
        }

        // FEES

        if (
          results[2].status ===
          "fulfilled"
        ) {
          setFees(
            getArrayFromResponse(
              results[2].value
            )
          );
        } else {
          console.error(
            "Principal Fees API:",
            results[2].reason
          );

          setFees([]);
        }
      } catch (error) {
        console.error(
          "Principal Students loading error:",
          error
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    loadStudents(true);
  }, [loadStudents]);

  // Auto refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadStudents(false);
    }, 10000);

    return () => clearInterval(interval);
  }, [loadStudents]);

  // NORMALIZED DATA

  const normalizedStudents = useMemo(
    () =>
      students.map(normalizeStudent),
    [students]
  );

  const normalizedAttendance =
    useMemo(
      () =>
        attendance.map(
          normalizeAttendance
        ),
      [attendance]
    );

  const normalizedFees = useMemo(
    () =>
      fees.map(normalizeFee),
    [fees]
  );

  // TOTAL STUDENTS

  const totalStudents =
    normalizedStudents.length;

  // ACTIVE STUDENTS

  const activeStudents =
    normalizedStudents.filter(
      (student) =>
        String(student.status)
          .toLowerCase() === "active"
    ).length;

  // AVERAGE ATTENDANCE

  const averageAttendance = useMemo(() => {
    if (!normalizedStudents.length) {
      return 0;
    }

    const attendanceMap = {};

    normalizedAttendance.forEach(
      (record) => {
        const studentId =
          String(record.studentId);

        if (!studentId) return;

        if (!attendanceMap[studentId]) {
          attendanceMap[studentId] = {
            present: 0,
            total: 0,
          };
        }

        const status = String(
          record.status
        ).toLowerCase();

        if (
          status === "present" ||
          status === "absent" ||
          status === "leave"
        ) {
          attendanceMap[studentId]
            .total++;
        }

        if (status === "present") {
          attendanceMap[studentId]
            .present++;
        }
      }
    );

    let totalPresent = 0;
    let totalRecords = 0;

    Object.values(
      attendanceMap
    ).forEach((item) => {
      totalPresent += item.present;
      totalRecords += item.total;
    });

    if (!totalRecords) {
      return 0;
    }

    return Math.round(
      (totalPresent /
        totalRecords) *
        100
    );
  }, [
    normalizedStudents,
    normalizedAttendance,
  ]);

  // PENDING FEES

  const pendingFees =
    useMemo(
      () =>
        normalizedFees.reduce(
          (total, fee) =>
            total +
            (Number.isFinite(fee.due)
              ? fee.due
              : 0),
          0
        ),
      [normalizedFees]
    );

  // DYNAMIC CLASSES

  const classes = useMemo(() => {
    const uniqueClasses =
      new Set();

    normalizedStudents.forEach(
      (student) => {
        if (
          student.className &&
          student.className !== "-"
        ) {
          const className =
            student.section
              ? `${student.className}-${student.section}`
              : student.className;

          uniqueClasses.add(
            className
          );
        }
      }
    );

    return [
      "All",
      ...Array.from(
        uniqueClasses
      ).sort(),
    ];
  }, [normalizedStudents]);

  // FILTER STUDENTS

  const filteredStudents =
    useMemo(() => {
      if (
        selectedClass === "All"
      ) {
        return normalizedStudents;
      }

      return normalizedStudents.filter(
        (student) => {
          const className =
            student.section
              ? `${student.className}-${student.section}`
              : student.className;

          return (
            className ===
            selectedClass
          );
        }
      );
    }, [
      normalizedStudents,
      selectedClass,
    ]);

  // STUDENT ATTENDANCE

  const getStudentAttendance = (
    studentId,
    userId
  ) => {
    const targetIds = [
      String(studentId || ""),
      String(userId || ""),
    ].filter(Boolean);

    const records =
      normalizedAttendance.filter(
        (record) =>
          targetIds.includes(
            String(record.studentId)
          )
      );

    if (!records.length) {
      return "—";
    }

    const present = records.filter(
      (record) =>
        String(record.status)
          .toLowerCase() ===
        "present"
    ).length;

    return `${Math.round(
      (present /
        records.length) *
        100
    )}%`;
  };

  // STUDENT FEES

  const getStudentDueFee = (
    studentId
  ) => {
    const record =
      normalizedFees.find(
        (fee) =>
          String(fee.studentId) ===
          String(studentId)
      );

    if (!record) {
      return 0;
    }

    return record.due;
  };

  // LOADING

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

          <p className="mt-3 text-sm text-gray-500">
            Loading Students...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Students Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Live student records from the school database.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            loadStudents(true)
          }
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>

      {/* TOP CARDS */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL STUDENTS */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Students
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {totalStudents.toLocaleString(
                  "en-IN"
                )}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Users size={20} />
            </div>

          </div>

        </div>

        {/* AVG ATTENDANCE */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Avg Attendance
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {averageAttendance}%
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <CalendarCheck size={20} />
            </div>

          </div>

        </div>

        {/* PENDING FEES */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending Fees
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {formatCurrency(
                  pendingFees
                )}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <IndianRupee size={20} />
            </div>

          </div>

        </div>

        {/* OVERALL RESULT */}

        <div className="rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Overall Result
              </p>

              <h3 className="mt-2 text-xl font-bold">
                —
              </h3>

              <p className="mt-1 text-[11px] text-gray-400">
                Results module pending
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Trophy size={20} />
            </div>

          </div>

        </div>

      </div>

      {/* STUDENT RECORDS */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h3 className="text-lg font-bold">
              Student Records
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Live records connected with Admin Students.
            </p>
          </div>

          {/* CLASS FILTER */}

          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(
                e.target.value
              )
            }
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500"
          >
            {classes.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All Classes"
                    : item}
                </option>
              )
            )}
          </select>

        </div>

        {filteredStudents.length ===
        0 ? (
          <div className="py-12 text-center">

            <Users
              size={32}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm font-medium text-gray-600">
              No students found
            </p>

            <p className="mt-1 text-xs text-gray-400">
              No student records are available for this class.
            </p>

          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px]">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Student
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Class
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Roll No.
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Admission No
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Admission Date
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Attendance
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Fees
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Result
                  </th>

                  <th className="px-5 py-4 text-left text-sm text-gray-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.map(
                  (student) => {

                    const attendanceValue =
                      getStudentAttendance(
                        student.id,
                        student.userId
                      );

                    const dueFee =
                      getStudentDueFee(
                        student.id
                      );

                    return (
                      <tr
                        key={
                          student.id ||
                          student.userId
                        }
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >

                        {/* STUDENT */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-sm font-semibold text-green-600">
                              {student.name
                                .charAt(
                                  0
                                )
                                .toUpperCase()}
                            </div>

                            <div>

                              <p className="font-medium text-gray-800">
                                {student.name}
                              </p>

                              <p className="text-xs text-gray-400">
                                {student.gender}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* CLASS */}

                        <td className="px-5 py-4">
                          {student.className}
                          {student.section
                            ? `-${student.section}`
                            : ""}
                        </td>

                        {/* ROLL */}

                        <td className="px-5 py-4">
                          {student.rollNo}
                        </td>

                        {/* ADMISSION NO */}

                        <td className="px-5 py-4">
                          {student.admissionNo}
                        </td>

                        {/* ADMISSION DATE */}

                        <td className="px-5 py-4 text-gray-500">
                          {formatDate(
                            student.admissionDate
                          )}
                        </td>

                        {/* ATTENDANCE */}

                        <td className="px-5 py-4">

                          <span
                            className={`font-semibold ${
                              attendanceValue ===
                              "—"
                                ? "text-gray-400"
                                : "text-green-600"
                            }`}
                          >
                            {
                              attendanceValue
                            }
                          </span>

                        </td>

                        {/* FEES */}

                        <td className="px-5 py-4">

                          {dueFee > 0 ? (

                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                              Due{" "}
                              {formatCurrency(
                                dueFee
                              )}
                            </span>

                          ) : (

                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                              Paid
                            </span>

                          )}

                        </td>

                        {/* RESULT */}

                        <td className="px-5 py-4">

                          <span className="font-semibold text-gray-400">
                            —
                          </span>

                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              String(
                                student.status
                              ).toLowerCase() ===
                              "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {
                              student.status
                            }
                          </span>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

        {/* FOOTER */}

        <div className="border-t border-gray-100 bg-gray-50 p-5">

          <p className="text-sm text-gray-600">

            Showing{" "}

            <span className="font-semibold">
              {
                filteredStudents.length
              }
            </span>{" "}

            students

            {selectedClass !==
              "All" &&
              ` from ${selectedClass}`}

            .

          </p>

        </div>

      </div>

      {/* LIVE STATUS */}

      <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

        <div className="flex items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
            <RefreshCw
              size={18}
              className="text-green-600"
            />
          </div>

          <div>

            <h3 className="text-sm font-semibold text-green-800">
              Live Student Records
            </h3>

            <p className="mt-0.5 text-xs leading-5 text-green-700">
              Student records are fetched from the same database used by Admin Students and automatically refreshed every 10 seconds.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

