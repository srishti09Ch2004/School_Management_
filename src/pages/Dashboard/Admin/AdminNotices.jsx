
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Megaphone,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const API = "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/notifications";

const NOTICE_TYPES = [
  "General",
  "Academic",
  "Exam",
  "Event",
  "PTM",
  "Homework",
  "Fee",
  "Holiday",
  "Emergency",
  "Transport",
  "Achievement",
  "Reminder",
];

const PRIORITIES = ["Low", "Medium", "High"];

const AUDIENCES = [
  { value: "All", label: "Everyone" },
  { value: "Student", label: "Students" },
  { value: "Parent", label: "Parents" },
  { value: "Teacher", label: "Teachers" },
];

const getLoggedUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || null;
  } catch (error) {
    console.error("User data error:", error);
    return null;
  }
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const normalizeNotice = (notice) => ({
  id: notice?.id ?? notice?.notice_id ?? "",
  title: notice?.title || "Untitled Notice",
  description: notice?.description || "",
  noticeType: notice?.notice_type || "General",
  priority: notice?.priority || "Medium",
  noticeFor: notice?.notice_for || "All",
  createdBy: notice?.created_by || "",
  createdRole: notice?.created_role || "",
  creatorName: notice?.creator_name || "Admin",
  publishDate: notice?.publish_date || "",
  expiryDate: notice?.expiry_date || "",
  status: notice?.status || "Published",
  createdAt: notice?.created_at || "",
  updatedAt: notice?.updated_at || "",
});

const getAudienceLabel = (value) => {
  switch (value) {
    case "Student":
      return "Students";
    case "Parent":
      return "Parents";
    case "Teacher":
      return "Teachers";
    case "All":
    default:
      return "Everyone";
  }
};

const getPriorityClasses = (priority) => {
  switch (String(priority).toLowerCase()) {
    case "high":
      return "bg-red-50 text-red-700 border-red-100";

    case "low":
      return "bg-green-50 text-green-700 border-green-100";

    case "medium":
    default:
      return "bg-yellow-50 text-yellow-700 border-yellow-100";
  }
};

