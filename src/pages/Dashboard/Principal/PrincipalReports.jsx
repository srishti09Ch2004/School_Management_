// import {
//   FileBarChart,
//   TrendingUp,
//   Users,
//   GraduationCap,
//   CalendarCheck,
//   IndianRupee,
//   Trophy,
// } from "lucide-react";

// export default function PrincipalReports() {
//   const reports = [
//     {
//       title: "Attendance Report",
//       generated: "16 July 2026",
//       status: "Generated",
//     },
//     {
//       title: "Fee Collection Report",
//       generated: "15 July 2026",
//       status: "Generated",
//     },
//     {
//       title: "Academic Performance",
//       generated: "14 July 2026",
//       status: "Generated",
//     },
//     {
//       title: "Exam Result Summary",
//       generated: "12 July 2026",
//       status: "Pending",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">
//         School Reports
//       </h2>

//       {/* Top Cards */}
//       <div className="grid md:grid-cols-4 gap-5">
//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Reports Generated
//               </p>

//               <h3 className="text-3xl font-bold mt-2">
//                 24
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//               <FileBarChart size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Total Students
//               </p>

//               <h3 className="text-3xl font-bold mt-2">
//                 50
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
//               <Users size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Total Teachers
//               </p>

//               <h3 className="text-3xl font-bold mt-2">
//                 20
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
//               <GraduationCap size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow-sm">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">
//                 School Performance
//               </p>

//               <h3 className="text-3xl font-bold mt-2">
//                 96%
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
//               <TrendingUp size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Report Summary */}
//       <div className="grid lg:grid-cols-3 gap-5">
//         <div className="bg-white rounded-2xl p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//               <CalendarCheck size={20} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Average Attendance
//               </p>

//               <h3 className="font-bold text-lg">
//                 95%
//               </h3>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
//               <IndianRupee size={20} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Fee Collection
//               </p>

//               <h3 className="font-bold text-lg">
//                 ₹4,25,000
//               </h3>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
//               <Trophy size={20} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Top Performing Class
//               </p>

//               <h3 className="font-bold text-lg">
//                 Class 10-A
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Reports Table */}
//       <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
//         <div className="p-5 border-b border-gray-100 flex justify-between items-center">
//           <h3 className="text-lg font-bold">
//             Recent Reports
//           </h3>

//           <span className="text-sm text-gray-500">
//             Academic Session 2026-27
//           </span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Report Name
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Generated On
//                 </th>

//                 <th className="text-left py-4 px-5 text-sm text-gray-500">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {reports.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-gray-100 hover:bg-gray-50"
//                 >
//                   <td className="py-4 px-5 font-medium">
//                     {item.title}
//                   </td>

//                   <td className="py-4 px-5">
//                     {item.generated}
//                   </td>

//                   <td className="py-4 px-5">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         item.status === "Generated"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-orange-100 text-orange-700"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Bottom Summary */}
//         <div className="grid md:grid-cols-3 gap-4 p-5 bg-gray-50 border-t border-gray-100">
//           <div>
//             <p className="text-xs text-gray-500">
//               Last Generated Report
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               Attendance Report
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Reports This Month
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               24 Reports
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">
//               Pending Reports
//             </p>

//             <p className="font-semibold text-sm mt-1">
//               1 Report
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













import { useState } from "react";
import {
  FileBarChart,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function PrincipalReports() {
  const sessions = [
    {
      year: "2023-24",
      performance: 88,
      attendance: 90,
      fees: 85,
    },
    {
      year: "2024-25",
      performance: 92,
      attendance: 93,
      fees: 89,
    },
    {
      year: "2025-26",
      performance: 96,
      attendance: 95,
      fees: 94,
    },
    {
      year: "2026-27",
      performance: 98,
      attendance: 97,
      fees: 96,
    },
  ];

  const [selectedSession, setSelectedSession] =
    useState("2026-27");

  const current = sessions.find(
    (s) => s.year === selectedSession
  );

  const currentIndex = sessions.findIndex(
    (s) => s.year === selectedSession
  );

  const previous =
    currentIndex > 0
      ? sessions[currentIndex - 1]
      : sessions[0];

  const difference =
    current.performance -
    previous.performance;

  const average =
    Math.round(
      sessions.reduce(
        (a, b) => a + b.performance,
        0
      ) / sessions.length
    );

  const bestSession = [...sessions].sort(
    (a, b) =>
      b.performance - a.performance
  )[0];

  return (
    <div className="space-y-6">
      {/* Heading */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          School Reports
        </h2>

        <select
          value={selectedSession}
          onChange={(e) =>
            setSelectedSession(
              e.target.value
            )
          }
          className="border border-gray-200 rounded-xl px-4 py-2 bg-white outline-none"
        >
          {sessions.map((session) => (
            <option
              key={session.year}
              value={session.year}
            >
              {session.year}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Academic Performance
          </p>

          <h3 className="text-xl font-bold mt-2">
            {current.performance}%
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Attendance
          </p>

          <h3 className="text-xl font-bold mt-2">
            {current.attendance}%
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Fee Collection
          </p>

          <h3 className="text-xl font-bold mt-2">
            {current.fees}%
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Compared To Last Session
          </p>

          <div className="flex items-center gap-2 mt-2">
            <h3 className="text-xl font-bold">
              {Math.abs(difference)}%
            </h3>

            {difference >= 0 ? (
              <TrendingUp
                size={20}
                className="text-green-600"
              />
            ) : (
              <TrendingDown
                size={20}
                className="text-red-600"
              />
            )}
          </div>

          <p
            className={`text-sm mt-2 ${
              difference >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {difference >= 0
              ? "Performance Improved"
              : "Performance Decreased"}
          </p>
        </div>
      </div>

      {/* Chart */}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-bold">
              Session Performance Trend
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Academic performance comparison
              across sessions
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              difference >= 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {difference >= 0 ? "+" : ""}
            {difference}% from last session
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={sessions}>
              <defs>
                <linearGradient
                  id="colorPerformance"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563eb"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="year" />

              <YAxis domain={[70, 100]} />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="performance"
                stroke="#2563eb"
                strokeWidth={4}
                fill="url(#colorPerformance)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary */}

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-blue-50 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileBarChart
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Best Session
              </p>

              <h3 className="font-bold text-lg">
                {bestSession.year}
              </h3>

              <p className="text-blue-600 text-sm mt-1">
                Performance :
                {bestSession.performance}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp
                size={20}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Current Growth
              </p>

              <h3 className="font-bold text-lg">
                {difference >= 0
                  ? "+"
                  : ""}
                {difference}%
              </h3>

              <p className="text-green-600 text-sm mt-1">
                Compared to previous year
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
              <TrendingUp
                size={20}
                className="text-orange-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Average Performance
              </p>

              <h3 className="font-bold text-lg">
                {average}%
              </h3>

              <p className="text-orange-600 text-sm mt-1">
                Last {sessions.length} Sessions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Session Summary */}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6">
          Session Summary
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">
              Previous Session
            </p>

            <h4 className="text-2xl font-bold mt-1">
              {previous.year}
            </h4>

            <p className="mt-2 text-gray-600">
              Performance :
              {previous.performance}%
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Current Session
            </p>

            <h4 className="text-2xl font-bold mt-1">
              {current.year}
            </h4>

            <p className="mt-2 text-gray-600">
              Performance :
              {current.performance}%
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Growth
            </p>

            <h4
              className={`text-2xl font-bold mt-1 ${
                difference >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {difference >= 0 ? "+" : ""}
              {difference}%
            </h4>

            <p className="mt-2 text-gray-600">
              Compared to previous year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}