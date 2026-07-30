<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);
    exit;
}

$student_id   = $data["student_id"] ?? "";
$total_fee    = $data["total_fee"] ?? 0;
$paid_fee     = $data["paid_fee"] ?? 0;
$payment_date = $data["payment_date"] ?? date("Y-m-d");

$due_fee = $total_fee - $paid_fee;

$status = ($due_fee <= 0) ? "Paid" : "Pending";

if (empty($student_id) || $total_fee <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Student and total fee are required"
    ]);
    exit;
}

$checkStudent = mysqli_query(
    $conn,
    "SELECT id FROM students WHERE id='$student_id'"
);

if (mysqli_num_rows($checkStudent) === 0) {
    echo json_encode([
        "status" => false,
        "message" => "Student not found"
    ]);
    exit;
}

$sql = "
INSERT INTO fees
(student_id, total_fee, paid_fee, due_fee, payment_date, status)
VALUES
('$student_id', '$total_fee', '$paid_fee', '$due_fee', '$payment_date', '$status')
";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "status" => true,
        "message" => "Fee Added Successfully"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Failed to add fee"
    ]);
}

?>