
// import { useState } from "react";
// import {
//   CalendarCheck,
//   CalendarX,
//   BookOpen,
//   CheckCircle2,
//   XCircle,
//   ChevronDown
// } from "lucide-react";

// export default function StudentAttendance() {
//   // Sabhi subjects ka independent attendance data
//   const subjectsData = {
//     "Mathematics": { present: 45, absent: 3, total: 48, percentage: 90, history: [
//       { date: "10 July 2026", status: "Present" },
//       { date: "08 July 2026", status: "Present" },
//       { date: "06 July 2026", status: "Absent" },
//     ]},
//     "Science": { present: 40, absent: 5, total: 45, percentage: 87, history: [
//       { date: "10 July 2026", status: "Absent" },
//       { date: "09 July 2026", status: "Present" },
//       { date: "07 July 2026", status: "Present" },
//     ]},
//     "English": { present: 42, absent: 2, total: 44, percentage: 95, history: [
//       { date: "09 July 2026", status: "Present" },
//       { date: "08 July 2026", status: "Present" },
//       { date: "06 July 2026", status: "Present" },
//     ]},
//     "Computer": { present: 50, absent: 0, total: 50, percentage: 77, history: [
//       { date: "10 July 2026", status: "Present" },
//       { date: "07 July 2026", status: "Present" },
//       { date: "05 July 2026", status: "Present" },
//     ]}
//   };

//   const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  
//   // Current selected subject ka data nikalne ke liye
//   const currentData = subjectsData[selectedSubject];

//   // Pie Chart/Donut Chart ka fill percentage calculate karne ke liye (SVG strokeDashoffset configuration)
//   const radius = 50;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (currentData.percentage / 100) * circumference;

//   return (
//     <div className="space-y-8 max-w-[1800px] mx-auto p-3">
//       {/* Top Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 tracking-tight sm:text-2xl">Attendance Analytics</h2>
//           <p className="text-gray-500 text-sm mt-1">Track your overall and subject-wise classroom attendance metrics.</p>
//         </div>
//       </div>

//       {/* Top Row: Overall Summary & Subject Selector Card */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Card 1: Overall Aggregate Status */}
//         <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
//           <div>
//             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Performance</span>
//             <h3 className="text-2xl font-extrabold text-gray-800 mt-2">Overall Attendance</h3>
//             <p className="text-gray-400 text-xs mt-1">Combined aggregate across all enrolled modules.</p>
//           </div>
//           <div className="mt-6">
//             <div className="flex justify-between items-baseline mb-2">
//               <h4 className="text-3xl font-black text-green-500">94%</h4>
             
//             </div>
//             <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
//               <div className="h-full w-[94%] bg-green-400 rounded-full transition-all duration-500"></div>
//             </div>
//           </div>
//         </div>

//         {/* Card 2 & 3 Combined Block: Subject Selector Toolbar */}
//         <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
//           <div className="space-y-1">
//             <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//               <BookOpen size={18} className="text-gray-400" />
//               Select Subject Module
//             </h3>
//             <p className="text-xs text-gray-400 max-w-sm">Choose any academic discipline from the controller below to fetch live present/absent tracking distribution graphs.</p>
//           </div>

//           {/* Clean Select Custom Dropdown */}
//           <div className="relative w-full sm:w-64">
//             <select
//               value={selectedSubject}
//               onChange={(e) => setSelectedSubject(e.target.value)}
//               className="w-full bg-gray-50 hover:bg-gray-100/70 border border-gray-200 text-gray-700 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-500/20 text-sm font-semibold cursor-pointer appearance-none transition"
//             >
//               {Object.keys(subjectsData).map((subject) => (
//                 <option key={subject} value={subject}>{subject}</option>
//               ))}
//             </select>
//             <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           </div>
//         </div>

//       </div>

//       {/* Main Breakdown Dashboard Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
//         {/* Left Grid Area: Pie Chart (Donut) Analytics */}
//         <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
//           <h3 className="text-base font-bold text-gray-800 self-start mb-6 w-full text-left border-b border-gray-50 pb-3">
//             {selectedSubject} Distribution
//           </h3>

//           {/* SVG Pure Native Tailwind Pie / Donut Chart */}
//           <div className="relative flex items-center justify-center w-40 h-40">
//             <svg className="w-full h-40 transform -rotate-90" viewBox="0 0 120 120">
//               {/* Absent/Background Track (Red segment representation) */}
//               <circle
//                 cx="60"
//                 cy="60"
//                 r={radius}
//                 className="text-red-100 stroke-current"
//                 strokeWidth="8"
//                 fill="transparent"
//               />
//               {/* Present Track (Green Fill Arc) */}
//               <circle
//                 cx="60"
//                 cy="60"
//                 r={radius}
//                 className="text-green-500 stroke-current transition-all duration-500 ease-in-out"
//                 strokeWidth="8"
//                 fill="transparent"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={strokeDashoffset}
//                 strokeLinecap="round"
//               />
//             </svg>
            
