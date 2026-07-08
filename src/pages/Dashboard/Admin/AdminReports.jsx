// import {
//   FileText,
//   Users,
//   IndianRupee,
//   ClipboardCheck,
//   GraduationCap,
//   Download,
//   Eye,
// } from "lucide-react";

// export default function AdminReports() {
//   const stats = [
//     {
//       title: "Students",
//       value: "2,847",
//       icon: Users,
//       color: "bg-blue-50 text-blue-600",
//     },
//     {
//       title: "Revenue",
//       value: "₹4.5L",
//       icon: IndianRupee,
//       color: "bg-green-50 text-green-600",
//     },
//     {
//       title: "Attendance",
//       value: "92%",
//       icon: ClipboardCheck,
//       color: "bg-purple-50 text-purple-600",
//     },
//     {
//       title: "Results",
//       value: "94%",
//       icon: GraduationCap,
//       color: "bg-orange-50 text-orange-600",
//     },
//   ];

//   const reports = [
//     {
//       title: "Student Report",
//       icon: Users,
//       color: "text-blue-600",
//     },
//     {
//       title: "Attendance Report",
//       icon: ClipboardCheck,
//       color: "text-purple-600",
//     },
//     {
//       title: "Fee Report",
//       icon: IndianRupee,
//       color: "text-green-600",
//     },
//     {
//       title: "Exam Report",
//       icon: GraduationCap,
//       color: "text-orange-600",
//     },
//   ];

//   const recentReports = [
//     {
//       name: "Annual Report.pdf",
//       date: "15 Jan 2026",
//     },
//     {
//       name: "Fee Collection.xlsx",
//       date: "12 Jan 2026",
//     },
//     {
//       name: "Attendance Report.pdf",
//       date: "10 Jan 2026",
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Reports
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Generate and manage school reports.
//           </p>
//         </div>

//         <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
//           <Download size={18} />
//           Export Reports
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
//         {stats.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.title}
//               className="bg-white rounded-3xl p-5 shadow-sm"
//             >
//               <div
//                 className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.color}`}
//               >
//                 <Icon size={20} />
//               </div>

//               <h2 className="text-2xl font-bold mt-4">
//                 {item.value}
//               </h2>

//               <p className="text-gray-500 text-sm">
//                 {item.title}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Report Cards */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-800 mb-5">
//           Generate Reports
//         </h2>

//         <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
//           {reports.map((item) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={item.title}
//                 className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition"
//               >
//                 <Icon
//                   size={20}
//                   className={item.color}
//                 />

//                 <h3 className="font-bold text-lg mt-4">
//                   {item.title}
//                 </h3>

//                 <p className="text-sm text-gray-500 mt-2">
//                   Generate and download report.
//                 </p>

//                 <div className="flex gap-8 mt-6">
//                   <button className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700">
//                     Generate
//                   </button>

//                   <button className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200">
//                     <Eye size={18} />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Recent Reports */}
//       <div className="bg-white rounded-3xl p-8 shadow-sm">
//         <h2 className="text-xl font-bold mb-5">
//           Recent Reports
//         </h2>

//         <div className="space-y-4">
//           {recentReports.map((item) => (
//             <div
//               key={item.name}
//               className="flex items-center justify-between border rounded-2xl p-4"
//             >
//               <div className="flex items-center gap-3">
//                 <FileText
//                   size={20}
//                   className="text-green-600"
//                 />

//                 <div>
//                   <p className="font-medium">
//                     {item.name}
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     {item.date}
//                   </p>
//                 </div>
//               </div>

//               <button className="text-green-600 font-medium hover:text-green-700">
//                 Download
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }










import {
  FileText,
  Users,
  IndianRupee,
  ClipboardCheck,
  GraduationCap,
  Download,
  Eye,
} from "lucide-react";

export default function AdminReports() {
  const stats = [
    {
      title: "Students",
      value: "2,847",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Revenue",
      value: "₹4.5L",
      icon: IndianRupee,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Attendance",
      value: "92%",
      icon: ClipboardCheck,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Results",
      value: "94%",
      icon: GraduationCap,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const reports = [
    {
      title: "Student Report",
      icon: Users,
      color: "text-blue-600",
      description: "Student details and academic performance.",
    },
    {
      title: "Attendance Report",
      icon: ClipboardCheck,
      color: "text-purple-600",
      description: "Daily and monthly attendance summary.",
    },
    {
      title: "Fee Report",
      icon: IndianRupee,
      color: "text-green-600",
      description: "Fee collection and pending payments.",
    },
    {
      title: "Exam Report",
      icon: GraduationCap,
      color: "text-orange-600",
      description: "Exam results and performance analytics.",
    },
  ];

  const recentReports = [
    {
      name: "Annual Report.pdf",
      date: "15 Jan 2026",
    },
    {
      name: "Fee Collection.xlsx",
      date: "12 Jan 2026",
    },
    {
      name: "Attendance Report.pdf",
      date: "10 Jan 2026",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reports
          </h1>

          <p className="text-gray-500 mt-1">
            Generate and manage school reports.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition shadow-sm">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={18} />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-3">
                {item.value}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Report Cards */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            Generate Reports
          </h2>

          <p className="text-sm text-gray-500">
            4 Reports Available
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {reports.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
                  <Icon
                    size={22}
                    className={item.color}
                  />
                </div>

                <h3 className="font-bold text-lg mt-4 text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {item.description}
                </p>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition font-medium">
                    Generate
                  </button>

                  <button className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                    <Eye
                      size={18}
                      className="text-gray-600"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Reports
          </h2>

          <button className="text-sm text-green-600 font-medium hover:text-green-700">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentReports.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <FileText
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.date}
                  </p>
                </div>
              </div>

              <button className="text-green-600 text-sm font-medium hover:text-green-700">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}