import {
  Search,
  Plus,
  IndianRupee,
  Wallet,
  CircleDollarSign,
  Eye,
} from "lucide-react";

export default function AdminFees() {
  const stats = [
    {
      title: "Collected Fees",
      value: "₹12.4 L",
      icon: <IndianRupee size={20} />,
      color: "bg-green-600",
    },
    {
      title: "Pending Fees",
      value: "₹3.8 L",
      icon: <Wallet size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Today's Collection",
      value: "₹45,000",
      icon: <CircleDollarSign size={20} />,
      color: "bg-red-600",
    },
  ];

  const fees = [
    {
      id: 1,
      student: "Rahul Sharma",
      class: "10-A",
      amount: "₹25,000",
      status: "Paid",
    },
    {
      id: 2,
      student: "Priya Singh",
      class: "9-B",
      amount: "₹20,000",
      status: "Pending",
    },
    {
      id: 3,
      student: "Ankit Verma",
      class: "8-C",
      amount: "₹18,000",
      status: "Paid",
    },
    {
      id: 4,
      student: "Sneha Gupta",
      class: "11-A",
      amount: "₹28,000",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Fee Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage fee collection and pending payments.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm">
          <Plus size={18} />
          Collect Fee
        </button>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-gray-500">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {item.value}
              </h2>
            </div>

            <div
              className={`${item.color} w-11 h-11 rounded-xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search student..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Student Fee Records
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-8 py-4 text-sm font-semibold text-gray-600">
                  Student
                </th>

                <th className="text-center px-8 py-4 text-sm font-semibold text-gray-600">
                  Class
                </th>

                <th className="text-center px-8 py-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="text-center px-8 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-center px-8 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {fees.map((fee) => (
                <tr
                  key={fee.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-8 py-5 font-medium text-gray-800">
                    {fee.student}
                  </td>

                  <td className="text-center text-gray-600">
                    {fee.class}
                  </td>

                  <td className="text-center font-semibold text-gray-700">
                    {fee.amount}
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        fee.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg text-sm">
                        <Eye size={16} />
                        View
                      </button>

                      <button className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg text-sm">
                        Collect
                      </button>
                    </div>
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