// import {
//   CreditCard,
//   Download,
// } from "lucide-react";

// export default function StudentFees() {
//   const summary = {
//     total: 50000,
//     paid: 45000,
//     pending: 5000,
//     session: "2025-26",
//   };

//   const installments = [
//     {
//       title: "1st Installment",
//       amount: 20000,
//       due: "10 Apr 2026",
//       status: "Paid",
//     },
//     {
//       title: "2nd Installment",
//       amount: 25000,
//       due: "15 Jun 2026",
//       status: "Paid",
//     },
//     {
//       title: "Final Installment",
//       amount: 5000,
//       due: "20 Jul 2026",
//       status: "Pending",
//     },
//   ];

//   const breakdown = [
//     {
//       title: "Tuition Fee",
//       amount: 30000,
//     },
//     {
//       title: "Transport Fee",
//       amount: 8000,
//     },
//     {
//       title: "Examination Fee",
//       amount: 5000,
//     },
//     {
//       title: "Library Fee",
//       amount: 3000,
//     },
//     {
//       title: "Computer Fee",
//       amount: 4000,
//     },
//   ];

//   const payments = [
//     {
//       receipt: "REC-1001",
//       txn: "TXN458721",
//       date: "05 Apr 2026",
//       mode: "UPI",
//       amount: "₹20,000",
//     },
//     {
//       receipt: "REC-1002",
//       txn: "TXN872314",
//       date: "15 Jun 2026",
//       mode: "Net Banking",
//       amount: "₹25,000",
//     },
//   ];

//   const progress = Math.round(
//     (summary.paid / summary.total) * 100
//   );

//   return (
//     <div className="space-y-7">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-800 mt-3">
//           Fees & Payments
//         </h1>

//         <p className="text-sm text-slate-500 mt-2">
//           Academic Session {summary.session}
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid md:grid-cols-3 gap-5">
//         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
//           <p className="text-sm text-slate-600">
//             Total Fees
//           </p>

//           <h2 className="text-2xl font-bold mt-2 text-slate-700">
//             ₹50,000
//           </h2>
//         </div>

//         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
//           <p className="text-sm text-slate-600">
//             Paid Amount
//           </p>

//           <h2 className="text-2xl font-bold mt-2 text-green-700">
//             ₹45,000
//           </h2>
//         </div>

//         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
//           <p className="text-sm text-slate-600">
//             Pending Amount
//           </p>

//           <h2 className="text-2xl font-bold mt-2 text-red-600">
//             ₹5,000
//           </h2>

//           <button className="mt-5 bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2">
//             <CreditCard size={16} />
//             Pay Now
//           </button>
//         </div>
//       </div>

//       {/* Progress */}
//       <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
//         <div className="flex justify-between items-center mb-3">
//           <span className="text-sm text-slate-500">
//             Payment Progress
//           </span>

//           <span className="font-semibold text-green-600">
//             {progress}%
//           </span>
//         </div>

//         <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
//           <div
//             className="h-full bg-green-600 rounded-full"
//             style={{
//               width: `${progress}%`,
//             }}
//           />
//         </div>
//       </div>

//       {/* Installments */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
//         <h3 className="text-lg font-bold text-slate-800 mb-5">
//           Fee Installments
//         </h3>

//         <div className="space-y-4">
//           {installments.map((item) => (
//             <div
//               key={item.title}
//               className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-100 rounded-2xl p-5"
//             >
//               <div>
//                 <h4 className="font-semibold text-slate-800">
//                   {item.title}
//                 </h4>

//                 <p className="text-sm text-slate-500 mt-1">
//                   Due on {item.due}
//                 </p>
//               </div>

//               <div className="flex items-center gap-5">
//                 <span className="font-bold text-slate-800">
//                   ₹{item.amount.toLocaleString()}
//                 </span>

//                 {item.status === "Paid" ? (
//                   <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
//                     Paid
//                   </span>
//                 ) : (
//                   <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
//                     Pending
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Fee Breakdown */}
//       <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
//         <h3 className="text-lg font-bold text-slate-800 mb-5">
//           Fee Breakdown
//         </h3>

