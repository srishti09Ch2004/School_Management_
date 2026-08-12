import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  GraduationCap,
  IndianRupee,
  ClipboardCheck,
  CalendarCheck,
  UserPlus,
  RefreshCw,
  Clock,
  Bell,
  AlertCircle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const API = "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin";

const getArrayFromResponse = (result) => {
  if (!result) return [];
  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.data?.students)) return result.data.students;
  if (Array.isArray(result.data?.teachers)) return result.data.teachers;
  if (Array.isArray(result.data?.fees)) return result.data.fees;
  if (Array.isArray(result.data?.exams)) return result.data.exams;
  if (Array.isArray(result.data?.attendance)) return result.data.attendance;
  if (Array.isArray(result.students)) return result.students;
  if (Array.isArray(result.teachers)) return result.teachers;
  if (Array.isArray(result.fees)) return result.fees;
  if (Array.isArray(result.exams)) return result.exams;
  if (Array.isArray(result.attendance)) return result.attendance;
  return [];
};

const getTodayString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString("en-IN") : "0";
};

const formatCurrency = (value) => {
  const number = Number(value);
  return Number.isFinite(number)
    ? `₹${number.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
    : "₹0";
};

const normalizeStudent = (student) => ({
  id: student?.id ?? student?.student_id ?? "",
  name:
    student?.full_name ||
    student?.name ||
    student?.student_name ||
    "Unknown Student",
  className: student?.class || student?.class_name || "-",
  section: student?.section || "",
  admissionNo:
    student?.admission_no ||
    student?.admission_number ||
    student?.admission ||
    student?.id ||
    "-",
  status: student?.status || "Active",
  admissionDate:
    student?.admission_date ||
    student?.admissionDate ||
    student?.created_at ||
    student?.createdAt ||
    "",
});

const normalizeExam = (exam) => ({
  id: exam?.id || "",
  name: exam?.exam_name || exam?.name || exam?.title || "Exam",
  date: exam?.exam_date || exam?.date || exam?.start_date || "",
  className: exam?.class || exam?.class_name || "",
  status: exam?.status || "",
});

const normalizeAttendance = (item) => ({
  id: item?.id || "",
  studentId: item?.student_id || item?.studentId || "",
  date: item?.attendance_date || item?.date || "",
  status: item?.status || "",
  type: item?.attendance_type || item?.type || "",
});

const StatCard = ({ title, value, icon: Icon, iconBg, iconColor }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <h3 className="mt-1.5 text-xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon size={19} className={iconColor} />
      </div>
    </div>
  </div>
);

export default function AdminHome() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [fees, setFees] = useState([]);
  const [exams, setExams] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  useEffect(() => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser) setUser(loggedUser);
    } catch (error) {
      console.error("User data error:", error);
    }
  }, []);

  const fetchAPI = async (endpoint) => {
    const response = await fetch(`${API}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`${endpoint} returned ${response.status}`);
    }

    const result = await response.json();

    if (result?.status === false) {
      throw new Error(result?.message || `${endpoint} failed`);
    }

    return result;
  };

  const loadDashboard = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setRefreshing(true);

      const results = await Promise.allSettled([
        fetchAPI("students.php"),
        fetchAPI("teachers.php"),
        fetchAPI("fees.php"),
        fetchAPI("exams.php"),
        fetchAPI("attendance.php"),
      ]);

      const errors = {};

      if (results[0].status === "fulfilled") {
        setStudents(getArrayFromResponse(results[0].value));
      } else {
        console.error("Students API:", results[0].reason);
        errors.students = true;
        setStudents([]);
      }

      if (results[1].status === "fulfilled") {
        setTeachers(getArrayFromResponse(results[1].value));
      } else {
        console.error("Teachers API:", results[1].reason);
        errors.teachers = true;
        setTeachers([]);
      }

      if (results[2].status === "fulfilled") {
        setFees(getArrayFromResponse(results[2].value));
      } else {
        console.error("Fees API:", results[2].reason);
        errors.fees = true;
        setFees([]);
      }

      if (results[3].status === "fulfilled") {
        setExams(getArrayFromResponse(results[3].value));
      } else {
        console.error("Exams API:", results[3].reason);
        errors.exams = true;
        setExams([]);
      }

      if (results[4].status === "fulfilled") {
        setAttendance(getArrayFromResponse(results[4].value));
      } else {
        console.error("Attendance API:", results[4].reason);
        errors.attendance = true;
        setAttendance([]);
      }

      setApiErrors(errors);
    } catch (error) {
      console.error("Dashboard loading error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard(true);
  }, [loadDashboard]);

  useEffect(() => {
    const interval = setInterval(() => loadDashboard(false), 10000);
    return () => clearInterval(interval);
  }, [loadDashboard]);

  const normalizedStudents = useMemo(
    () => students.map(normalizeStudent),
    [students]
  );

  const normalizedExams = useMemo(
    () => exams.map(normalizeExam),
    [exams]
  );

  const normalizedAttendance = useMemo(
    () => attendance.map(normalizeAttendance),
    [attendance]
  );

  const totalStudents = normalizedStudents.length;

  const activeStudents = useMemo(
    () =>
      normalizedStudents.filter((student) => {
        const status = String(student.status).toLowerCase();
        return (
          status === "active" ||
          status === "approved" ||
          status === "present" ||
          status === ""
        );
      }).length,
    [normalizedStudents]
  );

  const totalTeachers = teachers.length;

  const totalFeesCollected = useMemo(
    () =>
      fees.reduce((total, fee) => {
        const paid = Number(fee?.paid_fee ?? 0);
        return total + (Number.isFinite(paid) ? paid : 0);
      }, 0),
    [fees]
  );

  const totalExams = normalizedExams.length;

  const todayAttendance = useMemo(() => {
    const today = getTodayString();
    const todayRecords = normalizedAttendance.filter(
      (item) => item.date && String(item.date).slice(0, 10) === today
    );

    if (!todayRecords.length) {
      return { percentage: null, present: 0, absent: 0, leave: 0, total: 0 };
    }

    let present = 0;
    let absent = 0;
    let leave = 0;

    todayRecords.forEach((item) => {
      const status = String(item.status).toLowerCase();
      if (status === "present") present++;
      else if (status === "absent") absent++;
      else if (status === "leave") leave++;
    });

    return {
      percentage: Math.round((present / todayRecords.length) * 100),
      present,
      absent,
      leave,
      total: todayRecords.length,
    };
  }, [normalizedAttendance]);

  const todayAdmissions = useMemo(() => {
    const today = getTodayString();

    return normalizedStudents.filter(
      (student) =>
        student.admissionDate &&
        String(student.admissionDate).slice(0, 10) === today
    ).length;
  }, [normalizedStudents]);

  const upcomingExams = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return normalizedExams
      .filter((exam) => {
        if (!exam.date) return true;

        const examDate = new Date(exam.date);
        if (Number.isNaN(examDate.getTime())) return true;

        examDate.setHours(0, 0, 0, 0);
        return examDate >= today;
      })
      .sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      });
  }, [normalizedExams]);

  const recentAdmissions = useMemo(
    () =>
      [...normalizedStudents]
        .sort((a, b) => {
          if (!a.admissionDate) return 1;
          if (!b.admissionDate) return -1;
          return new Date(b.admissionDate) - new Date(a.admissionDate);
        })
        .slice(0, 5),
    [normalizedStudents]
  );

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
          <p className="mt-3 text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
              Admin Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold text-gray-800">
              Welcome Back
              {user?.full_name ? `, ${user.full_name}` : ""}
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Here's what's happening in your school today.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadDashboard(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Students"
          value={formatNumber(totalStudents)}
          icon={Users}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
        <StatCard
          title="Active Students"
          value={formatNumber(activeStudents)}
          icon={UserPlus}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Teachers"
          value={formatNumber(totalTeachers)}
          icon={GraduationCap}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Fees Collected"
          value={formatCurrency(totalFeesCollected)}
          icon={IndianRupee}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Total Exams"
          value={formatNumber(totalExams)}
          icon={ClipboardCheck}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Today's Attendance"
          value={
            todayAttendance.percentage !== null
              ? `${todayAttendance.percentage}%`
              : "—"
          }
          icon={CalendarCheck}
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Today's Attendance
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Attendance recorded today
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
              <CalendarCheck size={19} className="text-teal-600" />
            </div>
          </div>

          {todayAttendance.total === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-7 text-center">
              <CalendarCheck size={27} className="mx-auto text-gray-300" />
              <p className="mt-2.5 text-sm font-medium text-gray-700">
                No attendance recorded today
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Attendance will appear here once records are added.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-teal-50 p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      Overall Attendance
                    </p>
                    <p className="mt-0.5 text-2xl font-bold text-teal-700">
                      {todayAttendance.percentage}%
                    </p>
                  </div>
                  <CheckCircle2 size={29} className="text-teal-600" />
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-teal-500 transition-all"
                    style={{
                      width: `${Math.min(
                        todayAttendance.percentage || 0,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-xl bg-green-50 p-3">
                  <p className="text-[11px] text-gray-500">Present</p>
                  <p className="mt-0.5 text-lg font-bold text-green-700">
                    {todayAttendance.present}
                  </p>
                </div>
                <div className="rounded-xl bg-red-50 p-3">
                  <p className="text-[11px] text-gray-500">Absent</p>
                  <p className="mt-0.5 text-lg font-bold text-red-600">
                    {todayAttendance.absent}
                  </p>
                </div>
                <div className="rounded-xl bg-yellow-50 p-3">
                  <p className="text-[11px] text-gray-500">Leave</p>
                  <p className="mt-0.5 text-lg font-bold text-yellow-700">
                    {todayAttendance.leave}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Today's Summary
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Live school activity
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
              <Clock size={19} className="text-orange-600" />
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            <div className="flex items-center justify-between rounded-xl bg-orange-50 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <UserPlus size={17} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Today's Admissions
                  </p>
                  <p className="text-[11px] text-gray-500">New students</p>
                </div>
              </div>
              <span className="text-lg font-bold text-orange-600">
                {todayAdmissions}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-purple-50 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <ClipboardCheck size={17} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Upcoming Exams
                  </p>
                  <p className="text-[11px] text-gray-500">Scheduled exams</p>
                </div>
              </div>
              <span className="text-lg font-bold text-purple-600">
                {upcomingExams.length}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-green-50 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <IndianRupee size={17} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Fees Collected
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Total paid amount
                  </p>
                </div>
              </div>
              <span className="text-base font-bold text-green-600">
                {formatCurrency(totalFeesCollected)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Recent Admissions
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Latest students available in the database
            </p>
          </div>
          <div className="w-fit rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
            {totalStudents} Students
          </div>
        </div>

        {recentAdmissions.length === 0 ? (
          <div className="py-10 text-center">
            <Users size={29} className="mx-auto text-gray-300" />
            <p className="mt-2 text-sm font-medium text-gray-600">
              No students found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Student
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Class
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Admission No
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Admission Date
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentAdmissions.map((student, index) => (
                  <tr
                    key={student.id || index}
                    className="border-t border-gray-100 transition hover:bg-gray-50/70"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-sm font-semibold text-green-600">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {student.name}
                          </p>
                          <p className="text-[11px] text-gray-400">Student</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-sm text-gray-700">
                      {student.className}
                      {student.section ? ` - ${student.section}` : ""}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-gray-700">
                      {student.admissionNo}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-gray-500">
                      {formatDate(student.admissionDate)}
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          String(student.status).toLowerCase() === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-800">Upcoming Exams</h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Exams currently available in the database
          </p>
        </div>

        {upcomingExams.length === 0 ? (
          <div className="py-10 text-center">
            <BookOpen size={29} className="mx-auto text-gray-300" />
            <p className="mt-2 text-sm font-medium text-gray-600">
              No upcoming exams
            </p>
          </div>
        ) : (
          <div className="grid gap-3.5 p-4 md:grid-cols-2 xl:grid-cols-3">
            {upcomingExams.slice(0, 6).map((exam, index) => (
              <div
                key={exam.id || index}
                className="rounded-xl border border-gray-100 p-4 transition hover:border-purple-200 hover:bg-purple-50/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-800">
                      {exam.name}
                    </p>
                    {exam.className && (
                      <p className="mt-0.5 text-xs text-gray-500">
                        Class {exam.className}
                      </p>
                    )}
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                    <ClipboardCheck size={17} className="text-purple-600" />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={14} />
                  {exam.date ? formatDate(exam.date) : "Date not available"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
              <CheckCircle2 size={19} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-green-800">
                Dashboard Updated
              </h3>
              <p className="mt-0.5 text-xs leading-5 text-green-700">
                Dashboard automatically refreshes with the latest school
                records.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
              <Bell size={19} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-800">
                Live School Overview
              </h3>
              <p className="mt-0.5 text-xs leading-5 text-blue-700">
                Students, teachers, fees, exams and attendance are read from
                your database.
              </p>
            </div>
          </div>
        </div>
      </div>

      {Object.keys(apiErrors).length > 0 && (
        <div className="hidden">
          <AlertCircle size={18} />
        </div>
      )}
    </div>
  );
}