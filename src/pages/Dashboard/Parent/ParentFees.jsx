// import {
//   User,
//   GraduationCap,
//   Hash,
//   IndianRupee,
//   Receipt,
//   CircleDollarSign,
// } from "lucide-react";

// export default function ParentFees({ parent, student }) {
//   const fees = [
//     {
//       month: "April 2026",
//       amount: "₹8,000",
//       dueDate: "10 Apr 2026",
//       status: "Paid",
//     },
//     {
//       month: "May 2026",
//       amount: "₹8,000",
//       dueDate: "10 May 2026",
//       status: "Paid",
//     },
//     {
//       month: "June 2026",
//       amount: "₹8,000",
//       dueDate: "10 Jun 2026",
//       status: "Pending",
//     },
//     {
//       month: "July 2026",
//       amount: "₹8,000",
//       dueDate: "10 Jul 2026",
//       status: "Pending",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">
//         Fee Details
//       </h2>

//       {/* Student Information */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm">
//         <div className="grid md:grid-cols-3 gap-5">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
//               <User size={20} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Student Name
//               </p>

//               <h3 className="font-bold">
//                 {student?.full_name || "N/A"}
//               </h3>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
//               <GraduationCap size={20} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Class
//               </p>

//               <h3 className="font-bold">
//                 {student
//                   ? `${student.class}-${student.section}`
//                   : "N/A"}
//               </h3>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
//               <Hash size={20} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Admission No
//               </p>

//               <h3 className="font-bold">
//                 {student?.admission_no || "N/A"}
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid md:grid-cols-3 gap-5">
//         <div className="bg-white rounded-3xl p-5 shadow-sm">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Total Fees
//               </p>

//               <h3 className="text-xl font-bold mt-4">
//                 ₹32,000
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
//               <IndianRupee size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl p-5 shadow-sm">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Paid Amount
//               </p>

//               <h3 className="text-xl font-bold text-green-600 mt-4">
//                 ₹16,000
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
//               <CircleDollarSign size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl p-5 shadow-sm">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-500">
//                 Pending Amount
//               </p>

//               <h3 className="text-xl font-bold text-red-600 mt-4">
//                 ₹16,000
//               </h3>
//             </div>

//             <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
//               <Receipt size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Fee History */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm">
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="text-lg font-bold">
//             Fee History
//           </h3>

//           <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">
//             Pay Now
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-100">
//                 <th className="text-left py-3 text-sm text-gray-500">
//                   Month
//                 </th>

//                 <th className="text-left py-3 text-sm text-gray-500">
//                   Amount
//                 </th>

//                 <th className="text-left py-3 text-sm text-gray-500">
//                   Due Date
//                 </th>

//                 <th className="text-left py-3 text-sm text-gray-500">
//                   Status
//                 </th>

//                 <th className="text-left py-3 text-sm text-gray-500">
//                   Receipt
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {fees.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-gray-100"
//                 >
//                   <td className="py-4 font-medium">
//                     {item.month}
//                   </td>

//                   <td className="py-4">
//                     {item.amount}
//                   </td>

//                   <td className="py-4 text-gray-600">
//                     {item.dueDate}
//                   </td>

//                   <td className="py-4">
//                     <span
//                       className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                         item.status === "Paid"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>

//                   <td className="py-4">
//                     {item.status === "Paid" ? (
//                       <button className="text-blue-600 font-medium">
//                         Download
//                       </button>
//                     ) : (
//                       <span className="text-gray-400">
//                         -
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Important Notice */}
//         <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-4">
//           <p className="text-red-700 text-sm font-medium">
//             ₹16,000 fees are pending. Please pay before
//             10 July 2026 to avoid late charges.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }











import { useEffect, useState } from "react";
import {
  IndianRupee,
  CreditCard,
  Wallet,
  AlertCircle,
  CheckCircle,
  CalendarDays,
  Receipt,
} from "lucide-react";

export default function ParentFees({ parent, student }) {

  const [feeData, setFeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchFees = async () => {
    try {

      setLoading(true);
      setError("");
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser || !storedUser.id) {

        setError(
          "Parent login information not found"
        );

        return;
      }

      const response = await fetch(
        `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/parent/fees.php?user_id=${storedUser.id}`
      );

      if (!response.ok) {

        throw new Error(
          "Unable to fetch fee information"
        );
      }

      const data = await response.json();

      console.log(
        "Parent Fee Response:",
        JSON.stringify(data, null, 2)
      );

      if (!data.status) {

        setError(
          data.message ||
          "Unable to fetch fee information"
        );

        return;
      }
      setFeeData(data);

    } catch (error) {

      console.error(
        "Parent Fee Error:",
        error
      );

      setError(
        "Unable to connect with server"
      );

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchFees();

  }, []);

  // Loading

  if (loading) {

    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-gray-500">
        Loading fee information...
      </div>
    );
  }

