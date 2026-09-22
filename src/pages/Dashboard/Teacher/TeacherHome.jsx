import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
  Bell,
  Clock,
  RefreshCw,
  User
} from "lucide-react";

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/teacher";

export default function TeacherHome() {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const getLoggedInTeacher = () => {

    try {

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser);

    } catch (error) {

      console.error("User data error:", error);

      return null;
    }
  };


  const loadDashboard = async (showLoader = true) => {

    try {

      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const user = getLoggedInTeacher();

      if (!user?.id) {

        setError("Teacher login information not found.");

        return;
      }

      const response = await fetch(
        `${API}/dashboard.php?user_id=${user.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch (jsonError) {

        console.error("Invalid API response:", text);

        throw new Error(
          "Server returned invalid JSON. Check PHP API."
        );
      }

      if (!response.ok || !data.success) {

        throw new Error(
          data.message || "Unable to load teacher dashboard."
        );
      }

      setDashboard(data);

    } catch (error) {

      console.error("Teacher dashboard error:", error);

      setError(error.message);

    } finally {

      setLoading(false);
      setRefreshing(false);
    }
  };


  useEffect(() => {

    loadDashboard();

    /*
     * Automatic live refresh.
     * New attendance, students, assignments etc.
     * will appear without manually refreshing the page.
     */

    const interval = setInterval(() => {
      loadDashboard(false);
    }, 10000);

    return () => clearInterval(interval);

  }, []);


  if (loading) {

    return (
      <div className="flex items-center justify-center min-h-[400px]">

        <div className="text-center">

          <RefreshCw
            className="animate-spin mx-auto text-blue-600"
            size={32}
          />

          <p className="mt-3 text-gray-500">
            Loading teacher dashboard...
          </p>

        </div>

      </div>
    );
  }


  if (error) {

    return (
      <div className="bg-white rounded-3xl shadow p-8">

        <div className="text-center">

          <h2 className="text-xl font-bold text-gray-800">
            Unable to load dashboard
          </h2>

          <p className="text-red-500 mt-2">
            {error}
          </p>

          <button
            onClick={() => loadDashboard()}
            className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }


  const teacher = dashboard?.teacher;

  const stats = [
    {
      title: "Today's Classes",
      value: dashboard?.stats?.todayClasses ?? 0,
      icon: <BookOpen size={20} />,
      bg: "bg-blue-100",
      text: "text-blue-600"
    },
    {
      title: "Total Students",
      value: dashboard?.stats?.totalStudents ?? 0,
      icon: <GraduationCap size={20} />,
      bg: "bg-green-100",
      text: "text-green-600"
    },
    {
      title: "Assignments",
      value: dashboard?.stats?.assignments ?? 0,
      icon: <ClipboardList size={20} />,
      bg: "bg-orange-100",
      text: "text-orange-600"
    },
    {
      title: "Attendance",
      value: `${dashboard?.stats?.attendance ?? 0}%`,
      icon: <CalendarCheck size={20} />,
      bg: "bg-purple-100",
      text: "text-purple-600"
    }
  ];


  const schedule = dashboard?.schedule || [];
  const notifications = dashboard?.notifications || [];


  return (

    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <User size={21} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Welcome, {teacher?.full_name || "Teacher"}
              </h2>

              <p className="text-gray-500 mt-1">
                {teacher?.department
                  ? `${teacher.department} Teacher`
                  : "Teacher Dashboard"}
              </p>

            </div>

          </div>

        </div>


        <button
          onClick={() => loadDashboard(false)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border bg-white hover:bg-gray-50 transition disabled:opacity-60"
        >

          <RefreshCw
            size={17}
            className={refreshing ? "animate-spin" : ""}
          />

          {refreshing ? "Refreshing..." : "Refresh"}

        </button>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-2xl font-bold mt-3 text-gray-800">
                  {item.value}
                </h3>

              </div>

              <div
                className={`${item.bg} ${item.text} w-11 h-11 rounded-2xl flex items-center justify-center`}
              >
                {item.icon}
              </div>

            </div>

          </div>

        ))}

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="grid lg:grid-cols-3 gap-6">


        {/* ===================================================
            TODAY'S SCHEDULE
            =================================================== */}

        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h3 className="text-2xl font-bold text-gray-800">
                Today's Schedule
              </h3>

              <p className="text-gray-500 mt-1">
                Your classes for today
              </p>

            </div>

            <Clock
              size={22}
              className="text-blue-600"
            />

          </div>


          {schedule.length === 0 ? (

            <div className="border rounded-2xl p-8 text-center">

              <BookOpen
                size={32}
                className="mx-auto text-gray-400"
              />

              <p className="mt-3 text-gray-500">
                No classes scheduled for today.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {schedule.map((item) => (

                <div
                  key={item.id}
                  className="border rounded-2xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:bg-gray-50 transition"
                >

                  <div>

                    <h4 className="font-bold text-lg text-gray-800">
                      {item.subject}
                    </h4>

                    <p className="text-gray-500 mt-1">
                      Class {item.className}
                    </p>

                  </div>


                  <div className="flex items-center gap-2 text-green-600 font-semibold">

                    <Clock size={17} />

                    <span>
                      {item.startTime}
                      {item.endTime
                        ? ` - ${item.endTime}`
                        : ""}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* ===================================================
            NOTIFICATIONS
            =================================================== */}

        <div className="bg-white rounded-3xl p-8 shadow">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h3 className="text-2xl font-bold text-gray-800">
                Notifications
              </h3>

              <p className="text-gray-500 mt-1">
                Latest updates for you
              </p>

            </div>

            <Bell
              size={22}
              className="text-orange-500"
            />

          </div>


          {notifications.length === 0 ? (

            <div className="text-center py-8">

              <Bell
                size={30}
                className="mx-auto text-gray-400"
              />

              <p className="text-gray-500 mt-3">
                No notifications.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {notifications.map((notification) => (

                <div
                  key={notification.id}
                  className="border-l-4 border-blue-400 pl-4"
                >

                  <div className="flex items-start justify-between gap-3">

                    <h4 className="font-semibold text-gray-800">
                      {notification.title}
                    </h4>

                    {!notification.is_read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                    )}

                  </div>

                  <p className="text-gray-500 text-sm mt-1">
                    {notification.message}
                  </p>

                  {notification.created_at && (

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(
                        notification.created_at
                      ).toLocaleString()}
                    </p>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}