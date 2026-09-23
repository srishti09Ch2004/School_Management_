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
  ChevronRight,
} from "lucide-react";

const API_BASE =
  "https://futureacademy.site.je/api/admin";

const emptyForm = {
  id: "",
  exam_session_id: "",
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
    exam_session_id: item.exam_session_id,

    exam_name:
      item.session_exam_name ||
      item.exam_name ||
      "",

    subject: item.subject || "",

    class: item.class || "",

    section: item.section || "",

    exam_date: item.exam_date || "",

    start_time: item.start_time || "",

    end_time: item.end_time || "",

    total_marks: item.total_marks ?? "",

    passing_marks: item.passing_marks ?? "",

    paper_status: item.paper_status || "",

    session_status: item.session_status || "",

    academic_year: item.academic_year || "",

    exam_type: item.exam_type || "",

    session_start_date: item.session_start_date || "",

    session_end_date: item.session_end_date || "",

    description: item.session_description || "",
  };
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

  date.setHours(
    Number(hours),
    Number(minutes),
    0,
    0
  );

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getSessionStatus(exam) {
  return exam.session_status || "Draft";
}

function getStatusClasses(status) {
  switch (status) {
    case "Published":
      return "bg-emerald-50 text-emerald-700 border border-emerald-100";

    case "Completed":
      return "bg-slate-100 text-slate-700 border border-slate-200";

    case "Draft":
      return "bg-amber-50 text-amber-700 border border-amber-100";

    case "Cancelled":
      return "bg-red-50 text-red-700 border border-red-100";

    default:
      return "bg-gray-50 text-gray-700 border border-gray-100";
  }
}

