import {
  User,
  GraduationCap,
  Hash,
  IndianRupee,
  Receipt,
  CircleDollarSign,
} from "lucide-react";

export default function ParentFees() {
  const fees = [
    {
      month: "April 2026",
      amount: "₹8,000",
      dueDate: "10 Apr 2026",
      status: "Paid",
    },
    {
      month: "May 2026",
      amount: "₹8,000",
      dueDate: "10 May 2026",
      status: "Paid",
    },
    {
      month: "June 2026",
      amount: "₹8,000",
      dueDate: "10 Jun 2026",
      status: "Pending",
    },
    {
      month: "July 2026",
      amount: "₹8,000",
      dueDate: "10 Jul 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Fee Details
      </h2>

      {/* Student Information */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Student Name
              </p>

              <h3 className="font-bold">
                Aarti Sharma
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <GraduationCap size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Class
              </p>

              <h3 className="font-bold">
                10-A
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Hash size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Admission No
              </p>

              <h3 className="font-bold">
                FA1023
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Total Fees
              </p>

              <h3 className="text-xl font-bold mt-4">
                ₹32,000
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <IndianRupee size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Paid Amount
              </p>

              <h3 className="text-xl font-bold text-green-600 mt-4">
                ₹16,000
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <CircleDollarSign size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Pending Amount
              </p>

              <h3 className="text-xl font-bold text-red-600 mt-4">
                ₹16,000
              </h3>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <Receipt size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Fee History */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold">
            Fee History
          </h3>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">
            Pay Now
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-sm text-gray-500">
                  Month
                </th>

                <th className="text-left py-3 text-sm text-gray-500">
                  Amount
                </th>

                <th className="text-left py-3 text-sm text-gray-500">
                  Due Date
                </th>

                <th className="text-left py-3 text-sm text-gray-500">
                  Status
                </th>

                <th className="text-left py-3 text-sm text-gray-500">
                  Receipt
                </th>
              </tr>
            </thead>

            <tbody>
              {fees.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100"
                >
                  <td className="py-4 font-medium">
                    {item.month}
                  </td>

                  <td className="py-4">
                    {item.amount}
                  </td>

                  <td className="py-4 text-gray-600">
                    {item.dueDate}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        item.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4">
                    {item.status === "Paid" ? (
                      <button className="text-blue-600 font-medium">
                        Download
                      </button>
                    ) : (
                      <span className="text-gray-400">
                        -
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Important Notice */}
        <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-4">
          <p className="text-red-700 text-sm font-medium">
            ₹16,000 fees are pending. Please pay before
            10 July 2026 to avoid late charges.
          </p>
        </div>
      </div>
    </div>
  );
}