//  Error

  if (error) {

    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center">

        <AlertCircle
          className="mx-auto text-red-500 mb-3"
          size={30}
        />

        <p className="text-red-500">
          {error}
        </p>

      </div>
    );
  }

  // No data

  if (!feeData) {

    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-gray-500">
        No fee information available.
      </div>
    );
  }

  const summary = feeData.summary || {};
  const fees = feeData.fees || [];
  const studentData =
    feeData.student || student;

  // Currency formatter

  const formatCurrency = (amount) => {

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(amount || 0);

  };

  // Date formatter

  const formatDate = (date) => {

    if (!date) return "—";

    const parsedDate =
      new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };

  // Status
  const isPaid =
    summary.status === "Paid";

  const paymentPercentage =
    Math.min(
      Number(summary.payment_percentage || 0),
      100
    );

  return (

    <div className="space-y-6">

      {/* Heading */}

      <div>

        <h2 className="text-2xl font-bold text-gray-800">
          Fee Details
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          View your child's complete fee information and
          payment history.
        </p>

      </div>

     
      {/* Student Information */}

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="text-sm text-gray-500">
              Student
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-1">
              {studentData?.name ||
                studentData?.full_name ||
                "N/A"}
            </h3>
          </div>

          <div className="text-left md:text-right">

            <p className="text-sm text-gray-500">
              Class
            </p>

            <p className="font-semibold text-gray-800 mt-1">
              {studentData?.class || "N/A"}
              {" - "}
              {studentData?.section || "N/A"}
            </p>

          </div>

          <div className="text-left md:text-right">

            <p className="text-sm text-gray-500">
              Admission No.
            </p>

            <p className="font-semibold text-gray-800 mt-1">
              {studentData?.admission_no || "N/A"}
            </p>

          </div>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

        {/* Total Fee */}

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>

              <p className="text-sm text-gray-500">
                Total Fee
              </p>

              <h3 className="text-xl font-bold mt-2">
                {formatCurrency(
                  summary.total_fee
                )}
              </h3>

            </div>

            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">

              <IndianRupee size={20} />

            </div>
          </div>
        </div>

        {/* Paid */}

        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Total Paid
              </p>

              <h3 className="text-xl font-bold mt-2 text-green-600">
                {formatCurrency(
                  summary.total_paid
                )}
              </h3>

            </div>

            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">

              <CheckCircle size={20} />

            </div>
          </div>
        </div>

        {/* Due */}

        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm text-gray-500">
                Remaining Due
              </p>

              <h3 className="text-xl font-bold mt-2 text-red-600">
                {formatCurrency(
                  summary.total_due
                )}
              </h3>

            </div>

            <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">

              <Wallet size={20} />

            </div>
          </div>
        </div>

        {/* Status */}

        <div className="bg-white rounded-3xl p-5 shadow-sm">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm text-gray-500">
                Fee Status
              </p>

              <h3
                className={`text-xl font-bold mt-2 ${
                  isPaid
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {summary.status ||
                  "No Fee Record"}
              </h3>

            </div>

            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >

              {isPaid ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Payment Progress */}

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex justify-between items-center mb-3">

          <div>

            <h3 className="text-lg font-bold text-gray-800">
              Payment Progress
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Paid amount compared with total fee
            </p>

          </div>

          <span className="font-bold text-green-600">
            {paymentPercentage}%
          </span>

        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{
              width: `${paymentPercentage}%`,
            }}
          />

        </div>

        <div className="flex justify-between text-sm mt-3">

          <span className="text-gray-500">
            Paid:{" "}
            <span className="font-semibold text-gray-800">
              {formatCurrency(
                summary.total_paid
              )}
            </span>
          </span>

          <span className="text-gray-500">
            Due:{" "}
            <span className="font-semibold text-red-600">
              {formatCurrency(
                summary.total_due
              )}
            </span>

          </span>
        </div>
      </div>

      {/* Fee Records */}

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">

            <Receipt size={20} />

          </div>

          <div>

            <h3 className="text-xl font-bold text-gray-800">
              Fee Payment History
            </h3>

            <p className="text-sm text-gray-500">
              Complete fee records for your child
            </p>

          </div>
        </div>

        {fees.length === 0 ? (

          <div className="py-10 text-center">

            <CreditCard
              className="mx-auto text-gray-300 mb-3"
              size={40}
            />

            <p className="text-gray-500">
              No fee records available.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-100">

                  <th className="text-left py-3 px-2 text-sm text-gray-500">
                    Fee ID
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-gray-500">
                    Total Fee
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-gray-500">
                    Paid
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-gray-500">
                    Due
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-gray-500">
                    Payment Date
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-gray-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {fees.map((fee) => (

                  <tr
                    key={fee.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    <td className="py-4 px-2">

                      <span className="font-semibold text-gray-700">
                        #{fee.id}
                      </span>

                    </td>

                    <td className="py-4 px-2 font-medium">
                      {formatCurrency(
                        fee.total_fee
                      )}
                    </td>

                    <td className="py-4 px-2 font-semibold text-green-600">
                      {formatCurrency(
                        fee.paid_fee
                      )}
                    </td>

                    <td className="py-4 px-2 font-semibold text-red-600">
                      {formatCurrency(
                        fee.due_fee
                      )}
                    </td>

                    <td className="py-4 px-2">

                      <div className="flex items-center gap-2 text-gray-600">

                        <CalendarDays size={16} />

                        {formatDate(
                          fee.payment_date
                        )}

                      </div>

                    </td>

                    <td className="py-4 px-2">

                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          fee.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >

                        {fee.status === "Paid" ? (
                          <CheckCircle size={13} />
                        ) : (
                          <AlertCircle size={13} />
                        )}

                        {fee.status}

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