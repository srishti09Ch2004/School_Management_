import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  X,
  Check,
  Clock,
  Megaphone,
  CheckCheck
} from "lucide-react";

const API = "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/notifications";

const Topbar = ({ role = "Admin", title = "Dashboard" }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const notificationRef = useRef(null);
  const markingReadIds = useRef(new Set());

  // Get logged-in user
  useEffect(() => {

    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("User data error:", error);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };

  }, []);

  const fetchNotifications = useCallback(async () => {
  if (!user?.id) return;

  try {
    setLoadingNotifications(true);

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
      console.error("Notification API invalid response:", text);
      return;
    }

    if (!response.ok || !result.status) {
      console.error("Notification API error:", result);
      return;
    }

    const serverNotifications = Array.isArray(result.data)
      ? result.data
      : [];

    const finalNotifications = serverNotifications
      .map((notification, index) => {
        const notificationId = Number(
          notification.id ??
          notification.notification_id ??
          notification.notice_id
        );

        if (!Number.isFinite(notificationId) || notificationId <= 0) {
          console.warn("Invalid notification ID:", notification);
          return null;
        }

        return {
          ...notification,
          id: notificationId,
          is_read:
            Number(notification.is_read) === 1 ? 1 : 0,
          _key: `notification-${notificationId}-${index}`,
        };
      })
      .filter(Boolean)
      .map((notification) => {
        if (markingReadIds.current.has(notification.id)) {
          return {
            ...notification,
            is_read: 1,
          };
        }

        return notification;
      });

    setNotifications(finalNotifications);

    const count = finalNotifications.filter(
      (notification) => Number(notification.is_read) === 0
    ).length;

    setUnreadCount(count);
  } catch (error) {
    console.error("Fetch notifications error:", error);
  } finally {
    setLoadingNotifications(false);
  }
}, [user]);

   

  // Load notifications when user is available
  useEffect(() => {

    if (!user?.id) return;

    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);

  }, [user, fetchNotifications]);

  // Refresh when tab becomes visible
  useEffect(() => {

    const handleVisibility = () => {

      if (document.visibilityState === "visible") {
        fetchNotifications();
      }

    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };

  }, [fetchNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {

    const handleOutsideClick = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };

  }, []);

  // Mark one notification as read
  const handleNotificationClick = async (notification) => {
  if (!user?.id) return;

  const notificationId = Number(
    notification.id ??
    notification.notification_id ??
    notification.notice_id
  );

  if (!Number.isFinite(notificationId) || notificationId <= 0) {
    console.error("Invalid notification ID:", notification);
    return;
  }

  if (Number(notification.is_read) === 1) {
    return;
  }

  if (markingReadIds.current.has(notificationId)) {
    return;
  }

  markingReadIds.current.add(notificationId);

  setNotifications((previous) =>
    previous.map((item) =>
      Number(item.id) === notificationId
        ? {
            ...item,
            is_read: 1,
          }
        : item
    )
  );

  setUnreadCount((previous) => Math.max(0, previous - 1));

  try {
    const response = await fetch(
      `${API}/markAsRead.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notification_id: notificationId,
          user_id: Number(user.id),
        }),
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      console.error("markAsRead invalid response:", text);
      return;
    }

    if (!response.ok || !result.status) {
      console.error("Mark notification error:", result);
      return;
    }

    setUnreadCount(Number(result.unread_count || 0));
  } catch (error) {
    console.error("Mark notification error:", error);
  } finally {
    markingReadIds.current.delete(notificationId);
    fetchNotifications();
  }
};

    
useEffect(() => {
  const handleNotificationRead = () => {
    fetchNotifications();
  };

  window.addEventListener(
    "notificationRead",
    handleNotificationRead
  );

  return () => {
    window.removeEventListener(
      "notificationRead",
      handleNotificationRead
    );
  };
}, [fetchNotifications]);

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {

    if (!user?.id) return;

    const unreadNotifications = notifications.filter(
      (notification) => Number(notification.is_read) === 0
    );

    if (unreadNotifications.length === 0) {
      return;
    }

    unreadNotifications.forEach((notification) => {
      markingReadIds.current.add(Number(notification.id));
    });

    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        is_read: 1
      }))
    );

    setUnreadCount(0);

    try {

      await Promise.all(
        unreadNotifications.map(async (notification) => {

          const response = await fetch(
            `${API}/markAsRead.php`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                notification_id: Number(notification.id),
                user_id: Number(user.id)
              })
            }
          );

          const text = await response.text();

          try {
            return JSON.parse(text);
          } catch (error) {
            console.error(
              "markAsRead API returned invalid JSON:",
              text
            );

            return null;
          }

        })
      );

    } catch (error) {

      console.error("Mark all notifications error:", error);

    } finally {

      unreadNotifications.forEach((notification) => {
        markingReadIds.current.delete(Number(notification.id));
      });

      fetchNotifications();
    }
  };

  // Format notification date
  const formatDate = (date) => {

    if (!date) return "";

    const notificationDate = new Date(date);

    if (Number.isNaN(notificationDate.getTime())) {
      return date;
    }

    return notificationDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Get priority style
  const getPriorityClass = (priority) => {

    switch (String(priority).toLowerCase()) {

      case "high":
        return "bg-red-100 text-red-700";

      case "medium":
        return "bg-yellow-100 text-yellow-700";

      case "low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser(null);
    setNotifications([]);
    setUnreadCount(0);

    navigate("/login");
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          {title}
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back, {user?.name || role}
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() => setShowNotifications((previous) => !previous)}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <Bell size={22} />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-[380px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">

              <div className="flex items-center justify-between px-4 py-3 border-b">

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Notifications
                  </h3>

                  <p className="text-xs text-gray-500">
                    {unreadCount} unread
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <CheckCheck size={14} />
                      Mark all read
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X size={17} />
                  </button>

                </div>

              </div>

              <div className="max-h-[420px] overflow-y-auto">

                {loadingNotifications && notifications.length === 0 ? (

                  <div className="p-6 text-center text-sm text-gray-500">
                    Loading notifications...
                  </div>

                ) : notifications.length === 0 ? (

                  <div className="p-8 text-center">

                    <Bell
                      size={32}
                      className="mx-auto text-gray-300 mb-2"
                    />

                    <p className="text-sm text-gray-500">
                      No notifications
                    </p>

                  </div>

                ) : (

                  notifications.map((notification) => (
                      <div
                        key={notification._key}
                        onClick={() => handleNotificationClick(notification)}
                        className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-50 ${
                          Number(notification.is_read) === 0
                            ? "bg-blue-50/40"
                            : "bg-white"
                        }`}
                      >

                      <div className="flex gap-3">

                        <div className="mt-1">

                          {String(notification.notice_type).toLowerCase() === "notice" ? (
                            <Megaphone
                              size={18}
                              className="text-blue-500"
                            />
                          ) : (
                            <Bell
                              size={18}
                              className="text-gray-500"
                            />
                          )}

                        </div>

                        <div className="flex-1 min-w-0">

                          <div className="flex items-start justify-between gap-2">

                            <h4 className="font-medium text-sm text-gray-800">
                              {notification.title || "Notification"}
                            </h4>

                            {Number(notification.is_read) === 0 && (
                              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                            )}

                          </div>

                          <p className="text-sm text-gray-600 mt-1">
                            {notification.description || ""}
                          </p>

                          <div className="flex items-center gap-2 mt-2">

                            {notification.priority && (
                              <span
                                className={`text-[10px] px-2 py-1 rounded-full ${getPriorityClass(
                                  notification.priority
                                )}`}
                              >
                                {notification.priority}
                              </span>
                            )}

                            <span className="text-[11px] text-gray-400 flex items-center gap-1">
                              <Clock size={11} />
                              {formatDate(notification.created_at)}
                            </span>

                          </div>

                          {notification.creator_name && (
                            <p className="text-[11px] text-gray-400 mt-1">
                              By {notification.creator_name}
                            </p>
                          )}

                        </div>

                      </div>

                    </div>

                  ))

                )}

              </div>

              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t bg-gray-50">

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="w-full text-sm text-blue-600 hover:text-blue-800"
                  >
                    Close notifications
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {(user?.name || role).charAt(0).toUpperCase()}
          </div>

          <div className="hidden md:block">

            <p className="text-sm font-medium text-gray-800">
              {user?.name || role}
            </p>

            <p className="text-xs text-gray-500">
              {role}
            </p>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800 ml-2"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Topbar;