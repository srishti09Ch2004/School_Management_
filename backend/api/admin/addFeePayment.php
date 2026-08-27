<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include("../../config/db.php");

// OPTIONS

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

// Only POST

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid request method"
    ]);

    exit;
}

// Get JSON

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$data) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid JSON data"
    ]);

    exit;
}

//  Input

$user_id = isset($data["user_id"])
    ? intval($data["user_id"])
    : 0;

$fee_id = isset($data["fee_id"])
    ? intval($data["fee_id"])
    : 0;

$amount = isset($data["amount"])
    ? floatval($data["amount"])
    : 0;

$payment_date = !empty($data["payment_date"])
    ? $data["payment_date"]
    : date("Y-m-d");

$payment_method = !empty($data["payment_method"])
    ? trim($data["payment_method"])
    : "UPI";

$transaction_id = !empty($data["transaction_id"])
    ? trim($data["transaction_id"])
    : null;

$receipt_no = !empty($data["receipt_no"])
    ? trim($data["receipt_no"])
    : null;

$remarks = !empty($data["remarks"])
    ? trim($data["remarks"])
    : null;

// Basic Validation

if ($user_id <= 0 || $fee_id <= 0 || $amount <= 0) {

    echo json_encode([
        "status" => false,
        "message" => "user_id, fee_id and valid amount are required"
    ]);

    exit;
}


/*
 Find Parent + Student|
 Parent user_id -> parents -> student_id
*/

$parentSql = "
    SELECT
        id,
        student_id
    FROM parents
    WHERE user_id = ?
    LIMIT 1
";

$parentStmt = mysqli_prepare(
    $conn,
    $parentSql
);

if (!$parentStmt) {

    echo json_encode([
        "status" => false,
        "message" => "Parent query preparation failed"
    ]);

    exit;
}

mysqli_stmt_bind_param(
    $parentStmt,
    "i",
    $user_id
);

mysqli_stmt_execute(
    $parentStmt
);

$parentResult =
    mysqli_stmt_get_result($parentStmt);

$parent =
    mysqli_fetch_assoc($parentResult);

mysqli_stmt_close($parentStmt);


if (!$parent) {

    echo json_encode([
        "status" => false,
        "message" => "Parent not found"
    ]);

    exit;
}

$student_id =
    intval($parent["student_id"]);

//  Check Fee Belongs To Parent's Student

$feeSql = "
    SELECT
        id,
        student_id,
        total_fee,
        paid_fee,
        due_fee
    FROM fees
    WHERE id = ?
    AND student_id = ?
    LIMIT 1
";

$feeStmt = mysqli_prepare(
    $conn,
    $feeSql
);

if (!$feeStmt) {

    echo json_encode([
        "status" => false,
        "message" => "Fee query preparation failed"
    ]);

    exit;
}

mysqli_stmt_bind_param(
    $feeStmt,
    "ii",
    $fee_id,
    $student_id
);

mysqli_stmt_execute(
    $feeStmt
);

$feeResult =
    mysqli_stmt_get_result($feeStmt);

$fee =
    mysqli_fetch_assoc($feeResult);

mysqli_stmt_close($feeStmt);

if (!$fee) {

    echo json_encode([
        "status" => false,
        "message" => "Fee record not found"
    ]);

    exit;
}
// Check Due Amount

$current_due =
    floatval($fee["due_fee"]);

if ($current_due <= 0) {

    echo json_encode([
        "status" => false,
        "message" => "No due fee available"
    ]);

    exit;
}

if ($amount > $current_due) {

    echo json_encode([
        "status" => false,
        "message" => "Payment amount cannot be greater than due fee",
        "due_fee" => $current_due
    ]);

    exit;
}

// Calculate New Fee

$current_paid =
    floatval($fee["paid_fee"]);

$total_fee =
    floatval($fee["total_fee"]);

$new_paid =
    $current_paid + $amount;

$new_due =
    $total_fee - $new_paid;

if ($new_due < 0) {
    $new_due = 0;
}

$new_status =
    ($new_due <= 0)
        ? "Paid"
        : "Pending";
//  Generate Receipt Number

if (!$receipt_no) {

    $receipt_no =
        "REC-" . date("YmdHis");
}

// Database Transaction
mysqli_begin_transaction($conn);

try {

    // Insert Payment History

    $paymentSql = "
        INSERT INTO fee_payments
        (
            fee_id,
            student_id,
            amount,
            payment_date,
            payment_method,
            transaction_id,
            receipt_no,
            remarks
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ";

    $paymentStmt =
        mysqli_prepare(
            $conn,
            $paymentSql
        );

    if (!$paymentStmt) {
        throw new Exception(
            "Payment query preparation failed"
        );
    }

    mysqli_stmt_bind_param(
        $paymentStmt,
        "iidsssss",
        $fee_id,
        $student_id,
        $amount,
        $payment_date,
        $payment_method,
        $transaction_id,
        $receipt_no,
        $remarks
    );

    if (!mysqli_stmt_execute($paymentStmt)) {

        throw new Exception(
            "Payment history insert failed"
        );
    }

    $payment_id =
        mysqli_insert_id($conn);

    mysqli_stmt_close($paymentStmt);

// Update Fees

    $updateSql = "
        UPDATE fees
        SET
            paid_fee = ?,
            due_fee = ?,
            payment_date = ?,
            status = ?
        WHERE id = ?
        AND student_id = ?
    ";

    $updateStmt =
        mysqli_prepare(
            $conn,
            $updateSql
        );

    if (!$updateStmt) {

        throw new Exception(
            "Fee update preparation failed"
        );
    }

    mysqli_stmt_bind_param(
        $updateStmt,
        "ddssii",
        $new_paid,
        $new_due,
        $payment_date,
        $new_status,
        $fee_id,
        $student_id
    );

    if (!mysqli_stmt_execute($updateStmt)) {

        throw new Exception(
            "Fee update failed"
        );
    }

    mysqli_stmt_close($updateStmt);

// Commit

    mysqli_commit($conn);

// Success

    echo json_encode([

        "status" => true,

        "message" =>
            "Fee payment successful",

        "payment_id" =>
            $payment_id,

        "receipt_no" =>
            $receipt_no,

        "payment" => [

            "amount" =>
                $amount,

            "payment_date" =>
                $payment_date,

            "payment_method" =>
                $payment_method,

            "transaction_id" =>
                $transaction_id
        ],

        "fee" => [

            "fee_id" =>
                $fee_id,

            "student_id" =>
                $student_id,

            "total_fee" =>
                $total_fee,

            "paid_fee" =>
                $new_paid,

            "due_fee" =>
                $new_due,

            "status" =>
                $new_status
        ]
    ]);

} catch (Exception $e) {

    mysqli_rollback($conn);

    echo json_encode([

        "status" => false,

        "message" =>
            $e->getMessage()

    ]);
}
?>