import { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  FileText,
  Eye,
  X,
  CheckCircle,
  Clock,
} from "lucide-react";

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/notifications";

export default function StudentNotice() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in student
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("User data error:", error);
    }
  }, []);

  // Fetch student notices
  const fetchNotices = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${API}/getNotifications.php?user_id=${user.id}&_=${Date.now()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error("Notice API invalid response:", text);
        return;
      }

      if (!response.ok || !result.status) {
        console.error("Notice API error:", result);
        return;
      }

      const data = Array.isArray(result.data)
        ? result.data
        : [];

      const validNotifications = data
        .map((notice, index) => {
          const notificationId = Number(
            notice.id ??
            notice.notification_id ??
            notice.notice_id
          );

          if (
            !Number.isFinite(notificationId) ||
            notificationId <= 0
          ) {
            console.warn("Invalid notice ID:", notice);
            return null;
          }

          return {
            ...notice,
            id: notificationId,
            is_read:
              Number(notice.is_read) === 1 ? 1 : 0,
            _key: `student-notice-${notificationId}-${index}`,
          };
        })
        .filter(Boolean);

      setNotifications(validNotifications);
    } catch (error) {
      console.error("Fetch notices error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load notices
  useEffect(() => {
    if (!user?.id) return;

    fetchNotices();
  }, [user]);

  // Open notice
  const handleViewNotice = async (notice) => {
    setSelectedNotice(notice);

    if (Number(notice.is_read) === 1) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/markAsRead.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notification_id: Number(notice.id),
            user_id: Number(user.id),
          }),
        }
      );

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error(
          "markAsRead invalid response:",
          text
        );
        return;
      }

      if (!response.ok || !result.status) {
        console.error(
          "Mark notice as read error:",
          result
        );
        return;
      }

      setNotifications((previous) =>
        previous.map((item) =>
          Number(item.id) === Number(notice.id)
            ? {
                ...item,
                is_read: 1,
              }
            : item
        )
      );

      window.dispatchEvent(
        new CustomEvent("notificationRead")
      );
    } catch (error) {
      console.error(
        "Mark notice as read error:",
        error
      );
    }
  };

  // Close notice
  const closeNotice = () => {
    setSelectedNotice(null);
  };

  const totalNotices = notifications.length;

  const unreadNotices = notifications.filter(
    (notice) => Number(notice.is_read) === 0
  ).length;

  // Format date
  const formatDate = (date) => {
    if (!date) return "";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return date;
    }

    return value.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Category style
  const getCategoryStyle = (category) => {
    const value = String(category || "").toLowerCase();

    if (value.includes("exam")) {
      return "bg-purple-100 text-purple-700";
    }

    if (value.includes("event")) {
      return "bg-blue-100 text-blue-700";
    }

    if (value.includes("holiday")) {
      return "bg-orange-100 text-orange-700";
    }

    if (value.includes("important")) {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          School Notices
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Latest announcements and circulars from school.
        </p>
      </div>

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
                {totalNotices}
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
                {unreadNotices}
              </h2>
            </div>

          </div>
        </div>

      </div>

      <div className="space-y-4">

        {loading ? (

          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100">
            <p className="text-slate-500">
              Loading notices...
            </p>
          </div>

        ) : notifications.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100">

            <Bell
              size={40}
              className="mx-auto text-slate-300 mb-3"
            />

            <h3 className="font-semibold text-slate-700">
              No notices
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              There are no notices available right now.
            </p>

          </div>

        ) : (

          notifications.map((notice) => (

            <div
              key={notice._key}
              className={`bg-white rounded-3xl p-6 shadow-sm border transition ${
                Number(notice.is_read) === 0
                  ? "border-blue-200 bg-blue-50/20"
                  : "border-slate-100"
              }`}
            >

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2 mb-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryStyle(
                        notice.notice_type ||
                          notice.category
                      )}`}
                    >
                      {notice.notice_type ||
                        notice.category ||
                        "Notice"}
                    </span>

                    {Number(notice.is_read) === 0 && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        New
                      </span>
                    )}

                    {notice.priority && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        {notice.priority}
                      </span>
                    )}

                  </div>

                  <h3 className="text-lg font-semibold text-slate-800">
                    {notice.title || "School Notice"}
                  </h3>

                  <p className="text-slate-500 mt-2 text-sm leading-6">
                    {notice.description ||
                      notice.message ||
                      ""}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-4">

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={15} />

                      Published on{" "}
                      {formatDate(
                        notice.created_at ||
                          notice.date
                      )}
                    </div>

                    {notice.creator_name && (
                      <div className="text-sm text-slate-400">
                        By {notice.creator_name}
                      </div>
                    )}

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleViewNotice(notice)
                  }
                  className="flex items-center justify-center gap-2 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition self-start"
                >
                  <Eye size={16} />
                  View
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {selectedNotice && (

        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[100]"
          onClick={closeNotice}
        >

          <div
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-center justify-between px-6 py-5 border-b">

              <div>
                <p className="text-xs text-blue-600 font-medium uppercase">
                  {selectedNotice.notice_type ||
                    selectedNotice.category ||
                    "Notice"}
                </p>

                <h2 className="text-xl font-bold text-slate-800 mt-1">
                  {selectedNotice.title ||
                    "School Notice"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeNotice}
                className="p-2 rounded-xl hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6">

              <p className="text-slate-600 leading-7">
                {selectedNotice.description ||
                  selectedNotice.message ||
                  ""}
              </p>

              <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-500">

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {formatDate(
                    selectedNotice.created_at ||
                      selectedNotice.date
                  )}
                </div>

                {selectedNotice.creator_name && (
                  <div className="flex items-center gap-2">
                    <Bell size={16} />
                    {selectedNotice.creator_name}
                  </div>
                )}

              </div>

              <div className="mt-6 flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle size={17} />
                Marked as read
              </div>

            </div>

            <div className="px-6 py-4 border-t bg-slate-50 flex justify-end">

              <button
                type="button"
                onClick={closeNotice}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}