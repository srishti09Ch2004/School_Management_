import { useState, useEffect, useMemo } from "react";
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
const [fees, setFees] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [showFeeModal, setShowFeeModal] = useState(false);
const [viewFee, setViewFee] = useState(null);

const [payFeeData, setPayFeeData] = useState(null);

const [paymentForm, setPaymentForm] = useState({
  payment_amount: "",
  payment_date: "",
});
const [students, setStudents] = useState([]);

const [feeForm, setFeeForm] = useState({
  student_id: "",
  total_fee: "",
  paid_fee: "",
  payment_date: "",
});

const fetchFees = () => {
  fetch("http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/fees.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.status) {
        setFees(data.data);
      }
    });
};

useEffect(() => {
  fetchFees();
  fetchStudents();
}, []);

const handleFeeChange = (e) => {
  setFeeForm({
    ...feeForm,
    [e.target.name]: e.target.value,
  });
};

const handleFeeSubmit = async () => {
  if (
    !feeForm.student_id ||
    !feeForm.total_fee ||
    !feeForm.paid_fee ||
    !feeForm.payment_date
  ) {
    alert("Please fill all fields");
    return;
  }

  if (Number(feeForm.paid_fee) > Number(feeForm.total_fee)) {
    alert("Paid fee cannot be greater than total fee");
    return;
  }

  const response = await fetch(
    "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/addFee.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feeForm),
    }
  );

const handlePayFee = (fee) => {
  setPayFeeData(fee);

  setPaymentForm({
    payment_amount: "",
    payment_date: new Date().toISOString().split("T")[0],
  });
};

  const data = await response.json();

  alert(data.message);

  if (data.status) {
    setShowFeeModal(false);

    setFeeForm({
      student_id: "",
      total_fee: "",
      paid_fee: "",
      payment_date: "",
    });

    fetchFees();
  }
};

const handlePayFee = (fee) => {

  setPayFeeData(fee);

  setPaymentForm({
    payment_amount: "",
    payment_date: new Date().toISOString().split("T")[0],
  });

};

const handleViewFee = (fee) => {
  setViewFee(fee);
};

const fetchStudents = () => {
  fetch("http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/feeStudents.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        setStudents(data.data);
      }
    });
};


const collectedFees = fees.reduce(
  (sum, fee) => sum + Number(fee.paid_fee || 0),
  0
);

const pendingFees = fees.reduce(
  (sum, fee) => sum + Number(fee.due_fee || 0),
  0
);

const today = new Date().toISOString().split("T")[0];

const todaysCollection = fees
  .filter((fee) => fee.payment_date === today)
  .reduce(
    (sum, fee) => sum + Number(fee.paid_fee || 0),
    0
  );

  const stats = [
  {
    title: "Collected Fees",
    value: `₹${collectedFees.toLocaleString("en-IN")}`,
    icon: IndianRupee,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Pending Fees",
    value: `₹${pendingFees.toLocaleString("en-IN")}`,
    icon: Wallet,
    bg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Today's Collection",
    value: `₹${todaysCollection.toLocaleString("en-IN")}`,
    icon: CircleDollarSign,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];
  

const filteredFees = useMemo(() => {
  const query = searchQuery.toLowerCase().trim();

  if (!query) return fees;

  return fees.filter((fee) =>
    fee.full_name.toLowerCase().includes(query)
  );
}, [fees, searchQuery]);

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

        <button
          onClick={() => setShowFeeModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition"
        >
          <Plus size={18} />
          Collect Fee
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-xl font-bold text-gray-800 mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`${item.bg} w-11 h-11 rounded-2xl flex items-center justify-center`}
                >
                  <Icon
                    size={20}
                    className={item.iconColor}
                  />
                </div>
              </div>
            </div>
          );
        })}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            Total : {filteredFees.length}
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
              {filteredFees.map((fee) => (
                <tr
                  key={fee.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {fee.full_name}
                  </td>

                  <td className="px-6 py-5 text-center text-gray-600">
                    {fee.class}
                  </td>

                 <td className="px-6 py-5 text-center">
                    <div className="font-semibold text-gray-800">
                      ₹{Number(fee.paid_fee).toLocaleString("en-IN")}
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      Total: ₹{Number(fee.total_fee).toLocaleString("en-IN")}
                    </div>

                    {Number(fee.due_fee) > 0 && (
                      <div className="text-xs text-red-500 mt-1">
                        Due: ₹{Number(fee.due_fee).toLocaleString("en-IN")}
                      </div>
                    )}
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
                      <button
                        onClick={() => handleViewFee(fee)}
                        className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                        title="View Fee Details"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => handlePayFee(fee)}
                        className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition"
                        title="Pay Due Fee"
                      >
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

      {showFeeModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-3xl w-full max-w-2xl p-6">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Collect Fee
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add a new student fee payment record.
          </p>
        </div>

        <button
          onClick={() => setShowFeeModal(false)}
          className="text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <select
          name="student_id"
          value={feeForm.student_id}
          onChange={handleFeeChange}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.full_name} — Class {student.class}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="total_fee"
          placeholder="Total Fee"
          value={feeForm.total_fee}
          onChange={handleFeeChange}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="number"
          name="paid_fee"
          placeholder="Paid Fee"
          value={feeForm.paid_fee}
          onChange={handleFeeChange}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="date"
          name="payment_date"
          value={feeForm.payment_date}
          onChange={handleFeeChange}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      <div className="mt-5 bg-gray-50 rounded-2xl p-4">
        <p className="text-sm text-gray-500">
          Due Fee
        </p>

        <p className="text-xl font-bold text-gray-800 mt-1">
          ₹
          {Math.max(
            0,
            Number(feeForm.total_fee || 0) -
            Number(feeForm.paid_fee || 0)
          )}
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowFeeModal(false)}
          className="px-5 py-2 rounded-xl border border-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={handleFeeSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
        >
          Save Fee
        </button>

      </div>

    </div>
  </div>
)}