export default function PrincipalExams() {
  const [exams, setExams] = useState([]);

  const [selectedExam, setSelectedExam] =
    useState("All");

  const [selectedClass, setSelectedClass] =
    useState("All");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [editingExam, setEditingExam] =
    useState(null);

  const [form, setForm] =
    useState(emptyForm);

  const [saving, setSaving] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const loadExams = async (
    manualRefresh = false
  ) => {
    try {
      if (manualRefresh) {
        setRefreshing(true);
      }

      setError("");

      const response = await fetch(
        `${API_BASE}/exams.php`
      );

      const result = await response.json();

      if (
        !response.ok ||
        result.status === false
      ) {
        throw new Error(
          result.message ||
            "Failed to load examinations"
        );
      }

      const list = Array.isArray(result.data)
        ? result.data.map(normalizeExam)
        : [];

      setExams(list);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load examinations"
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

  const examOptions = useMemo(() => {
    const values = exams
      .map((exam) => exam.exam_name)
      .filter(Boolean);

    return [...new Set(values)].sort(
      (a, b) => a.localeCompare(b)
    );
  }, [exams]);

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

    return [...new Set(values)].sort(
      (a, b) =>
        a.localeCompare(b, undefined, {
          numeric: true,
        })
    );
  }, [exams]);

  const statusOptions = useMemo(() => {
    const values = exams
      .map((exam) =>
        getSessionStatus(exam)
      )
      .filter(Boolean);

    return [...new Set(values)];
  }, [exams]);

  const totalRecords = exams.length;

  const publishedRecords = exams.filter(
    (exam) =>
      getSessionStatus(exam) ===
      "Published"
  ).length;

  const completedRecords = exams.filter(
    (exam) =>
      getSessionStatus(exam) ===
      "Completed"
  ).length;

  const draftRecords = exams.filter(
    (exam) =>
      getSessionStatus(exam) ===
      "Draft"
  ).length;

  const filteredExams = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return exams
      .filter((exam) => {
        const examClass = exam.section
          ? `${exam.class}-${exam.section}`
          : exam.class;

        const sessionStatus =
          getSessionStatus(exam);

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

        const examMatch =
          selectedExam === "All" ||
          exam.exam_name === selectedExam;

        const classMatch =
          selectedClass === "All" ||
          examClass === selectedClass;

        const statusMatch =
          selectedStatus === "All" ||
          sessionStatus === selectedStatus;

        return (
          searchMatch &&
          examMatch &&
          classMatch &&
          statusMatch
        );
      })
      .sort((a, b) => {
        const dateA =
          `${a.exam_date} ${a.start_time}`;

        const dateB =
          `${b.exam_date} ${b.start_time}`;

        return dateA.localeCompare(dateB);
      });
  }, [
    exams,
    searchTerm,
    selectedExam,
    selectedClass,
    selectedStatus,
  ]);

  const nextExam = useMemo(() => {
    const today =
      new Date().toISOString().split("T")[0];

    return [...exams]
      .filter((exam) => {
        const status =
          getSessionStatus(exam);

        return (
          status === "Published" &&
          exam.exam_date >= today
        );
      })
      .sort((a, b) => {
        const dateA =
          `${a.exam_date} ${a.start_time}`;

        const dateB =
          `${b.exam_date} ${b.start_time}`;

        return dateA.localeCompare(dateB);
      })[0];
  }, [exams]);

  const openEdit = (exam) => {
    setEditingExam(exam);

    setForm({
      id: exam.id,
      exam_session_id:
        exam.exam_session_id,

      exam_name:
        exam.exam_name,

      class: exam.class,

      section: exam.section,

      subject: exam.subject,

      exam_date:
        exam.exam_date,

      start_time:
        exam.start_time,

      end_time:
        exam.end_time,

      total_marks:
        exam.total_marks,

      passing_marks:
        exam.passing_marks,

      status:
        exam.paper_status || "",
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
    const {
      name,
      value,
    } = event.target;

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
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id: Number(form.id),

            exam_session_id:
              Number(
                form.exam_session_id
              ),

            exam_name:
              form.exam_name,

            class:
              form.class,

            section:
              form.section,

            subject:
              form.subject,

            exam_date:
              form.exam_date,

            start_time:
              form.start_time,

            end_time:
              form.end_time,

            total_marks:
              Number(
                form.total_marks
              ),

            passing_marks:
              Number(
                form.passing_marks
              ),

            status:
              form.status,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        result.status === false
      ) {
        throw new Error(
          result.message ||
            "Failed to update examination"
        );
      }

      setSaveMessage(
        "Examination updated successfully."
      );

      await loadExams();

      setTimeout(() => {
        setEditingExam(null);
        setForm(emptyForm);
        setSaveMessage("");
      }, 700);
    } catch (err) {
      setSaveMessage(
        err.message ||
          "Unable to update examination"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Examination Schedule
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Live examination data from the Admin database
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadExams(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>

        {error && (
          <div className="mt-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
            <p className="text-sm text-gray-500">
              Total Papers
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {totalRecords}
            </h3>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
            <p className="text-sm text-emerald-700">
              Published
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {publishedRecords}
            </h3>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
            <p className="text-sm text-amber-700">
              Draft
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {draftRecords}
            </h3>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              Completed
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {completedRecords}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <div className="relative md:col-span-2 xl:col-span-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search examination, subject, class..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <select
              value={selectedExam}
              onChange={(event) =>
                setSelectedExam(
                  event.target.value
                )
              }
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none"
            >
              <option value="All">
                All Examinations
              </option>

              {examOptions.map(
                (examName) => (
                  <option
                    key={examName}
                    value={examName}
                  >
                    {examName}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedClass}
              onChange={(event) =>
                setSelectedClass(
                  event.target.value
                )
              }
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none"
            >
              <option value="All">
                All Classes
              </option>

              {classOptions.map(
                (className) => (
                  <option
                    key={className}
                    value={className}
                  >
                    {className}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(
                  event.target.value
                )
              }
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none"
            >
              <option value="All">
                All Status
              </option>

              {statusOptions.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <RefreshCw
              size={30}
              className="animate-spin text-gray-500"
            />

            <p className="mt-4 text-gray-500">
              Loading examinations...
            </p>
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-xl bg-gray-50 flex items-center justify-center">
              <FileText
                size={27}
                className="text-gray-400"
              />
            </div>

            <h4 className="font-semibold text-gray-700 mt-4">
              No examination records found
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              Examination records created in Admin will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
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
                      Session
                    </th>

                    <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredExams.map(
                    (exam) => {
                      const sessionStatus =
                        getSessionStatus(
                          exam
                        );

                      return (
                        <tr
                          key={exam.id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                                <BookOpen
                                  size={18}
                                />
                              </div>

                              <div>
                                <p className="font-semibold text-gray-800">
                                  {exam.exam_name ||
                                    "-"}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                  {exam.academic_year
                                    ? `Academic Year: ${exam.academic_year}`
                                    : "Examination session"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="inline-flex px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 font-medium">
                              {exam.class ||
                                "-"}
                              {exam.section
                                ? `-${exam.section}`
                                : ""}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div>
                              <p className="font-medium text-gray-700">
                                {exam.subject ||
                                  "-"}
                              </p>

                              {exam.total_marks !==
                                "" && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Marks:{" "}
                                  {
                                    exam.total_marks
                                  }
                                </p>
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <CalendarDays
                                size={16}
                                className="text-gray-400"
                              />

                              {formatDate(
                                exam.exam_date
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock3
                                size={16}
                                className="text-gray-400"
                              />

                              {formatTime(
                                exam.start_time
                              )}
                              {" - "}
                              {formatTime(
                                exam.end_time
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(
                                sessionStatus
                              )}`}
                            >
                              {sessionStatus}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                openEdit(
                                  exam
                                )
                              }
                              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-50 text-gray-700 border border-gray-200 text-sm font-medium hover:bg-gray-100 transition"
                            >
                              <Edit3
                                size={15}
                              />

                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/60">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {filteredExams.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {totalRecords}
                </span>{" "}
                examination records
              </p>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <p className="text-sm text-gray-500">
            Next Examination
          </p>

          {nextExam ? (
            <>
              <h3 className="text-xl font-bold text-gray-800 mt-2">
                {nextExam.exam_name}
              </h3>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CalendarDays
                    size={15}
                  />

                  {formatDate(
                    nextExam.exam_date
                  )}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3
                    size={15}
                  />

                  {formatTime(
                    nextExam.start_time
                  )}
                </span>

                <span>
                  {nextExam.class}
                  {nextExam.section
                    ? `-${nextExam.section}`
                    : ""}
                </span>
              </div>
            </>
          ) : (
            <h3 className="text-xl font-semibold text-gray-400 mt-2">
              No upcoming published examination
            </h3>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <p className="text-sm text-gray-500">
            Examination Overview
          </p>

          <h3 className="text-xl font-bold text-gray-800 mt-2">
            {publishedRecords}{" "}
            <span className="text-gray-400 font-medium">
              / {totalRecords}
            </span>
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Published papers from the live examination database
          </p>
        </div>
      </div>

      {editingExam && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[94vh] overflow-hidden">
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Edit Examination
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Update the same examination record used by Admin
                </p>
              </div>

              <button
                type="button"
                onClick={closeEdit}
                disabled={saving}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleUpdate}
              className="overflow-y-auto max-h-[calc(94vh-76px)]"
            >
              <div className="p-5 sm:p-6 space-y-5">
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">
                    Examination Session
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {form.exam_name}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subject
                    </label>

                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                    />
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
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
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
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
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
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
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
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
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
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
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
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
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
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition inline-flex items-center justify-center gap-2"
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
                    <ChevronRight
                      size={16}
                    />
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