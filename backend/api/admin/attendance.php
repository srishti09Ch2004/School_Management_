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
$type = $_GET["type"] ?? "students";

/*
|--------------------------------------------------------------------------
| STUDENT ATTENDANCE
|--------------------------------------------------------------------------
*/

if ($type === "students") {

    $sql = "
        SELECT
            a.id,
            a.student_id,
            u.full_name AS name,
            s.admission_no,
            s.roll_no,
            s.class,
            s.section,
            a.attendance_date,
            a.status,
            a.attendance_type,
            a.created_at
        FROM attendance a

        INNER JOIN students s
            ON a.student_id = s.id

        INNER JOIN users u
            ON s.user_id = u.id

        WHERE a.attendance_date = ?

        ORDER BY
            CAST(s.roll_no AS UNSIGNED) ASC,
            u.full_name ASC
    ";

    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "s",
        $date
    );

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    $attendance = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $attendance[] = $row;
    }

    echo json_encode([
        "status" => true,
        "type" => "students",
        "date" => $date,
        "data" => $attendance
    ]);

    mysqli_stmt_close($stmt);
    exit;
}


/*
|--------------------------------------------------------------------------
| TEACHER ATTENDANCE
|--------------------------------------------------------------------------
*/

if ($type === "teachers") {

    $sql = "
        SELECT
            ta.id,
            ta.teacher_id,
            u.full_name AS name,
            u.email,
            ta.attendance_date,
            ta.status,
            ta.attendance_type,
            ta.created_at

        FROM teacher_attendance ta

        INNER JOIN users u
            ON ta.teacher_id = u.id

        WHERE ta.attendance_date = ?

        AND u.role = 'teacher'

        ORDER BY u.full_name ASC
    ";

    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "s",
        $date
    );

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    $attendance = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $attendance[] = $row;
    }

    echo json_encode([
        "status" => true,
        "type" => "teachers",
        "date" => $date,
        "data" => $attendance
    ]);

    mysqli_stmt_close($stmt);
    exit;
}


echo json_encode([
    "status" => false,
    "message" => "Invalid attendance type"
]);

?>