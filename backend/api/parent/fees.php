<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include("../../config/db.php");

// Only GET request allowed

if ($_SERVER["REQUEST_METHOD"] !== "GET") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid request method"
    ]);

    exit;
}

// Get parent user id

$user_id = $_GET["user_id"] ?? "";

if ($user_id === "") {

    echo json_encode([
        "status" => false,
        "message" => "Parent user id is required"
    ]);

    exit;
}

// Find parent

$parentSql = "
    SELECT
        id,
        user_id,
        father_name,
        mother_name,
        phone,
        occupation,
        address
    FROM parents
    WHERE user_id = ?
    LIMIT 1
";

$parentStmt = mysqli_prepare($conn, $parentSql);

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

mysqli_stmt_execute($parentStmt);

$parentResult = mysqli_stmt_get_result($parentStmt);

if (mysqli_num_rows($parentResult) === 0) {

    echo json_encode([
        "status" => false,
        "message" => "Parent not found"
    ]);

    exit;
}

$parent = mysqli_fetch_assoc($parentResult);

mysqli_stmt_close($parentStmt);

/*

 Find student linked with this parent|
 This assumes parents table contains student_id.
*/

$studentSql = "
    SELECT
        s.id AS student_id,
        s.user_id,
        u.full_name,
        u.email,
        s.admission_no,
        s.class,
        s.section,
        s.roll_no,
        s.gender,
        s.dob,
        s.phone,
        s.address,
        s.status
    FROM students s
    INNER JOIN users u
        ON s.user_id = u.id
    INNER JOIN parents p
        ON p.student_id = s.id
    WHERE p.user_id = ?
    LIMIT 1
";

$studentStmt = mysqli_prepare($conn, $studentSql);

if (!$studentStmt) {

    echo json_encode([
        "status" => false,
        "message" => "Student query preparation failed"
    ]);

    exit;
}

mysqli_stmt_bind_param(
    $studentStmt,
    "i",
    $user_id
);

mysqli_stmt_execute($studentStmt);

$studentResult = mysqli_stmt_get_result($studentStmt);

if (mysqli_num_rows($studentResult) === 0) {

    echo json_encode([
        "status" => false,
        "message" => "No student associated with this parent"
    ]);

    exit;
}

$student = mysqli_fetch_assoc($studentResult);

mysqli_stmt_close($studentStmt);

$student_id = (int)$student["student_id"];

// Fetch fee records

$feeSql = "
    SELECT
        id,
        student_id,
        total_fee,
        paid_fee,
        due_fee,
        payment_date,
        status
    FROM fees
    WHERE student_id = ?
    ORDER BY payment_date DESC, id DESC
";

$feeStmt = mysqli_prepare($conn, $feeSql);

if (!$feeStmt) {

    echo json_encode([
        "status" => false,
        "message" => "Fee query preparation failed"
    ]);

    exit;
}

mysqli_stmt_bind_param(
    $feeStmt,
    "i",
    $student_id
);

mysqli_stmt_execute($feeStmt);

$feeResult = mysqli_stmt_get_result($feeStmt);

// Prepare fee data

$fees = [];

$totalFee = 0;
$totalPaid = 0;
$totalDue = 0;

while ($row = mysqli_fetch_assoc($feeResult)) {

    $total = (float)$row["total_fee"];
    $paid = (float)$row["paid_fee"];
    $due = (float)$row["due_fee"];

    $totalFee += $total;
    $totalPaid += $paid;
    $totalDue += $due;

    $fees[] = [
        "id" => (int)$row["id"],
        "student_id" => (int)$row["student_id"],
        "total_fee" => $total,
        "paid_fee" => $paid,
        "due_fee" => $due,
        "payment_date" => $row["payment_date"],
        "status" => $row["status"]
    ];
}

mysqli_stmt_close($feeStmt);

// Overall payment status

if ($totalFee <= 0) {

    $overallStatus = "No Fee Record";

} elseif ($totalDue <= 0) {

    $overallStatus = "Paid";

} else {

    $overallStatus = "Pending";
}

// Payment percentage

$paymentPercentage = 0;

if ($totalFee > 0) {

    $paymentPercentage =
        ($totalPaid / $totalFee) * 100;
}

// Final response

echo json_encode([

    "status" => true,

    "message" =>
        "Parent fee details fetched successfully",

    "student" => [
        "id" => $student["student_id"],
        "user_id" => $student["user_id"],
        "name" => $student["full_name"],
        "email" => $student["email"],
        "admission_no" => $student["admission_no"],
        "class" => $student["class"],
        "section" => $student["section"],
        "roll_no" => $student["roll_no"]
    ],

    "summary" => [

        "total_fee" => $totalFee,

        "total_paid" => $totalPaid,

        "total_due" => $totalDue,

        "status" => $overallStatus,

        "payment_percentage" =>
            round($paymentPercentage, 2)
    ],

    "fees" => $fees

]);

// Fetch Payment History

$paymentSql = "
    SELECT
        id,
        fee_id,
        student_id,
        amount,
        payment_date,
        payment_method,
        transaction_id,
        receipt_no,
        remarks,
        created_at
    FROM fee_payments
    WHERE student_id = ?
    ORDER BY payment_date DESC, id DESC
";

$paymentStmt = mysqli_prepare(
    $conn,
    $paymentSql
);

$payments = [];

if ($paymentStmt) {

    mysqli_stmt_bind_param(
        $paymentStmt,
        "i",
        $student_id
    );

    mysqli_stmt_execute(
        $paymentStmt
    );

    $paymentResult =
        mysqli_stmt_get_result($paymentStmt);

    while (
        $row =
        mysqli_fetch_assoc($paymentResult)
    ) {

        $payments[] = [

            "id" =>
                (int)$row["id"],

            "fee_id" =>
                (int)$row["fee_id"],

            "student_id" =>
                (int)$row["student_id"],

            "amount" =>
                (float)$row["amount"],

            "payment_date" =>
                $row["payment_date"],

            "payment_method" =>
                $row["payment_method"],

            "transaction_id" =>
                $row["transaction_id"],

            "receipt_no" =>
                $row["receipt_no"],

            "remarks" =>
                $row["remarks"],

            "created_at" =>
                $row["created_at"]
        ];
    }

    mysqli_stmt_close($paymentStmt);
}

?>
