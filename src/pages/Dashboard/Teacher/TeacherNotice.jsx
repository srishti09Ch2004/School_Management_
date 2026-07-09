// import { useState } from "react";
// import {
//   Bell,
//   Send,
//   Calendar,
//   Paperclip,
//   Search,
//   AlertCircle,
// } from "lucide-react";

// export default function TeacherNotice() {
//   const [title, setTitle] = useState("");
//   const [className, setClassName] = useState("All Classes");
//   const [priority, setPriority] = useState("Normal");
//   const [message, setMessage] = useState("");

//   const notices = [
//     {
//       id: 1,
//       title: "Mid Term Examination",
//       class: "10-A",
//       priority: "Important",
//       date: "12 Jul 2026",
//     },
//     {
//       id: 2,
//       title: "Homework Submission",
//       class: "9-B",
//       priority: "Normal",
//       date: "10 Jul 2026",
//     },
//     {
//       id: 3,
//       title: "Science Practical",
//       class: "All Classes",
//       priority: "Urgent",
//       date: "08 Jul 2026",
//     },
//   ];

//   const priorityColor = (type) => {
//     if (type === "Urgent")
//       return "bg-red-50 text-red-600";

//     if (type === "Important")
//       return "bg-amber-50 text-amber-600";

//     return "bg-blue-50 text-blue-600";
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}

//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">
//           Notice Management
//         </h2>

//         <p className="text-gray-500 mt-1">
//           Create and send notices to students.
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Create Notice */}

//         <div className="lg:col-span-2 bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
//               <Bell
//                 size={20}
//                 className="text-blue-600"
//               />
//             </div>

//             <h3 className="text-lg font-semibold text-gray-800">
//               Create Notice
//             </h3>
//           </div>

//           <div className="space-y-5">
//             <input
//               value={title}
//               onChange={(e) =>
//                 setTitle(e.target.value)
//               }
//               type="text"
//               placeholder="Notice Title"
//               className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
//             />

//             <div className="grid md:grid-cols-2 gap-4">
//               <select
//                 value={className}
//                 onChange={(e) =>
//                   setClassName(e.target.value)
//                 }
//                 className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
//               >
//                 <option>All Classes</option>
//                 <option>10-A</option>
//                 <option>9-B</option>
//                 <option>8-C</option>
//                 <option>12-A</option>
//               </select>

//               <select
//                 value={priority}
//                 onChange={(e) =>
//                   setPriority(e.target.value)
//                 }
//                 className="border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-green-500"
//               >
//                 <option>Normal</option>
//                 <option>Important</option>
//                 <option>Urgent</option>
//               </select>
//             </div>

//             <textarea
//               rows={6}
//               value={message}
//               onChange={(e) =>
//                 setMessage(e.target.value)
//               }
//               placeholder="Write notice details..."
//               className="w-full border border-gray-200 rounded-2xl p-4 outline-none resize-none focus:border-green-500"
//             />

//             <div className="flex flex-wrap gap-3">
//               <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
//                 <Paperclip size={18} />
//                 Attachment
//               </button>

//               <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white transition">
//                 <Send size={18} />
//                 Publish Notice
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Quick Info */}

//         <div className="space-y-5">
//           <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
//             <h3 className="font-semibold text-gray-800 mb-5">
//               Notice Tips
//             </h3>

//             <div className="space-y-4 text-sm text-gray-600">
//               <div className="flex gap-3">
//                 <AlertCircle
//                   size={18}
//                   className="text-red-500 mt-0.5"
//                 />
//                 <p>
//                   Use <b>Urgent</b> for exam or
//                   emergency notices.
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 <Calendar
//                   size={18}
//                   className="text-blue-500 mt-0.5"
//                 />
//                 <p>
//                   Notices are visible instantly
//                   after publishing.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
//             <h3 className="text-sm text-blue-600">
//               Total Notices This Month
//             </h3>

//             <h2 className="text-3xl font-bold text-gray-800 mt-2">
//               24
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Recent Notices */}

//       <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//           <h3 className="font-semibold text-gray-800">
//             Recent Notices
//           </h3>

//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-3 top-3 text-gray-400"
//             />

