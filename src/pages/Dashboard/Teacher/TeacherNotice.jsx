
// import React, { useState } from "react";
// import {
//   Bell,
//   Send,
//   Search,
//   Eye,
//   Trash2,
//   Calendar,
//   Users,
// } from "lucide-react";

// export default function TeacherNotice() {
//   const [search, setSearch] = useState("");
//   const [showPreview, setShowPreview] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     class: "",
//     content: "",
//   });

//   const [notices, setNotices] = useState([
//     {
//       id: 1,
//       title: "Parent Teacher Meeting",
//       class: "All Classes",
//       content:
//         "Parent teacher meeting will be held on Friday at 2 PM.",
//       date: "09 Jul 2026",
//       views: 120,
//     },
//   ]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newNotice = {
//       id: Date.now(),
//       title: formData.title,
//       class: formData.class,
//       content: formData.content,
//       date: new Date().toLocaleDateString(),
//       views: 0,
//     };

//     setNotices([newNotice, ...notices]);

//     setFormData({
//       title: "",
//       class: "",
//       content: "",
//     });

//     alert("Notice Added Successfully");
//   };

//   const deleteNotice = (id) => {
//     setNotices(notices.filter((n) => n.id !== id));
//   };

//   const filteredNotices = notices.filter(
//     (n) =>
//       n.title.toLowerCase().includes(search.toLowerCase()) ||
//       n.content.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">
//               Notice Management
//             </h1>
//             <p className="text-slate-500">
//               Create and manage notices
//             </p>
//           </div>

//           <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-2">
//             <Bell size={18} />
//             {notices.length} Notices
//           </div>
//         </div>

//         {/* Create Notice */}
//         <div className="bg-white p-6 rounded-3xl shadow">
//           <h2 className="text-xl font-bold mb-5">
//             Create Notice
//           </h2>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4"
//           >
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Notice Title"
//               className="w-full border rounded-xl p-3"
//               required
//             />

//             <input
//               type="text"
//               name="class"
//               value={formData.class}
//               onChange={handleChange}
//               placeholder="Class"
//               className="w-full border rounded-xl p-3"
//               required
//             />

//             <textarea
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               placeholder="Notice Content"
//               rows={5}
//               className="w-full border rounded-xl p-3"
//               required
//             />

//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 className="bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
//               >
//                 <Send size={18} />
//                 Send Notice
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPreview(true)
//                 }
//                 className="border px-6 py-3 rounded-xl flex items-center gap-2"
//               >
//                 <Eye size={18} />
//                 Preview
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Search */}
//         <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
//           <Search size={18} />
//           <input
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             placeholder="Search notices..."
//             className="w-full outline-none"
//           />
//         </div>

//         {/* Notice List */}
//         <div className="space-y-4">
//           {filteredNotices.length === 0 ? (
//             <div className="bg-white p-10 rounded-3xl text-center">
//               No Notices Found
//             </div>
//           ) : (
//             filteredNotices.map((notice) => (
//               <div
//                 key={notice.id}
//                 className="bg-white p-6 rounded-3xl shadow"
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="text-xl font-bold">
//                       {notice.title}
//                     </h3>

//                     <div className="flex gap-4 text-sm text-slate-500 mt-2">
//                       <span className="flex items-center gap-1">
//                         <Users size={14} />
//                         {notice.class}
//                       </span>

//                       <span className="flex items-center gap-1">
//                         <Calendar size={14} />
//                         {notice.date}
//                       </span>

//                       <span className="flex items-center gap-1">
//                         <Eye size={14} />
//                         {notice.views}
//                       </span>
//                     </div>

//                     <p className="mt-4 text-slate-600">
//                       {notice.content}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() =>
//                       deleteNotice(notice.id)
//                     }
//                     className="text-red-500 hover:bg-red-50 p-3 rounded-xl"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Preview Modal */}
//         {showPreview && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">
//               <h2 className="text-2xl font-bold mb-5">
//                 Notice Preview
//               </h2>

//               <h3 className="text-xl font-bold">
//                 {formData.title || "Notice Title"}
//               </h3>

//               <p className="text-slate-500 mt-2">
//                 Class :{" "}
//                 {formData.class || "Not Selected"}
//               </p>

//               <p className="mt-6 whitespace-pre-line">
//                 {formData.content ||
//                   "No Content"}
//               </p>

//               <button
//                 onClick={() =>
//                   setShowPreview(false)
//                 }
//                 className="mt-8 bg-emerald-600 text-white px-6 py-3 rounded-xl"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

const API = "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/notifications";

