
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Bell,
//   Send,
//   Search,
//   Eye,
//   Trash2,
//   Calendar,
//   Users,
//   RefreshCw,
//   X,
//   AlertCircle,
// } from "lucide-react";

// const API = "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/notifications";

// export default function TeacherNotices() {
//   const [user, setUser] = useState(null);

//   const [notices, setNotices] = useState([]);
//   const [classes, setClasses] = useState([]);

//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [loadingClasses, setLoadingClasses] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const [showPreview, setShowPreview] = useState(false);
//   const [showView, setShowView] = useState(false);

//   const [selectedNotice, setSelectedNotice] = useState(null);

//   const [message, setMessage] = useState({
//     type: "",
//     text: "",
//   });

// const [formData, setFormData] = useState({
//   title: "",
//   class_name: "",
//   section: "",
//   notice_type: "General",
//   priority: "Normal",
//   content: "",
//   expiry_date: "",
// });

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (!storedUser) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//     } catch (error) {
//       console.error("Invalid user data:", error);
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!user?.id) return;

//     fetchClasses();
//     fetchNotices();
//   }, [user]);

//   const fetchClasses = async () => {
//     try {
//       setLoadingClasses(true);

//       const response = await fetch(
//         `${API}/getTeacherClasses.php?teacher_id=${encodeURIComponent(
//           user.id
//         )}&_=${Date.now()}`
//       );

//       const text = await response.text();

//       let result;

//       try {
//         result = JSON.parse(text);
//       } catch {
//         throw new Error("Invalid server response");
//       }

//       if (result.status) {
//         setClasses(Array.isArray(result.data) ? result.data : []);

//         if (result.data?.length > 0) {
//           setFormData((prev) => ({
//             ...prev,
//             class_name: prev.class_name || result.data[0].class_name,
//             section: prev.section || result.data[0].section,
//           }));
//         }
//       } else {
//         setClasses([]);
//       }
//     } catch (error) {
//       console.error("Fetch classes error:", error);

//       setMessage({
//         type: "error",
//         text: "Unable to load your assigned classes.",
//       });
//     } finally {
//       setLoadingClasses(false);
//     }
//   };

// const fetchNotices = async () => {
//   if (!user?.id) return;

//   try {
//     setLoading(true);

//     const response = await fetch(
//       `${API}/getTeacherNotices.php?user_id=${encodeURIComponent(
//         user.id
//       )}&_=${Date.now()}`
//     );

//     const text = await response.text();

//     let result;

//     try {
//       result = JSON.parse(text);
//     } catch {
//       console.error("Notices API response:", text);
//       throw new Error("Invalid server response");
//     }

//     if (result.status) {
//       setNotices(
//         Array.isArray(result.data)
//           ? result.data
//           : []
//       );
//     } else {
//       throw new Error(
//         result.message || "Unable to load notices."
//       );
//     }

//   } catch (error) {
//     console.error("Fetch notices error:", error);

//     setNotices([]);

//     setMessage({
//       type: "error",
//       text: error.message || "Unable to load notices.",
//     });

//   } finally {
//     setLoading(false);
//   }
// };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const handleClassChange = (e) => {
//   const selectedClass = e.target.value;

//   if (selectedClass === "ALL") {
//     setFormData((prev) => ({
//       ...prev,
//       class_name: "ALL",
//       section: "ALL",
//     }));

//     return;
//   }

//   setFormData((prev) => ({
//     ...prev,
//     class_name: selectedClass,
//     section: "",
//   }));
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.id) {
//       setMessage({
//         type: "error",
//         text: "Teacher session not found. Please login again.",
//       });
//       return;
//     }

//     if (!formData.class_name || !formData.section) {
//       setMessage({
//         type: "error",
//         text: "Please select your class and section.",
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);
//       setMessage({ type: "", text: "" });

//       const response = await fetch(
//         `${API}/createTeacherNotice.php`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//          body: JSON.stringify({
//               user_id: user.id,
//               title: formData.title.trim(),
//               class_name: formData.class_name,
//               section: formData.section,
//               notice_type: formData.notice_type,
//               priority: formData.priority,
//               description: formData.content.trim(),
//               expiry_date: formData.expiry_date || null,
//           }),
//         }
//       );