//         <div className="space-y-4">
//           {breakdown.map((item) => (
//             <div
//               key={item.title}
//               className="flex justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0"
//             >
//               <span className="text-slate-600">
//                 {item.title}
//               </span>

//               <span className="font-semibold text-slate-800">
//                 ₹{item.amount.toLocaleString()}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Payment History */}
//       <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
//         <div className="p-6 border-b border-slate-100">
//           <h3 className="text-lg font-bold text-slate-800">
//             Payment History
//           </h3>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[850px]">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="text-left px-6 py-4 text-sm">
//                   Receipt No.
//                 </th>

//                 <th className="text-left px-6 py-4 text-sm">
//                   Transaction ID
//                 </th>

//                 <th className="text-left px-6 py-4 text-sm">
//                   Date
//                 </th>

//                 <th className="text-left px-6 py-4 text-sm">
//                   Mode
//                 </th>

//                 <th className="text-left px-6 py-4 text-sm">
//                   Amount
//                 </th>

//                 <th className="text-center px-6 py-4 text-sm">
//                   Receipt
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {payments.map((item) => (
//                 <tr
//                   key={item.receipt}
//                   className="border-t border-slate-100"
//                 >
//                   <td className="px-6 py-5">
//                     {item.receipt}
//                   </td>

//                   <td className="px-6 py-5">
//                     {item.txn}
//                   </td>

//                   <td className="px-6 py-5">
//                     {item.date}
//                   </td>

//                   <td className="px-6 py-5">
//                     {item.mode}
//                   </td>

//                   <td className="px-6 py-5 font-semibold">
//                     {item.amount}
//                   </td>

//                   <td className="px-6 py-5 text-center">
//                     <button className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition">
//                       <Download size={16} />
//                       Receipt
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import {
  IndianRupee,
  CreditCard,
  Download,
  AlertCircle,
  CheckCircle,
  CalendarDays,
  Receipt,
} from "lucide-react";

export default function StudentFees() {
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

      if (!storedUser?.id) {
        setError("Student login information not found");
        return;
      }

      const response = await fetch(
        `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/student/fees.php?user_id=${storedUser.id}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch fee information");
      }

      const data = await response.json();

      console.log(
        "Student Fee Response:",
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
        "Student Fee Error:",
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

  // Currency formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
  };

  // Date formatter
  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

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

  // Loading
  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-gray-500">
        Loading fee information...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
        <AlertCircle
          className="mx-auto text-red-500 mb-3"
          size={32}
        />

        <p className="text-red-500">
          {error}
        </p>

        <button
          onClick={fetchFees}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!feeData) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-gray-500">
        No fee information available.
      </div>
    );
  }

  const summary = feeData.summary || {};
  const fees = feeData.fees || [];
  const payments = feeData.payments || [];
  const student = feeData.student || {};

  const totalFee = Number(summary.total_fee || 0);
  const totalPaid = Number(summary.total_paid || 0);
  const totalDue = Number(summary.total_due || 0);

  const paymentPercentage = Math.min(
    Number(summary.payment_percentage || 0),
    100
  );

  const isPaid =
    summary.status === "Paid";

  return (
    <div className="space-y-7">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mt-3">
          Fees & Payments
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          View your complete fee details and payment history.
        </p>
      </div>

      {/* Student Information */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

        <div className="grid md:grid-cols-3 gap-5">

          <div>
            <p className="text-sm text-slate-500">
              Student
            </p>

            <h3 className="text-lg font-bold text-slate-800 mt-1">
              {student.name ||
                student.full_name ||
                "N/A"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Class
            </p>

            <p className="font-semibold text-slate-800 mt-1">
              {student.class || "N/A"}
              {" - "}
              {student.section || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Admission No.
            </p>

            <p className="font-semibold text-slate-800 mt-1">
              {student.admission_no || "N/A"}
            </p>
          </div>

        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-5">

        {/* Total */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-slate-600">
                Total Fees
              </p>

              <h2 className="text-2xl font-bold mt-2 text-slate-700">
                {formatCurrency(totalFee)}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <IndianRupee size={20} />
            </div>

          </div>
        </div>

        {/* Paid */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-slate-600">
                Paid Amount
              </p>

              <h2 className="text-2xl font-bold mt-2 text-green-700">
                {formatCurrency(totalPaid)}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
              <CheckCircle size={20} />
            </div>

          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-slate-600">
                Pending Amount
              </p>

              <h2 className="text-2xl font-bold mt-2 text-red-600">
                {formatCurrency(totalDue)}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
              <CreditCard size={20} />
            </div>

          </div>

        </div>

      </div>

      {/* Fee Status */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Current Fee Status
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

      {/* Payment Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

        <div className="flex justify-between items-center mb-3">

          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Payment Progress
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Paid amount compared with total fee
            </p>
          </div>

          <span className="font-semibold text-green-600">
            {paymentPercentage}%
          </span>

        </div>

        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">

          <div
            className="h-full bg-green-600 rounded-full transition-all duration-500"
            style={{
              width: `${paymentPercentage}%`,
            }}
          />

        </div>

        <div className="flex justify-between text-sm mt-3">

          <span className="text-slate-500">
            Paid:{" "}
            <span className="font-semibold text-slate-800">
              {formatCurrency(totalPaid)}
            </span>
          </span>

          <span className="text-slate-500">
            Due:{" "}
            <span className="font-semibold text-red-600">
              {formatCurrency(totalDue)}
            </span>
          </span>

        </div>
      </div>

      {/* Fee Records */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Receipt size={20} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Fee Records
            </h3>

            <p className="text-sm text-slate-500">
              Fees assigned by the school
            </p>
          </div>

        </div>

        {fees.length === 0 ? (

          <div className="py-10 text-center">

            <CreditCard
              className="mx-auto text-slate-300 mb-3"
              size={40}
            />

            <p className="text-slate-500">
              No fee records available.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-100">

                  <th className="text-left py-3 px-2 text-sm text-slate-500">
                    Fee ID
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-slate-500">
                    Total Fee
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-slate-500">
                    Paid
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-slate-500">
                    Due
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-slate-500">
                    Payment Date
                  </th>

                  <th className="text-left py-3 px-2 text-sm text-slate-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {fees.map((fee) => (

                  <tr
                    key={fee.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >

                    <td className="py-4 px-2">

                      <span className="font-semibold text-slate-700">
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

                      <div className="flex items-center gap-2 text-slate-600">

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

      {/* Payment History */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

        <div className="p-6 border-b border-slate-100">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              <Receipt size={20} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Payment History
              </h3>

              <p className="text-sm text-slate-500">
                All payments made for your fees
              </p>
            </div>

          </div>

        </div>

        {payments.length === 0 ? (

          <div className="py-10 text-center">

            <CreditCard
              className="mx-auto text-slate-300 mb-3"
              size={40}
            />

            <p className="text-slate-500">
              No payment history available.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Receipt No.
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Transaction ID
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Date
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Mode
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-slate-500">
                    Amount
                  </th>

                  <th className="text-center px-6 py-4 text-sm text-slate-500">
                    Receipt
                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr
                    key={payment.id}
                    className="border-t border-slate-100"
                  >

                    <td className="px-6 py-5 font-medium">
                      {payment.receipt_no || "—"}
                    </td>

                    <td className="px-6 py-5">
                      {payment.transaction_id || "—"}
                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <CalendarDays size={15} />

                        {formatDate(
                          payment.payment_date
                        )}

                      </div>

                    </td>

                    <td className="px-6 py-5">
                      {payment.payment_method || "—"}
                    </td>

                    <td className="px-6 py-5 font-semibold text-green-600">
                      {formatCurrency(
                        payment.amount
                      )}
                    </td>

                    <td className="px-6 py-5 text-center">

                      <button
                          type="button"
                          onClick={() => {
                            const storedUser = JSON.parse(
                              localStorage.getItem("user")
                            );

                            if (!storedUser?.id) {
                              alert("Student login information not found");
                              return;
                            }

                            if (!payment.id) {
                              alert("Payment ID not found");
                              return;
                            }

                            const receiptUrl =
                              `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/student/generateReceipt.php` +
                              `?payment_id=${payment.id}` +
                              `&user_id=${storedUser.id}`;

                            window.open(receiptUrl, "_blank");
                          }}
                          className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition text-sm"
                        >
                          <Download size={16} />
                          Receipt
                        </button>
                                        

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