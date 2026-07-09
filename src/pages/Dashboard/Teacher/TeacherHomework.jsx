// import { useState } from "react";
// import {
//   BookOpen,
//   ClipboardCheck,
//   Clock3,
//   Plus,
//   Search,
//   Eye,
//   Pencil,
// } from "lucide-react";

// export default function TeacherHomework() {
//   const [search, setSearch] =
//     useState("");

//   const homework = [
//     {
//       id: 1,
//       title: "Chapter 5 Exercises",
//       class: "10-A",
//       subject: "Mathematics",
//       due: "15 Jul 2026",
//       status: "Active",
//       submissions: "32/40",
//     },
//     {
//       id: 2,
//       title: "Science Diagram",
//       class: "9-B",
//       subject: "Science",
//       due: "16 Jul 2026",
//       status: "Pending",
//       submissions: "18/38",
//     },
//     {
//       id: 3,
//       title: "Essay Writing",
//       class: "8-C",
//       subject: "English",
//       due: "18 Jul 2026",
//       status: "Completed",
//       submissions: "40/40",
//     },
//   ];

//   const filteredHomework =
//     homework.filter(
//       (item) =>
//         item.title
//           .toLowerCase()
//           .includes(
//             search.toLowerCase()
//           ) ||
//         item.class
//           .toLowerCase()
//           .includes(
//             search.toLowerCase()
//           )
//     );

//   const stats = [
//     {
//       title: "Total Homework",
//       value: "24",
//       icon: <BookOpen size={22} />,
//       color:
//         "bg-blue-100 text-blue-600",
//     },
//     {
//       title: "Pending Review",
//       value: "08",
//       icon: (
//         <ClipboardCheck size={22} />
//       ),
//       color:
//         "bg-orange-100 text-orange-600",
//     },
//     {
//       title: "Submitted",
//       value: "142",
//       icon: <BookOpen size={22} />,
//       color:
//         "bg-green-100 text-green-600",
//     },
//     {
//       title: "Due Today",
//       value: "03",
//       icon: <Clock3 size={22} />,
//       color:
//         "bg-red-100 text-red-600",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}

//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Homework Management
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Create and manage class
//             assignments.
//           </p>
//         </div>

//         <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 transition">
//           <Plus size={18} />
//           Create Homework
//         </button>
//       </div>

//       {/* Cards */}

//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
//         {stats.map((item) => (
//           <div
//             key={item.title}
//             className="bg-white rounded-3xl border p-5 shadow-sm"
//           >
//             <div
//               className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}
//             >
//               {item.icon}
//             </div>

//             <p className="text-gray-500 text-sm mt-5">
//               {item.title}
//             </p>

//             <h3 className="text-3xl font-bold mt-2 text-gray-800">
//               {item.value}
//             </h3>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}

//       <div className="bg-white rounded-3xl border p-5 shadow-sm">
//         <div className="grid md:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-4 top-4 text-gray-400"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               placeholder="Search homework..."
//               className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <select className="border rounded-xl px-4">
//             <option>
//               All Classes
//             </option>
//             <option>10-A</option>
//             <option>9-B</option>
//             <option>8-C</option>
//           </select>

//           <select className="border rounded-xl px-4">
//             <option>
//               All Status
//             </option>
//             <option>Active</option>
//             <option>Pending</option>
//             <option>Completed</option>
//           </select>
//         </div>
//       </div>

//       {/* Main Section */}

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Homework Table */}

//         <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm overflow-hidden">
//           <div className="px-6 py-5 border-b">
//             <h2 className="font-semibold text-lg">
//               Homework List
//             </h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="text-left px-6 py-4">
//                     Homework
//                   </th>
//                   <th className="text-center">
//                     Class
//                   </th>
//                   <th className="text-center">
//                     Due Date
//                   </th>
//                   <th className="text-center">
//                     Status
//                   </th>
//                   <th className="text-center">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredHomework.map(
//                   (item) => (
//                     <tr
//                       key={item.id}
//                       className="border-t hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-5">
//                         <h4 className="font-medium">
//                           {item.title}
//                         </h4>

//                         <p className="text-sm text-gray-500">
//                           {
//                             item.subject
//                           }{" "}
//                           •{" "}
//                           {
//                             item.submissions
//                           }{" "}
//                           Submitted
//                         </p>
//                       </td>

//                       <td className="text-center">
//                         {item.class}
//                       </td>

//                       <td className="text-center">
//                         {item.due}
//                       </td>

//                       <td className="text-center">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm ${
//                             item.status ===
//                             "Completed"
//                               ? "bg-green-100 text-green-700"
//                               : item.status ===
//                                 "Pending"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-blue-100 text-blue-700"
//                           }`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>