//             <input
//               placeholder="Search..."
//               className="border border-gray-200 rounded-xl pl-10 pr-4 py-2 outline-none"
//             />
//           </div>
//         </div>

//         <div className="divide-y">
//           {notices.map((item) => (
//             <div
//               key={item.id}
//               className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50"
//             >
//               <div>
//                 <h4 className="font-medium text-gray-800">
//                   {item.title}
//                 </h4>

//                 <p className="text-sm text-gray-500 mt-1">
//                   {item.class}
//                 </p>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor(
//                     item.priority
//                   )}`}
//                 >
//                   {item.priority}
//                 </span>

//                 <span className="text-sm text-gray-500">
//                   {item.date}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }














// import { useState } from "react";
// import { 
//   Megaphone, 
//   Layers, 
//   Paperclip, 
//   Calendar, 
//   Send, 
//   Users,
//   AlertCircle
// } from "lucide-react";

// export default function TeacherNotice() {
//   // Essential ERP Form States
//   const [title, setTitle] = useState("");
//   const [targetClass, setTargetClass] = useState("Select Class");
//   const [content, setContent] = useState("");
//   const [noticeType, setNoticeType] = useState("General");
//   const [audience, setAudience] = useState("Students");
//   const [isSending, setIsSending] = useState(false);

//   const noticeTypes = [
//     { label: "General", color: "bg-blue-50 text-blue-700 border-blue-200" },
//     { label: "Exam", color: "bg-rose-50 text-rose-700 border-rose-200" },
//     { label: "Holiday", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
//     { label: "Event", color: "bg-amber-50 text-amber-700 border-amber-200" }
//   ];

//   const targetAudiences = ["Students", "Parents", "All"];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !content) return alert("Please fill in the title and content.");
    
//     setIsSending(true);
//     // Simulating API Dispatch
//     setTimeout(() => {
//       setIsSending(false);
//       alert(`Notice "${title}" dispatched successfully to ${audience}!`);
//       setTitle("");
//       setContent("");
//       setTargetClass("Select Class");
//     }, 1200);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 space-y-6 font-sans antialiased">
      
//       {/* Page Header */}
//       <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
//         <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-sm">
//           <Megaphone size={22} />
//         </div>
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
//             Notice Circular Dispatch
//           </h1>
//           <p className="text-slate-500 text-sm mt-0.5">
//             Broadcast official announcements and urgent alerts to the school network.
//           </p>
//         </div>
//       </div>

//       {/* Main Grid: Form Left, Rules/Preview Right */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
//         {/* Core ERP Notice Form */}
//         <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
          
//           {/* Row 1: Title & Class */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="md:col-span-2 space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Notice Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="e.g., Mid-Term Syllabus & Schedule Update"
//                 className="w-full border border-slate-200 rounded-xl py-2.5 px-4 outline-none text-sm text-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Roster</label>
//               <select 
//                 value={targetClass}
//                 onChange={(e) => setTargetClass(e.target.value)}
//                 className="w-full border border-slate-200 rounded-xl py-2.5 px-4 outline-none text-sm text-slate-700 focus:border-emerald-500 bg-white transition cursor-pointer"
//               >
//                 <option>Select Class</option>
//                 <option>All Classes</option>
//                 <option>10-A</option>
//                 <option>9-B</option>
//                 <option>12-A</option>
//               </select>
//             </div>
//           </div>

//           {/* Row 2: Category Types */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Notice Category</label>
//             <div className="flex flex-wrap gap-2">
//               {noticeTypes.map((type) => (
//                 <button
//                   key={type.label}
//                   type="button"
//                   onClick={() => setNoticeType(type.label)}
//                   className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition ${
//                     noticeType === type.label 
//                       ? `${type.color} ring-2 ring-offset-1 ring-slate-800/10 shadow-sm font-extrabold` 
//                       : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
//                   }`}
//                 >
//                   {type.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Row 3: Audience Filtering Chips */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target Audience</label>
//             <div className="flex gap-4">
//               {targetAudiences.map((aud) => (
//                 <label key={aud} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600">
//                   <input
//                     type="radio"
//                     name="audience"
//                     checked={audience === aud}
//                     onChange={() => setAudience(aud)}
//                     className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
//                   />
//                   <span>{aud}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Row 4: Text Content */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Circular Content Text</label>
//             <textarea
//               rows="5"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Draft your detailed announcement instructions here..."
//               className="w-full border border-slate-200 rounded-xl p-4 outline-none text-sm text-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition resize-none leading-relaxed"
//             />
//           </div>

