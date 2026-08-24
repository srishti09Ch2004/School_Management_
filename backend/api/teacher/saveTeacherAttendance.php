<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include("../../config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => false,
        "message" => "Invalid request method"
    ]);
    exit;
}

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);
    exit;
}

$teacher_id = intval($data["teacher_id"] ?? 0);
$attendance_date = $data["attendance_date"] ?? date("Y-m-d");
$status = trim($data["status"] ?? "Present");
$attendance_type = trim($data["attendance_type"] ?? "Manual");

if ($teacher_id <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid teacher ID"
    ]);
    exit;
}

if (!in_array($status, ["Present", "Absent", "Leave"])) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid attendance status"
    ]);
    exit;
}

$sql = "
    INSERT INTO teacher_attendance
    (
        teacher_id,
        attendance_date,
        status,
        attendance_type
    )
    VALUES (?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE
        status = VALUES(status),
        attendance_type = VALUES(attendance_type)
";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);
    exit;
}

mysqli_stmt_bind_param(
    $stmt,
    "isss",
    $teacher_id,
    $attendance_date,
    $status,
    $attendance_type
);

if (!mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "status" => false,
        "message" => mysqli_stmt_error($stmt)
    ]);
    exit;
}

echo json_encode([
    "status" => true,
    "message" => "Teacher attendance saved successfully"
]);

mysqli_stmt_close($stmt);
?>