//       const text = await response.text();

//       let result;

//       try {
//         result = JSON.parse(text);
//       } catch {
//         console.error("Create notice response:", text);
//         throw new Error("Invalid server response");
//       }

//       if (!result.status) {
//         throw new Error(result.message || "Unable to create notice");
//       }

//       setMessage({
//         type: "success",
//         text:
//           result.message ||
//           "Notice sent successfully to your class students.",
//       });

//       setFormData({
//         title: "",
//         class_name: classes[0]?.class_name || "",
//         section: classes[0]?.section || "",
//         notice_type: "General",
//         priority: "Normal",
//         content: "",
//         expiry_date: "",
//       });

//       setShowPreview(false);

//       await fetchNotices();
//     } catch (error) {
//       console.error("Create notice error:", error);

//       setMessage({
//         type: "error",
//         text: error.message || "Unable to send notice.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const deleteNotice = async (noticeId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this notice?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `${API}/deleteTeacherNotice.php`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             notice_id: noticeId,
//             teacher_id: user.id,
//           }),
//         }
//       );

//       const text = await response.text();

//       let result;

//       try {
//         result = JSON.parse(text);
//       } catch {
//         throw new Error("Invalid server response");
//       }

//       if (!result.status) {
//         throw new Error(result.message || "Unable to delete notice");
//       }

//       setNotices((prev) =>
//         prev.filter((notice) => Number(notice.id) !== Number(noticeId))
//       );

//       setMessage({
//         type: "success",
//         text: result.message || "Notice deleted successfully.",
//       });
//     } catch (error) {
//       console.error("Delete notice error:", error);

//       setMessage({
//         type: "error",
//         text: error.message || "Unable to delete notice.",
//       });
//     }
//   };

//   const filteredNotices = useMemo(() => {
//     const value = search.toLowerCase().trim();

//     if (!value) return notices;

//     return notices.filter((notice) => {
//       return (
//         String(notice.title || "")
//           .toLowerCase()
//           .includes(value) ||
//         String(notice.description || "")
//           .toLowerCase()
//           .includes(value) ||
//         String(notice.notice_type || "")
//           .toLowerCase()
//           .includes(value) ||
//         String(notice.for || "")
//           .toLowerCase()
//           .includes(value)
//       );
//     });
//   }, [notices, search]);

//   const totalRecipients = notices.reduce(
//     (sum, notice) => sum + Number(notice.recipient_count || 0),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               Notice Management
//             </h1>

//             <p className="text-slate-500 mt-1">
//               Send and manage notices for your assigned class
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={fetchNotices}
//               className="h-10 px-4 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-700 hover:bg-slate-50 transition"
//             >
//               <RefreshCw size={17} />
//               Refresh
//             </button>

//             <div className="bg-emerald-100 text-emerald-700 px-4 py-2.5 rounded-xl flex items-center gap-2">
//               <Bell size={18} />
//               <span className="font-semibold">
//                 {notices.length} Notices
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Message */}
//         {message.text && (
//           <div
//             className={`rounded-xl px-4 py-3 flex items-center gap-2 ${
//               message.type === "success"
//                 ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
//                 : "bg-red-50 text-red-700 border border-red-200"
//             }`}
//           >
//             {message.type === "error" && (
//               <AlertCircle size={18} />
//             )}

//             <span>{message.text}</span>

//             <button
//               type="button"
//               onClick={() => setMessage({ type: "", text: "" })}
//               className="ml-auto"
//             >
//               <X size={17} />
//             </button>
//           </div>
//         )}

//         {/* Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-500">
//                   My Notices
//                 </p>

//                 <h3 className="text-2xl font-bold text-slate-900 mt-1">
//                   {notices.length}
//                 </h3>
//               </div>

//               <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
//                 <Bell size={21} />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-500">
//                   Students Reached
//                 </p>

//                 <h3 className="text-2xl font-bold text-slate-900 mt-1">
//                   {totalRecipients}
//                 </h3>
//               </div>

//               <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//                 <Users size={21} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Create Notice */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <h2 className="text-xl font-bold text-slate-900">
//                 Create Notice
//               </h2>