//           {/* Row 5: Action Utilities Footer */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
//             <div className="flex items-center gap-2">
//               <button type="button" title="Attach Files" className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5 text-xs font-semibold">
//                 <Paperclip size={14} />
//                 <span>Attach File (PDF/Image)</span>
//               </button>
//               <button type="button" title="Schedule Circular" className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5 text-xs font-semibold">
//                 <Calendar size={14} />
//                 <span>Schedule Later</span>
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={isSending}
//               className={`font-medium px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow-sm active:scale-98 text-sm ${
//                 isSending 
//                   ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
//                   : "bg-emerald-600 hover:bg-emerald-700 text-white"
//               }`}
//             >
//               <Send size={15} />
//               <span>{isSending ? "Dispatched..." : "Publish Announcement"}</span>
//             </button>
//           </div>

//         </form>

//         {/* Info & Guideline Sidebar */}
//         <div className="space-y-5">
//           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
//             <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-3">
//               <Users size={16} className="text-slate-400" />
//               <span>Dispatch Scope Tracker</span>
//             </h3>
//             <p className="text-xs text-slate-500 leading-relaxed font-medium">
//               You are current drafting a <span className="text-emerald-600 font-bold">{noticeType}</span> memo routed specifically to the <span className="text-slate-800 font-bold">{audience}</span> registry profile under portal index <span className="text-slate-800 font-bold">{targetClass}</span>.
//             </p>
//           </div>

//           <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-5 shadow-sm flex gap-3">
//             <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
//             <div>
//               <h4 className="font-bold text-amber-800 text-xs uppercase tracking-wider">ERP Compliance Policy</h4>
//               <p className="text-[11px] text-amber-700/90 leading-relaxed mt-1 font-medium">
//                 Once an announcement is dispatched, real-time push notifications will run across mobile logs of respective student-parent modules instantly.
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
//   Send,
//   Bell,
//   Calendar,
//   Users,
//   Eye,
//   Edit,
//   Trash2,
//   Pin,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   Search,
//   Filter,
//   Download,
//   Printer,
//   Plus,
//   X,
//   Image,
//   Paperclip,
//   Link2,
//   Tag,
// } from "lucide-react";

// export default function TeacherNotice() {
//   const [activeTab, setActiveTab] = useState("create");
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [showPreview, setShowPreview] = useState(false);
//   const [selectedNotice, setSelectedNotice] = useState(null);
  
//   const [formData, setFormData] = useState({
//     title: "",
//     class: "",
//     category: "general",
//     content: "",
//     priority: "normal",
//     attachments: [],
//     schedule: "",
//   });

//   const notices = [
//     {
//       id: 1,
//       title: "Parent-Teacher Meeting",
//       class: "All Classes",
//       category: "Meeting",
//       content: "Parent-teacher meeting scheduled for next Friday at 2:00 PM. All parents are requested to attend.",
//       priority: "high",
//       status: "Published",
//       views: 245,
//       date: "2026-07-15",
//       time: "09:00 AM",
//       author: "Dr. Sharma",
//       pinned: true,
//     },
//     {
//       id: 2,
//       title: "Examination Schedule",
//       class: "10-A, 12-A",
//       category: "Exam",
//       content: "Mid-term examinations will commence from July 20. Detailed schedule attached.",
//       priority: "urgent",
//       status: "Published",
//       views: 189,
//       date: "2026-07-14",
//       time: "11:30 AM",
//       author: "Ms. Singh",
//       pinned: false,
//     },
//     {
//       id: 3,
//       title: "Holiday Notice",
//       class: "All Classes",
//       category: "General",
//       content: "School will remain closed on July 17 due to local festival.",
//       priority: "normal",
//       status: "Draft",
//       views: 0,
//       date: "2026-07-13",
//       time: "02:00 PM",
//       author: "Admin",
//       pinned: false,
//     },
//     {
//       id: 4,
//       title: "Science Fair Registration",
//       class: "9-B, 10-A",
//       category: "Event",
//       content: "Last date for science fair registration is July 25. Interested students should register by then.",
//       priority: "medium",
//       status: "Scheduled",
//       views: 56,
//       date: "2026-07-16",
//       time: "10:00 AM",
//       author: "Mr. Kumar",
//       pinned: false,
//     },
//   ];

