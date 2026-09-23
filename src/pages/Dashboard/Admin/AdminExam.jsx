import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  Edit3,
  Trash2,
  X,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  Clock3,
  ChevronRight,
  ArrowLeft,
  Send,
  Save,
  FileText,
} from "lucide-react";

// const API_BASE =
//   "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api";

const API_BASE =
  "https://futureacademy.site.je/api";

const emptySessionForm = {
  exam_name: "",
  academic_year: "",
  exam_type: "",
  start_date: "",
  end_date: "",
  description: "",
};

const emptySubjectForm = {
  class: "",
  section: "",
  subject: "",
  exam_date: "",
  start_time: "",
  end_time: "",
  total_marks: "",
  passing_marks: "",
  status: "Scheduled",
};

function AdminExam() {
  const [sessions, setSessions] = useState([]);
  const [classSections, setClassSections] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  const [editingSession, setEditingSession] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);

  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);

  const [sessionForm, setSessionForm] = useState(emptySessionForm);
  const [subjectForm, setSubjectForm] = useState(emptySubjectForm);

  const fetchSessions = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const response = await fetch(
        `${API_BASE}/admin/getExamSessions.php`
      );

      const result = await response.json();

      if (result.status) {
        setSessions(result.data || []);
      } else {
        alert(result.message || "Failed to load examinations");
      }
    } catch (error) {
      console.error("Exam session error:", error);

      if (showLoader) {
        alert("Unable to connect with exam server");
      }
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  const fetchClassSections = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/admin/students.php`
      );

      const result = await response.json();

      if (!result.status) {
        setClassSections([]);
        return;
      }

      const students =
        Array.isArray(result.data)
          ? result.data
          : Array.isArray(result.students)
          ? result.students
          : [];

      const pairs = students
        .map((student) => ({
          class: String(student.class || "").trim(),
          section: String(student.section || "").trim(),
        }))
        .filter(
          (item) =>
            item.class !== "" &&
            item.section !== ""
        );

      const uniquePairs = Array.from(
        new Map(
          pairs.map((item) => [
            `${item.class}__${item.section}`,
            item,
          ])
        ).values()
      );

      uniquePairs.sort((a, b) => {
        const classA = Number(a.class);
        const classB = Number(b.class);

        if (
          !Number.isNaN(classA) &&
          !Number.isNaN(classB) &&
          classA !== classB
        ) {
          return classA - classB;
        }

        return a.class.localeCompare(b.class);
      });

      setClassSections(uniquePairs);
    } catch (error) {
      console.error("Class section error:", error);
      setClassSections([]);
    }
  };

  const fetchSessionDetails = async (
    sessionId,
    showLoader = true
  ) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const response = await fetch(
        `${API_BASE}/admin/getExamSession.php?id=${sessionId}`
      );

      const result = await response.json();

      if (result.status) {
        setSessionDetails(result.data);
      } else {
        alert(result.message || "Failed to load datesheet");
      }
    } catch (error) {
      console.error("Datesheet error:", error);

      if (showLoader) {
        alert("Unable to load datesheet");
      }
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchClassSections();

    const interval = setInterval(() => {
      fetchSessions(false);
      fetchClassSections();

      if (selectedSession?.id) {
        fetchSessionDetails(
          selectedSession.id,
          false
        );
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedSession?.id]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        session.exam_name
          ?.toLowerCase()
          .includes(searchText) ||
        session.academic_year
          ?.toLowerCase()
          .includes(searchText) ||
        session.exam_type
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        session.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [sessions, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: sessions.length,
      draft: sessions.filter(
        (item) => item.status === "Draft"
      ).length,
      published: sessions.filter(
        (item) => item.status === "Published"
      ).length,
      completed: sessions.filter(
        (item) => item.status === "Completed"
      ).length,
    };
  }, [sessions]);

  const availableClasses = useMemo(() => {
    return Array.from(
      new Set(classSections.map((item) => item.class))
    );
  }, [classSections]);

  const availableSections = useMemo(() => {
    if (!subjectForm.class) {
      return [];
    }

    return Array.from(
      new Set(
        classSections
          .filter(
            (item) => item.class === subjectForm.class
          )
          .map((item) => item.section)
      )
    );
  }, [classSections, subjectForm.class]);

  const openCreateSession = () => {
    setEditingSession(null);

    setSessionForm({
      ...emptySessionForm,
      academic_year: getCurrentAcademicYear(),
    });

    setShowSessionModal(true);
  };

  const openEditSession = (session) => {
    setEditingSession(session);

    setSessionForm({
      exam_name: session.exam_name || "",
      academic_year: session.academic_year || "",
      exam_type: session.exam_type || "",
      start_date: session.start_date || "",
      end_date: session.end_date || "",
      description: session.description || "",
    });

    setShowSessionModal(true);
  };

  const saveSession = async (event) => {
    event.preventDefault();

    if (!sessionForm.exam_name.trim()) {
      alert("Please enter examination name");
      return;
    }

    if (!sessionForm.academic_year.trim()) {
      alert("Please enter academic year");
      return;
    }

    if (!sessionForm.exam_type.trim()) {
      alert("Please enter examination type");
      return;
    }

    if (
      sessionForm.start_date &&
      sessionForm.end_date &&
      sessionForm.end_date <
        sessionForm.start_date
    ) {
      alert("End date cannot be before start date");
      return;
    }

    try {
      setSaving(true);

      const endpoint = editingSession
        ? "admin/updateExamSession.php"
        : "admin/createExamSession.php";

      const payload = editingSession
        ? {
            id: editingSession.id,
            ...sessionForm,
          }
        : sessionForm;

      const response = await fetch(
        `${API_BASE}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!result.status) {
        alert(result.message || "Operation failed");
        return;
      }

      setShowSessionModal(false);
      setEditingSession(null);
      setSessionForm(emptySessionForm);

      await fetchSessions(false);

      if (result.id) {
        const newSession = {
          id: result.id,
        };

        setSelectedSession(newSession);
        await fetchSessionDetails(
          result.id,
          false
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Save session error:", error);
      alert("Unable to save examination");
    } finally {
      setSaving(false);
    }
  };

  const deleteSession = async (session) => {
    const confirmed = window.confirm(
      `Delete "${session.exam_name}"?\n\nAll subject schedules inside this examination will also be deleted.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/admin/deleteExamSession.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: session.id,
          }),
        }
      );

      const result = await response.json();

      if (!result.status) {
        alert(result.message || "Delete failed");
        return;
      }

      if (selectedSession?.id === session.id) {
        setSelectedSession(null);
        setSessionDetails(null);
      }

      await fetchSessions(false);

      alert(result.message);
    } catch (error) {
      console.error("Delete session error:", error);
      alert("Unable to delete examination");
    }
  };

  const openSession = async (session) => {
    setSelectedSession(session);
    await fetchSessionDetails(session.id);
  };

  const closeSession = () => {
    setSelectedSession(null);
    setSessionDetails(null);
    fetchSessions(false);
  };

  const openAddSubject = () => {
    setEditingSubject(null);

    setSubjectForm({
      ...emptySubjectForm,
    });

    setShowSubjectModal(true);
  };

  const openEditSubject = (subject) => {
    setEditingSubject(subject);

    setSubjectForm({
      class: subject.class || "",
      section: subject.section || "",
      subject: subject.subject || "",
      exam_date: subject.exam_date || "",
      start_time: subject.start_time || "",
      end_time: subject.end_time || "",
      total_marks:
        subject.total_marks ?? "",
      passing_marks:
        subject.passing_marks ?? "",
      status:
        subject.status || "Scheduled",
    });

    setShowSubjectModal(true);
  };

  const handleClassChange = (value) => {
    const validSection = classSections.some(
      (item) =>
        item.class === value &&
        item.section === subjectForm.section
    );

    setSubjectForm((prev) => ({
      ...prev,
      class: value,
      section: validSection
        ? prev.section
        : "",
    }));
  };

  const saveSubject = async (event) => {
    event.preventDefault();

    if (!selectedSession?.id) {
      alert("Exam session not selected");
      return;
    }

    if (!subjectForm.class) {
      alert("Please select class");
      return;
    }

    if (!subjectForm.section) {
      alert("Please select section");
      return;
    }

    if (!subjectForm.subject.trim()) {
      alert("Please enter subject");
      return;
    }

    if (!subjectForm.exam_date) {
      alert("Please select exam date");
      return;
    }

    if (
      !subjectForm.start_time ||
      !subjectForm.end_time
    ) {
      alert("Please select exam time");
      return;
    }

    if (
      subjectForm.end_time <=
      subjectForm.start_time
    ) {
      alert("End time must be after start time");
      return;
    }

    const totalMarks = Number(
      subjectForm.total_marks
    );

    const passingMarks = Number(
      subjectForm.passing_marks
    );

    if (
      Number.isNaN(totalMarks) ||
      Number.isNaN(passingMarks)
    ) {
      alert("Please enter valid marks");
      return;
    }

    if (totalMarks < 0 || passingMarks < 0) {
      alert("Marks cannot be negative");
      return;
    }

    if (passingMarks > totalMarks) {
      alert(
        "Passing marks cannot be greater than total marks"
      );
      return;
    }

    if (
      sessionDetails?.session?.start_date &&
      subjectForm.exam_date <
        sessionDetails.session.start_date
    ) {
      alert(
        "Subject exam date cannot be before examination start date"
      );
      return;
    }

    if (
      sessionDetails?.session?.end_date &&
      subjectForm.exam_date >
        sessionDetails.session.end_date
    ) {
      alert(
        "Subject exam date cannot be after examination end date"
      );
      return;
    }

    try {
      setSaving(true);

      const endpoint = editingSubject
        ? "admin/updateExam.php"
        : "admin/addExam.php";

      const payload = {
        ...(editingSubject
          ? { id: editingSubject.id }
          : {}),
        exam_session_id: selectedSession.id,
        exam_name:
          sessionDetails?.session?.exam_name || "",
        class: subjectForm.class,
        section: subjectForm.section,
        subject: subjectForm.subject.trim(),
        exam_date: subjectForm.exam_date,
        start_time: subjectForm.start_time,
        end_time: subjectForm.end_time,
        total_marks: totalMarks,
        passing_marks: passingMarks,
        status: subjectForm.status,
      };

      const response = await fetch(
        `${API_BASE}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!result.status) {
        alert(result.message || "Failed to save subject");
        return;
      }

      setShowSubjectModal(false);
      setEditingSubject(null);
      setSubjectForm(emptySubjectForm);

      await fetchSessionDetails(
        selectedSession.id,
        false
      );

      await fetchSessions(false);

      alert(result.message);
    } catch (error) {
      console.error("Save subject error:", error);
      alert("Unable to save subject schedule");
    } finally {
      setSaving(false);
    }
  };

  const deleteSubject = async (subject) => {
    const confirmed = window.confirm(
      `Delete ${subject.subject} schedule for Class ${subject.class}-${subject.section}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/admin/deleteExam.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: subject.id,
          }),
        }
      );

      const result = await response.json();

      if (!result.status) {
        alert(result.message || "Delete failed");
        return;
      }

      await fetchSessionDetails(
        selectedSession.id,
        false
      );

      await fetchSessions(false);

      alert(result.message);
    } catch (error) {
      console.error("Delete subject error:", error);
      alert("Unable to delete subject schedule");
    }
  };

  const publishSession = async () => {
    if (!selectedSession?.id) {
      return;
    }

    const subjects = sessionDetails?.subjects || [];

    if (subjects.length === 0) {
      alert(
        "Add at least one subject before publishing"
      );
      return;
    }

    const confirmed = window.confirm(
      "Publish this examination datesheet?\n\nAfter publishing, the datesheet can be shown to other school roles."
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_BASE}/admin/publishExamSession.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: selectedSession.id,
          }),
        }
      );

      const result = await response.json();

      if (!result.status) {
        alert(
          result.message || "Publishing failed"
        );
        return;
      }

      await fetchSessionDetails(
        selectedSession.id,
        false
      );

      await fetchSessions(false);

      alert(result.message);
    } catch (error) {
      console.error("Publish error:", error);
      alert("Unable to publish datesheet");
    } finally {
      setSaving(false);
    }
  };

  if (selectedSession && sessionDetails) {
    const session = sessionDetails.session;
    const subjects = sessionDetails.subjects || [];

    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <button
                onClick={closeSession}
                className="mt-1 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100"
              >
                <ArrowLeft size={19} />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-800">
                    {session.exam_name}
                  </h1>

                  <StatusBadge status={session.status} />
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {session.exam_type} ·{" "}
                  {session.academic_year}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  fetchSessionDetails(
                    selectedSession.id
                  )
                }
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <RefreshCw size={16} />
                Refresh
              </button>

              <button
                onClick={openAddSubject}
                disabled={
                  session.status === "Completed" ||
                  session.status === "Cancelled"
                }
                className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Plus size={17} />
                Add Subject
              </button>

              {session.status === "Draft" && (
                <button
                  onClick={publishSession}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Send size={16} />
                  Publish
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={<BookOpen size={19} />}
              label="Subjects"
              value={subjects.length}
            />

            <InfoCard
              icon={<CalendarDays size={19} />}
              label="Start Date"
              value={formatDate(session.start_date)}
            />

            <InfoCard
              icon={<CalendarDays size={19} />}
              label="End Date"
              value={formatDate(session.end_date)}
            />

            <InfoCard
              icon={<CheckCircle2 size={19} />}
              label="Status"
              value={session.status}
            />
          </div>

          {session.description && (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText
                  size={18}
                  className="text-emerald-600"
                />

                <h2 className="font-semibold text-slate-800">
                  Examination Details
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {session.description}
              </p>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">
                  Examination Datesheet
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage subject-wise examination schedule.
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                {subjects.length}{" "}
                {subjects.length === 1
                  ? "Subject"
                  : "Subjects"}
              </div>
            </div>

            {subjects.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <BookOpen
                    size={25}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-slate-700">
                  No subjects added yet
                </h3>

                <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                  Add subjects, classes, dates and timings
                  to build this examination datesheet.
                </p>

                <button
                  onClick={openAddSubject}
                  disabled={
                    session.status === "Completed" ||
                    session.status === "Cancelled"
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-900 disabled:bg-slate-300"
                >
                  <Plus size={16} />
                  Add First Subject
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Subject
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Class
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Date
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Time
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Marks
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {subjects.map((subject) => (
                      <tr
                        key={subject.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                              <BookOpen size={17} />
                            </div>

                            <span className="font-semibold text-slate-800">
                              {subject.subject}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-sm font-medium text-slate-700">
                            {subject.class} -{" "}
                            {subject.section}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(
                            subject.exam_date
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatTime(
                            subject.start_time
                          )}{" "}
                          -{" "}
                          {formatTime(
                            subject.end_time
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-sm text-slate-600">
                            {subject.total_marks}{" "}
                            <span className="text-slate-400">
                              /
                            </span>{" "}
                            {subject.passing_marks}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={subject.status}
                          />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                openEditSubject(
                                  subject
                                )
                              }
                              disabled={
                                session.status ===
                                  "Completed" ||
                                session.status ===
                                  "Cancelled"
                              }
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:text-slate-300"
                              title="Edit"
                            >
                              <Edit3 size={16} />
                            </button>

                            <button
                              onClick={() =>
                                deleteSubject(
                                  subject
                                )
                              }
                              disabled={
                                session.status ===
                                  "Published" ||
                                session.status ===
                                  "Completed" ||
                                session.status ===
                                  "Cancelled"
                              }
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {showSubjectModal && (
          <Modal
            title={
              editingSubject
                ? "Edit Subject Schedule"
                : "Add Subject Schedule"
            }
            subtitle="Add the class-wise paper details for this examination."
            onClose={() => {
              setShowSubjectModal(false);
              setEditingSubject(null);
            }}
          >
            <form
              onSubmit={saveSubject}
              className="space-y-6"
            >
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-white p-2 text-emerald-600 shadow-sm">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Examination
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {session.exam_name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {session.exam_type} ·{" "}
                      {session.academic_year}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Class & Subject
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <SelectField
                    label="Class"
                    value={subjectForm.class}
                    onChange={handleClassChange}
                    options={availableClasses}
                    placeholder={
                      availableClasses.length === 0
                        ? "No classes available"
                        : "Select class"
                    }
                  />

                  <SelectField
                    label="Section"
                    value={subjectForm.section}
                    onChange={(value) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        section: value,
                      }))
                    }
                    options={availableSections}
                    placeholder={
                      !subjectForm.class
                        ? "Select class first"
                        : availableSections.length === 0
                        ? "No section available"
                        : "Select section"
                    }
                  />

                  <div className="md:col-span-2">
                    <InputField
                      label="Subject"
                      value={subjectForm.subject}
                      onChange={(value) =>
                        setSubjectForm((prev) => ({
                          ...prev,
                          subject: value,
                        }))
                      }
                      placeholder="e.g. Mathematics"
                      required
                    />
                  </div>
                </div>

                {classSections.length === 0 && (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                    No class-section data found in active
                    students. Add students from Admin →
                    Students first.
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-5">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Examination Schedule
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="Exam Date"
                    type="date"
                    value={subjectForm.exam_date}
                    min={
                      session.start_date || undefined
                    }
                    max={
                      session.end_date || undefined
                    }
                    onChange={(value) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        exam_date: value,
                      }))
                    }
                    required
                  />

                  <SelectField
                    label="Schedule Status"
                    value={subjectForm.status}
                    onChange={(value) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        status: value,
                      }))
                    }
                    options={[
                      "Scheduled",
                      "Completed",
                      "Cancelled",
                    ]}
                    placeholder="Select status"
                  />

                  <InputField
                    label="Start Time"
                    type="time"
                    value={subjectForm.start_time}
                    onChange={(value) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        start_time: value,
                      }))
                    }
                    required
                  />

                  <InputField
                    label="End Time"
                    type="time"
                    value={subjectForm.end_time}
                    onChange={(value) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        end_time: value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Marks
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="Total Marks"
                    type="number"
                    min="0"
                    value={subjectForm.total_marks}
                    onChange={(value) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        total_marks: value,
                      }))
                    }
                    placeholder="100"
                    required
                  />

                  <InputField
                    label="Passing Marks"
                    type="number"
                    min="0"
                    value={subjectForm.passing_marks}
                    onChange={(value) =>
                      setSubjectForm((prev) => ({
                        ...prev,
                        passing_marks: value,
                      }))
                    }
                    placeholder="33"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setShowSubjectModal(false)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Save size={16} />

                  {saving
                    ? "Saving..."
                    : editingSubject
                    ? "Update Schedule"
                    : "Save Schedule"}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Examinations
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create and manage examination sessions and
              datesheets.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                fetchSessions();
                fetchClassSections();
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              onClick={openCreateSession}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              <Plus size={17} />
              Create Examination
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<CalendarDays size={20} />}
            label="Total Examinations"
            value={stats.total}
          />

          <StatCard
            icon={<Clock3 size={20} />}
            label="Draft"
            value={stats.draft}
          />

          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Published"
            value={stats.published}
          />

          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Completed"
            value={stats.completed}
          />
        </div>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search examination..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Published">
                Published
              </option>
              <option value="Completed">
                Completed
              </option>
              <option value="Cancelled">
                Cancelled
              </option>
            </select>

            {(search || statusFilter !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading && sessions.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              Loading examinations...
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <CalendarDays
                  size={25}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-4 font-semibold text-slate-700">
                No examinations found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Create an examination session to start
                building a datesheet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Examination
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Academic Year
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date Range
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Subjects
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSessions.map((session) => (
                    <tr
                      key={session.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {session.exam_name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {session.exam_type}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {session.academic_year}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDate(
                          session.start_date
                        )}
                        <span className="mx-1 text-slate-300">
                          →
                        </span>
                        {formatDate(
                          session.end_date
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          <BookOpen size={13} />
                          {session.subject_count}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={session.status}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              openSession(session)
                            }
                            className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            Manage
                            <ChevronRight size={14} />
                          </button>

                          <button
                            onClick={() =>
                              openEditSession(
                                session
                              )
                            }
                            disabled={
                              session.status ===
                                "Completed" ||
                              session.status ===
                                "Cancelled"
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:text-slate-300"
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            onClick={() =>
                              deleteSession(
                                session
                              )
                            }
                            disabled={
                              session.status ===
                                "Published" ||
                              session.status ===
                                "Completed" ||
                              session.status ===
                                "Cancelled"
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showSessionModal && (
        <Modal
          title={
            editingSession
              ? "Edit Examination"
              : "Create Examination"
          }
          subtitle="Create one examination session and add subject schedules inside it."
          onClose={() => {
            setShowSessionModal(false);
            setEditingSession(null);
          }}
        >
          <form
            onSubmit={saveSession}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputField
                label="Examination Name"
                value={sessionForm.exam_name}
                onChange={(value) =>
                  setSessionForm((prev) => ({
                    ...prev,
                    exam_name: value,
                  }))
                }
                placeholder="Half Yearly Examination"
                required
              />

              <InputField
                label="Academic Year"
                value={sessionForm.academic_year}
                onChange={(value) =>
                  setSessionForm((prev) => ({
                    ...prev,
                    academic_year: value,
                  }))
                }
                placeholder="2026-27"
                required
              />

              <InputField
                label="Exam Type"
                value={sessionForm.exam_type}
                onChange={(value) =>
                  setSessionForm((prev) => ({
                    ...prev,
                    exam_type: value,
                  }))
                }
                placeholder="Half Yearly"
                required
              />

              <div />

              <InputField
                label="Start Date"
                type="date"
                value={sessionForm.start_date}
                onChange={(value) =>
                  setSessionForm((prev) => ({
                    ...prev,
                    start_date: value,
                  }))
                }
              />

              <InputField
                label="End Date"
                type="date"
                value={sessionForm.end_date}
                onChange={(value) =>
                  setSessionForm((prev) => ({
                    ...prev,
                    end_date: value,
                  }))
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                value={sessionForm.description}
                onChange={(event) =>
                  setSessionForm((prev) => ({
                    ...prev,
                    description:
                      event.target.value,
                  }))
                }
                rows={4}
                placeholder="Optional examination instructions or notes..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowSessionModal(false)
                }
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Save size={16} />

                {saving
                  ? "Saving..."
                  : editingSession
                  ? "Update Examination"
                  : "Create Examination"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
          {icon}
        </div>

        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-3 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Draft: "bg-amber-50 text-amber-700 border-amber-100",
    Published:
      "bg-emerald-50 text-emerald-700 border-emerald-100",
    Completed:
      "bg-slate-100 text-slate-700 border-slate-200",
    Cancelled:
      "bg-red-50 text-red-700 border-red-100",
    Scheduled:
      "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "border-slate-200 bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  max,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        min={min}
        max={max}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Modal({
  title,
  subtitle,
  onClose,
  children,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {title}
              </h2>

              {subtitle && (
                <p className="mt-1 text-sm text-slate-500">
                  {subtitle}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  const parts = date.split("-");

  if (parts.length !== 3) {
    return date;
  }

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function formatTime(time) {
  if (!time) {
    return "-";
  }

  const [hours, minutes] = time.split(":");

  if (!hours || !minutes) {
    return time;
  }

  const hour = Number(hours);
  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour =
    hour % 12 || 12;

  return `${formattedHour}:${minutes} ${suffix}`;
}

function getCurrentAcademicYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  if (month >= 4) {
    return `${year}-${String(year + 1).slice(-2)}`;
  }

  return `${year - 1}-${String(year).slice(-2)}`;
}

export default AdminExam;