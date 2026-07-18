
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