//   const categories = ["General", "Meeting", "Exam", "Event", "Academic", "Sports", "Holiday"];
//   const classes = ["All Classes", "10-A", "9-B", "12-A", "11-B", "8-C", "7-A", "6-B"];

//   const getPriorityColor = (priority) => {
//     const colors = {
//       urgent: "bg-rose-100 text-rose-700 border-rose-200",
//       high: "bg-orange-100 text-orange-700 border-orange-200",
//       medium: "bg-blue-100 text-blue-700 border-blue-200",
//       normal: "bg-emerald-100 text-emerald-700 border-emerald-200",
//     };
//     return colors[priority] || colors.normal;
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       Published: "bg-emerald-100 text-emerald-700",
//       Draft: "bg-slate-100 text-slate-700",
//       Scheduled: "bg-blue-100 text-blue-700",
//     };
//     return colors[status] || colors.Draft;
//   };

//   const getStatusIcon = (status) => {
//     const icons = {
//       Published: CheckCircle,
//       Draft: Clock,
//       Scheduled: Calendar,
//     };
//     return icons[status] || Clock;
//   };

//   const filteredNotices = notices.filter(notice => {
//     const matchesSearch = notice.title.toLowerCase().includes(search.toLowerCase()) ||
//                          notice.content.toLowerCase().includes(search.toLowerCase());
//     const matchesFilter = filter === "all" || notice.status.toLowerCase() === filter.toLowerCase();
//     return matchesSearch && matchesFilter;
//   });

//   const pinnedNotices = filteredNotices.filter(n => n.pinned);
//   const otherNotices = filteredNotices.filter(n => !n.pinned);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit logic here
//     alert("Notice sent successfully!");
//     setFormData({
//       title: "",
//       class: "",
//       category: "general",
//       content: "",
//       priority: "normal",
//       attachments: [],
//       schedule: "",
//     });
//   };

//   const StatCard = ({ icon: Icon, title, value, color }) => (
//     <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
//       <div className="flex items-center gap-4">
//         <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
//           <Icon size={20} />
//         </div>
//         <div>
//           <p className="text-sm text-slate-500">{title}</p>
//           <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
//         </div>
//       </div>
//     </div>
//   );

