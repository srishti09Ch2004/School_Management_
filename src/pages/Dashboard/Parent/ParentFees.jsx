
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
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedFee, setSelectedFee] = useState(null);
const [paymentAmount, setPaymentAmount] = useState("");
const [paymentMethod, setPaymentMethod] = useState("UPI");
const [transactionId, setTransactionId] = useState("");
const [paying, setPaying] = useState(false);
const [paymentMessage, setPaymentMessage] = useState("");

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

  const handlePayNow = (fee) => {

  setSelectedFee(fee);
  setPaymentAmount(fee.due_fee);
  setPaymentMethod("UPI");
  setTransactionId("");
  setPaymentMessage("");

  setShowPaymentModal(true);
};


const handlePayment = async () => {

  const storedUser =
    JSON.parse(localStorage.getItem("user"));

  if (!storedUser?.id) {

    setPaymentMessage(
      "Parent login information not found"
    );

    return;
  }

  const amount =
    Number(paymentAmount);

  if (!amount || amount <= 0) {

    setPaymentMessage(
      "Please enter a valid payment amount"
    );

    return;
  }

  if (
    selectedFee &&
    amount > Number(selectedFee.due_fee)
  ) {

    setPaymentMessage(
      "Payment cannot be greater than due amount"
    );

    return;
  }

  try {

    setPaying(true);
    setPaymentMessage("");

    const response = await fetch(
      "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/parent/payFee.php",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          user_id:
            storedUser.id,

          fee_id:
            selectedFee.id,

          amount:
            amount,

          payment_method:
            paymentMethod,

          transaction_id:
            transactionId || null,

          remarks:
            "Parent online payment"
        })
      }
    );

    const data =
      await response.json();

    console.log(
      "Payment Response:",
      data
    );

    if (!data.status) {

      setPaymentMessage(
        data.message ||
        "Payment failed"
      );

      return;
    }

    alert(
      `Payment successful!\nReceipt: ${data.receipt_no}`
    );

    setShowPaymentModal(false);

    setSelectedFee(null);

    setPaymentAmount("");

    setTransactionId("");

    await fetchFees();

  } catch (error) {

    console.error(
      "Payment Error:",
      error
    );

    setPaymentMessage(
      "Unable to process payment"
    );

  } finally {

    setPaying(false);
  }
};

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

                   <th className="text-left py-3 px-2 text-sm text-gray-500">
                      Action
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
                    <td className="py-4 px-2">

                      {Number(fee.due_fee) > 0 ? (

                        <button
                          onClick={() =>
                            handlePayNow(fee)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                        >
                          Pay Now
                        </button>

                      ) : (

                        <span className="text-sm text-gray-400">
                          No Due
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

        {showPaymentModal && selectedFee && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-xl">

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h3 className="text-xl font-bold text-gray-800">
                    Pay Fee
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Fee #{selectedFee.id}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowPaymentModal(false)
                  }
                  className="text-gray-400 hover:text-gray-700 text-xl"
                >
                  ×
                </button>

              </div>


              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 mb-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Total Fee
                  </span>

                  <span className="font-semibold">
                    {formatCurrency(
                      selectedFee.total_fee
                    )}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Already Paid
                  </span>

                  <span className="font-semibold text-green-600">
                    {formatCurrency(
                      selectedFee.paid_fee
                    )}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Remaining Due
                  </span>

                  <span className="font-bold text-red-600">
                    {formatCurrency(
                      selectedFee.due_fee
                    )}
                  </span>

                </div>

              </div>


              <div className="space-y-4">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount
                  </label>

                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) =>
                      setPaymentAmount(
                        e.target.value
                      )
                    }
                    max={selectedFee.due_fee}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter amount"
                  />

                </div>


                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>

                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none"
                  >

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Card">
                      Card
                    </option>

                    <option value="Net Banking">
                      Net Banking
                    </option>

                  </select>

                </div>


                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID
                  </label>

                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) =>
                      setTransactionId(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none"
                    placeholder="Enter transaction ID"
                  />

                </div>


                {paymentMessage && (

                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
                    {paymentMessage}
                  </div>

                )}


                <div className="flex gap-3 pt-2">

                  <button
                    onClick={() =>
                      setShowPaymentModal(false)
                    }
                    className="flex-1 border border-gray-200 py-3 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlePayment}
                    disabled={paying}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium disabled:opacity-50"
                  >
                    {paying
                      ? "Processing..."
                      : "Pay Now"}
                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

    </div>
  );
}