import {
  Bell,
  Calendar,
  FileText,
  Eye,
} from "lucide-react";

export default function StudentNotice() {
  const notices = [
    {
      id: 1,
      title: "Mid Term Examination Schedule",
      description:
        "Mid Term examinations will begin from 15 July 2026. Students are advised to prepare according to the timetable.",
      category: "Exam",
      date: "15 Jul 2026",
      status: "New",
    },
    {
      id: 2,
      title: "Independence Day Celebration",
      description:
        "Students are requested to participate in cultural activities for Independence Day celebrations on 15 August 2026.",
      category: "Event",
      date: "15 Aug 2026",
      status: "",
    },
    {
      id: 3,
      title: "School Holiday Notice",
      description:
        "School will remain closed on 20 July 2026 due to maintenance work in the campus.",
      category: "Holiday",
      date: "20 Jul 2026",
      status: "",
    },
    {
      id: 4,
      title: "Fee Submission Reminder",
      description:
        "Students with pending fees are requested to complete the payment before 20 July 2026.",
      category: "Important",
      date: "12 Jul 2026",
      status: "Urgent",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          School Notices
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Latest announcements and circulars from school.
        </p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Bell
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Notices
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {notices.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <FileText
                size={22}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Unread Notices
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                2
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                {/* Category */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {notice.category}
                  </span>

                  {notice.status && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        notice.status === "Urgent"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {notice.status}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-800">
                  {notice.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 mt-2 text-sm leading-6">
                  {notice.description}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                  <Calendar size={15} />
                  Published on {notice.date}
                </div>
              </div>

              {/* Button */}
              <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition self-start">
                <Eye size={16} />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}