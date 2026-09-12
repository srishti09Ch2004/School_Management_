import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Users,
  GraduationCap,
  IndianRupee,
  CalendarCheck,
  FileBarChart,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  BookOpen,
  School,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// =====================================================
// API
// =====================================================

const API =
  "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin";

// =====================================================
// HELPERS
// =====================================================

const getArrayFromResponse = (result) => {
  if (!result) return [];

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result.data)) {
    return result.data;
  }

  if (Array.isArray(result.data?.students)) {
    return result.data.students;
  }

  if (Array.isArray(result.data?.teachers)) {
    return result.data.teachers;
  }

  if (Array.isArray(result.data?.fees)) {
    return result.data.fees;
  }

  if (Array.isArray(result.data?.attendance)) {
    return result.data.attendance;
  }

  if (Array.isArray(result.data?.exams)) {
    return result.data.exams;
  }

  if (Array.isArray(result.students)) {
    return result.students;
  }

  if (Array.isArray(result.teachers)) {
    return result.teachers;
  }

  if (Array.isArray(result.fees)) {
    return result.fees;
  }

  if (Array.isArray(result.attendance)) {
    return result.attendance;
  }

  if (Array.isArray(result.exams)) {
    return result.exams;
  }

  return [];
};

const fetchAPI = async (endpoint) => {
  const response = await fetch(`${API}/${endpoint}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `${endpoint} returned HTTP ${response.status}`
    );
  }

  const result = await response.json();

  if (result?.status === false) {
    throw new Error(
      result?.message ||
        `${endpoint} returned an error`
    );
  }

  return result;
};

const formatNumber = (value) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString("en-IN")
    : "0";
};

const formatCurrency = (value) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? `₹${number.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })}`
    : "₹0";
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getDateValue = (item, fields) => {
  for (const field of fields) {
    if (item?.[field]) {
      return item[field];
    }
  }

  return "";
};

const getMonthKey = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
};

const getMonthLabel = (monthKey) => {
  if (!monthKey) return "-";

  const [year, month] = monthKey.split("-");

  const date = new Date(
    Number(year),
    Number(month) - 1,
    1
  );

  return date.toLocaleDateString("en-IN", {
    month: "short",
    year: "2-digit",
  });
};

const getLastMonths = (count = 6) => {
  const months = [];

  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    months.push({
      key,
      label: getMonthLabel(key),
    });
  }

  return months;
};

// =====================================================
// STAT CARD
// =====================================================

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-800">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-1.5 text-[11px] text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon
            size={20}
            className={iconColor}
          />
        </div>
      </div>
    </div>
  );
};

// =====================================================
// SECTION TITLE
// =====================================================

const SectionTitle = ({
  title,
  description,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
};

// =====================================================
// MAIN
// =====================================================

export default function PrincipalReports() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [exams, setExams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [apiErrors, setApiErrors] = useState({});

  const loadReports = useCallback(
    async (showRefresh = false) => {
      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setApiErrors({});

        const results =
          await Promise.allSettled([
            fetchAPI("students.php"),
            fetchAPI("teachers.php"),
            fetchAPI("fees.php"),
            fetchAPI("attendance-report.php"),
            fetchAPI("exams.php"),
          ]);

        const [
          studentsResult,
          teachersResult,
          feesResult,
          attendanceResult,
          examsResult,
        ] = results;

        const errors = {};

        // -----------------------------
        // STUDENTS
        // -----------------------------

        if (
          studentsResult.status ===
          "fulfilled"
        ) {
          setStudents(
            getArrayFromResponse(
              studentsResult.value
            )
          );
        } else {
          setStudents([]);

          errors.students =
            studentsResult.reason;
        }

        // -----------------------------
        // TEACHERS
        // -----------------------------

        if (
          teachersResult.status ===
          "fulfilled"
        ) {
          setTeachers(
            getArrayFromResponse(
              teachersResult.value
            )
          );
        } else {
          setTeachers([]);

          errors.teachers =
            teachersResult.reason;
        }

        // -----------------------------
        // FEES
        // -----------------------------

        if (
          feesResult.status ===
          "fulfilled"
        ) {
          setFees(
            getArrayFromResponse(
              feesResult.value
            )
          );
        } else {
          setFees([]);

          errors.fees =
            feesResult.reason;
        }

        // -----------------------------
        // ATTENDANCE
        // -----------------------------

        if (
          attendanceResult.status ===
          "fulfilled"
        ) {
          setAttendance(
            getArrayFromResponse(
              attendanceResult.value
            )
          );
        } else {
          setAttendance([]);

          errors.attendance =
            attendanceResult.reason;
        }

        // -----------------------------
        // EXAMS
        // -----------------------------

        if (
          examsResult.status ===
          "fulfilled"
        ) {
          setExams(
            getArrayFromResponse(
              examsResult.value
            )
          );
        } else {
          setExams([]);

          errors.exams =
            examsResult.reason;
        }

        setApiErrors(errors);
      } catch (error) {
        console.error(
          "Principal Reports Error:",
          error
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  // =====================================================
  // INITIAL + AUTO REFRESH
  // =====================================================

  useEffect(() => {
    loadReports();

    const interval =
      window.setInterval(() => {
        if (!document.hidden) {
          loadReports(true);
        }
      }, 10000);

    const handleFocus = () => {
      loadReports(true);
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        loadReports(true);
      }
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      window.clearInterval(interval);

      window.removeEventListener(
        "focus",
        handleFocus
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [loadReports]);

  // =====================================================
  // BASIC LIVE STATS
  // =====================================================

  const totalStudents =
    students.length;

  const activeStudents =
    useMemo(() => {
      return students.filter(
        (student) =>
          String(
            student?.status || ""
          ).toLowerCase() ===
          "active"
      ).length;
    }, [students]);

  const totalTeachers =
    teachers.length;

  const totalExams =
    exams.length;

  // =====================================================
  // FEES
  // =====================================================

  const feeSummary =
    useMemo(() => {
      let totalFee = 0;
      let paidFee = 0;
      let dueFee = 0;

      fees.forEach((fee) => {
        totalFee += Number(
          fee?.total_fee || 0
        );

        paidFee += Number(
          fee?.paid_fee || 0
        );

        dueFee += Number(
          fee?.due_fee ||
            fee?.pending_fee ||
            0
        );
      });

      const collectionPercentage =
        totalFee > 0
          ? Math.round(
              (paidFee / totalFee) *
                100
            )
          : 0;

      return {
        totalFee,
        paidFee,
        dueFee,
        collectionPercentage,
      };
    }, [fees]);

  // =====================================================
  // ATTENDANCE
  // =====================================================

  const attendanceSummary =
    useMemo(() => {
      let present = 0;
      let absent = 0;
      let leave = 0;

      attendance.forEach((item) => {
        const status =
          String(
            item?.status || ""
          ).toLowerCase();

        if (status === "present") {
          present++;
        }

        if (status === "absent") {
          absent++;
        }

        if (status === "leave") {
          leave++;
        }
      });

      const total =
        present +
        absent +
        leave;

      const percentage =
        total > 0
          ? Math.round(
              (present / total) *
                100
            )
          : 0;

      return {
        present,
        absent,
        leave,
        total,
        percentage,
      };
    }, [attendance]);

  // =====================================================
  // LAST 6 MONTHS
  // =====================================================

  const months = useMemo(
    () => getLastMonths(6),
    []
  );

  // =====================================================
  // MONTHLY ATTENDANCE TREND
  // =====================================================

  const attendanceTrend =
    useMemo(() => {
      return months.map((month) => {
        const records =
          attendance.filter((item) => {
            const date =
              getDateValue(item, [
                "attendance_date",
                "date",
              ]);

            return (
              getMonthKey(date) ===
              month.key
            );
          });

        const present =
          records.filter(
            (item) =>
              String(
                item?.status || ""
              ).toLowerCase() ===
              "present"
          ).length;

        const absent =
          records.filter(
            (item) =>
              String(
                item?.status || ""
              ).toLowerCase() ===
              "absent"
          ).length;

        const leave =
          records.filter(
            (item) =>
              String(
                item?.status || ""
              ).toLowerCase() ===
              "leave"
          ).length;

        const total =
          present +
          absent +
          leave;

        const percentage =
          total > 0
            ? Math.round(
                (present / total) *
                  100
              )
            : 0;

        return {
          month: month.label,
          present,
          absent,
          leave,
          percentage,
        };
      });
    }, [attendance, months]);

  // =====================================================
  // MONTHLY FEE COLLECTION
  // =====================================================

  const feeTrend = useMemo(() => {
    return months.map((month) => {
      const monthlyFees =
        fees.filter((fee) => {
          const date =
            getDateValue(fee, [
              "payment_date",
              "date",
              "created_at",
            ]);

          return (
            getMonthKey(date) ===
            month.key
          );
        });

      const amount =
        monthlyFees.reduce(
          (sum, fee) =>
            sum +
            Number(
              fee?.paid_fee || 0
            ),
          0
        );

      return {
        month: month.label,
        amount,
      };
    });
  }, [fees, months]);

  // =====================================================
  // CLASS-WISE STUDENTS
  // =====================================================

  const classDistribution =
    useMemo(() => {
      const map = {};

      students.forEach((student) => {
        const className =
          student?.class ||
          student?.class_name ||
          "Unknown";

        map[className] =
          (map[className] || 0) + 1;
      });

      return Object.entries(map)
        .map(
          ([className, count]) => ({
            className,
            students: count,
          })
        )
        .sort((a, b) => {
          const aNumber =
            Number(a.className);

          const bNumber =
            Number(b.className);

          if (
            Number.isFinite(
              aNumber
            ) &&
            Number.isFinite(
              bNumber
            )
          ) {
            return (
              aNumber - bNumber
            );
          }

          return a.className.localeCompare(
            b.className
          );
        });
    }, [students]);

  // =====================================================
  // EXAM SUMMARY
  // =====================================================

  const examSummary =
    useMemo(() => {
      const scheduled =
        exams.filter(
          (exam) =>
            String(
              exam?.status || ""
            ).toLowerCase() ===
            "scheduled"
        ).length;

      const completed =
        exams.filter(
          (exam) =>
            String(
              exam?.status || ""
            ).toLowerCase() ===
            "completed"
        ).length;

      return {
        scheduled,
        completed,
      };
    }, [exams]);

  // =====================================================
  // MONTH-OVER-MONTH ATTENDANCE GROWTH
  // =====================================================

  const attendanceGrowth =
    useMemo(() => {
      if (attendanceTrend.length < 2) {
        return 0;
      }

      const current =
        attendanceTrend[
          attendanceTrend.length - 1
        ].percentage;

      const previous =
        attendanceTrend[
          attendanceTrend.length - 2
        ].percentage;

      return current - previous;
    }, [attendanceTrend]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600" />

          <p className="mt-3 text-sm text-gray-500">
            Loading Principal Reports...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-5">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <FileBarChart
                size={21}
                className="text-purple-600"
              />

              <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                Principal Reports
              </p>
            </div>

            <h1 className="mt-1 text-2xl font-bold text-gray-800">
              School Performance Reports
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Live reports generated from the school database.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              loadReports(true)
            }
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>

        </div>
      </div>

      {/* =================================================
          LIVE OVERVIEW
      ================================================= */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Students"
          value={formatNumber(
            totalStudents
          )}
          subtitle={`${formatNumber(
            activeStudents
          )} active students`}
          icon={Users}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Total Teachers"
          value={formatNumber(
            totalTeachers
          )}
          subtitle="Live teacher records"
          icon={GraduationCap}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Fees Collected"
          value={formatCurrency(
            feeSummary.paidFee
          )}
          subtitle={`${feeSummary.collectionPercentage}% of recorded fees`}
          icon={IndianRupee}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />

        <StatCard
          title="Attendance"
          value={`${attendanceSummary.percentage}%`}
          subtitle={`${formatNumber(
            attendanceSummary.total
          )} attendance records`}
          icon={CalendarCheck}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />

      </div>

      {/* =================================================
          FINANCIAL + ATTENDANCE SUMMARY
      ================================================= */}

      <div className="grid gap-5 lg:grid-cols-2">

        {/* FEES */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <SectionTitle
            title="Fee Collection Summary"
            description="Actual fee figures from the fee database."
          />

          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-xs text-gray-500">
                Total Fee
              </p>

              <p className="mt-1 text-xl font-bold text-gray-800">
                {formatCurrency(
                  feeSummary.totalFee
                )}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs text-gray-500">
                Collected
              </p>

              <p className="mt-1 text-xl font-bold text-blue-700">
                {formatCurrency(
                  feeSummary.paidFee
                )}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs text-gray-500">
                Pending
              </p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {formatCurrency(
                  feeSummary.dueFee
                )}
              </p>
            </div>

            <div className="rounded-xl bg-purple-50 p-4">
              <p className="text-xs text-gray-500">
                Collection Rate
              </p>

              <p className="mt-1 text-xl font-bold text-purple-700">
                {
                  feeSummary.collectionPercentage
                }
                %
              </p>
            </div>

          </div>

          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                Payment progress
              </span>

              <span className="font-semibold text-gray-700">
                {
                  feeSummary.collectionPercentage
                }
                %
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">

              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    feeSummary.collectionPercentage,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* ATTENDANCE */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between gap-3">

            <SectionTitle
              title="Attendance Summary"
              description="Actual attendance records from the database."
            />

            <div
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${
                attendanceGrowth >= 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {attendanceGrowth >= 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}

              {attendanceGrowth >= 0
                ? "+"
                : ""}
              {attendanceGrowth}%
            </div>

          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-xs text-gray-500">
                Present
              </p>

              <p className="mt-1 text-xl font-bold text-green-700">
                {formatNumber(
                  attendanceSummary.present
                )}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-xs text-gray-500">
                Absent
              </p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {formatNumber(
                  attendanceSummary.absent
                )}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-xs text-gray-500">
                Leave
              </p>

              <p className="mt-1 text-xl font-bold text-yellow-700">
                {formatNumber(
                  attendanceSummary.leave
                )}
              </p>
            </div>

          </div>

          <div className="mt-5 rounded-xl bg-teal-50 p-4">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Overall Attendance
                </p>

                <p className="mt-1 text-2xl font-bold text-teal-700">
                  {
                    attendanceSummary.percentage
                  }
                  %
                </p>
              </div>

              <CheckCircle2
                size={30}
                className="text-teal-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          ATTENDANCE TREND
      ================================================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <SectionTitle
          title="Attendance Trend"
          description="Monthly attendance calculated from actual attendance records."
        />

        <div className="mt-6 h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={attendanceTrend}
            >

              <defs>

                <linearGradient
                  id="attendanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#14b8a6"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="#14b8a6"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
              />

              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) =>
                  `${value}%`
                }
              />

              <Tooltip
                formatter={(value) => [
                  `${value}%`,
                  "Attendance",
                ]}
              />

              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#0f766e"
                strokeWidth={3}
                fill="url(#attendanceGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =================================================
          FEE TREND
      ================================================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <SectionTitle
          title="Monthly Fee Collection"
          description="Monthly collection based on actual payment dates."
        />

        <div className="mt-6 h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={feeTrend}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
              />

              <YAxis
                tickFormatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`
                }
              />

              <Tooltip
                formatter={(value) => [
                  formatCurrency(value),
                  "Collection",
                ]}
              />

              <Bar
                dataKey="amount"
                fill="#16a34a"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* =================================================
          CLASS DISTRIBUTION + EXAM OVERVIEW
      ================================================= */}

      <div className="grid gap-5 lg:grid-cols-2">

        {/* CLASS DISTRIBUTION */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <SectionTitle
            title="Class-wise Student Distribution"
            description="Current students grouped by class."
          />

          {classDistribution.length ===
          0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-8 text-center">

              <School
                size={28}
                className="mx-auto text-gray-300"
              />

              <p className="mt-2 text-sm font-medium text-gray-600">
                No student records available
              </p>

            </div>
          ) : (
            <div className="mt-5 space-y-3">

              {classDistribution.map(
                (item) => {
                  const percentage =
                    totalStudents > 0
                      ? Math.round(
                          (item.students /
                            totalStudents) *
                            100
                        )
                      : 0;

                  return (
                    <div
                      key={
                        item.className
                      }
                    >

                      <div className="flex items-center justify-between text-sm">

                        <span className="font-medium text-gray-700">
                          Class{" "}
                          {item.className}
                        </span>

                        <span className="font-semibold text-gray-800">
                          {formatNumber(
                            item.students
                          )}
                        </span>

                      </div>

                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">

                        <div
                          className="h-full rounded-full bg-blue-500 transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

        {/* EXAM OVERVIEW */}

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

          <SectionTitle
            title="Examination Overview"
            description="Exam records currently available in the database."
          />

          <div className="mt-5 grid grid-cols-3 gap-3">

            <div className="rounded-xl bg-purple-50 p-4">

              <p className="text-xs text-gray-500">
                Total Exams
              </p>

              <p className="mt-1 text-xl font-bold text-purple-700">
                {formatNumber(
                  totalExams
                )}
              </p>

            </div>

            <div className="rounded-xl bg-blue-50 p-4">

              <p className="text-xs text-gray-500">
                Scheduled
              </p>

              <p className="mt-1 text-xl font-bold text-blue-700">
                {formatNumber(
                  examSummary.scheduled
                )}
              </p>

            </div>

            <div className="rounded-xl bg-green-50 p-4">

              <p className="text-xs text-gray-500">
                Completed
              </p>

              <p className="mt-1 text-xl font-bold text-green-700">
                {formatNumber(
                  examSummary.completed
                )}
              </p>

            </div>

          </div>

          <div className="mt-5 rounded-xl bg-gray-50 p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">

                <BookOpen
                  size={18}
                  className="text-purple-600"
                />

              </div>

              <div>

                <p className="text-sm font-semibold text-gray-800">
                  Live Examination Data
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Exam count and status are loaded directly from the existing examination records.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          LIVE CONNECTION STATUS
      ================================================= */}

      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">

              <CheckCircle2
                size={19}
                className="text-green-600"
              />

            </div>

            <div>

              <h3 className="text-sm font-semibold text-green-800">
                Live Report Sync
              </h3>

              <p className="mt-1 text-xs leading-5 text-green-700">
                Reports automatically refresh every 10 seconds and when the page becomes active.
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">

              <FileBarChart
                size={19}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="text-sm font-semibold text-blue-800">
                Database Based Reports
              </h3>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                Students, teachers, fees, attendance and examinations are read from the existing school database.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          BACKEND ERROR INFO
      ================================================= */}

      {Object.keys(apiErrors).length >
        0 && (
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">

          <div className="flex items-start gap-3">

            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0 text-yellow-600"
            />

            <div>

              <p className="text-sm font-semibold text-yellow-800">
                Some report data could not be loaded
              </p>

              <p className="mt-1 text-xs text-yellow-700">
                Check the corresponding PHP API if one section is empty.
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}