//   const NoticeCard = ({ notice, isPinned }) => (
//     <div className={`bg-white rounded-2xl border ${isPinned ? 'border-amber-200 shadow-lg shadow-amber-50' : 'border-slate-100'} p-6 hover:shadow-md transition-all`}>
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className="flex items-center gap-3 flex-wrap mb-2">
//             {isPinned && (
//               <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium">
//                 <Pin size={12} />
//                 Pinned
//               </span>
//             )}
//             <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
//               <AlertCircle size={12} />
//               {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
//             </span>
//             <span className="text-xs text-slate-500">{notice.category}</span>
//           </div>
//           <h3 className="text-lg font-bold text-slate-800">{notice.title}</h3>
//           <p className="text-slate-600 mt-2 line-clamp-2">{notice.content}</p>
//           <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 flex-wrap">
//             <span className="flex items-center gap-1">
//               <Users size={14} />
//               {notice.class}
//             </span>
//             <span className="flex items-center gap-1">
//               <Calendar size={14} />
//               {notice.date}
//             </span>
//             <span className="flex items-center gap-1">
//               <Eye size={14} />
//               {notice.views} views
//             </span>
//             <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(notice.status)}`}>
//               {React.createElement(getStatusIcon(notice.status), { size: 12 })}
//               {notice.status}
//             </span>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 ml-4">
//           <button 
//             className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
//             onClick={() => setSelectedNotice(notice)}
//           >
//             <Eye size={18} />
//           </button>
//           <button className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors">
//             <Edit size={18} />
//           </button>
//           <button className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors">
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//               Notice Management
//             </h1>
//             <p className="text-slate-500 mt-1">Create and manage school notices</p>
//           </div>
//           <div className="flex gap-3">
//             <button className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm hover:shadow">
//               <Download size={18} />
//               Export
//             </button>
//             <button className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm hover:shadow">
//               <Printer size={18} />
//               Print
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <StatCard icon={Bell} title="Total Notices" value="24" color="blue" />
//           <StatCard icon={CheckCircle} title="Published" value="18" color="emerald" />
//           <StatCard icon={Clock} title="Drafts" value="4" color="amber" />
//           <StatCard icon={Calendar} title="Scheduled" value="2" color="purple" />
//         </div>

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
//           <div className="border-b border-slate-100">
//             <div className="flex">
//               <button
//                 onClick={() => setActiveTab("create")}
//                 className={`px-8 py-4 text-sm font-medium transition-colors relative ${
//                   activeTab === "create"
//                     ? "text-emerald-600 border-b-2 border-emerald-600"
//                     : "text-slate-500 hover:text-slate-700"
//                 }`}
//               >
//                 Create Notice
//               </button>
//               <button
//                 onClick={() => setActiveTab("manage")}
//                 className={`px-8 py-4 text-sm font-medium transition-colors relative ${
//                   activeTab === "manage"
//                     ? "text-emerald-600 border-b-2 border-emerald-600"
//                     : "text-slate-500 hover:text-slate-700"
//                 }`}
//               >
//                 Manage Notices
//                 <span className="ml-2 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
//                   {notices.length}
//                 </span>
//               </button>
//             </div>
//           </div>

//           <div className="p-6">
//             {activeTab === "create" ? (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Notice Title *
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleInputChange}
//                       placeholder="Enter notice title"
//                       className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Target Class *
//                     </label>
//                     <select
//                       name="class"
//                       value={formData.class}
//                       onChange={handleInputChange}
//                       className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       required
//                     >
//                       <option value="">Select Class</option>
//                       {classes.map(cls => (
//                         <option key={cls} value={cls}>{cls}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Category
//                     </label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                     >
//                       {categories.map(cat => (
//                         <option key={cat} value={cat.toLowerCase()}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Priority
//                     </label>
//                     <select
//                       name="priority"
//                       value={formData.priority}
//                       onChange={handleInputChange}
//                       className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                     >
//                       <option value="normal">Normal</option>
//                       <option value="medium">Medium</option>
//                       <option value="high">High</option>
//                       <option value="urgent">Urgent</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Notice Content *
//                   </label>
//                   <textarea
//                     name="content"
//                     value={formData.content}
//                     onChange={handleInputChange}
//                     rows="6"
//                     placeholder="Write your notice here..."
//                     className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Schedule (Optional)
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="schedule"
//                     value={formData.schedule}
//                     onChange={handleInputChange}
//                     className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Attachments
//                   </label>
//                   <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
//                     <div className="flex items-center justify-center gap-4 flex-wrap">
//                       <button type="button" className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2">
//                         <Image size={20} />
//                         Image
//                       </button>
//                       <button type="button" className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2">
//                         <Paperclip size={20} />
//                         File
//                       </button>
//                       <button type="button" className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2">
//                         <Link2 size={20} />
//                         Link
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 pt-4">
//                   <button
//                     type="submit"
//                     className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3.5 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 font-semibold"
//                   >
//                     <Send size={20} />
//                     Send Notice
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setShowPreview(true)}
//                     className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-3.5 rounded-2xl flex items-center gap-2 transition-all shadow-sm hover:shadow"
//                   >
//                     <Eye size={20} />
//                     Preview
//                   </button>
//                   <button
//                     type="reset"
//                     className="text-slate-500 hover:text-slate-700 px-6 py-3.5 rounded-2xl transition-colors"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <div className="space-y-6">
//                 {/* Search and Filter */}
//                 <div className="flex flex-col md:flex-row gap-4">
//                   <div className="flex-1 relative">
//                     <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                     <input
//                       value={search}
//                       onChange={(e) => setSearch(e.target.value)}
//                       placeholder="Search notices..."
//                       className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div className="relative md:w-48">
//                     <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                     <select
//                       value={filter}
//                       onChange={(e) => setFilter(e.target.value)}
//                       className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
//                     >
//                       <option value="all">All Status</option>
//                       <option value="published">Published</option>
//                       <option value="draft">Draft</option>
//                       <option value="scheduled">Scheduled</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Pinned Notices */}
//                 {pinnedNotices.length > 0 && (
//                   <div>
//                     <h3 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
//                       <Pin size={16} />
//                       Pinned Notices
//                     </h3>
//                     <div className="space-y-4">
//                       {pinnedNotices.map(notice => (
//                         <NoticeCard key={notice.id} notice={notice} isPinned={true} />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* All Notices */}
//                 <div>
//                   <h3 className="text-sm font-semibold text-slate-600 mb-3">
//                     All Notices
//                     <span className="ml-2 text-xs font-normal text-slate-400">
//                       ({otherNotices.length} notices)
//                     </span>
//                   </h3>
//                   <div className="space-y-4">
//                     {otherNotices.length === 0 ? (
//                       <div className="text-center py-12">
//                         <Bell size={48} className="mx-auto text-slate-300" />
//                         <p className="text-slate-500 mt-4">No notices found</p>
//                       </div>
//                     ) : (
//                       otherNotices.map(notice => (
//                         <NoticeCard key={notice.id} notice={notice} isPinned={false} />
//                       ))
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState } from "react";
import {
  Bell,
  Send,
  Search,
  Eye,
  Trash2,
  Calendar,
  Users,
} from "lucide-react";

