<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include("../../config/db.php");


/*
|--------------------------------------------------------------------------
| Only GET request allowed
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "GET") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid request method"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Get logged-in user ID
|--------------------------------------------------------------------------
*/

$user_id = intval($_GET["user_id"] ?? 0);


/*
|--------------------------------------------------------------------------
| Validate user ID
|--------------------------------------------------------------------------
*/

if ($user_id <= 0) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid user ID"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Find student using users.id -> students.user_id
|--------------------------------------------------------------------------
*/

$studentSql = "
    SELECT
        s.id AS student_id,
        s.user_id,
        s.admission_no,
        s.class,
        s.section,
        s.roll_no,
        u.full_name,
        u.email
    FROM students s
    INNER JOIN users u
        ON s.user_id = u.id
    WHERE s.user_id = ?
    LIMIT 1
";


$studentStmt = mysqli_prepare($conn, $studentSql);


if (!$studentStmt) {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
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


if (!$studentResult || mysqli_num_rows($studentResult) === 0) {

    echo json_encode([
        "status" => false,
        "message" => "Student record not found"
    ]);

    exit;
}


$student = mysqli_fetch_assoc($studentResult);

$student_id = intval($student["student_id"]);


/*
|--------------------------------------------------------------------------
| Get attendance records
|--------------------------------------------------------------------------
*/

$attendanceSql = "
    SELECT
        id,
        student_id,
        teacher_id,
        attendance_date,
        status,
        attendance_type,
        created_at
    FROM attendance
    WHERE student_id = ?
    ORDER BY attendance_date DESC, id DESC
";


$attendanceStmt = mysqli_prepare(
    $conn,
    $attendanceSql
);


if (!$attendanceStmt) {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);

    exit;
}


mysqli_stmt_bind_param(
    $attendanceStmt,
    "i",
    $student_id
);


mysqli_stmt_execute($attendanceStmt);


$attendanceResult =
    mysqli_stmt_get_result($attendanceStmt);


$attendance = [];

$present = 0;
$absent = 0;


while ($row = mysqli_fetch_assoc($attendanceResult)) {

    $status = $row["status"];

    if ($status === "Present") {
        $present++;
    }

    if ($status === "Absent") {
        $absent++;
    }


    $attendance[] = [

        "id" =>
            intval($row["id"]),

        "student_id" =>
            intval($row["student_id"]),

        "teacher_id" =>
            $row["teacher_id"]
                ? intval($row["teacher_id"])
                : null,

        "attendance_date" =>
            $row["attendance_date"],

        "status" =>
            $status,

        "attendance_type" =>
            $row["attendance_type"] ?? "",

        "created_at" =>
            $row["created_at"]
    ];
}


/*
|--------------------------------------------------------------------------
| Calculate overall attendance
|--------------------------------------------------------------------------
*/

$total = count($attendance);

$percentage = $total > 0
    ? round(($present / $total) * 100)
    : 0;


/*
|--------------------------------------------------------------------------
| Final response
|--------------------------------------------------------------------------
*/

echo json_encode([

    "status" => true,

    "message" =>
        "Student attendance fetched successfully",

    "student" => [

        "student_id" =>
            $student_id,

        "user_id" =>
            intval($student["user_id"]),

        "name" =>
            $student["full_name"],

        "email" =>
            $student["email"],

        "admission_no" =>
            $student["admission_no"],

        "class" =>
            $student["class"],

        "section" =>
            $student["section"],

        "roll_no" =>
            $student["roll_no"]
    ],

    "summary" => [

        "total" =>
            $total,

        "present" =>
            $present,

        "absent" =>
            $absent,

        "percentage" =>
            $percentage
    ],

    "attendance" =>
        $attendance
]);


mysqli_stmt_close($studentStmt);
mysqli_stmt_close($attendanceStmt);

?>