//               <p className="text-sm text-slate-500 mt-1">
//                 Notice will be sent only to students of your assigned class.
//               </p>
//             </div>

//             <Bell className="text-emerald-600" size={23} />
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">

//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Notice Title"
//               className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-100"
//               required
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//               <select
//                 name="class_name"
//                 value={formData.class_name}
//                 onChange={handleClassChange}
//                 className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none"
//                 required
//                 disabled={loadingClasses}
//               >
//                 <option value="">
//                   {loadingClasses
//                     ? "Loading classes..."
//                     : "Select Class"}
//                 </option>

//                 <option value="ALL">
//                   All Classes
//                 </option>

//                 {[...new Set(
//                   classes.map((item) => String(item.class_name))
//                 )].map((className) => (
//                   <option
//                     key={className}
//                     value={className}
//                   >
//                     Class {className}
//                   </option>
//                 ))}
//               </select>
                 
//                 <select
//                     name="section"
//                     value={formData.section}
//                     onChange={handleChange}
//                     className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none"
//                     required
//                     disabled={!formData.class_name || formData.class_name === "ALL"}
//                   >
//                     <option value="">
//                       {formData.class_name === "ALL"
//                         ? "All Sections"
//                         : "Select Section"}
//                     </option>

//                     {formData.class_name === "ALL" ? (
//                       <option value="ALL">
//                         All Sections
//                       </option>
//                     ) : (
//                       classes
//                         .filter(
//                           (item) =>
//                             String(item.class_name) ===
//                             String(formData.class_name)
//                         )
//                         .map((item) => (
//                           <option
//                             key={`${item.class_name}-${item.section}`}
//                             value={item.section}
//                           >
//                             Section {item.section}
//                           </option>
//                         ))
//                     )}
//                   </select>
              
                  
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//               <select
//                 name="notice_type"
//                 value={formData.notice_type}
//                 onChange={handleChange}
//                 className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none"
//               >
//                 <option value="General">General</option>
//                 <option value="PTM">PTM</option>
//                 <option value="Homework">Homework</option>
//                 <option value="Assignment">Assignment</option>
//                 <option value="Exam">Exam</option>
//                 <option value="Reminder">Reminder</option>
//               </select>

//               <select
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none"
//               >
//                 <option value="Normal">Normal</option>
//                 <option value="Important">Important</option>
//                 <option value="Urgent">Urgent</option>
//               </select>

//               <input
//                 type="date"
//                 name="expiry_date"
//                 value={formData.expiry_date}
//                 onChange={handleChange}
//                 className="w-full border border-slate-200 rounded-xl p-3 outline-none"
//               />
//             </div>

//             <textarea
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               placeholder="Notice Content"
//               rows={5}
//               className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-100"
//               required
//             />

//             <div className="flex gap-3">

//               <button
//                 type="submit"
//                 disabled={submitting || loadingClasses}
//                 className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
//               >
//                 <Send size={18} />

//                 {submitting
//                   ? "Sending..."
//                   : "Send Notice"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setShowPreview(true)}
//                 className="border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition"
//               >
//                 <Eye size={18} />
//                 Preview
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Search */}
//         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
//           <Search size={18} className="text-slate-400" />

//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search notices..."
//             className="w-full outline-none text-slate-700"
//           />
//         </div>

//         {/* Notice List */}
//         <div className="space-y-4">

//           {loading ? (
//             <div className="bg-white p-10 rounded-3xl text-center text-slate-500">
//               Loading notices...
//             </div>
//           ) : filteredNotices.length === 0 ? (
//             <div className="bg-white p-10 rounded-3xl text-center">
//               <Bell
//                 size={35}
//                 className="mx-auto text-slate-300 mb-3"
//               />

//               <p className="text-slate-500">
//                 No notices found
//               </p>
//             </div>
//           ) : (
//             filteredNotices.map((notice) => (
//               <div
//                 key={notice.id}
//                 className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
//               >
//                 <div className="flex justify-between gap-5">

//                   <div className="flex-1">

//                     <div className="flex flex-wrap items-center gap-2 mb-2">

//                       <h3 className="text-xl font-bold text-slate-900">
//                         {notice.title}
//                       </h3>