//                       <td>
//                         <div className="flex justify-center gap-3">
//                           <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
//                             <Eye
//                               size={
//                                 18
//                               }
//                             />
//                           </button>

//                           <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
//                             <Pencil
//                               size={
//                                 18
//                               }
//                             />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Activity */}

//         <div className="bg-white rounded-3xl border p-6 shadow-sm">
//           <h2 className="font-semibold text-lg mb-5">
//             Recent Activity
//           </h2>

//           <div className="space-y-5">
//             <div className="border-l-4 border-green-600 pl-4">
//               <h4 className="font-medium">
//                 10-A Submitted
//               </h4>

//               <p className="text-sm text-gray-500 mt-1">
//                 32 students submitted
//                 Mathematics homework.
//               </p>
//             </div>

//             <div className="border-l-4 border-orange-500 pl-4">
//               <h4 className="font-medium">
//                 Deadline Tomorrow
//               </h4>

//               <p className="text-sm text-gray-500 mt-1">
//                 Science Diagram
//                 assignment due tomorrow.
//               </p>
//             </div>

//             <div className="border-l-4 border-blue-600 pl-4">
//               <h4 className="font-medium">
//                 New Homework Created
//               </h4>

//               <p className="text-sm text-gray-500 mt-1">
//                 Essay Writing assigned
//                 to Class 8-C.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// import { useState } from "react";
// import {
//   BookOpen,
//   ClipboardCheck,
//   Clock3,
//   Plus,
//   Search,
//   Eye,
//   Pencil,
//   Trash2,
//   Filter,
//   Calendar,
//   Users,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";

// export default function TeacherHomework() {
//   const [search, setSearch] = useState("");
//   const [filterClass, setFilterClass] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [selectedHomework, setSelectedHomework] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);

//   const homework = [
//     {
//       id: 1,
//       title: "Chapter 5 Exercises",
//       class: "10-A",
//       subject: "Mathematics",
//       due: "2026-07-15",
//       dueDisplay: "15 Jul 2026",
//       status: "Active",
//       submissions: 32,
//       totalStudents: 40,
//       description: "Complete all exercises from Chapter 5: Quadratic Equations",
//     },
//     {
//       id: 2,
//       title: "Science Diagram",
//       class: "9-B",
//       subject: "Science",
//       due: "2026-07-16",
//       dueDisplay: "16 Jul 2026",
//       status: "Pending",
//       submissions: 18,
//       totalStudents: 38,
//       description: "Draw and label the human digestive system diagram",
//     },
//     {
//       id: 3,
//       title: "Essay Writing",
//       class: "8-C",
//       subject: "English",
//       due: "2026-07-18",
//       dueDisplay: "18 Jul 2026",
//       status: "Completed",
//       submissions: 40,
//       totalStudents: 40,
//       description: "Write a 500-word essay on 'My Favorite Season'",
//     },
//   ];

//   const stats = [
//     {
//       title: "Total Homework",
//       value: "24",
//       icon: <BookOpen size={20} />,
//       color: "bg-blue-50 text-blue-600",
//       change: "+3 this week",
//     },
//     {
//       title: "Pending Review",
//       value: "08",
//       icon: <ClipboardCheck size={20} />,
//       color: "bg-amber-50 text-amber-600",
//       change: "5 need attention",
//     },
//     {
//       title: "Total Submissions",
//       value: "142",
//       icon: <Users size={20} />,
//       color: "bg-emerald-50 text-emerald-600",
//       change: "89% completion rate",
//     },
//     {
//       title: "Due Today",
//       value: "03",
//       icon: <Clock3 size={20} />,
//       color: "bg-rose-50 text-rose-600",
//       change: "2 are overdue",
//     },
//   ];

//   const getStatusColor = (status) => {
//     const colors = {
//       Active: "bg-blue-100 text-blue-700 border-blue-200",
//       Pending: "bg-amber-100 text-amber-700 border-amber-200",
//       Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
//       Overdue: "bg-rose-100 text-rose-700 border-rose-200",
//     };
//     return colors[status] || colors.Active;
//   };

//   const getStatusIcon = (status) => {
//     const icons = {
//       Active: <Clock3 size={14} />,
//       Pending: <AlertCircle size={14} />,
//       Completed: <CheckCircle size={14} />,
//     };
//     return icons[status] || icons.Active;
//   };

//   const filteredHomework = homework.filter((item) => {
//     const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
//                          item.class.toLowerCase().includes(search.toLowerCase()) ||
//                          item.subject.toLowerCase().includes(search.toLowerCase());
//     const matchesClass = filterClass === "all" || item.class === filterClass;
//     const matchesStatus = filterStatus === "all" || item.status === filterStatus;
//     return matchesSearch && matchesClass && matchesStatus;
//   });