export default function TeacherNotice() {
  const [search, setSearch] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    class: "",
    content: "",
  });

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Parent Teacher Meeting",
      class: "All Classes",
      content:
        "Parent teacher meeting will be held on Friday at 2 PM.",
      date: "09 Jul 2026",
      views: 120,
    },
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNotice = {
      id: Date.now(),
      title: formData.title,
      class: formData.class,
      content: formData.content,
      date: new Date().toLocaleDateString(),
      views: 0,
    };

    setNotices([newNotice, ...notices]);

    setFormData({
      title: "",
      class: "",
      content: "",
    });

    alert("Notice Added Successfully");
  };

  const deleteNotice = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Notice Management
            </h1>
            <p className="text-slate-500">
              Create and manage notices
            </p>
          </div>

          <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-2">
            <Bell size={18} />
            {notices.length} Notices
          </div>
        </div>

        {/* Create Notice */}
        <div className="bg-white p-6 rounded-3xl shadow">
          <h2 className="text-xl font-bold mb-5">
            Create Notice
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Notice Title"
              className="w-full border rounded-xl p-3"
              required
            />

            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              placeholder="Class"
              className="w-full border rounded-xl p-3"
              required
            />

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Notice Content"
              rows={5}
              className="w-full border rounded-xl p-3"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Send size={18} />
                Send Notice
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowPreview(true)
                }
                className="border px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Eye size={18} />
                Preview
              </button>
            </div>
          </form>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search notices..."
            className="w-full outline-none"
          />
        </div>

        {/* Notice List */}
        <div className="space-y-4">
          {filteredNotices.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl text-center">
              No Notices Found
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white p-6 rounded-3xl shadow"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      {notice.title}
                    </h3>

                    <div className="flex gap-4 text-sm text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {notice.class}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {notice.date}
                      </span>

                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {notice.views}
                      </span>
                    </div>

                    <p className="mt-4 text-slate-600">
                      {notice.content}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteNotice(notice.id)
                    }
                    className="text-red-500 hover:bg-red-50 p-3 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-5">
                Notice Preview
              </h2>

              <h3 className="text-xl font-bold">
                {formData.title || "Notice Title"}
              </h3>

              <p className="text-slate-500 mt-2">
                Class :{" "}
                {formData.class || "Not Selected"}
              </p>

              <p className="mt-6 whitespace-pre-line">
                {formData.content ||
                  "No Content"}
              </p>

              <button
                onClick={() =>
                  setShowPreview(false)
                }
                className="mt-8 bg-emerald-600 text-white px-6 py-3 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