{viewFee && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-xl">

      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {viewFee.full_name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Class {viewFee.class} - {viewFee.section}
          </p>
        </div>

        <button
          onClick={() => setViewFee(null)}
          className="text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Fee</p>
          <p className="font-bold mt-1">
            ₹{Number(viewFee.total_fee).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Paid Fee</p>
          <p className="font-bold mt-1 text-green-600">
            ₹{Number(viewFee.paid_fee).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Due Fee</p>
          <p className="font-bold mt-1 text-red-600">
            ₹{Number(viewFee.due_fee).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Payment Date</p>
          <p className="font-semibold mt-1">
            {viewFee.payment_date || "—"}
          </p>
        </div>

        <div className="col-span-2 bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Status</p>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              viewFee.status === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {viewFee.status}
          </span>
        </div>

      </div>

      <div className="p-5 border-t flex justify-end">
        <button
          onClick={() => setViewFee(null)}
          className="px-5 py-2 rounded-xl border hover:bg-gray-50"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

{payFeeData && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-3xl w-full max-w-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Collect Due Fee
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {payFeeData.full_name}
          </p>
        </div>

        <button
          onClick={() => setPayFeeData(null)}
          className="text-2xl text-gray-400"
        >
          ×
        </button>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Fee</span>
          <span className="font-semibold">
            ₹{Number(payFeeData.total_fee).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Already Paid</span>
          <span className="font-semibold text-green-600">
            ₹{Number(payFeeData.paid_fee).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Due</span>
          <span className="font-semibold text-red-600">
            ₹{Number(payFeeData.due_fee).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="space-y-4">

        <input
          type="number"
          placeholder="Payment Amount"
          value={paymentForm.payment_amount}
          max={payFeeData.due_fee}
          onChange={(e) =>
            setPaymentForm({
              ...paymentForm,
              payment_amount: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="date"
          value={paymentForm.payment_date}
          onChange={(e) =>
            setPaymentForm({
              ...paymentForm,
              payment_date: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setPayFeeData(null)}
          className="px-5 py-2 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            if (
              !paymentForm.payment_amount ||
              !paymentForm.payment_date
            ) {
              alert("Please enter payment details");
              return;
            }

            if (
              Number(paymentForm.payment_amount) >
              Number(payFeeData.due_fee)
            ) {
              alert("Payment cannot be greater than due fee");
              return;
            }

            const response = await fetch(
              "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/payFee.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fee_id: payFeeData.id,
                  payment_amount: paymentForm.payment_amount,
                  payment_date: paymentForm.payment_date,
                }),
              }
            );

            const data = await response.json();

            alert(data.message);

            if (data.status) {
              setPayFeeData(null);
              fetchFees();
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
        >
          Pay Fee
        </button>

      </div>

    </div>
  </div>
)}

    </div>
  );
}