//   const classes = [...new Set(homework.map(h => h.class))];
//   const statuses = [...new Set(homework.map(h => h.status))];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//               Homework Management
//             </h1>
//             <p className="text-slate-500 mt-1">Create, manage and track assignments</p>
//           </div>
//           <button 
//             onClick={() => setShowCreateModal(true)}
//             className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-200 hover:shadow-emerald-300"
//           >
//             <Plus size={20} />
//             Create Homework
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
//           {stats.map((item, index) => (
//             <div
//               key={item.title}
//               className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
//             >
//               <div className="flex items-start justify-between">
//                 <div className={`p-3 rounded-xl ${item.color}`}>
//                   {item.icon}
//                 </div>
//                 <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
//                   {item.change}
//                 </span>
//               </div>
//               <p className="text-slate-500 text-sm mt-4">{item.title}</p>
//               <h3 className="text-2xl font-bold text-slate-800 mt-1">{item.value}</h3>
//             </div>
//           ))}
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
//           <div className="grid md:grid-cols-12 gap-4">
//             <div className="md:col-span-5 relative">
//               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search homework by title, class or subject..."
//                 className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//               />
//             </div>

//             <div className="md:col-span-3 relative">
//               <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//               <select
//                 value={filterClass}
//                 onChange={(e) => setFilterClass(e.target.value)}
//                 className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
//               >
//                 <option value="all">All Classes</option>
//                 {classes.map(cls => (
//                   <option key={cls} value={cls}>{cls}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="md:col-span-3 relative">
//               <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
//               >
//                 <option value="all">All Status</option>
//                 {statuses.map(status => (
//                   <option key={status} value={status}>{status}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="md:col-span-1">
//               <button className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 py-3 rounded-xl transition-colors font-medium">
//                 <Calendar size={20} className="mx-auto" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Homework List */}
//           <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//             <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
//               <h2 className="font-semibold text-slate-800">
//                 Homework List
//                 <span className="ml-2 text-sm font-normal text-slate-500">
//                   ({filteredHomework.length} items)
//                 </span>
//               </h2>
//               <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
//                 View All
//               </button>
//             </div>

//             <div className="divide-y divide-slate-100">
//               {filteredHomework.length === 0 ? (
//                 <div className="p-12 text-center">
//                   <BookOpen size={48} className="mx-auto text-slate-300" />
//                   <p className="text-slate-500 mt-4">No homework found</p>
//                 </div>
//               ) : (
//                 filteredHomework.map((item) => (
//                   <div
//                     key={item.id}
//                     className="p-5 hover:bg-slate-50 transition-colors cursor-pointer"
//                     onClick={() => setSelectedHomework(item)}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 flex-wrap">
//                           <h4 className="font-semibold text-slate-800">{item.title}</h4>
//                           <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)} flex items-center gap-1`}>
//                             {getStatusIcon(item.status)}
//                             {item.status}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 flex-wrap">
//                           <span className="flex items-center gap-1">
//                             <BookOpen size={14} />
//                             {item.subject}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Users size={14} />
//                             {item.class}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Calendar size={14} />
//                             Due: {item.dueDisplay}
//                           </span>
//                           <span className="text-emerald-600 font-medium">
//                             {item.submissions}/{item.totalStudents} submitted
//                           </span>
//                         </div>
//                         <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 max-w-xs">
//                           <div
//                             className="bg-emerald-500 h-1.5 rounded-full transition-all"
//                             style={{ width: `${(item.submissions / item.totalStudents) * 100}%` }}
//                           />
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 ml-4">
//                         <button 
//                           className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-500"
//                           onClick={(e) => { e.stopPropagation(); }}
//                         >
//                           <Eye size={18} />
//                         </button>
//                         <button 
//                           className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-500"
//                           onClick={(e) => { e.stopPropagation(); }}
//                         >
//                           <Pencil size={18} />
//                         </button>
//                         <button 
//                           className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-400"
//                           onClick={(e) => { e.stopPropagation(); }}
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Recent Activity */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
//               <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
//                 <Clock3 size={18} className="text-blue-500" />
//                 Recent Activity
//               </h2>
//               <div className="space-y-4">
//                 <div className="border-l-4 border-emerald-500 pl-4">
//                   <h4 className="font-medium text-slate-800 text-sm">10-A Submitted</h4>
//                   <p className="text-sm text-slate-500 mt-1">32 students submitted Mathematics homework</p>
//                   <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
//                 </div>
//                 <div className="border-l-4 border-amber-500 pl-4">
//                   <h4 className="font-medium text-slate-800 text-sm">Deadline Tomorrow</h4>
//                   <p className="text-sm text-slate-500 mt-1">Science Diagram assignment due tomorrow</p>
//                   <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
//                 </div>
//                 <div className="border-l-4 border-blue-500 pl-4">
//                   <h4 className="font-medium text-slate-800 text-sm">New Homework Created</h4>
//                   <p className="text-sm text-slate-500 mt-1">Essay Writing assigned to Class 8-C</p>
//                   <p className="text-xs text-slate-400 mt-1">1 day ago</p>
//                 </div>
//                 <div className="border-l-4 border-rose-500 pl-4">
//                   <h4 className="font-medium text-slate-800 text-sm">Overdue Alert</h4>
//                   <p className="text-sm text-slate-500 mt-1">Chapter 5 Exercises is overdue by 2 days</p>
//                   <p className="text-xs text-slate-400 mt-1">2 days ago</p>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
//               <h3 className="font-semibold text-white/90">Quick Stats</h3>
//               <div className="mt-4 space-y-3">
//                 <div className="flex justify-between items-center border-b border-white/10 pb-2">
//                   <span className="text-white/80">Active Assignments</span>
//                   <span className="font-bold">12</span>
//                 </div>
//                 <div className="flex justify-between items-center border-b border-white/10 pb-2">
//                   <span className="text-white/80">Pending Review</span>
//                   <span className="font-bold">8</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-white/80">Average Score</span>
//                   <span className="font-bold">87%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Homework Modal (placeholder) */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl">
//             <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Homework</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
//                 <input className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter homework title" />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-1">Class</label>
//                   <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500">
//                     <option>10-A</option>
//                     <option>9-B</option>
//                     <option>8-C</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
//                   <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500">
//                     <option>Mathematics</option>
//                     <option>Science</option>
//                     <option>English</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
//                 <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 h-24" placeholder="Enter homework description" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
//                 <input type="date" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500" />
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <button 
//                   onClick={() => setShowCreateModal(false)}
//                   className="flex-1 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl transition-colors font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors font-medium">
//                   Create Homework
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
















