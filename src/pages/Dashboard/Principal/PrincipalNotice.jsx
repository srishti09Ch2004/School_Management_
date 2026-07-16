import {
  Bell,
  AlertTriangle,
  Calendar,
  Users,
  Plus,
  Search,
  Filter,
} from "lucide-react";

export default function PrincipalNotice() {
  const notices = [
    {
      title: "PTM Meeting",
      description:
        "Parent Teacher Meeting for Classes 9 to 12 regarding academic progress.",
      category: "Meeting",
      audience: "Parents & Teachers",
      date: "20 July 2026",
      priority: "High",
      status: "Active",
    },
    {
      title: "Independence Day Preparation",
      description:
        "Practice sessions and cultural activities will begin next week.",
      category: "Event",
      audience: "All Students",
      date: "10 August 2026",
      priority: "Medium",
      status: "Upcoming",
    },
    {
      title: "Teacher Training Workshop",
      description:
        "Training session on new teaching methodologies and ERP usage.",
      category: "Academic",
      audience: "Teachers",
      date: "25 July 2026",
      priority: "Medium",
      status: "Active",
    },
    {
      title: "Annual Function",
      description:
        "Preparations for annual function and student performances.",
      category: "Event",
      audience: "Entire School",
      date: "15 November 2026",
      priority: "Low",
      status: "Upcoming",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            School Notices
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage announcements and important updates.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium">
          <Plus size={18} />
          Add Notice
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-5">
        {[
          {
            title: "Total Notices",
            value: "24",
            icon: <Bell size={20} />,
            bg: "bg-blue-100",
            color: "text-blue-600",
          },
          {
            title: "Active",
            value: "12",
            icon: <Calendar size={20} />,
            bg: "bg-green-100",
            color: "text-green-600",
          },
          {
            title: "High Priority",
            value: "4",
            icon: <AlertTriangle size={20} />,
            bg: "bg-red-100",
            color: "text-red-600",
          },
          {
            title: "Audience Reach",
            value: "100%",
            icon: <Users size={20} />,
            bg: "bg-purple-100",
            color: "text-purple-600",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white p-5 rounded-3xl shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-xl font-bold mt-1">
                  {item.value}
                </h3>
              </div>

              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.bg}`}
              >
                <div className={item.color}>
                  {item.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-5 shadow-sm">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 border rounded-2xl px-4 py-3">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search Notice..."
              className="outline-none w-full text-sm"
            />
          </div>

          <select className="border rounded-2xl px-4 py-3 text-sm outline-none">
            <option>All Categories</option>
            <option>Meeting</option>
            <option>Academic</option>
            <option>Event</option>
          </select>

          <select className="border rounded-2xl px-4 py-3 text-sm outline-none">
            <option>All Audience</option>
            <option>Students</option>
            <option>Teachers</option>
            <option>Parents</option>
          </select>
        </div>
      </div>

      {/* Notice Cards */}
      <div className="space-y-4">
        {notices.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start gap-5">
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Bell
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-6">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {item.category}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                      {item.audience}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 items-end">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : item.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.priority}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}