import { useEffect, useMemo, useState } from "react";

import {
  Bell,
  AlertTriangle,
  Calendar,
  Users,
  Plus,
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
  Send,
} from "lucide-react";

import toast from "react-hot-toast";

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/notifications";

export default function PrincipalNotice() {
  const [notices, setNotices] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedNotice, setSelectedNotice] =
    useState(null);

  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] =
    useState("All");
  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [form, setForm] = useState({
    title: "",
    audience: "Students",
    class_name: "ALL",
    section: "ALL",
    notice_type: "General",
    priority: "Medium",
    description: "",
    expiry_date: "",
  });

  const user = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("user") || "null"
      );
    } catch {
      return null;
    }
  }, []);

  /*
   * Format exact date and time
   */
  const formatDateTime = (value) => {
    if (!value) return "-";

    const raw = String(value);

    const normalized = raw.includes("T")
      ? raw
      : raw.replace(" ", "T");

    const date = new Date(normalized);

    if (Number.isNaN(date.getTime())) {
      return raw;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  /*
   * Fetch classes
   */
  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${API}/getPrincipalClasses.php?_=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "Classes API response:",
          text
        );

        throw new Error(
          "Invalid classes API response"
        );
      }

      if (result.status) {
        setClasses(
          Array.isArray(result.data)
            ? result.data
            : []
        );
      } else {
        throw new Error(
          result.message ||
            "Unable to fetch classes"
        );
      }
    } catch (error) {
      console.error(
        "Fetch classes error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to load classes"
      );
    }
  };

  /*
   * Fetch Principal notices
   */
  const fetchNotices = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API}/getPrincipalNotices.php?user_id=${encodeURIComponent(
          user.id
        )}&_=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "Principal notices response:",
          text
        );

        throw new Error(
          "Invalid server response"
        );
      }

      if (result.status) {
        setNotices(
          Array.isArray(result.data)
            ? result.data
            : []
        );
      } else {
        throw new Error(
          result.message ||
            "Unable to load notices"
        );
      }
    } catch (error) {
      console.error(
        "Fetch notices error:",
        error
      );

      setNotices([]);

      toast.error(
        error.message ||
          "Unable to load notices"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Initial load + live refresh
   */
  useEffect(() => {
    fetchClasses();
    fetchNotices();

    const interval =
      setInterval(() => {
        fetchNotices();
      }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [user?.id]);

  /*
   * Unique classes
   */
  const classNames = useMemo(() => {
    return [
      ...new Set(
        classes
          .map(
            (item) =>
              item.class_name
          )
          .filter(Boolean)
      ),
    ];
  }, [classes]);

  /*
   * Sections
   */
  const sectionNames = useMemo(() => {
    if (
      !form.class_name ||
      form.class_name === "ALL"
    ) {
      return [];
    }

    return [
      ...new Set(
        classes
          .filter(
            (item) =>
              String(
                item.class_name
              ) ===
              String(
                form.class_name
              )
          )
          .map(
            (item) =>
              item.section
          )
          .filter(Boolean)
      ),
    ];
  }, [
    classes,
    form.class_name,
  ]);

  /*
   * Audience change
   */
  const handleAudienceChange = (
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      audience: value,
      class_name: "ALL",
      section: "ALL",
    }));
  };

  /*
   * Class change
   */
  const handleClassChange = (
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      class_name: value,
      section: "ALL",
    }));
  };

  /*
   * Submit notice
   */
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error(
        "Principal session not found"
      );
      return;
    }

    if (!form.title.trim()) {
      toast.error(
        "Notice title is required"
      );
      return;
    }

    if (
      !form.description.trim()
    ) {
      toast.error(
        "Notice content is required"
      );
      return;
    }

    if (
      (
        form.audience ===
          "Students" ||
        form.audience ===
          "Parents"
      ) &&
      !form.class_name
    ) {
      toast.error(
        "Please select a class"
      );
      return;
    }

    try {
      setSaving(true);

      const response =
        await fetch(
          `${API}/createPrincipalNotice.php`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              title:
                form.title.trim(),
              audience:
                form.audience,
              class_name:
                form.class_name,
              section:
                form.section,
              notice_type:
                form.notice_type,
              priority:
                form.priority,
              description:
                form.description.trim(),
              expiry_date:
                form.expiry_date ||
                null,
            }),
          }
        );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "Create notice response:",
          text
        );

        throw new Error(
          "Invalid server response"
        );
      }

      if (!result.status) {
        throw new Error(
          result.message ||
            "Unable to create notice"
        );
      }

      toast.success(
        `Notice sent to ${result.recipient_count} recipients`
      );

      setShowModal(false);

      setForm({
        title: "",
        audience: "Students",
        class_name: "ALL",
        section: "ALL",
        notice_type: "General",
        priority: "Medium",
        description: "",
        expiry_date: "",
      });

      await fetchNotices();
    } catch (error) {
      console.error(
        "Create notice error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to create notice"
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Delete notice
   */
  const handleDelete = async (
    noticeId
  ) => {
    if (!user?.id) {
      toast.error(
        "Principal session not found"
      );
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this notice?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API}/deletePrincipalNotice.php`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              notice_id:
                noticeId,
            }),
          }
        );

      const text =
        await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error(
          "Delete response:",
          text
        );

        throw new Error(
          "Invalid server response"
        );
      }

      if (!result.status) {
        throw new Error(
          result.message ||
            "Unable to delete notice"
        );
      }

      toast.success(
        "Notice deleted successfully"
      );

      if (
        selectedNotice?.id ===
        noticeId
      ) {
        setSelectedNotice(null);
        setShowViewModal(false);
      }

      await fetchNotices();
    } catch (error) {
      console.error(
        "Delete notice error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to delete notice"
      );
    }
  };

  /*
   * Filter notices
   */
  const filteredNotices =
    useMemo(() => {
      return notices.filter(
        (notice) => {
          const searchText =
            search
              .trim()
              .toLowerCase();

          const matchesSearch =
            !searchText ||
            String(
              notice.title || ""
            )
              .toLowerCase()
              .includes(
                searchText
              ) ||
            String(
              notice.description ||
                ""
            )
              .toLowerCase()
              .includes(
                searchText
              ) ||
            String(
              notice.notice_type ||
                ""
            )
              .toLowerCase()
              .includes(
                searchText
              ) ||
            String(
              notice.notice_for ||
                ""
            )
              .toLowerCase()
              .includes(
                searchText
              ) ||
            String(
              notice.target_label ||
                ""
            )
              .toLowerCase()
              .includes(
                searchText
              );

          const matchesAudience =
            audienceFilter ===
              "All" ||
            notice.notice_for ===
              audienceFilter;

          const matchesPriority =
            priorityFilter ===
              "All" ||
            notice.priority ===
              priorityFilter;

          return (
            matchesSearch &&
            matchesAudience &&
            matchesPriority
          );
        }
      );
    }, [
      notices,
      search,
      audienceFilter,
      priorityFilter,
    ]);

  /*
   * Stats
   */
  const totalNotices =
    notices.length;

  const activeNotices =
    notices.filter(
      (item) =>
        String(
          item.status
        ).toLowerCase() ===
        "published"
    ).length;

  const highPriority =
    notices.filter(
      (item) =>
        item.priority ===
        "High"
    ).length;

  const totalReach =
    notices.reduce(
      (sum, item) =>
        sum +
        Number(
          item.recipient_count ||
            0
        ),
      0
    );

  /*
   * Audience label
   */
  const getAudienceLabel = (
    notice
  ) => {
    if (
      notice.target_label
    ) {
      return notice.target_label;
    }

    if (
      notice.notice_for ===
      "Student"
    ) {
      return "All Students";
    }

    if (
      notice.notice_for ===
      "Parent"
    ) {
      return "All Parents";
    }

    if (
      notice.notice_for ===
      "Teacher"
    ) {
      return "All Teachers";
    }

    if (
      notice.notice_for ===
      "All"
    ) {
      return "Entire School";
    }

    return (
      notice.notice_for ||
      "-"
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            School Notices
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage school-wide announcements and targeted communication.
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={fetchNotices}
            className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Notice
          </button>

        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Total Notices
              </p>

              <h3 className="text-xl font-bold mt-1">
                {totalNotices}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-blue-100">
              <Bell
                size={20}
                className="text-blue-600"
              />
            </div>

          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Active
              </p>

              <h3 className="text-xl font-bold mt-1">
                {activeNotices}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-green-100">
              <Calendar
                size={20}
                className="text-green-600"
              />
            </div>

          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                High Priority
              </p>

              <h3 className="text-xl font-bold mt-1">
                {highPriority}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-red-100">
              <AlertTriangle
                size={20}
                className="text-red-600"
              />
            </div>

          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Total Reach
              </p>

              <h3 className="text-xl font-bold mt-1">
                {totalReach}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Recipients
              </p>
            </div>

            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-purple-100">
              <Users
                size={20}
                className="text-purple-600"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-5 shadow-sm">

        <div className="grid md:grid-cols-3 gap-4">

          <div className="flex items-center gap-3 border rounded-2xl px-4 py-3">

            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search notice..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="outline-none w-full text-sm"
            />

          </div>

          <select
            value={
              audienceFilter
            }
            onChange={(e) =>
              setAudienceFilter(
                e.target.value
              )
            }
            className="border rounded-2xl px-4 py-3 text-sm outline-none"
          >
            <option value="All">
              All Audiences
            </option>

            <option value="Student">
              Students
            </option>

            <option value="Parent">
              Parents
            </option>

            <option value="Teacher">
              Teachers
            </option>

          </select>

          <select
            value={
              priorityFilter
            }
            onChange={(e) =>
              setPriorityFilter(
                e.target.value
              )
            }
            className="border rounded-2xl px-4 py-3 text-sm outline-none"
          >
            <option value="All">
              All Priorities
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
          </select>

        </div>
      </div>

      {/* Notices */}
      <div className="space-y-4">

        {loading ? (
          <div className="bg-white rounded-3xl p-10 text-center text-gray-500">
            Loading notices...
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center text-gray-500">

            <Bell
              size={35}
              className="mx-auto mb-3 text-gray-300"
            />

            <p className="font-medium">
              No notices found
            </p>

            <p className="text-sm mt-1">
              Create your first school notice.
            </p>

          </div>
        ) : (
          filteredNotices.map(
            (item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-5">

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

                      <div className="flex flex-wrap gap-2 mt-4">

                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                          {item.notice_type ||
                            "General"}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                          {getAudienceLabel(
                            item
                          )}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                          Sent:{" "}
                          {formatDateTime(
                            item.created_at
                          )}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                          {item.recipient_count ||
                            0}{" "}
                          recipients
                        </span>

                      </div>

                    </div>
                  </div>

                  <div className="flex lg:flex-col items-center lg:items-end gap-2">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.priority ===
                        "High"
                          ? "bg-red-100 text-red-700"
                          : item.priority ===
                            "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.priority}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status ===
                        "Published"
                          ? "bg-green-100 text-green-700"
                          : item.status ===
                            "Expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>

                    <div className="flex gap-2 mt-1">

                      <button
                        onClick={() => {
                          setSelectedNotice(
                            item
                          );

                          setShowViewModal(
                            true
                          );
                        }}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                        title="View"
                      >
                        <Eye
                          size={17}
                        />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2
                          size={17}
                        />
                      </button>

                    </div>

                  </div>

                </div>
              </div>
            )
          )
        )}

      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center p-6 border-b">

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Create School Notice
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Send an official notice to the selected audience.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="p-2 rounded-xl hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="p-6 space-y-5"
            >

              {/* Title */}
              <div>

                <label className="text-sm font-medium text-gray-700">
                  Notice Title
                </label>

                <input
                  type="text"
                  value={
                    form.title
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. Parent Teacher Meeting"
                  className="w-full border rounded-2xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Audience */}
              <div>

                <label className="text-sm font-medium text-gray-700">
                  Send To
                </label>

                <select
                  value={
                    form.audience
                  }
                  onChange={(e) =>
                    handleAudienceChange(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-2xl px-4 py-3 mt-2 outline-none"
                >
                  <option value="Students">
                    Students
                  </option>

                  <option value="Parents">
                    Parents
                  </option>

                  <option value="Teachers">
                    Teachers
                  </option>

                  <option value="All">
                    Entire School
                  </option>
                </select>

              </div>

              {/* Class */}
              {(
                form.audience ===
                  "Students" ||
                form.audience ===
                  "Parents"
              ) && (
                <div className="grid md:grid-cols-2 gap-4">

                  <div>

                    <label className="text-sm font-medium text-gray-700">
                      Class
                    </label>

                    <select
                      value={
                        form.class_name
                      }
                      onChange={(e) =>
                        handleClassChange(
                          e.target.value
                        )
                      }
                      className="w-full border rounded-2xl px-4 py-3 mt-2 outline-none"
                    >
                      <option value="ALL">
                        All Classes
                      </option>

                      {classNames.map(
                        (
                          className
                        ) => (
                          <option
                            key={
                              className
                            }
                            value={
                              className
                            }
                          >
                            Class{" "}
                            {
                              className
                            }
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <div>

                    <label className="text-sm font-medium text-gray-700">
                      Section
                    </label>

                    <select
                      value={
                        form.section
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          section:
                            e.target.value,
                        })
                      }
                      disabled={
                        form.class_name ===
                        "ALL"
                      }
                      className="w-full border rounded-2xl px-4 py-3 mt-2 outline-none disabled:bg-gray-100"
                    >
                      <option value="ALL">
                        All Sections
                      </option>

                      {sectionNames.map(
                        (
                          section
                        ) => (
                          <option
                            key={
                              section
                            }
                            value={
                              section
                            }
                          >
                            Section{" "}
                            {
                              section
                            }
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>
              )}

              {/* Type + Priority */}
              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className="text-sm font-medium text-gray-700">
                    Notice Type
                  </label>

                  <select
                    value={
                      form.notice_type
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notice_type:
                          e.target.value,
                      })
                    }
                    className="w-full border rounded-2xl px-4 py-3 mt-2 outline-none"
                  >
                    <option>
                      General
                    </option>

                    <option>
                      Academic
                    </option>

                    <option>
                      Meeting
                    </option>

                    <option>
                      Exam
                    </option>

                    <option>
                      Event
                    </option>

                    <option>
                      Holiday
                    </option>

                    <option>
                      Attendance
                    </option>

                    <option>
                      Fee
                    </option>

                    <option>
                      Emergency
                    </option>

                    <option>
                      Reminder
                    </option>
                  </select>

                </div>

                <div>

                  <label className="text-sm font-medium text-gray-700">
                    Priority
                  </label>

                  <select
                    value={
                      form.priority
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priority:
                          e.target.value,
                      })
                    }
                    className="w-full border rounded-2xl px-4 py-3 mt-2 outline-none"
                  >
                    <option>
                      Low
                    </option>

                    <option>
                      Medium
                    </option>

                    <option>
                      High
                    </option>
                  </select>

                </div>

              </div>

              {/* Expiry */}
              <div>

                <label className="text-sm font-medium text-gray-700">
                  Expiry Date
                </label>

                <input
                  type="datetime-local"
                  value={
                    form.expiry_date
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      expiry_date:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-2xl px-4 py-3 mt-2 outline-none"
                />

              </div>

              {/* Description */}
              <div>

                <label className="text-sm font-medium text-gray-700">
                  Notice Content
                </label>

                <textarea
                  rows={5}
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                  placeholder="Write the complete notice..."
                  className="w-full border rounded-2xl px-4 py-3 mt-2 outline-none resize-none"
                />

              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="px-5 py-3 rounded-2xl border text-sm font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-3 rounded-2xl bg-blue-600 text-white text-sm font-medium flex items-center gap-2 disabled:opacity-60"
                >
                  <Send size={17} />

                  {saving
                    ? "Sending..."
                    : "Publish Notice"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal &&
        selectedNotice && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto">

              <div className="flex justify-between items-center p-6 border-b">

                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Notice Details
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    Official school communication
                  </p>
                </div>

                <button
                  onClick={() =>
                    setShowViewModal(
                      false
                    )
                  }
                  className="p-2 rounded-xl hover:bg-gray-100"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="p-6 space-y-5">

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    {
                      selectedNotice.title
                    }
                  </h2>

                  <div className="flex flex-wrap gap-2 mt-3">

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      {
                        selectedNotice.notice_type ||
                        "General"
                      }
                    </span>

                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                      {
                        getAudienceLabel(
                          selectedNotice
                        )
                      }
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        selectedNotice.priority ===
                        "High"
                          ? "bg-red-100 text-red-700"
                          : selectedNotice.priority ===
                            "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {
                        selectedNotice.priority
                      }
                    </span>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                      {
                        selectedNotice.status
                      }
                    </span>

                  </div>

                </div>

                <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 leading-7">
                  {
                    selectedNotice.description
                  }
                </div>

                {/* Timestamp */}
                <div className="bg-blue-50 rounded-2xl p-4">

                  <p className="text-xs text-gray-500">
                    Notice Sent
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {formatDateTime(
                      selectedNotice.created_at
                    )}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Exact time recorded by the school system
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">

                  <div>
                    <p className="text-gray-400">
                      Published
                    </p>

                    <p className="font-medium mt-1">
                      {formatDateTime(
                        selectedNotice.publish_date
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Recipients
                    </p>

                    <p className="font-medium mt-1">
                      {
                        selectedNotice.recipient_count ||
                        0
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Read
                    </p>

                    <p className="font-medium mt-1">
                      {
                        selectedNotice.read_count ||
                        0
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Unread
                    </p>

                    <p className="font-medium mt-1">
                      {
                        selectedNotice.unread_count ||
                        0
                      }
                    </p>
                  </div>

                </div>

                {selectedNotice.expiry_date && (
                  <div className="text-sm">

                    <p className="text-gray-400">
                      Expires
                    </p>

                    <p className="font-medium mt-1">
                      {formatDateTime(
                        selectedNotice.expiry_date
                      )}
                    </p>

                  </div>
                )}

              </div>

            </div>
          </div>
        )}

    </div>
  );
}