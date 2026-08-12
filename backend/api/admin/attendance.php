<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

/*
|--------------------------------------------------------------------------
| GET ATTENDANCE
|--------------------------------------------------------------------------
| Examples:
|
| attendance.php
| attendance.php?date=2026-08-13
| attendance.php?student_id=5
|
*/

$date = $_GET["date"] ?? date("Y-m-d");
$student_id = $_GET["student_id"] ?? "";

$sql = "
    SELECT
        attendance.id,
        attendance.student_id,
        users.full_name,
        students.class,
        students.section,
        attendance.attendance_date,
        attendance.status,
        attendance.attendance_type,
        attendance.created_at
    FROM attendance

    INNER JOIN students
        ON attendance.student_id = students.id

    INNER JOIN users
        ON students.user_id = users.id
";

$params = [];
$types = "";

if ($student_id !== "") {

    $sql .= " WHERE attendance.student_id = ?";

    $params[] = $student_id;
    $types .= "i";

} else {

    $sql .= " WHERE attendance.attendance_date = ?";

    $params[] = $date;
    $types .= "s";
}

$sql .= " ORDER BY attendance.id DESC";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {

    echo json_encode([
        "status" => false,
        "message" => "Database prepare failed",
        "error" => mysqli_error($conn)
    ]);

    exit;
}

if (!empty($params)) {

    mysqli_stmt_bind_param(
        $stmt,
        $types,
        ...$params
    );
}

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$attendance = [];

while ($row = mysqli_fetch_assoc($result)) {

    $attendance[] = $row;
}

echo json_encode([
    "status" => true,
    "date" => $date,
    "data" => $attendance
]);

?>