//             {/* Center Absolute Label Text */}
//             <div className="absolute flex flex-col items-center">
//               <span className="text-3xl font-black text-gray-800">{currentData.percentage}%</span>
//               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Attended</span>
//             </div>
//           </div>

//           {/* Bottom Chart Legends Info */}
//           <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-4 border-t border-gray-50 text-sm">
//             <div className="flex flex-col items-center p-2.5 bg-green-50/40 rounded-2xl border border-green-100/40">
//               <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mb-1">
//                 <CheckCircle2 size={13} className="text-green-500" /> Present Days
//               </span>
//               <span className="text-lg font-bold text-green-700">{currentData.present} Lectures</span>
//             </div>

//             <div className="flex flex-col items-center p-2.5 bg-red-50/40 rounded-2xl border border-red-100/40">
//               <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mb-1">
//                 <XCircle size={13} className="text-red-500" /> Absent Days
//               </span>
//               <span className="text-lg font-bold text-red-700">{currentData.absent} Lectures</span>
//             </div>
//           </div>

//           <p className="text-[11px] text-gray-400 mt-4 font-medium">Total Classes Conducted: {currentData.total}</p>
//         </div>

//         {/* Right Grid Area: Subject Logs History */}
//         <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
//           <div>
//             <h3 className="text-base font-bold text-gray-800 mb-5 border-b border-gray-50 pb-3">
//               {selectedSubject} - Activity Logs
//             </h3>
            
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[400px]">
//                 <thead className="bg-gray-50/70">
//                   <tr>
//                     <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-l-xl">Lecture Date</th>
//                     <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-r-xl">Status Descriptor</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-50">
//                   {currentData.history.map((item, index) => (
//                     <tr key={index} className="hover:bg-gray-50/50 transition">
//                       <td className="px-4 py-4 font-semibold text-gray-700 text-sm">{item.date}</td>
//                       <td className="text-center">
//                         <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
//                           item.status === "Present" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
//                         }`}>
//                           {item.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }










import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CalendarX,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock3,
  Fingerprint,
  ScanFace,
  AlertCircle
} from "lucide-react";

const API_URL =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/student/attendance.php";

