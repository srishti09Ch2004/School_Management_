<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("../../config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

/*
|--------------------------------------------------------------------------
| STUDENT ID
|--------------------------------------------------------------------------
|
| Example:
| attendance.php?student_id=5
|
*/

$student_id = isset($_GET["student_id"])
    ? intval($_GET["student_id"])
    : 0;

if ($student_id <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Valid student_id is required"
    ]);
    exit;
}


/*
|--------------------------------------------------------------------------
| CHECK STUDENT
|--------------------------------------------------------------------------
*/

$student_sql = "
SELECT
    students.id,
    users.full_name,
    students.class,
    students.section,
    students.roll_no,
    students.admission_no
FROM students
INNER JOIN users
    ON students.user_id = users.id
WHERE students.id = ?
LIMIT 1
";

$stmt = mysqli_prepare($conn, $student_sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "Student query preparation failed"
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, "i", $student_id);
mysqli_stmt_execute($stmt);

$student_result = mysqli_stmt_get_result($stmt);
$student = mysqli_fetch_assoc($student_result);

if (!$student) {
    echo json_encode([
        "status" => false,
        "message" => "Student not found"
    ]);
    exit;
}


/*
|--------------------------------------------------------------------------
| OVERALL ATTENDANCE
|--------------------------------------------------------------------------
*/

$summary_sql = "
SELECT
    COUNT(*) AS total_days,

    SUM(
        CASE
            WHEN status = 'Present' THEN 1
            ELSE 0
        END
    ) AS present_days,

    SUM(
        CASE
            WHEN status = 'Absent' THEN 1
            ELSE 0
        END
    ) AS absent_days,

    SUM(
        CASE
            WHEN status = 'Leave' THEN 1
            ELSE 0
        END
    ) AS leave_days

FROM attendance

WHERE student_id = ?
";

$stmt = mysqli_prepare($conn, $summary_sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "Attendance summary query failed"
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, "i", $student_id);
mysqli_stmt_execute($stmt);

$summary_result = mysqli_stmt_get_result($stmt);
$summary = mysqli_fetch_assoc($summary_result);

$total_days = intval($summary["total_days"] ?? 0);
$present_days = intval($summary["present_days"] ?? 0);
$absent_days = intval($summary["absent_days"] ?? 0);
$leave_days = intval($summary["leave_days"] ?? 0);

$percentage = 0;

if ($total_days > 0) {
    $percentage = round(
        ($present_days / $total_days) * 100
    );
}


/*
|--------------------------------------------------------------------------
| ATTENDANCE HISTORY
|--------------------------------------------------------------------------
*/

$history = [];

$history_sql = "
SELECT
    id,
    attendance_date,
    status,
    attendance_type,
    created_at

FROM attendance

WHERE student_id = ?

ORDER BY attendance_date DESC, id DESC

LIMIT 100
";

$stmt = mysqli_prepare($conn, $history_sql);

if ($stmt) {

    mysqli_stmt_bind_param(
        $stmt,
        "i",
        $student_id
    );

    mysqli_stmt_execute($stmt);

    $history_result = mysqli_stmt_get_result($stmt);

    while ($row = mysqli_fetch_assoc($history_result)) {

        $history[] = [
            "id" => intval($row["id"]),

            "date" => $row["attendance_date"],

            "status" => $row["status"],

            "attendance_type" =>
                $row["attendance_type"],

            "created_at" =>
                $row["created_at"]
        ];
    }
}


/*
|--------------------------------------------------------------------------
| FINAL RESPONSE
|--------------------------------------------------------------------------
*/

echo json_encode([

    "status" => true,

    "message" => "Student attendance loaded successfully",

    "data" => [

        "student" => [
            "id" => intval($student["id"]),
            "full_name" => $student["full_name"],
            "class" => $student["class"],
            "section" => $student["section"],
            "roll_no" => $student["roll_no"],
            "admission_no" => $student["admission_no"]
        ],

        "summary" => [

            "total_days" => $total_days,

            "present_days" => $present_days,

            "absent_days" => $absent_days,

            "leave_days" => $leave_days,

            "percentage" => $percentage
        ],

        "history" => $history
    ]
]);

?>