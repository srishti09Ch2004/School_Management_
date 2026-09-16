import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  ClipboardCheck,
  CalendarDays,
  Search,
  Edit3,
  X,
  RefreshCw,
  Clock3,
  BookOpen,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const API_BASE =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin";

const emptyForm = {
  id: "",
  exam_name: "",
  class: "",
  section: "",
  subject: "",
  exam_date: "",
  start_time: "",
  end_time: "",
  total_marks: "",
  passing_marks: "",
  status: "",
};

function normalizeExam(item) {
  return {
    id: item.id,
    exam_name: item.exam_name || "",
    class: item.class || "",
    section: item.section || "",
    subject: item.subject || "",
    exam_date: item.exam_date || "",
    start_time: item.start_time || "",
    end_time: item.end_time || "",
    total_marks: item.total_marks ?? "",
    passing_marks: item.passing_marks ?? "",
    status: item.status || "",
  };
}

function getToday() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getExamStatus(exam) {
  if (exam.status) {
    return exam.status;
  }

  const today = getToday();

  if (exam.exam_date < today) {
    return "Completed";
  }

  if (exam.exam_date > today) {
    return "Upcoming";
  }

  return "Scheduled";
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value) {
  if (!value) {
    return "-";
  }

  const [hours, minutes] = value.split(":");

  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusClasses(status) {
  if (status === "Completed") {
    return "bg-emerald-50 text-emerald-700 border border-emerald-100";
  }

  if (status === "Upcoming") {
    return "bg-blue-50 text-blue-700 border border-blue-100";
  }

  if (status === "Scheduled") {
    return "bg-amber-50 text-amber-700 border border-amber-100";
  }

  return "bg-gray-50 text-gray-700 border border-gray-100";
}

export default function PrincipalExams() {
  const [exams, setExams] = useState([]);

  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [editingExam, setEditingExam] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const loadExams = async (manualRefresh = false) => {
    try {
      if (manualRefresh) {
        setRefreshing(true);
      }

      setError("");

      const response = await fetch(`${API_BASE}/exams.php`);
      const result = await response.json();

      if (!response.ok || result.status === false) {
        throw new Error(
          result.message || "Failed to load examinations"
        );
      }

      const examList = Array.isArray(result.data)
        ? result.data.map(normalizeExam)
        : [];

      setExams(examList);
    } catch (err) {
      setError(
        err.message || "Unable to load examinations"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadExams();

    const interval = setInterval(() => {
      loadExams();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const classOptions = useMemo(() => {
    const values = exams
      .map((exam) => {
        if (!exam.class) {
          return "";
        }

        return exam.section
          ? `${exam.class}-${exam.section}`
          : exam.class;
      })
      .filter(Boolean);

    return [...new Set(values)].sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
      })
    );
  }, [exams]);

  const statusOptions = useMemo(() => {
    const values = exams
      .map((exam) => getExamStatus(exam))
      .filter(Boolean);

    return [...new Set(values)];
  }, [exams]);

  const totalExams = exams.length;

  const completedExams = exams.filter(
    (exam) => getExamStatus(exam) === "Completed"
  ).length;

  const upcomingExams = exams.filter((exam) => {
    const status = getExamStatus(exam);

    return (
      status === "Upcoming" ||
      status === "Scheduled"
    );
  });

  const scheduledExams = exams.filter(
    (exam) => getExamStatus(exam) === "Scheduled"
  ).length;

  const filteredExams = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return exams
      .filter((exam) => {
        const examClass = exam.section
          ? `${exam.class}-${exam.section}`
          : exam.class;

        const classMatch =
          selectedClass === "All" ||
          examClass === selectedClass;

        const statusMatch =
          selectedStatus === "All" ||
          getExamStatus(exam) === selectedStatus;

        const searchMatch =
          search === "" ||
          exam.exam_name
            .toLowerCase()
            .includes(search) ||
          exam.subject
            .toLowerCase()
            .includes(search) ||
          examClass
            .toLowerCase()
            .includes(search);

        return (
          classMatch &&
          statusMatch &&
          searchMatch
        );
      })
      .sort((a, b) => {
        const dateA = `${a.exam_date} ${a.start_time}`;
        const dateB = `${b.exam_date} ${b.start_time}`;

        return dateA.localeCompare(dateB);
      });
  }, [
    exams,
    selectedClass,
    selectedStatus,
    searchTerm,
  ]);

  const nextExam = useMemo(() => {
    const today = getToday();

    return [...exams]
      .filter(
        (exam) =>
          exam.exam_date >= today &&
          getExamStatus(exam) !== "Completed"
      )
      .sort((a, b) => {
        const dateA = `${a.exam_date} ${a.start_time}`;
        const dateB = `${b.exam_date} ${b.start_time}`;

        return dateA.localeCompare(dateB);
      })[0];
  }, [exams]);

  const openEdit = (exam) => {
    setEditingExam(exam);

    setForm({
      id: exam.id,
      exam_name: exam.exam_name,
      class: exam.class,
      section: exam.section,
      subject: exam.subject,
      exam_date: exam.exam_date,
      start_time: exam.start_time,
      end_time: exam.end_time,
      total_marks: exam.total_marks,
      passing_marks: exam.passing_marks,
      status: exam.status,
    });

    setSaveMessage("");
  };

  const closeEdit = () => {
    if (saving) {
      return;
    }

    setEditingExam(null);
    setForm(emptyForm);
    setSaveMessage("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setSaveMessage("");

      const response = await fetch(
        `${API_BASE}/updateExam.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Number(form.id),
            exam_name: form.exam_name,
            class: form.class,
            section: form.section,
            subject: form.subject,
            exam_date: form.exam_date,
            start_time: form.start_time,
            end_time: form.end_time,
            total_marks: Number(form.total_marks),
            passing_marks: Number(form.passing_marks),
            status: form.status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.status === false) {
        throw new Error(
          result.message || "Failed to update exam"
        );
      }

      setSaveMessage(
        "Exam updated successfully."
      );

      await loadExams();

      setTimeout(() => {
        setEditingExam(null);
        setForm(emptyForm);
        setSaveMessage("");
      }, 700);
    } catch (err) {
      setSaveMessage(
        err.message || "Unable to update exam"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Examination Management
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor the complete examination schedule
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => loadExams(true)}
          disabled={refreshing}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-sm transition disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={
              refreshing ? "animate-spin" : ""
            }
          />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          <span className="font-medium">
            {error}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Exams
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {totalExams}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                All scheduled examinations
              </p>
            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={23} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Completed
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {completedExams}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Completed examinations
              </p>
            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ClipboardCheck size={23} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Upcoming
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {upcomingExams.length}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Upcoming examinations
              </p>
            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <CalendarDays size={23} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Scheduled
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {scheduledExams}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Currently scheduled
              </p>
            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <ClipboardCheck size={23} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Examination Schedule
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                View and update examination schedules
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <div className="relative sm:col-span-2 xl:col-span-2">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search exam, subject or class..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition"
                />
              </div>

              <select
                value={selectedClass}
                onChange={(event) =>
                  setSelectedClass(event.target.value)
                }
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
              >
                <option value="All">
                  All Classes
                </option>

                {classOptions.map((className) => (
                  <option
                    key={className}
                    value={className}
                  >
                    {className}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(event.target.value)
                }
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
              >
                <option value="All">
                  All Status
                </option>

                {statusOptions.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <RefreshCw
              size={30}
              className="animate-spin text-blue-600"
            />

            <p className="mt-4 text-gray-500">
              Loading examinations...
            </p>
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center px-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FileText
                size={30}
                className="text-blue-300"
              />
            </div>

            <h4 className="font-semibold text-gray-700 mt-4">
              No examinations found
            </h4>

            <p className="text-sm text-gray-500 mt-1 text-center">
              Try changing your search or filter selection.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Examination
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Class
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Subject
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Time
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredExams.map((exam) => {
                    const status =
                      getExamStatus(exam);

                    return (
                      <tr
                        key={exam.id}
                        className="hover:bg-blue-50/30 transition"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <BookOpen size={18} />
                            </div>

                            <div>
                              <p className="font-semibold text-gray-800">
                                {exam.exam_name || "-"}
                              </p>

                              {exam.total_marks !== "" && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Total Marks:{" "}
                                  {exam.total_marks}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100">

                            <span className="font-medium text-gray-700">
                              {exam.class || "-"}
                              {exam.section
                                ? `-${exam.section}`
                                : ""}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-gray-700 font-medium">
                            {exam.subject || "-"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <CalendarDays
                              size={16}
                              className="text-blue-500"
                            />

                            <span>
                              {formatDate(
                                exam.exam_date
                              )}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Clock3
                              size={16}
                              className="text-blue-500"
                            />

                            <span>
                              {formatTime(
                                exam.start_time
                              )}
                              {" - "}
                              {formatTime(
                                exam.end_time
                              )}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(
                              status
                            )}`}
                          >
                            {status || "-"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              openEdit(exam)
                            }
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition"
                          >
                            <Edit3 size={15} />
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/70">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {filteredExams.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {totalExams}
                </span>{" "}
                examinations
              </p>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Next Examination
              </p>

              {nextExam ? (
                <>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">
                    {nextExam.exam_name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays
                        size={15}
                        className="text-blue-500"
                      />
                      {formatDate(
                        nextExam.exam_date
                      )}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3
                        size={15}
                        className="text-blue-500"
                      />
                      {formatTime(
                        nextExam.start_time
                      )}
                    </span>

                    <span className="flex items-center gap-1.5">
                      {/* <GraduationCap
                        size={15}
                        className="text-blue-500"
                      /> */}
                      {nextExam.class}
                      {nextExam.section
                        ? `-${nextExam.section}`
                        : ""}
                    </span>
                  </div>
                </>
              ) : (
                <h3 className="text-xl font-semibold text-gray-400 mt-2">
                  No upcoming examination
                </h3>
              )}
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CalendarDays size={21} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Examination Overview
              </p>

              <h3 className="text-xl font-bold text-gray-800 mt-2">
                {completedExams}{" "}
                <span className="text-gray-400 font-medium">
                  / {totalExams}
                </span>
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Examinations completed from the current database schedule
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ClipboardCheck size={21} />
            </div>
          </div>
        </div>
      </div>

      {editingExam && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[94vh] overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit3 size={18} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Edit Examination
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Update the existing examination record
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeEdit}
                disabled={saving}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleUpdate}
              className="overflow-y-auto max-h-[calc(94vh-76px)]"
            >
              <div className="p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Exam Name
                    </label>

                    <input
                      name="exam_name"
                      value={form.exam_name}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subject
                    </label>

                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Status
                    </label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    >
                      <option value="">
                        Select Status
                      </option>

                      <option value="Scheduled">
                        Scheduled
                      </option>

                      <option value="Upcoming">
                        Upcoming
                      </option>

                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Class
                    </label>

                    <input
                      name="class"
                      value={form.class}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Section
                    </label>

                    <input
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Exam Date
                    </label>

                    <input
                      type="date"
                      name="exam_date"
                      value={form.exam_date}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Start Time
                    </label>

                    <input
                      type="time"
                      name="start_time"
                      value={form.start_time}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      End Time
                    </label>

                    <input
                      type="time"
                      name="end_time"
                      value={form.end_time}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Total Marks
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="total_marks"
                      value={form.total_marks}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Passing Marks
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="passing_marks"
                      value={form.passing_marks}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    />
                  </div>
                </div>

                {saveMessage && (
                  <div
                    className={`px-4 py-3 rounded-xl text-sm ${
                      saveMessage.includes(
                        "successfully"
                      )
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {saveMessage}
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-5 sm:px-6 py-4 border-t border-gray-100 bg-white">
                <button
                  type="button"
                  onClick={closeEdit}
                  disabled={saving}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {saving && (
                    <RefreshCw
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                  {!saving && (
                    <ChevronRight size={16} />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}