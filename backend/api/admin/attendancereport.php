<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include("../../config/db.php");

$sql = "SELECT
            a.id,
            a.student_id,
            a.attendance_date,
            a.status,
            a.attendance_type,
            s.admission_no,
            s.class,
            s.section,
            s.roll_no,
            u.full_name
        FROM attendance a
        LEFT JOIN students s
            ON a.student_id = s.id
        LEFT JOIN users u
            ON s.user_id = u.id
        ORDER BY a.attendance_date DESC, a.id DESC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "status" => false,
        "message" => "Database error: " . $conn->error
    ]);
    exit;
}

$attendance = [];

while ($row = $result->fetch_assoc()) {
    $attendance[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $attendance
]);

$conn->close();

?>