//                       {notice.notice_type && (
//                         <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
//                           {notice.notice_type}
//                         </span>
//                       )}

//                       {notice.priority === "Urgent" && (
//                         <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-600">
//                           Urgent
//                         </span>
//                       )}
//                     </div>

//                     <div className="flex flex-wrap gap-4 text-sm text-slate-500">

//                       <span className="flex items-center gap-1">
//                         <Users size={14} />
//                         {notice.for || "Students"}
//                       </span>

//                       <span className="flex items-center gap-1">
//                         <Calendar size={14} />
//                         {notice.publish_date || notice.created_at}
//                       </span>

//                       <span className="flex items-center gap-1">
//                         <Users size={14} />
//                         {notice.recipient_count || 0} Students
//                       </span>
//                     </div>

//                     <p className="mt-4 text-slate-600 whitespace-pre-line">
//                       {notice.description}
//                     </p>

//                     <button
//                       type="button"
//                       onClick={() => {
//                         setSelectedNotice(notice);
//                         setShowView(true);
//                       }}
//                       className="mt-4 text-emerald-600 text-sm font-medium hover:underline flex items-center gap-1"
//                     >
//                       <Eye size={15} />
//                       View Notice
//                     </button>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => deleteNotice(notice.id)}
//                     className="text-red-500 hover:bg-red-50 p-3 rounded-xl h-fit transition"
//                     title="Delete Notice"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Preview Modal */}
//       {showPreview && (
//         <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl p-7 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-2xl font-bold">
//                 Notice Preview
//               </h2>

//               <button
//                 type="button"
//                 onClick={() => setShowPreview(false)}
//                 className="p-2 rounded-lg hover:bg-slate-100"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <h3 className="text-xl font-bold">
//               {formData.title || "Notice Title"}
//             </h3>

//             <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
//               <span>
//                 Class: {formData.class_name || "Not Selected"}
//               </span>

//               <span>
//                 Section: {formData.section || "Not Selected"}
//               </span>

//               <span>
//                 Type: {formData.notice_type}
//               </span>

//               <span>
//                 Priority: {formData.priority}
//               </span>
//             </div>

//             <p className="mt-6 text-slate-700 whitespace-pre-line">
//               {formData.content || "No Content"}
//             </p>

//             <button
//               type="button"
//               onClick={() => setShowPreview(false)}
//               className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* View Modal */}
//       {showView && selectedNotice && (
//         <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl p-7 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-2xl font-bold">
//                 Notice Details
//               </h2>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowView(false);
//                   setSelectedNotice(null);
//                 }}
//                 className="p-2 rounded-lg hover:bg-slate-100"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <h3 className="text-xl font-bold">
//               {selectedNotice.title}
//             </h3>

//             <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
//               <span>
//                 Class: {selectedNotice.for || "Students"}
//               </span>

//               <span>
//                 Type: {selectedNotice.notice_type}
//               </span>

//               <span>
//                 Priority: {selectedNotice.priority}
//               </span>

//               <span>
//                 Students: {selectedNotice.recipient_count || 0}
//               </span>
//             </div>

//             <p className="mt-6 text-slate-700 whitespace-pre-line">
//               {selectedNotice.description}
//             </p>

//             <button
//               type="button"
//               onClick={() => {
//                 setShowView(false);
//                 setSelectedNotice(null);
//               }}
//               className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";

import {
  Bell,
  Send,
  Search,
  Eye,
  Trash2,
  Calendar,
  Users,
  RefreshCw,
  X,
  AlertCircle,
  Clock,
} from "lucide-react";

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/notifications";

