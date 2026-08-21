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
| Get parameters
|--------------------------------------------------------------------------
*/

$class = $_GET["class"] ?? "";

$section = $_GET["section"] ?? "";

$attendance_date = $_GET["attendance_date"] ?? "";


/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

if ($class === "") {

    echo json_encode([
        "status" => false,
        "message" => "Class is required"
    ]);

    exit;
}


if ($section === "") {

    echo json_encode([
        "status" => false,
        "message" => "Section is required"
    ]);

    exit;
}


if ($attendance_date === "") {

    echo json_encode([
        "status" => false,
        "message" => "Attendance date is required"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Fetch students + attendance
|--------------------------------------------------------------------------
|
| students = student information
| users = student name/email
| attendance = attendance for selected date
|
|--------------------------------------------------------------------------
*/

$sql = "

    SELECT

        s.id AS student_id,

        s.user_id,

        s.admission_no,

        s.class,

        s.section,

        s.roll_no,

        s.gender,

        s.dob,

        s.phone,

        s.address,

        s.status AS student_status,

        u.full_name,

        u.email,

        a.id AS attendance_id,

        a.teacher_id,

        a.attendance_date,

        a.status AS attendance_status,

        a.attendance_type,

        a.created_at

    FROM students s

    LEFT JOIN users u
        ON s.user_id = u.id

    LEFT JOIN attendance a
        ON a.student_id = s.id
        AND a.attendance_date = ?

    WHERE s.class = ?
    AND s.section = ?

    ORDER BY
        CAST(s.roll_no AS UNSIGNED) ASC,
        s.id ASC

";


$stmt = mysqli_prepare($conn, $sql);


if (!$stmt) {

    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn)
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Bind parameters
|--------------------------------------------------------------------------
|
| attendance_date = string
| class           = string
| section         = string
|
|--------------------------------------------------------------------------
*/

mysqli_stmt_bind_param(
    $stmt,
    "sss",
    $attendance_date,
    $class,
    $section
);


/*
|--------------------------------------------------------------------------
| Execute
|--------------------------------------------------------------------------
*/

if (!mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "status" => false,
        "message" => mysqli_stmt_error($stmt)
    ]);

    exit;
}


$result = mysqli_stmt_get_result($stmt);


/*
|--------------------------------------------------------------------------
| Prepare response
|--------------------------------------------------------------------------
*/

$students = [];


while ($row = mysqli_fetch_assoc($result)) {

    $students[] = [

        "student_id" => intval(
            $row["student_id"]
        ),

        "user_id" => intval(
            $row["user_id"]
        ),

        "name" => $row["full_name"],

        "email" => $row["email"],

        "admission_no" =>
            $row["admission_no"],

        "class" =>
            $row["class"],

        "section" =>
            $row["section"],

        "roll_no" =>
            $row["roll_no"],

        "gender" =>
            $row["gender"],

        "dob" =>
            $row["dob"],

        "phone" =>
            $row["phone"],

        "address" =>
            $row["address"],

        "student_status" =>
            $row["student_status"],

        "attendance_id" =>
            $row["attendance_id"]
                ? intval($row["attendance_id"])
                : null,

        "teacher_id" =>
            $row["teacher_id"]
                ? intval($row["teacher_id"])
                : null,

        "attendance_date" =>
            $row["attendance_date"],

        "status" =>
            $row["attendance_status"]
                ?? "Not Marked",

        "attendance_type" =>
            $row["attendance_type"]
                ?? "",

        "created_at" =>
            $row["created_at"]
    ];
}


/*
|--------------------------------------------------------------------------
| Success response
|--------------------------------------------------------------------------
*/

echo json_encode([

    "status" => true,

    "message" =>
        "Attendance fetched successfully",

    "class" =>
        $class,

    "section" =>
        $section,

    "attendance_date" =>
        $attendance_date,

    "total" =>
        count($students),

    "data" =>
        $students
]);


mysqli_stmt_close($stmt);

?>