import { useState } from "react";
import {
  BookOpen,
  Clock3,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Calendar,
  Users,
} from "lucide-react";

export default function TeacherHomework() {
  const [search, setSearch] = useState("");

  const homework = [
    {
      id: 1,
      title: "Chapter 5 Exercises",
      className: "10-A",
      subject: "Mathematics",
      due: "15 Jul 2026",
      submissions: 32,
      totalStudents: 40,
      status: "Active",
    },
    {
      id: 2,
      title: "Science Diagram",
      className: "9-B",
      subject: "Science",
      due: "16 Jul 2026",
      submissions: 18,
      totalStudents: 38,
      status: "Pending",
    },
    {
      id: 3,
      title: "Essay Writing",
      className: "8-C",
      subject: "English",
      due: "18 Jul 2026",
      submissions: 40,
      totalStudents: 40,
      status: "Completed",
    },
  ];

  const filteredHomework = homework.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.className.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    {
      title: "Total Homework",
      value: "24",
      icon: <BookOpen size={20} />,
    },
    {
      title: "Pending Review",
      value: "08",
      icon: <Clock3 size={20} />,
    },
    {
      title: "Submissions",
      value: "142",
      icon: <Users size={20} />,
    },
    {
      title: "Due Today",
      value: "03",
      icon: <Calendar size={20} />,
    },
  ];

  const getStatusColor = (status) => {
    if (status === "Completed")
      return "bg-green-100 text-green-700";

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";

    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Homework Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create and manage assignments
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition">
          <Plus size={18} />
          Create Homework
        </button>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {item.value}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search homework..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500"
          />
        </div>
      </div>

      {/* Homework List */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-gray-800">
            Homework List
          </h2>
        </div>

        {filteredHomework.map((item) => (
          <div
            key={item.id}
            className="p-4 border-b hover:bg-gray-50 transition"
          >
           <div className="flex items-start gap-6">
              <div className="flex-1 pl-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex gap-9 text-sm text-gray-500 mt-3 flex-wrap">
                  <span>
                    {item.subject}
                  </span>

                  <span>
                    Class {item.className}
                  </span>

                  <span>
                    Due : {item.due}
                  </span>
                </div>

                <div className="mt-4 max-w-sm">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>
                      Submission
                    </span>

                    <span>
                      {item.submissions}/
                      {item.totalStudents}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (item.submissions /
                            item.totalStudents) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-1 ml-auto pr-3">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Eye size={16} />
                </button>

                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Pencil size={16} />
                </button>

                <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity */}

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium">
              10-A Submitted Homework
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              32 students submitted
              Mathematics homework.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium">
              Homework Due Tomorrow
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              Science Diagram assignment
              is due tomorrow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}