const getStatusClasses = (status) => {
  switch (String(status).toLowerCase()) {
    case "published":
      return "bg-green-50 text-green-700 border-green-100";

    case "scheduled":
      return "bg-blue-50 text-blue-700 border-blue-100";

    case "draft":
      return "bg-gray-100 text-gray-700 border-gray-200";

    case "expired":
      return "bg-orange-50 text-orange-700 border-orange-100";

    case "archived":
      return "bg-purple-50 text-purple-700 border-purple-100";

    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function AdminNotices() {
  const [user, setUser] = useState(null);

  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    notice_type: "General",
    priority: "Medium",
    notice_for: "All",
    publish_date: "",
    expiry_date: "",
    status: "Published",
  });

  useEffect(() => {
    const loggedUser = getLoggedUser();

    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const loadNotices = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      }

      const response = await fetch(`${API}/getNotices.php`);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();

      if (result?.status === false) {
        throw new Error(result?.message || "Unable to fetch notices");
      }

      const data = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
        ? result.data
        : [];

      setNotices(data.map(normalizeNotice));
    } catch (error) {
      console.error("Notice API Error:", error);

      toast.error(
        error?.message || "Unable to load notices"
      );

      setNotices([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  useEffect(() => {
  const modalOpen = showModal || !!selectedNotice;

  if (modalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [showModal, selectedNotice]);


  const filteredNotices = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return notices.filter((notice) => {
      const matchesSearch =
        !searchText ||
        notice.title.toLowerCase().includes(searchText) ||
        notice.description.toLowerCase().includes(searchText) ||
        notice.noticeType.toLowerCase().includes(searchText) ||
        notice.creatorName.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All" ||
        notice.noticeType === typeFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        notice.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        notice.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [
    notices,
    search,
    typeFilter,
    priorityFilter,
    statusFilter,
  ]);

  const stats = useMemo(() => {
    const published = notices.filter(
      (notice) =>
        String(notice.status).toLowerCase() === "published"
    ).length;

    const highPriority = notices.filter(
      (notice) =>
        String(notice.priority).toLowerCase() === "high"
    ).length;

    const scheduled = notices.filter(
      (notice) =>
        String(notice.status).toLowerCase() === "scheduled"
    ).length;

    return {
      total: notices.length,
      published,
      highPriority,
      scheduled,
    };
  }, [notices]);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      notice_type: "General",
      priority: "Medium",
      notice_for: "All",
      publish_date: "",
      expiry_date: "",
      status: "Published",
    });
  };

  const handleOpenModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (submitting) return;

    setShowModal(false);
    resetForm();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreateNotice = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      toast.error("Admin login information not found.");
      return;
    }

    if (!form.title.trim()) {
      toast.error("Please enter notice title.");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Please enter notice description.");
      return;
    }

    if (
      form.expiry_date &&
      form.publish_date &&
      new Date(form.expiry_date) < new Date(form.publish_date)
    ) {
      toast.error("Expiry date cannot be before publish date.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        notice_type: form.notice_type,
        priority: form.priority,
        notice_for: form.notice_for,
        created_by: user.id,
        created_role: user.role || "admin",
        publish_date: form.publish_date
          ? form.publish_date.replace("T", " ") + ":00"
          : null,
        expiry_date: form.expiry_date
          ? form.expiry_date.replace("T", " ") + ":00"
          : null,
        status: form.status,
        targets: [],
      };

      
        const response = await fetch(
        `${API}/createNotice.php`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
        );


      const result = await response.json();

      if (!response.ok || result?.status === false) {
        throw new Error(
          result?.message || "Failed to create notice"
        );
      }

      toast.success(
        result?.message || "Notice created successfully"
      );

      setShowModal(false);
      resetForm();

      await loadNotices();
    } catch (error) {
      console.error("Create Notice Error:", error);

      toast.error(
        error?.message || "Unable to create notice"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
          <p className="mt-3 text-sm text-gray-500">
            Loading notices...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* HEADER */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
              Communication
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-800">
              Notices & Announcements
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Create and manage official school notices for students,
              parents and teachers.
            </p>
          </div>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={() => loadNotices(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={
                  refreshing ? "animate-spin" : ""
                }
              />

              Refresh
            </button>

            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              <Plus size={17} />
              Add Notice
            </button>

          </div>

        </div>
      </div>


      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">
                Total Notices
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-800">
                {stats.total}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Megaphone
                size={19}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>


        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">
                Published
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {stats.published}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <CheckCircle2
                size={19}
                className="text-green-600"
              />
            </div>
          </div>
        </div>


        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">
                High Priority
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                {stats.highPriority}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle
                size={19}
                className="text-red-600"
              />
            </div>
          </div>
        </div>


        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">
                Scheduled
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-600">
                {stats.scheduled}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Clock
                size={19}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

      </div>


      {/* FILTERS */}

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_180px]">

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
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-green-500 focus:bg-white"
            />

          </div>


          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-green-500"
          >
            <option value="All">
              All Types
            </option>

            {NOTICE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>


          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-green-500"
          >
            <option value="All">
              All Priorities
            </option>

            {PRIORITIES.map((priority) => (
              <option
                key={priority}
                value={priority}
              >
                {priority}
              </option>
            ))}
          </select>


          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-green-500"
          >
            <option value="All">
              All Status
            </option>

            <option value="Published">
              Published
            </option>

            <option value="Scheduled">
              Scheduled
            </option>

            <option value="Draft">
              Draft
            </option>

            <option value="Expired">
              Expired
            </option>

            <option value="Archived">
              Archived
            </option>
          </select>

        </div>

      </div>


{/* NOTICE LIST */}

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-5 py-4">
                <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                    School Notices
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                    Notices currently available in the database
                    </p>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {filteredNotices.length} Records
                </span>

                </div>
            </div>


            {filteredNotices.length === 0 ? (

                <div className="py-14 text-center">

                <Bell
                    size={34}
                    className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-sm font-semibold text-gray-700">
                    No notices found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                    Create a notice or change your filters.
                </p>

                </div>

            ) : (

                <div className="p-4 space-y-3">

                {filteredNotices.map((notice) => (

                    <div
                    key={notice.id}
                    className="
                        group
                        rounded-2xl
                        border
                        border-gray-100
                        bg-white
                        p-4
                        transition-all
                        duration-200
                        hover:border-green-200
                        hover:bg-green-50/20
                        hover:shadow-sm
                    "
                    >

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                        {/* LEFT ICON */}

                        <div
                        className="
                            hidden
                            sm:flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-green-50
                        "
                        >
                        <Megaphone
                            size={19}
                            className="text-green-600"
                        />
                        </div>


                        {/* MAIN CONTENT */}

                        <div className="min-w-0 flex-1">

                        {/* TITLE + BADGES */}

                        <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-base font-bold text-gray-800">
                            {notice.title}
                            </h3>

                            <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getPriorityClasses(
                                notice.priority
                            )}`}
                            >
                            {notice.priority} Priority
                            </span>

                            <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                                notice.status
                            )}`}
                            >
                            {notice.status}
                            </span>

                        </div>


                        {/* DESCRIPTION */}

                        <p className="mt-2 line-clamp-1 text-sm text-gray-600">
                            {notice.description}
                        </p>


                        {/* META INFORMATION */}

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">

                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Megaphone size={13} />

                            <span>
                                Type:
                            </span>

                            <strong className="font-semibold text-gray-700">
                                {notice.noticeType}
                            </strong>
                            </div>


                            <div className="flex items-center gap-1.5 text-xs text-gray-500">

                            <Users
                                size={13}
                            />

                            <span>
                                Audience:
                            </span>

                            <strong className="font-semibold text-gray-700">
                                {getAudienceLabel(notice.noticeFor)}
                            </strong>

                            </div>


                            <div className="flex items-center gap-1.5 text-xs text-gray-500">

                            <Clock size={13} />

                            <span>
                                Published:
                            </span>

                            <strong className="font-semibold text-gray-700">
                                {notice.publishDate
                                ? formatDateTime(notice.publishDate)
                                : "-"
                                }
                            </strong>

                            </div>

                        </div>

                        </div>


            {/* VIEW BUTTON */}

            <div className="shrink-0">

              <button
                type="button"
                onClick={() =>
                  setSelectedNotice(notice)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-gray-700
                  transition
                  hover:border-green-300
                  hover:bg-green-50
                  hover:text-green-700
                  sm:w-auto
                "
              >
                View Details
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</div>


      {/* ADD NOTICE MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Create New Notice
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  Publish an official announcement.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={submitting}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={19} />
              </button>

            </div>


            <form
              onSubmit={handleCreateNotice}
              className="space-y-4 p-5"
            >

              {/* TITLE */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Notice Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter notice title"
                  maxLength={255}
                  required
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-3 text-sm outline-none focus:border-green-500"
                />
              </div>


              {/* DESCRIPTION */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write the complete notice..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-3 text-sm outline-none focus:border-green-500"
                />
              </div>


              {/* TYPE + PRIORITY */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Notice Type
                  </label>

                  <select
                    name="notice_type"
                    value={form.notice_type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  >
                    {NOTICE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>


                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  >
                    {PRIORITIES.map((priority) => (
                      <option
                        key={priority}
                        value={priority}
                      >
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

              </div>


              {/* AUDIENCE */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Audience
                </label>

                <select
                  name="notice_for"
                  value={form.notice_for}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                >
                  {AUDIENCES.map((audience) => (
                    <option
                      key={audience.value}
                      value={audience.value}
                    >
                      {audience.label}
                    </option>
                  ))}
                </select>

                <p className="mt-1.5 text-[11px] text-gray-400">
                  Published notices will automatically create
                  notifications for the selected audience.
                </p>
              </div>


              {/* DATES */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Publish Date
                  </label>

                  <input
                    type="datetime-local"
                    name="publish_date"
                    value={form.publish_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>


                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Expiry Date
                  </label>

                  <input
                    type="datetime-local"
                    name="expiry_date"
                    value={form.expiry_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

              </div>


              {/* STATUS */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                >
                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Scheduled">
                    Scheduled
                  </option>

                  <option value="Archived">
                    Archived
                  </option>
                </select>
              </div>


              {/* FOOTER */}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting && (
                    <RefreshCw
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {submitting
                    ? "Creating..."
                    : "Create Notice"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


     {/* VIEW NOTICE MODAL */}

        {selectedNotice && (

        <div
            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-[2px]
            "
            onClick={(event) => {
            if (event.target === event.currentTarget) {
                setSelectedNotice(null);
            }
            }}
        >

            <div
            className="
                flex
                max-h-[90vh]
                w-full
                max-w-2xl
                flex-col
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-2xl
            "
            >

            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-start justify-between border-b border-gray-100 px-6 py-5">

                <div className="flex min-w-0 items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">

                    <Megaphone
                    size={20}
                    className="text-green-600"
                    />

                </div>

                <div className="min-w-0">

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600">
                    School Notice
                    </p>

                    <h2 className="mt-1 break-words text-xl font-bold text-gray-800">
                    {selectedNotice.title}
                    </h2>

                </div>

                </div>


                <button
                type="button"
                onClick={() =>
                    setSelectedNotice(null)
                }
                className="
                    ml-3
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                "
                >
                <X size={19} />
                </button>

            </div>


            {/* MODAL CONTENT */}

            <div className="overflow-y-auto p-6">

                {/* BADGES */}

                <div className="flex flex-wrap gap-2">

                <span
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${getPriorityClasses(
                    selectedNotice.priority
                    )}`}
                >
                    {selectedNotice.priority} Priority
                </span>

                <span
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${getStatusClasses(
                    selectedNotice.status
                    )}`}
                >
                    {selectedNotice.status}
                </span>

                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-semibold text-gray-700">
                    {selectedNotice.noticeType}
                </span>

                </div>


                {/* DESCRIPTION */}

                <div className="mt-5">

                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Notice Message
                </p>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">

                    <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                    {selectedNotice.description}
                    </p>

                </div>

                </div>


                {/* DETAILS GRID */}

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {/* AUDIENCE */}

                <div className="rounded-xl border border-gray-100 bg-white p-4">

                    <div className="flex items-center gap-2">

                    <Users
                        size={16}
                        className="text-blue-600"
                    />

                    <p className="text-xs font-medium text-gray-400">
                        Audience
                    </p>

                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                    {getAudienceLabel(
                        selectedNotice.noticeFor
                    )}
                    </p>

                </div>


                {/* NOTICE TYPE */}

                <div className="rounded-xl border border-gray-100 bg-white p-4">

                    <div className="flex items-center gap-2">

                    <Megaphone
                        size={16}
                        className="text-green-600"
                    />

                    <p className="text-xs font-medium text-gray-400">
                        Notice Type
                    </p>

                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                    {selectedNotice.noticeType}
                    </p>

                </div>


                {/* PUBLISH DATE */}

                <div className="rounded-xl border border-gray-100 bg-white p-4">

                    <div className="flex items-center gap-2">

                    <Clock
                        size={16}
                        className="text-purple-600"
                    />

                    <p className="text-xs font-medium text-gray-400">
                        Publish Date
                    </p>

                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                    {selectedNotice.publishDate
                        ? formatDateTime(
                            selectedNotice.publishDate
                        )
                        : "-"
                    }
                    </p>

                </div>


                {/* EXPIRY DATE */}

                <div className="rounded-xl border border-gray-100 bg-white p-4">

                    <div className="flex items-center gap-2">

                    <Clock
                        size={16}
                        className="text-orange-600"
                    />

                    <p className="text-xs font-medium text-gray-400">
                        Expiry Date
                    </p>

                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                    {selectedNotice.expiryDate
                        ? formatDateTime(
                            selectedNotice.expiryDate
                        )
                        : "No expiry"
                    }
                    </p>

                </div>

                </div>


                {/* CREATED INFO */}

                <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">

                <div className="flex flex-wrap items-center justify-between gap-3">

                    <div>

                    <p className="text-[11px] text-gray-400">
                        Created By
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                        {selectedNotice.creatorName}
                    </p>

                    </div>


                    <div className="text-left sm:text-right">

                    <p className="text-[11px] text-gray-400">
                        Created On
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                        {selectedNotice.createdAt
                        ? formatDateTime(
                            selectedNotice.createdAt
                            )
                        : "-"
                        }
                    </p>

                    </div>

                </div>

                </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="flex shrink-0 justify-end border-t border-gray-100 bg-gray-50/70 px-6 py-4">

                <button
                type="button"
                onClick={() =>
                    setSelectedNotice(null)
                }
                className="
                    rounded-xl
                    bg-gray-800
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-gray-900
                "
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