export default function StudentAttendance() {

  /*
  |--------------------------------------------------------------------------
  | TEMPORARY STUDENT ID
  |--------------------------------------------------------------------------
  |
  | Login integration hone ke baad ye ID logged-in user se automatically aayegi.
  | Abhi tumhari database me Srishti ka student_id = 5 hai.
  |
  */

  const studentId = 5;

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [attendance, setAttendance] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD LIVE ATTENDANCE
  |--------------------------------------------------------------------------
  */

  const loadAttendance = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}?student_id=${studentId}`
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status}`
        );
      }

      const result = await response.json();

      console.log(
        "Student Attendance API:",
        result
      );

      if (!result.status) {

        throw new Error(
          result.message ||
          "Unable to load attendance"
        );
      }

      setAttendance(result.data);

    } catch (err) {

      console.error(
        "Attendance error:",
        err
      );

      setError(
        err.message ||
        "Unable to load attendance"
      );

    } finally {

      setLoading(false);

    }
  };


  /*
  |--------------------------------------------------------------------------
  | FIRST LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadAttendance();

  }, []);


  /*
  |--------------------------------------------------------------------------
  | SUMMARY
  |--------------------------------------------------------------------------
  */

  const summary = attendance?.summary || {

    total_days: 0,

    present_days: 0,

    absent_days: 0,

    leave_days: 0,

    percentage: 0
  };


  /*
  |--------------------------------------------------------------------------
  | ATTENDANCE STATUS
  |--------------------------------------------------------------------------
  */

  const attendanceStatus = useMemo(() => {

    const percentage =
      Number(summary.percentage);

    if (percentage >= 75) {
      return {
        label: "Good Attendance",
        text: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-100"
      };
    }

    if (percentage >= 60) {
      return {
        label: "Needs Attention",
        text: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-100"
      };
    }

    return {
      label: "Low Attendance",
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100"
    };

  }, [summary.percentage]);


  /*
  |--------------------------------------------------------------------------
  | LOADING UI
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (
      <div className="max-w-[1500px] mx-auto">

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10">

          <div className="animate-pulse space-y-6">

            <div className="h-7 w-64 bg-gray-200 rounded-lg" />

            <div className="h-4 w-96 bg-gray-100 rounded-lg" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div className="h-28 bg-gray-100 rounded-2xl" />

              <div className="h-28 bg-gray-100 rounded-2xl" />

              <div className="h-28 bg-gray-100 rounded-2xl" />

            </div>

          </div>

        </div>

      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | ERROR UI
  |--------------------------------------------------------------------------
  */

  if (error) {

    return (
      <div className="max-w-[1500px] mx-auto">

        <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-10 text-center">

          <AlertCircle
            size={42}
            className="mx-auto text-red-500 mb-4"
          />

          <h2 className="text-xl font-bold text-gray-800">
            Unable to load attendance
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={loadAttendance}
            className="mt-6 px-5 py-2.5 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | MAIN UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto">

      {/* HEADER */}

      <div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Attendance
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              View your real attendance records and attendance performance.
            </p>

          </div>

          <button
            onClick={loadAttendance}
            className="w-fit px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Refresh
          </button>

        </div>

      </div>


      {/* STUDENT INFO */}

      {attendance?.student && (

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">

            <div>
              <span className="text-gray-400">
                Student
              </span>

              <p className="font-semibold text-gray-800">
                {attendance.student.full_name}
              </p>
            </div>

            <div>
              <span className="text-gray-400">
                Class
              </span>

              <p className="font-semibold text-gray-800">
                {attendance.student.class}
                {" - "}
                {attendance.student.section}
              </p>
            </div>

            <div>
              <span className="text-gray-400">
                Roll No.
              </span>

              <p className="font-semibold text-gray-800">
                {attendance.student.roll_no}
              </p>
            </div>

            <div>
              <span className="text-gray-400">
                Admission No.
              </span>

              <p className="font-semibold text-gray-800">
                {attendance.student.admission_no}
              </p>
            </div>

          </div>

        </div>

      )}


      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Classes
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {summary.total_days}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <BookOpen
                size={22}
                className="text-blue-500"
              />
            </div>

          </div>

        </div>


        {/* PRESENT */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Present
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {summary.present_days}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle2
                size={22}
                className="text-green-500"
              />
            </div>

          </div>

        </div>


        {/* ABSENT */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Absent
              </p>

              <h3 className="text-3xl font-bold text-red-600 mt-2">
                {summary.absent_days}
              </h3>

            </div>

            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <CalendarX
                size={22}
                className="text-red-500"
              />
            </div>

          </div>

        </div>

      </div>


      {/* PERFORMANCE */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* PERCENTAGE */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Attendance Percentage
              </p>

              <h3 className="text-4xl font-black text-gray-800 mt-2">
                {summary.percentage}%
              </h3>

            </div>

            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold ${attendanceStatus.bg} ${attendanceStatus.text}`}
            >
              {attendanceStatus.label}
            </div>

          </div>


          <div className="mt-6">

            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-green-500 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(
                    Number(summary.percentage),
                    100
                  )}%`
                }}
              />

            </div>

          </div>

        </div>


        {/* LEAVE */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">

          <p className="text-sm text-gray-500">
            Leave
          </p>

          <h3 className="text-4xl font-black text-yellow-600 mt-2">
            {summary.leave_days}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Recorded leave days
          </p>

        </div>


        {/* QUICK INFO */}

        <div
          className={`rounded-2xl border p-7 ${attendanceStatus.bg} ${attendanceStatus.border}`}
        >

          <p className="text-sm text-gray-500">
            Attendance Status
          </p>

          <h3
            className={`text-2xl font-bold mt-2 ${attendanceStatus.text}`}
          >
            {attendanceStatus.label}
          </h3>

          <p className="text-xs text-gray-500 mt-2">
            Based on your current attendance records.
          </p>

        </div>

      </div>


      {/* HISTORY */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-lg font-bold text-gray-800">
                Attendance History
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Latest attendance records from school database.
              </p>

            </div>

            <CalendarCheck
              size={21}
              className="text-green-500"
            />

          </div>

        </div>


        {attendance?.history?.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-500">
                    Date
                  </th>

                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-500">
                    Status
                  </th>

                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-500">
                    Attendance Method
                  </th>

                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-500">
                    Recorded At
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-gray-100">

                {attendance.history.map((item) => (

                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                      {new Date(
                        item.date
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        }
                      )}
                    </td>


                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Present"
                            ? "bg-green-50 text-green-700"
                            : item.status === "Absent"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >

                        {item.status === "Present" && (
                          <CheckCircle2 size={13} />
                        )}

                        {item.status === "Absent" && (
                          <XCircle size={13} />
                        )}

                        {item.status === "Leave" && (
                          <Clock3 size={13} />
                        )}

                        {item.status}

                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <span className="inline-flex items-center gap-2 text-sm text-gray-600">

                        {item.attendance_type === "Face" ? (
                          <ScanFace
                            size={16}
                            className="text-blue-500"
                          />
                        ) : (
                          <Fingerprint
                            size={16}
                            className="text-purple-500"
                          />
                        )}

                        {item.attendance_type || "Manual"}

                      </span>

                    </td>


                    <td className="px-6 py-4 text-sm text-gray-400">

                      {item.created_at
                        ? new Date(
                            item.created_at
                          ).toLocaleString(
                            "en-IN"
                          )
                        : "-"}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="p-12 text-center">

            <CalendarCheck
              size={40}
              className="mx-auto text-gray-300"
            />

            <h4 className="mt-4 font-semibold text-gray-700">
              No attendance records yet
            </h4>

            <p className="text-sm text-gray-400 mt-1">
              Your attendance will appear here when it is recorded by the school.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}