const TeacherNotice = () => {
  const [user, setUser] = useState(null);

  const [notices, setNotices] = useState([]);
  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingClasses, setLoadingClasses] =
    useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [showPreview, setShowPreview] =
    useState(false);

  const [showView, setShowView] = useState(false);

  const [selectedNotice, setSelectedNotice] =
    useState(null);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    class_name: "",
    section: "",
    notice_type: "General",
    priority: "Normal",
    content: "",
    expiry_date: "",
  });

  /*
  |--------------------------------------------------------------------------
  | User
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const parsedUser = JSON.parse(
        storedUser
      );

      setUser(parsedUser);
    } catch (error) {
      console.error(
        "Failed to load user:",
        error
      );
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Format date/time
  |--------------------------------------------------------------------------
  */

  const formatDateTime = (value) => {
    if (!value) {
      return "—";
    }

    try {
      const normalized =
        String(value).replace(" ", "T");

      const date = new Date(normalized);

      if (Number.isNaN(date.getTime())) {
        return String(value);
      }

      return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return String(value);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch teacher classes
  |--------------------------------------------------------------------------
  */

  const fetchClasses = async () => {
    if (!user?.id) {
      return;
    }

    setLoadingClasses(true);

    try {
      const response = await fetch(
        `${API}/getTeacherClasses.php?teacher_id=${Number(
          user.id
        )}&_=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "Invalid classes API response:",
          text
        );
        return;
      }

      if (!result?.status) {
        console.error(
          result?.message ||
            "Failed to fetch classes"
        );
        return;
      }

      const receivedClasses = Array.isArray(
        result.data
      )
        ? result.data
        : [];

      /*
      |--------------------------------------------------------------------------
      | Remove duplicate class + section combinations
      |--------------------------------------------------------------------------
      */

      const uniqueClasses = [];

      const seen = new Set();

      receivedClasses.forEach((item) => {
        const className =
          item.class_name ??
          item.class ??
          "";

        const section =
          item.section ?? "";

        const key = `${className}-${section}`;

        if (!seen.has(key)) {
          seen.add(key);

          uniqueClasses.push({
            ...item,
            class_name: className,
            section,
          });
        }
      });

      setClasses(uniqueClasses);

      /*
      |--------------------------------------------------------------------------
      | Default selection
      |--------------------------------------------------------------------------
      */

      if (uniqueClasses.length > 0) {
        setFormData((previous) => ({
          ...previous,
          class_name:
            previous.class_name ||
            uniqueClasses[0].class_name,
          section:
            previous.section ||
            uniqueClasses[0].section,
        }));
      }
    } catch (error) {
      console.error(
        "Failed to fetch teacher classes:",
        error
      );
    } finally {
      setLoadingClasses(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch notices
  |--------------------------------------------------------------------------
  */

  const fetchNotices = async () => {
    if (!user?.id) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API}/getTeacherNotices.php?user_id=${Number(
          user.id
        )}&_=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "Invalid notices API response:",
          text
        );
        return;
      }

      if (!result?.status) {
        console.error(
          result?.message ||
            "Failed to fetch notices"
        );
        return;
      }

      setNotices(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch teacher notices:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial data
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    fetchClasses();
    fetchNotices();
  }, [user?.id]);

  /*
  |--------------------------------------------------------------------------
  | Handle class selection
  |--------------------------------------------------------------------------
  */

  const handleClassChange = (event) => {
    const value = event.target.value;

    if (value === "ALL") {
      setFormData((previous) => ({
        ...previous,
        class_name: "ALL",
        section: "ALL",
      }));

      return;
    }

    const selected = classes.find(
      (item) =>
        item.class_name === value
    );

    setFormData((previous) => ({
      ...previous,
      class_name: value,
      section:
        selected?.section ||
        previous.section ||
        "",
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Handle section selection
  |--------------------------------------------------------------------------
  */

  const handleSectionChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      section: event.target.value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Submit notice
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    if (!user?.id) {
      setMessage({
        type: "error",
        text: "Teacher session not found.",
      });

      return;
    }

    if (!formData.title.trim()) {
      setMessage({
        type: "error",
        text: "Please enter notice title.",
      });

      return;
    }

    if (!formData.class_name) {
      setMessage({
        type: "error",
        text: "Please select class.",
      });

      return;
    }

    if (!formData.section) {
      setMessage({
        type: "error",
        text: "Please select section.",
      });

      return;
    }

    if (!formData.content.trim()) {
      setMessage({
        type: "error",
        text: "Please enter notice content.",
      });

      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${API}/createTeacherNotice.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: Number(user.id),

            title: formData.title.trim(),

            class_name: formData.class_name,

            section: formData.section,

            notice_type:
              formData.notice_type,

            priority:
              formData.priority,

            description:
              formData.content.trim(),

            expiry_date:
              formData.expiry_date || "",
          }),
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "Invalid create notice response:",
          text
        );

        setMessage({
          type: "error",
          text:
            "Server returned an invalid response.",
        });

        return;
      }

      if (!result?.status) {
        setMessage({
          type: "error",
          text:
            result?.message ||
            "Failed to publish notice.",
        });

        return;
      }

      setMessage({
        type: "success",
        text: `Notice published successfully to ${result.recipient_count} student(s).`,
      });

      setFormData({
        title: "",
        class_name:
          formData.class_name,
        section:
          formData.section,
        notice_type: "General",
        priority: "Normal",
        content: "",
        expiry_date: "",
      });

      await fetchNotices();
    } catch (error) {
      console.error(
        "Failed to create notice:",
        error
      );

      setMessage({
        type: "error",
        text:
          "Unable to publish notice. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete notice
  |--------------------------------------------------------------------------
  */

  const deleteNotice = async (notice) => {
    if (!user?.id || !notice?.id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/deleteTeacherNotice.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notice_id: Number(notice.id),
            teacher_id: Number(user.id),
          }),
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "Invalid delete response:",
          text
        );
        return;
      }

      if (!result?.status) {
        setMessage({
          type: "error",
          text:
            result?.message ||
            "Failed to delete notice.",
        });

        return;
      }

      setNotices((previous) =>
        previous.filter(
          (item) =>
            Number(item.id) !==
            Number(notice.id)
        )
      );

      setMessage({
        type: "success",
        text: "Notice deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Failed to delete notice:",
        error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const filteredNotices = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) {
      return notices;
    }

    return notices.filter((notice) => {
      return (
        String(
          notice.title || ""
        )
          .toLowerCase()
          .includes(value) ||
        String(
          notice.description || ""
        )
          .toLowerCase()
          .includes(value) ||
        String(
          notice.notice_type || ""
        )
          .toLowerCase()
          .includes(value) ||
        String(
          notice.for || ""
        )
          .toLowerCase()
          .includes(value)
      );
    });
  }, [notices, search]);

  /*
  |--------------------------------------------------------------------------
  | Recipient total
  |--------------------------------------------------------------------------
  */

  const totalRecipients = notices.reduce(
    (total, notice) =>
      total +
      Number(
        notice.recipient_count || 0
      ),
    0
  );

  /*
  |--------------------------------------------------------------------------
  | Unique classes
  |--------------------------------------------------------------------------
  */

  const availableClasses = useMemo(() => {
    const unique = [];

    const seen = new Set();

    classes.forEach((item) => {
      const className =
        item.class_name ?? "";

      if (!className) {
        return;
      }

      if (!seen.has(className)) {
        seen.add(className);
        unique.push(className);
      }
    });

    return unique;
  }, [classes]);

  /*
  |--------------------------------------------------------------------------
  | Available sections
  |--------------------------------------------------------------------------
  */

  const availableSections = useMemo(() => {
    if (
      formData.class_name === "ALL" ||
      !formData.class_name
    ) {
      return [];
    }

    const unique = [];

    const seen = new Set();

    classes.forEach((item) => {
      if (
        item.class_name ===
          formData.class_name &&
        item.section
      ) {
        if (!seen.has(item.section)) {
          seen.add(item.section);
          unique.push(item.section);
        }
      }
    });

    return unique;
  }, [classes, formData.class_name]);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <div className="flex items-center gap-2">
            <Bell
              size={25}
              className="text-blue-600"
            />

            <h2 className="text-2xl font-bold text-gray-800">
              Notices
            </h2>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Create and manage notices for your assigned students.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            fetchClasses();
            fetchNotices();
          }}
          disabled={
            loading ||
            loadingClasses
          }
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700"
        >
          <RefreshCw
            size={16}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </div>

      {/* MESSAGE */}

      {message.text && (
        <div
          className={`flex items-start gap-3 p-4 rounded-lg border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <AlertCircle
            size={18}
            className="mt-0.5"
          />

          <p className="text-sm">
            {message.text}
          </p>
        </div>
      )}

      {/* SUMMARY */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Total Notices
          </p>

          <p className="text-2xl font-bold text-gray-800 mt-1">
            {notices.length}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Students Reached
          </p>

          <p className="text-2xl font-bold text-gray-800 mt-1">
            {totalRecipients}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Assigned Classes
          </p>

          <p className="text-2xl font-bold text-gray-800 mt-1">
            {classes.length}
          </p>
        </div>
      </div>

      {/* CREATE NOTICE */}

      <div className="bg-white border rounded-xl shadow-sm">

        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">
            Create New Notice
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            The notice will be sent to students of the selected class and section.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* TITLE */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Title
            </label>

            <input
              type="text"
              value={formData.title}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  title:
                    event.target.value,
                }))
              }
              placeholder="Enter notice title"
              className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          {/* CLASS SECTION */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>

              <select
                value={
                  formData.class_name
                }
                onChange={
                  handleClassChange
                }
                disabled={
                  loadingClasses
                }
                className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              >
                <option value="">
                  Select Class
                </option>

                {availableClasses.map(
                  (className) => (
                    <option
                      key={className}
                      value={className}
                    >
                      Class {className}
                    </option>
                  )
                )}

                <option value="ALL">
                  All Classes
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>

              <select
                value={
                  formData.section
                }
                onChange={
                  handleSectionChange
                }
                disabled={
                  formData.class_name ===
                    "ALL" ||
                  !formData.class_name
                }
                className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="">
                  Select Section
                </option>

                {availableSections.map(
                  (section) => (
                    <option
                      key={section}
                      value={section}
                    >
                      Section {section}
                    </option>
                  )
                )}

                {formData.class_name !==
                  "ALL" && (
                  <option value="ALL">
                    All Sections
                  </option>
                )}

                {formData.class_name ===
                  "ALL" && (
                  <option value="ALL">
                    All Sections
                  </option>
                )}
              </select>
            </div>
          </div>

          {/* TYPE PRIORITY EXPIRY */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notice Type
              </label>

              <select
                value={
                  formData.notice_type
                }
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    notice_type:
                      event.target.value,
                  }))
                }
                className="w-full border rounded-lg px-3 py-2.5 outline-none"
              >
                <option value="General">
                  General
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Exam">
                  Exam
                </option>

                <option value="Homework">
                  Homework
                </option>

                <option value="PTM">
                  PTM
                </option>

                <option value="Event">
                  Event
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>

              <select
                value={
                  formData.priority
                }
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    priority:
                      event.target.value,
                  }))
                }
                className="w-full border rounded-lg px-3 py-2.5 outline-none"
              >
                <option value="Normal">
                  Normal
                </option>

                <option value="Important">
                  Important
                </option>

                <option value="Urgent">
                  Urgent
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>

              <input
                type="date"
                value={
                  formData.expiry_date
                }
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    expiry_date:
                      event.target.value,
                  }))
                }
                className="w-full border rounded-lg px-3 py-2.5 outline-none"
              />
            </div>
          </div>

          {/* CONTENT */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Content
            </label>

            <textarea
              rows={5}
              value={formData.content}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  content:
                    event.target.value,
                }))
              }
              placeholder="Write the complete notice..."
              className="w-full border rounded-lg px-3 py-2.5 outline-none resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          {/* ACTIONS */}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                setShowPreview(true)
              }
              className="px-4 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Preview
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium inline-flex items-center gap-2 disabled:opacity-60"
            >
              <Send size={16} />

              {submitting
                ? "Publishing..."
                : "Publish Notice"}
            </button>
          </div>
        </form>
      </div>

      {/* SEARCH */}

      <div className="bg-white border rounded-xl p-4">

        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search notices..."
            className="w-full border rounded-lg pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* NOTICE LIST */}

      <div className="bg-white border rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">
            Published Notices
          </h3>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-500">
            Loading notices...
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="py-12 text-center">

            <Bell
              size={35}
              className="mx-auto text-gray-300"
            />

            <p className="text-sm text-gray-500 mt-2">
              No notices found.
            </p>
          </div>
        ) : (
          <div className="divide-y">

            {filteredNotices.map(
              (notice) => (
                <div
                  key={notice.id}
                  className="p-5 hover:bg-gray-50 transition"
                >

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h4 className="font-semibold text-gray-800">
                          {notice.title}
                        </h4>

                        <span className="px-2 py-1 text-[10px] rounded-full bg-blue-50 text-blue-700">
                          {
                            notice.notice_type
                          }
                        </span>

                        {String(
                          notice.priority
                        ).toLowerCase() ===
                          "high" && (
                          <span className="px-2 py-1 text-[10px] rounded-full bg-red-50 text-red-600">
                            Urgent
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {
                          notice.description
                        }
                      </p>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-xs text-gray-500">

                        <span className="inline-flex items-center gap-1">
                          <Users
                            size={13}
                          />

                          {notice.for ||
                            "Student"}
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Users
                            size={13}
                          />

                          {
                            notice.recipient_count
                          }{" "}
                          recipient(s)
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Clock
                            size={13}
                          />

                          {formatDateTime(
                            notice.sent_at ||
                              notice.publish_date ||
                              notice.created_at
                          )}
                        </span>

                        {notice.expiry_date && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar
                              size={13}
                            />

                            Expires:{" "}
                            {formatDateTime(
                              notice.expiry_date
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedNotice(
                            notice
                          );
                          setShowView(true);
                        }}
                        className="p-2 rounded-lg border hover:bg-gray-100"
                        title="View"
                      >
                        <Eye
                          size={17}
                          className="text-gray-600"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotice(
                            notice
                          )
                        }
                        className="p-2 rounded-lg border hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2
                          size={17}
                          className="text-red-500"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* PREVIEW MODAL */}

      {showPreview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">

            <div className="px-5 py-4 border-b flex items-center justify-between">

              <h3 className="font-semibold text-gray-800">
                Notice Preview
              </h3>

              <button
                type="button"
                onClick={() =>
                  setShowPreview(false)
                }
                className="p-1 rounded hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {formData.title ||
                    "Notice Title"}
                </h2>

                <div className="flex flex-wrap gap-2 mt-2">

                  <span className="px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                    {
                      formData.notice_type
                    }
                  </span>

                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                    {
                      formData.priority
                    }
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                {formData.content ||
                  "Notice content will appear here."}
              </div>

              <div className="text-xs text-gray-500 space-y-1">

                <p>
                  Class:{" "}
                  <span className="font-medium">
                    {formData.class_name ||
                      "—"}
                  </span>
                </p>

                <p>
                  Section:{" "}
                  <span className="font-medium">
                    {formData.section ||
                      "—"}
                  </span>
                </p>

                {formData.expiry_date && (
                  <p>
                    Expiry:{" "}
                    <span className="font-medium">
                      {formData.expiry_date}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="px-5 py-4 border-t flex justify-end">

              <button
                type="button"
                onClick={() =>
                  setShowPreview(false)
                }
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}

      {showView &&
        selectedNotice && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">

              <div className="px-5 py-4 border-b flex items-center justify-between">

                <h3 className="font-semibold text-gray-800">
                  Notice Details
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setShowView(false)
                  }
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-5">

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {
                      selectedNotice.title
                    }
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-2">

                    <span className="px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                      {
                        selectedNotice.notice_type
                      }
                    </span>

                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      {
                        selectedNotice.priority
                      }
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                  {
                    selectedNotice.description
                  }
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">

                  <div>
                    <p className="text-xs text-gray-400">
                      Recipients
                    </p>

                    <p className="font-medium text-gray-700 mt-1">
                      {
                        selectedNotice.recipient_count
                      }{" "}
                      students
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Sent At
                    </p>

                    <p className="font-medium text-gray-700 mt-1">
                      {formatDateTime(
                        selectedNotice.sent_at ||
                          selectedNotice.publish_date ||
                          selectedNotice.created_at
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Audience
                    </p>

                    <p className="font-medium text-gray-700 mt-1">
                      {
                        selectedNotice.for
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Expiry
                    </p>

                    <p className="font-medium text-gray-700 mt-1">
                      {selectedNotice.expiry_date
                        ? formatDateTime(
                            selectedNotice.expiry_date
                          )
                        : "No expiry"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setShowView(false)
                  }
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default TeacherNotice;