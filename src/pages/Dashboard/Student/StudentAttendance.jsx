import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  CalendarCheck,
  CalendarX,
  User,
} from "lucide-react";

export default function StudentAttendance() {

  const [student, setStudent] = useState(null);

  const [attendance, setAttendance] = useState([]);

  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    percentage: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /*
  |--------------------------------------------------------------------------
  | Load student attendance
  |--------------------------------------------------------------------------
  */

  const loadAttendance = async () => {

    try {

      setLoading(true);
      setError("");


      /*
      | Get logged-in user
      */

      const storedUser =
        localStorage.getItem("user");


      if (!storedUser) {

        setError("Student login information not found.");

        return;
      }


      const user =
        JSON.parse(storedUser);


      if (!user.id) {

        setError("Invalid student login information.");

        return;
      }


      /*
      | API
      */

      const url =
        `http://localhost/school_management_system/backend/api/student/getAttendance.php` +
        `?user_id=${encodeURIComponent(user.id)}`;


      const response =
        await fetch(url);


      const result =
        await response.json();


      if (!result.status) {

        setError(
          result.message ||
          "Unable to fetch attendance."
        );

        return;
      }


      /*
      | Save API data
      */

      setStudent(result.student);

      setAttendance(
        result.attendance || []
      );

      setSummary(
        result.summary || {
          total: 0,
          present: 0,
          absent: 0,
          percentage: 0,
        }
      );


    } catch (error) {

      console.error(
        "Student attendance error:",
        error
      );

      setError(
        "Unable to connect with server."
      );

    } finally {

      setLoading(false);

    }
  };


  /*
  |--------------------------------------------------------------------------
  | Load on page open
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadAttendance();

  }, []);


  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (
      <div className="min-h-[400px] flex items-center justify-center">

        <div className="flex items-center gap-3 text-gray-500">

          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading attendance...
          </span>

        </div>

      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error) {

    return (
      <div className="max-w-4xl mx-auto p-6">

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">

          <XCircle
            className="mx-auto text-red-500 mb-3"
            size={40}
          />

          <h3 className="font-semibold text-red-700">
            Unable to load attendance
          </h3>

          <p className="text-sm text-red-500 mt-1">
            {error}
          </p>

          <button
            onClick={loadAttendance}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }


  return (

    <div className="space-y-8 max-w-[1800px] mx-auto p-3">


      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Attendance Analytics
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Track your actual classroom attendance.
          </p>

        </div>


        {student && (

          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border shadow-sm">

            <div className="bg-blue-100 p-2 rounded-xl">

              <User
                size={18}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="font-semibold text-gray-800">
                {student.name}
              </p>

              <p className="text-xs text-gray-500">
                Class {student.class} - Section {student.section}
              </p>

            </div>

          </div>

        )}

      </div>


      {/* =========================================================
          SUMMARY CARDS
      ========================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        {/* Total */}

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="bg-blue-100 p-3 rounded-2xl">

              <CalendarCheck
                size={22}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Total Classes
              </p>

              <h3 className="text-3xl font-black text-gray-800">
                {summary.total}
              </h3>

            </div>

          </div>

        </div>


        {/* Present */}

        <div className="bg-green-50 rounded-3xl p-6 border border-green-100 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="bg-green-100 p-3 rounded-2xl">

              <CheckCircle2
                size={22}
                className="text-green-600"
              />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Present
              </p>

              <h3 className="text-3xl font-black text-green-700">
                {summary.present}
              </h3>

            </div>

          </div>

        </div>


        {/* Absent */}

        <div className="bg-red-50 rounded-3xl p-6 border border-red-100 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="bg-red-100 p-3 rounded-2xl">

              <CalendarX
                size={22}
                className="text-red-600"
              />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Absent
              </p>

              <h3 className="text-3xl font-black text-red-700">
                {summary.absent}
              </h3>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================================
          OVERALL ATTENDANCE
      ========================================================= */}

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

        <div className="flex justify-between items-center mb-3">

          <div>

            <h3 className="text-lg font-bold text-gray-800">
              Overall Attendance
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Based on all attendance records
            </p>

          </div>

          <span className="text-3xl font-black text-green-600">
            {summary.percentage}%
          </span>

        </div>


        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-green-500 rounded-full transition-all duration-700"
            style={{
              width: `${summary.percentage}%`,
            }}
          />

        </div>

      </div>


      {/* =========================================================
          ATTENDANCE HISTORY
      ========================================================= */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-gray-100">

          <h3 className="text-lg font-bold text-gray-800">
            Attendance History
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Your actual attendance records from school.
          </p>

        </div>


        {attendance.length === 0 ? (

          <div className="py-16 text-center">

            <CalendarCheck
              size={42}
              className="mx-auto text-gray-300"
            />

            <p className="text-gray-500 mt-3">
              No attendance records found.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Date
                  </th>

                  <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Status
                  </th>

                  <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                    Attendance Type
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-gray-100">

                {attendance.map((record) => (

                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <CalendarCheck
                          size={17}
                          className="text-gray-400"
                        />

                        <span className="font-medium text-gray-700">

                          {new Date(
                            record.attendance_date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </span>

                      </div>

                    </td>


                    <td className="text-center px-6 py-4">

                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          record.status === "Present"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >

                        {record.status === "Present" ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <XCircle size={13} />
                        )}

                        {record.status}

                      </span>

                    </td>


                    <td className="text-center px-6 py-4">

                      <span className="text-xs text-gray-500">

                        {record.attendance_type ||
                          "Manual"}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}