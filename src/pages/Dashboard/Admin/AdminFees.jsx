import {
  Search,
  Plus,
  IndianRupee,
  Wallet,
  CircleDollarSign,
  Eye,
  CreditCard,
} from "lucide-react";

export default function AdminFees() {
  const stats = [
    {
      title: "Collected Fees",
      value: "₹12.4 L",
      icon: <IndianRupee size={22} />,
      color: "bg-green-600",
    },
    {
      title: "Pending Fees",
      value: "₹3.8 L",
      icon: <Wallet size={22} />,
      color: "bg-red-500",
    },
    {
      title: "Today's Collection",
      value: "₹45,000",
      icon: <CircleDollarSign size={22} />,
      color: "bg-blue-600",
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
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Fee Management
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage fee collection and pending payments.
          </p>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition">
          <Plus size={16} />
          Collect Fee
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search student..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Student Fee Records
          </h2>

          <span className="text-sm text-gray-500">
            Total : {fees.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-4 text-left">
                  Student
                </th>

                <th className="px-6 py-4 text-center">
                  Class
                </th>

                <th className="px-6 py-4 text-center">
                  Amount
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {fees.map((fee) => (
                <tr
                  key={fee.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {fee.student}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {fee.class}
                  </td>

                  <td className="px-6 py-5 text-center font-semibold text-gray-700">
                    {fee.amount}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        fee.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
                        <Eye size={16} />
                      </button>

                      <button className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition">
                        <CreditCard size={16} />
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