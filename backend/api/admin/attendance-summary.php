<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    echo json_encode([
        "status" => false,
        "message" => "Invalid request method"
    ]);
    exit;
}

$date = $_GET["date"] ?? date("Y-m-d");

$monthStart = date("Y-m-01", strtotime($date));
$monthEnd = date("Y-m-t", strtotime($date));


/*
|--------------------------------------------------------------------------
| STUDENT MONTHLY SUMMARY
|--------------------------------------------------------------------------
*/

$studentSql = "
    SELECT
        SUM(status = 'Present') AS present,
        SUM(status = 'Absent') AS absent,
        SUM(status = 'Leave') AS leave_count,
        COUNT(*) AS total

    FROM attendance

    WHERE attendance_date BETWEEN ? AND ?
";

$stmt = mysqli_prepare($conn, $studentSql);

mysqli_stmt_bind_param(
    $stmt,
    "ss",
    $monthStart,
    $monthEnd
);

mysqli_stmt_execute($stmt);

$studentResult = mysqli_stmt_get_result($stmt);

$student = mysqli_fetch_assoc($studentResult);

mysqli_stmt_close($stmt);


/*
|--------------------------------------------------------------------------
| TEACHER MONTHLY SUMMARY
|--------------------------------------------------------------------------
*/

$teacherSql = "
    SELECT
        SUM(status = 'Present') AS present,
        SUM(status = 'Absent') AS absent,
        SUM(status = 'Leave') AS leave_count,
        COUNT(*) AS total

    FROM teacher_attendance

    WHERE attendance_date BETWEEN ? AND ?
";

$stmt = mysqli_prepare($conn, $teacherSql);

mysqli_stmt_bind_param(
    $stmt,
    "ss",
    $monthStart,
    $monthEnd
);

mysqli_stmt_execute($stmt);

$teacherResult = mysqli_stmt_get_result($stmt);

$teacher = mysqli_fetch_assoc($teacherResult);

mysqli_stmt_close($stmt);


/*
|--------------------------------------------------------------------------
| RESPONSE
|--------------------------------------------------------------------------
*/

echo json_encode([
    "status" => true,

    "date" => $date,

    "month" => date("F Y", strtotime($date)),

    "month_start" => $monthStart,

    "month_end" => $monthEnd,

    "students" => [
        "present" => intval($student["present"] ?? 0),
        "absent" => intval($student["absent"] ?? 0),
        "leave" => intval($student["leave_count"] ?? 0),
        "total" => intval($student["total"] ?? 0)
    ],

    "teachers" => [
        "present" => intval($teacher["present"] ?? 0),
        "absent" => intval($teacher["absent"] ?? 0),
        "leave" => intval($teacher["leave_count"] ?? 0),
        "total" => intval($teacher["total"] ?? 0)
    ]
]);

?>