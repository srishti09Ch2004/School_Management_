import {
  CreditCard,
  Download,
} from "lucide-react";

export default function StudentFees() {
  const summary = {
    total: 50000,
    paid: 45000,
    pending: 5000,
    session: "2025-26",
  };

  const installments = [
    {
      title: "1st Installment",
      amount: 20000,
      due: "10 Apr 2026",
      status: "Paid",
    },
    {
      title: "2nd Installment",
      amount: 25000,
      due: "15 Jun 2026",
      status: "Paid",
    },
    {
      title: "Final Installment",
      amount: 5000,
      due: "20 Jul 2026",
      status: "Pending",
    },
  ];

  const breakdown = [
    {
      title: "Tuition Fee",
      amount: 30000,
    },
    {
      title: "Transport Fee",
      amount: 8000,
    },
    {
      title: "Examination Fee",
      amount: 5000,
    },
    {
      title: "Library Fee",
      amount: 3000,
    },
    {
      title: "Computer Fee",
      amount: 4000,
    },
  ];

  const payments = [
    {
      receipt: "REC-1001",
      txn: "TXN458721",
      date: "05 Apr 2026",
      mode: "UPI",
      amount: "₹20,000",
    },
    {
      receipt: "REC-1002",
      txn: "TXN872314",
      date: "15 Jun 2026",
      mode: "Net Banking",
      amount: "₹25,000",
    },
  ];

  const progress = Math.round(
    (summary.paid / summary.total) * 100
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mt-3">
          Fees & Payments
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Academic Session {summary.session}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-600">
            Total Fees
          </p>

          <h2 className="text-2xl font-bold mt-2 text-slate-700">
            ₹50,000
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-600">
            Paid Amount
          </p>

          <h2 className="text-2xl font-bold mt-2 text-green-700">
            ₹45,000
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-600">
            Pending Amount
          </p>

          <h2 className="text-2xl font-bold mt-2 text-red-600">
            ₹5,000
          </h2>

          <button className="mt-5 bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2">
            <CreditCard size={16} />
            Pay Now
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-slate-500">
            Payment Progress
          </span>

          <span className="font-semibold text-green-600">
            {progress}%
          </span>
        </div>

        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Installments */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-5">
          Fee Installments
        </h3>

        <div className="space-y-4">
          {installments.map((item) => (
            <div
              key={item.title}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-100 rounded-2xl p-5"
            >
              <div>
                <h4 className="font-semibold text-slate-800">
                  {item.title}
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  Due on {item.due}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span className="font-bold text-slate-800">
                  ₹{item.amount.toLocaleString()}
                </span>

                {item.status === "Paid" ? (
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                    Paid
                  </span>
                ) : (
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-5">
          Fee Breakdown
        </h3>

        <div className="space-y-4">
          {breakdown.map((item) => (
            <div
              key={item.title}
              className="flex justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0"
            >
              <span className="text-slate-600">
                {item.title}
              </span>

              <span className="font-semibold text-slate-800">
                ₹{item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">
            Payment History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm">
                  Receipt No.
                </th>

                <th className="text-left px-6 py-4 text-sm">
                  Transaction ID
                </th>

                <th className="text-left px-6 py-4 text-sm">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-sm">
                  Mode
                </th>

                <th className="text-left px-6 py-4 text-sm">
                  Amount
                </th>

                <th className="text-center px-6 py-4 text-sm">
                  Receipt
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((item) => (
                <tr
                  key={item.receipt}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-5">
                    {item.receipt}
                  </td>

                  <td className="px-6 py-5">
                    {item.txn}
                  </td>

                  <td className="px-6 py-5">
                    {item.date}
                  </td>

                  <td className="px-6 py-5">
                    {item.mode}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {item.amount}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <button className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition">
                      <Download size={16} />
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}