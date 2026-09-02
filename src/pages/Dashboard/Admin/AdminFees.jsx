import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  IndianRupee,
  Wallet,
  CircleDollarSign,
  Eye,
  Download
  } from "lucide-react";

export default function AdminFees() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [feeSummary, setFeeSummary] = useState({
  total_fee: 0,
  total_paid: 0,
  total_due: 0,
  today_collection: 0,
});

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showFeeModal, setShowFeeModal] = useState(false);
  const [viewFee, setViewFee] = useState(null);

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyStudent, setHistoryStudent] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedFee, setSelectedFee] = useState(null);

  const [feeForm, setFeeForm] = useState({
  student_id: "",
  total_fee: "",
  payment_date: "",
});

 

  // Fetch Fees

  const fetchFees = async () => {
    try {
      const response = await fetch(
        "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/fees.php"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch fees");
      }

      const data = await response.json();

      console.log("Admin Fee Response:", data);

      if (data.status) {
        setFees(data.data || []);
        setFeeSummary(data.summary || {});
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Fetch Fees Error:", error);
    }
  };

//  Fetch Students

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/feeStudents.php"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch students");
      }

      const data = await response.json();

      console.log("Fee Students Response:", data);

      if (data.status) {
        setStudents(data.data || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Fetch Students Error:", error);
    }
  };

  // Initial Load

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  //  Fee Form Change
  const handleFeeChange = (e) => {
    const { name, value } = e.target;

    setFeeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
//  Add New Fee

const handleFeeSubmit = async () => {
  if (!feeForm.student_id || !feeForm.total_fee) {
    alert("Please select student and enter total fee");
    return;
  }

  const totalFee = Number(feeForm.total_fee);

  if (totalFee <= 0) {
    alert("Total fee must be greater than 0");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/addFee.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: Number(feeForm.student_id),
          total_fee: totalFee,
        }),
      }
    );

    const data = await response.json();

    console.log("Add Fee Response:", data);

    if (data.status) {
      alert("Fee assigned successfully");

      setShowFeeModal(false);

      setFeeForm({
        student_id: "",
        total_fee: "",
        payment_date: "",
      });

      await fetchFees();
    } else {
      alert(data.message || "Unable to assign fee");
    }
  } catch (error) {
    console.error("Add Fee Error:", error);
    alert("Unable to assign fee");
  }
};   

  // View Fee

  const handleViewFee = (fee) => {
    setViewFee(fee);
  };

  const handleOpenPaymentModal = (fee) => {
  const dueFee = Number(fee.due_fee || 0);

  if (dueFee <= 0) {
    alert("This fee is already fully paid");
    return;
  }

  setSelectedFee(fee);

  setPaymentForm({
    amount: "",
    payment_date: new Date()
      .toISOString()
      .split("T")[0],
    payment_method: "Cash",
    transaction_id: "",
    remarks: "",
  });

  setShowPaymentModal(true);
};


const handlePaymentChange = (e) => {
  const { name, value } = e.target;

  setPaymentForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handlePaymentSubmit = async () => {
  if (!selectedFee) {
    alert("Fee record not selected");
    return;
  }

  const amount = Number(paymentForm.amount);
  const dueFee = Number(selectedFee.due_fee || 0);

  if (!amount || amount <= 0) {
    alert("Please enter a valid payment amount");
    return;
  }

  if (amount > dueFee) {
    alert(
      `Payment cannot be greater than due fee ₹${dueFee.toLocaleString(
        "en-IN"
      )}`
    );
    return;
  }

  if (!paymentForm.payment_date) {
    alert("Please select payment date");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/addFeePayment.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fee_id: Number(selectedFee.id),
          student_id: Number(selectedFee.student_id),
          amount: amount,
          payment_date: paymentForm.payment_date,
          payment_method: paymentForm.payment_method,
          transaction_id: paymentForm.transaction_id,
          remarks: paymentForm.remarks,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to save payment");
    }

    const data = await response.json();

    console.log("Payment Response:", data);

    if (data.status) {
      alert(
        `Payment of ₹${amount.toLocaleString(
          "en-IN"
        )} collected successfully`
      );

      setShowPaymentModal(false);
      setSelectedFee(null);

      setPaymentForm({
        amount: "",
        payment_date: "",
        payment_method: "Cash",
        transaction_id: "",
        remarks: "",
      });

      await fetchFees();
    } else {
      alert(data.message || "Unable to collect payment");
    }
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Unable to collect payment");
  }
};