export default function TeacherNotices() {
  const [user, setUser] = useState(null);

  const [notices, setNotices] = useState([]);
  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [showView, setShowView] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState(null);

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    fetchClasses();
    fetchNotices();
  }, [user]);

  const fetchClasses = async () => {
    try {
      setLoadingClasses(true);

      const response = await fetch(
        `${API}/getTeacherClasses.php?teacher_id=${encodeURIComponent(
          user.id
        )}&_=${Date.now()}`
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (result.status) {
        setClasses(Array.isArray(result.data) ? result.data : []);

        if (result.data?.length > 0) {
          setFormData((prev) => ({
            ...prev,
            class_name: prev.class_name || result.data[0].class_name,
            section: prev.section || result.data[0].section,
          }));
        }
      } else {
        setClasses([]);
      }
    } catch (error) {
      console.error("Fetch classes error:", error);

      setMessage({
        type: "error",
        text: "Unable to load your assigned classes.",
      });
    } finally {
      setLoadingClasses(false);
    }
  };

const fetchNotices = async () => {
  if (!user?.id) return;

  try {
    setLoading(true);

    const response = await fetch(
      `${API}/getTeacherNotices.php?user_id=${encodeURIComponent(
        user.id
      )}&_=${Date.now()}`
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error("Notices API response:", text);
      throw new Error("Invalid server response");
    }

    if (result.status) {
      setNotices(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } else {
      throw new Error(
        result.message || "Unable to load notices."
      );
    }

  } catch (error) {
    console.error("Fetch notices error:", error);

    setNotices([]);

    setMessage({
      type: "error",
      text: error.message || "Unable to load notices.",
    });

  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleClassChange = (e) => {
  const selectedClass = e.target.value;

  if (selectedClass === "ALL") {
    setFormData((prev) => ({
      ...prev,
      class_name: "ALL",
      section: "ALL",
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    class_name: selectedClass,
    section: "",
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setMessage({
        type: "error",
        text: "Teacher session not found. Please login again.",
      });
      return;
    }

    if (!formData.class_name || !formData.section) {
      setMessage({
        type: "error",
        text: "Please select your class and section.",
      });
      return;
    }

    try {
      setSubmitting(true);
      setMessage({ type: "", text: "" });

      const response = await fetch(
        `${API}/createTeacherNotice.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         body: JSON.stringify({
              user_id: user.id,
              title: formData.title.trim(),
              class_name: formData.class_name,
              section: formData.section,
              notice_type: formData.notice_type,
              priority: formData.priority,
              description: formData.content.trim(),
              expiry_date: formData.expiry_date || null,
          }),
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error("Create notice response:", text);
        throw new Error("Invalid server response");
      }

      if (!result.status) {
        throw new Error(result.message || "Unable to create notice");
      }

      setMessage({
        type: "success",
        text:
          result.message ||
          "Notice sent successfully to your class students.",
      });

      setFormData({
        title: "",
        class_name: classes[0]?.class_name || "",
        section: classes[0]?.section || "",
        notice_type: "General",
        priority: "Normal",
        content: "",
        expiry_date: "",
      });

      setShowPreview(false);

      await fetchNotices();
    } catch (error) {
      console.error("Create notice error:", error);

      setMessage({
        type: "error",
        text: error.message || "Unable to send notice.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteNotice = async (noticeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API}/deleteTeacherNotice.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notice_id: noticeId,
            teacher_id: user.id,
          }),
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!result.status) {
        throw new Error(result.message || "Unable to delete notice");
      }

      setNotices((prev) =>
        prev.filter((notice) => Number(notice.id) !== Number(noticeId))
      );

      setMessage({
        type: "success",
        text: result.message || "Notice deleted successfully.",
      });
    } catch (error) {
      console.error("Delete notice error:", error);

      setMessage({
        type: "error",
        text: error.message || "Unable to delete notice.",
      });
    }
  };

  const filteredNotices = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return notices;

    return notices.filter((notice) => {
      return (
        String(notice.title || "")
          .toLowerCase()
          .includes(value) ||
        String(notice.description || "")
          .toLowerCase()
          .includes(value) ||
        String(notice.notice_type || "")
          .toLowerCase()
          .includes(value) ||
        String(notice.for || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [notices, search]);

  const totalRecipients = notices.reduce(
    (sum, notice) => sum + Number(notice.recipient_count || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Notice Management
            </h1>

            <p className="text-slate-500 mt-1">
              Send and manage notices for your assigned class
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchNotices}
              className="h-10 px-4 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-700 hover:bg-slate-50 transition"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <div className="bg-emerald-100 text-emerald-700 px-4 py-2.5 rounded-xl flex items-center gap-2">
              <Bell size={18} />
              <span className="font-semibold">
                {notices.length} Notices
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`rounded-xl px-4 py-3 flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.type === "error" && (
              <AlertCircle size={18} />
            )}

            <span>{message.text}</span>

            <button
              type="button"
              onClick={() => setMessage({ type: "", text: "" })}
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  My Notices
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {notices.length}
                </h3>
              </div>

              <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Bell size={21} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Students Reached
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {totalRecipients}
                </h3>
              </div>

              <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Create Notice */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Create Notice
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Notice will be sent only to students of your assigned class.
              </p>
            </div>

            <Bell className="text-emerald-600" size={23} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Notice Title"
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-100"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <select
                name="class_name"
                value={formData.class_name}
                onChange={handleClassChange}
                className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none"
                required
                disabled={loadingClasses}
              >
                <option value="">
                  {loadingClasses
                    ? "Loading classes..."
                    : "Select Class"}
                </option>

                <option value="ALL">
                  All Classes
                </option>

                {[...new Set(
                  classes.map((item) => String(item.class_name))
                )].map((className) => (
                  <option
                    key={className}
                    value={className}
                  >
                    Class {className}
                  </option>
                ))}
              </select>
                 
                <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none"
                    required
                    disabled={!formData.class_name || formData.class_name === "ALL"}
                  >
                    <option value="">
                      {formData.class_name === "ALL"
                        ? "All Sections"
                        : "Select Section"}
                    </option>

                    {formData.class_name === "ALL" ? (
                      <option value="ALL">
                        All Sections
                      </option>
                    ) : (
                      classes
                        .filter(
                          (item) =>
                            String(item.class_name) ===
                            String(formData.class_name)
                        )
                        .map((item) => (
                          <option
                            key={`${item.class_name}-${item.section}`}
                            value={item.section}
                          >
                            Section {item.section}
                          </option>
                        ))
                    )}
                  </select>
              
                  
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <select
                name="notice_type"
                value={formData.notice_type}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none"
              >
                <option value="General">General</option>
                <option value="PTM">PTM</option>
                <option value="Homework">Homework</option>
                <option value="Assignment">Assignment</option>
                <option value="Exam">Exam</option>
                <option value="Reminder">Reminder</option>
              </select>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 bg-white outline-none"
              >
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>

              <input
                type="date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl p-3 outline-none"
              />
            </div>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Notice Content"
              rows={5}
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-100"
              required
            />

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={submitting || loadingClasses}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
              >
                <Send size={18} />

                {submitting
                  ? "Sending..."
                  : "Send Notice"}
              </button>

              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition"
              >
                <Eye size={18} />
                Preview
              </button>
            </div>
          </form>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices..."
            className="w-full outline-none text-slate-700"
          />
        </div>

        {/* Notice List */}
        <div className="space-y-4">

          {loading ? (
            <div className="bg-white p-10 rounded-3xl text-center text-slate-500">
              Loading notices...
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl text-center">
              <Bell
                size={35}
                className="mx-auto text-slate-300 mb-3"
              />

              <p className="text-slate-500">
                No notices found
              </p>
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="flex justify-between gap-5">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-2 mb-2">

                      <h3 className="text-xl font-bold text-slate-900">
                        {notice.title}
                      </h3>

                      {notice.notice_type && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                          {notice.notice_type}
                        </span>
                      )}

                      {notice.priority === "Urgent" && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-600">
                          Urgent
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">

                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {notice.for || "Students"}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {notice.publish_date || notice.created_at}
                      </span>

                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {notice.recipient_count || 0} Students
                      </span>
                    </div>

                    <p className="mt-4 text-slate-600 whitespace-pre-line">
                      {notice.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedNotice(notice);
                        setShowView(true);
                      }}
                      className="mt-4 text-emerald-600 text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      <Eye size={15} />
                      View Notice
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteNotice(notice.id)}
                    className="text-red-500 hover:bg-red-50 p-3 rounded-xl h-fit transition"
                    title="Delete Notice"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-7 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">
                Notice Preview
              </h2>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold">
              {formData.title || "Notice Title"}
            </h3>

            <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
              <span>
                Class: {formData.class_name || "Not Selected"}
              </span>

              <span>
                Section: {formData.section || "Not Selected"}
              </span>

              <span>
                Type: {formData.notice_type}
              </span>

              <span>
                Priority: {formData.priority}
              </span>
            </div>

            <p className="mt-6 text-slate-700 whitespace-pre-line">
              {formData.content || "No Content"}
            </p>

            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showView && selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-7 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">
                Notice Details
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowView(false);
                  setSelectedNotice(null);
                }}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold">
              {selectedNotice.title}
            </h3>

            <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
              <span>
                Class: {selectedNotice.for || "Students"}
              </span>

              <span>
                Type: {selectedNotice.notice_type}
              </span>

              <span>
                Priority: {selectedNotice.priority}
              </span>

              <span>
                Students: {selectedNotice.recipient_count || 0}
              </span>
            </div>

            <p className="mt-6 text-slate-700 whitespace-pre-line">
              {selectedNotice.description}
            </p>

            <button
              type="button"
              onClick={() => {
                setShowView(false);
                setSelectedNotice(null);
              }}
              className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}