const closePaymentModal = () => {
  setShowPaymentModal(false);
  setSelectedFee(null);

  setPaymentForm({
    amount: "",
    payment_date: "",
    payment_method: "Cash",
    transaction_id: "",
    remarks: "",
  });
};

  // Payment History

  const handlePaymentHistory = async (fee) => {
    try {
      const response = await fetch(
        `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/feePayments.php?student_id=${fee.student_id}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch payment history");
      }

      const data = await response.json();

      console.log("Payment History Response:", data);

      if (data.status) {
        setPaymentHistory(data.data || []);
        setHistoryStudent(fee);
        setShowHistory(true);
      } else {
        alert(data.message || "No payment history found");
      }
    } catch (error) {
      console.error("Payment History Error:", error);
      alert("Unable to fetch payment history");
    }
  };


  const handleDownloadReceipt = (paymentId) => {
  if (!paymentId) {
    alert("Receipt not available");
    return;
  }

  const url =
    `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/paymentReceipt.php?payment_id=${paymentId}`;

  window.open(url, "_blank");
};

const handleLatestReceipt = async (fee) => {
  try {
    const response = await fetch(
      `http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/admin/feePayments.php?student_id=${fee.student_id}`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch payment history");
    }

    const data = await response.json();

    if (!data.status || !data.data || data.data.length === 0) {
      alert("No payment receipt available");
      return;
    }

    // API already returns latest payment first
    const latestPayment = data.data[0];

    handleDownloadReceipt(latestPayment.id);

  } catch (error) {
    console.error("Latest Receipt Error:", error);
    alert("Unable to download receipt");
  }
};

  //  Close Payment History

  const closePaymentHistory = () => {
    setShowHistory(false);
    setHistoryStudent(null);
    setPaymentHistory([]);
  };


  // Statistics

    const collectedFees = Number(
      feeSummary.total_paid || 0
    );

    const pendingFees = Number(
      feeSummary.total_due || 0
    );

    const todaysCollection = Number(
      feeSummary.today_collection || 0
    );

  // const today = new Date().toISOString().split("T")[0];

  // const todaysCollection = fees
  //   .filter((fee) => fee.payment_date === today)
  //   .reduce(
  //     (sum, fee) => sum + Number(fee.paid_fee || 0),
  //     0
  //   );

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

  // Search

  const filteredFees = useMemo(() => {
  const query = searchQuery.toLowerCase().trim();

  return fees.filter((fee) => {
    const matchesSearch =
      !query ||
      fee.full_name?.toLowerCase().includes(query);

    const feeDue = Number(fee.due_fee || 0);
    const feePaid = Number(fee.paid_fee || 0);
    const feeTotal = Number(fee.total_fee || 0);

    let currentStatus = "Pending";

    if (feeDue <= 0 && feeTotal > 0) {
      currentStatus = "Paid";
    } else if (feePaid > 0 && feeDue > 0) {
      currentStatus = "Partial";
    }

    const matchesStatus =
      statusFilter === "All" ||
      currentStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });
}, [fees, searchQuery, statusFilter]);
   

  // Render

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
          onClick={() => {
           setFeeForm({
            student_id: "",
            total_fee: "",
            payment_date: new Date()
              .toISOString()
              .split("T")[0],
          });

            setShowFeeModal(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition"
        >
          <Plus size={18} />
          Assign Fee
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
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>
      <div className="flex flex-wrap gap-2 mt-4">

        {["All", "Pending", "Partial", "Paid"].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}

      </div>


      {/* Fee Table */}

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

              {filteredFees.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No fee records found.
                  </td>
                </tr>

              ) : (

                filteredFees.map((fee) => (

                  <tr
                    key={fee.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-5 font-medium text-gray-800">
                      {fee.full_name || "N/A"}
                    </td>

                    <td className="px-6 py-5 text-center text-gray-600">
                      {fee.class || "—"}
                      {fee.section
                        ? ` - ${fee.section}`
                        : ""}
                    </td>

                    <td className="px-6 py-5 text-center">

                      <div className="font-semibold text-gray-800">
                        ₹
                        {Number(
                          fee.paid_fee || 0
                        ).toLocaleString("en-IN")}
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Total: ₹
                        {Number(
                          fee.total_fee || 0
                        ).toLocaleString("en-IN")}
                      </div>

                      {Number(fee.due_fee || 0) > 0 && (

                        <div className="text-xs text-red-500 mt-1">
                          Due: ₹
                          {Number(
                            fee.due_fee
                          ).toLocaleString("en-IN")}
                        </div>

                      )}

                    </td>

                    <td className="px-6 py-5 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          Number(fee.due_fee || 0) <= 0
                            ? "bg-green-100 text-green-700"
                            : Number(fee.paid_fee || 0) > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {Number(fee.due_fee || 0) <= 0
                          ? "Paid"
                          : Number(fee.paid_fee || 0) > 0
                          ? "Partial"
                          : "Pending"}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-2">

                        {/* View */}

                        <button
                          onClick={() =>
                            handleViewFee(fee)
                          }
                          className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                          title="View Fee Details"
                        >
                          <Eye size={16} />
                        </button>


                        {/* History */}

                        <button
                          onClick={() =>
                            handlePaymentHistory(fee)
                          }
                          className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition"
                          title="Payment History"
                        >
                          <Wallet size={16} />
                        </button>

                        {/* Receipt */}

                        <button
                          onClick={() => handleLatestReceipt(fee)}
                          disabled={Number(fee.paid_fee || 0) <= 0}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                            Number(fee.paid_fee || 0) > 0
                              ? "bg-green-50 text-green-600 hover:bg-green-100"
                              : "bg-gray-50 text-gray-300 cursor-not-allowed"
                          }`}
                          title={
                            Number(fee.paid_fee || 0) > 0
                              ? "Download Latest Receipt"
                              : "No Payment Available"
                          }
                        >
                          <Download size={16} />
                        </button>
                        {/* Collect Payment */}

                        <button
                          onClick={() => handleOpenPaymentModal(fee)}
                          disabled={Number(fee.due_fee || 0) <= 0}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                            Number(fee.due_fee || 0) > 0
                              ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                              : "bg-gray-50 text-gray-300 cursor-not-allowed"
                          }`}
                          title={
                            Number(fee.due_fee || 0) > 0
                              ? "Collect Payment"
                              : "Fee Fully Paid"
                          }
                        >
                          <IndianRupee size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

{/* ADD FEE MODAL */}

      {showFeeModal && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-3xl w-full max-w-2xl p-6">

            <div className="flex justify-between items-center mb-6">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Assign Fee
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add a new student fee record.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowFeeModal(false)
                }
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>


            <div className="grid md:grid-cols-2 gap-5">

              {/* Student */}

              <select
                name="student_id"
                value={feeForm.student_id}
                onChange={handleFeeChange}
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              >

                <option value="">
                  Select Student
                </option>

                {students.map((student) => (

                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {student.full_name ||
                      student.name ||
                      "Unknown Student"}
                    {" — Class "}
                    {student.class || "N/A"}
                    {student.section
                      ? ` - ${student.section}`
                      : ""}
                  </option>

                ))}

              </select>


              {/* Total Fee */}

              <input
                type="number"
                name="total_fee"
                placeholder="Total Fee"
                value={feeForm.total_fee}
                onChange={handleFeeChange}
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />


              


              {/* Date */}

              <input
                type="date"
                name="payment_date"
                value={feeForm.payment_date}
                onChange={handleFeeChange}
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>


            {/* Due */}

            <div className="mt-5 bg-gray-50 rounded-2xl p-4">

              <p className="text-sm text-gray-500">
                Due Fee
              </p>

              <p className="text-xl font-bold text-gray-800 mt-1">
                ₹
                {Number(feeForm.total_fee || 0).toLocaleString("en-IN")}
              </p>

            </div>


            {/* Buttons */}

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setShowFeeModal(false)
                }
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


{/* COLLECT PAYMENT MODAL */}

{showPaymentModal && selectedFee && (

  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-xl">

      {/* Header */}

      <div className="p-6 border-b flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Collect Payment
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Record a fee payment for the student.
          </p>
        </div>

        <button
          onClick={closePaymentModal}
          className="text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>

      </div>


      {/* Student Information */}

      <div className="p-6">

        <div className="bg-gray-50 rounded-2xl p-5 mb-5">

          <div className="flex justify-between items-start">

            <div>

              <p className="text-xs text-gray-500">
                Student
              </p>

              <p className="text-lg font-bold text-gray-800 mt-1">
                {selectedFee.full_name || "N/A"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Class {selectedFee.class || "N/A"}
                {selectedFee.section
                  ? ` - ${selectedFee.section}`
                  : ""}
              </p>

            </div>

            <div className="text-right">

              <p className="text-xs text-gray-500">
                Admission No.
              </p>

              <p className="font-semibold text-gray-700 mt-1">
                {selectedFee.admission_no || "—"}
              </p>

            </div>

          </div>

        </div>


        {/* Fee Summary */}

        <div className="grid grid-cols-3 gap-3 mb-6">

          <div className="bg-blue-50 rounded-2xl p-4">

            <p className="text-xs text-gray-500">
              Total Fee
            </p>

            <p className="font-bold text-gray-800 mt-1">
              ₹
              {Number(
                selectedFee.total_fee || 0
              ).toLocaleString("en-IN")}
            </p>

          </div>


          <div className="bg-green-50 rounded-2xl p-4">

            <p className="text-xs text-gray-500">
              Already Paid
            </p>

            <p className="font-bold text-green-600 mt-1">
              ₹
              {Number(
                selectedFee.paid_fee || 0
              ).toLocaleString("en-IN")}
            </p>

          </div>


          <div className="bg-red-50 rounded-2xl p-4">

            <p className="text-xs text-gray-500">
              Due Fee
            </p>

            <p className="font-bold text-red-600 mt-1">
              ₹
              {Number(
                selectedFee.due_fee || 0
              ).toLocaleString("en-IN")}
            </p>

          </div>

        </div>


        {/* Payment Form */}

        <div className="grid md:grid-cols-2 gap-5">

          {/* Amount */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount
            </label>

            <input
              type="number"
              name="amount"
              value={paymentForm.amount}
              onChange={handlePaymentChange}
              placeholder="Enter payment amount"
              min="1"
              max={Number(selectedFee.due_fee || 0)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>


          {/* Payment Date */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Date
            </label>

            <input
              type="date"
              name="payment_date"
              value={paymentForm.payment_date}
              onChange={handlePaymentChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>


          {/* Payment Method */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>

            <select
              name="payment_method"
              value={paymentForm.payment_method}
              onChange={handlePaymentChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >

              <option value="Cash">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Bank Transfer">
                Bank Transfer
              </option>

              <option value="Cheque">
                Cheque
              </option>

              <option value="Card">
                Card
              </option>

            </select>

          </div>


          {/* Transaction ID */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction ID
            </label>

            <input
              type="text"
              name="transaction_id"
              value={paymentForm.transaction_id}
              onChange={handlePaymentChange}
              placeholder="Optional"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>


          {/* Remarks */}

          <div className="md:col-span-2">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks
            </label>

            <textarea
              name="remarks"
              value={paymentForm.remarks}
              onChange={handlePaymentChange}
              placeholder="Optional remarks"
              rows="3"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />

          </div>

        </div>


        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={closePaymentModal}
            className="px-5 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handlePaymentSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium"
          >
            Collect Payment
          </button>

        </div>

      </div>

    </div>

  </div>

)}


{/* VIEW FEE MODAL */}

      {viewFee && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-xl">

            <div className="p-6 border-b flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {viewFee.full_name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Class {viewFee.class || "N/A"}
                  {viewFee.section
                    ? ` - ${viewFee.section}`
                    : ""}
                </p>

              </div>

              <button
                onClick={() =>
                  setViewFee(null)
                }
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>


            <div className="p-6 grid grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Total Fee
                </p>

                <p className="font-bold mt-1">
                  ₹
                  {Number(
                    viewFee.total_fee || 0
                  ).toLocaleString("en-IN")}
                </p>
              </div>


              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Paid Fee
                </p>

                <p className="font-bold mt-1 text-green-600">
                  ₹
                  {Number(
                    viewFee.paid_fee || 0
                  ).toLocaleString("en-IN")}
                </p>
              </div>


              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Due Fee
                </p>

                <p className="font-bold mt-1 text-red-600">
                  ₹
                  {Number(
                    viewFee.due_fee || 0
                  ).toLocaleString("en-IN")}
                </p>
              </div>


              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Payment Date
                </p>

                <p className="font-semibold mt-1">
                  {viewFee.payment_date || "—"}
                </p>
              </div>


              <div className="col-span-2 bg-gray-50 rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Status
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    viewFee.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {viewFee.status || "Pending"}
                </span>

              </div>

            </div>


            <div className="p-5 border-t flex justify-end">

              <button
                onClick={() =>
                  setViewFee(null)
                }
                className="px-5 py-2 rounded-xl border hover:bg-gray-50"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}           

{/* PAYMENT HISTORY MODAL */}

      {showHistory && historyStudent && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-xl">

            <div className="p-6 border-b flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Payment History
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {historyStudent.full_name}
                  {" — Class "}
                  {historyStudent.class}
                  {historyStudent.section
                    ? ` ${historyStudent.section}`
                    : ""}
                </p>

              </div>

              <button
                onClick={closePaymentHistory}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>


            <div className="p-6">

              {paymentHistory.length === 0 ? (

                <div className="text-center py-10 text-gray-500">
                  No payment history found.
                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="min-w-full">

                    <thead className="bg-gray-50">

                      <tr className="text-sm text-gray-600">

                        <th className="px-4 py-3 text-left">
                          Date
                        </th>

                        <th className="px-4 py-3 text-center">
                          Amount
                        </th>

                        <th className="px-4 py-3 text-center">
                          Method
                        </th>

                        <th className="px-4 py-3 text-center">
                          Receipt
                        </th>

                        <th className="px-4 py-3 text-left">
                          Remarks
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {paymentHistory.map(
                        (payment) => (

                          <tr
                            key={payment.id}
                            className="border-t"
                          >

                            <td className="px-4 py-4">
                              {payment.payment_date ||
                                "—"}
                            </td>


                            <td className="px-4 py-4 text-center font-semibold text-green-600">
                              ₹
                              {Number(
                                payment.amount || 0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </td>


                            <td className="px-4 py-4 text-center">

                              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs">
                                {payment.payment_method ||
                                  "—"}
                              </span>

                            </td>


                            <td className="px-4 py-4 text-center">

                              <div className="flex flex-col items-center gap-2">

                                <span className="font-medium text-gray-700">
                                  {payment.receipt_no || "—"}
                                </span>

                                {payment.id && (
                                  <button
                                    type="button"
                                    onClick={() => handleDownloadReceipt(payment.id)}
                                    className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-xl hover:bg-green-100 transition text-xs font-medium"
                                  >
                                    <Download size={14} />

                                    Download
                                  </button>
                                )}

                              </div>

                            </td>


                            <td className="px-4 py-4 text-gray-500">
                              {payment.remarks ||
                                "—"}
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>


            <div className="p-5 border-t flex justify-end">

              <button
                onClick={closePaymentHistory}
                className="px-5 py-2 rounded-xl border hover:bg-gray-50"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}