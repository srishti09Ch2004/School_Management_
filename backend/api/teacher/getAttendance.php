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
| Get filters
|--------------------------------------------------------------------------
*/

$teacher_id = intval($_GET["teacher_id"] ?? 0);

$attendance_date = $_GET["attendance_date"] ?? "";


/*
|--------------------------------------------------------------------------
| Basic validation
|--------------------------------------------------------------------------
*/

if ($teacher_id <= 0) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid teacher ID"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| SQL Query
|--------------------------------------------------------------------------
*/

$sql = "
    SELECT
        a.id,
        a.student_id,
        a.teacher_id,
        a.attendance_date,
        a.status,
        a.attendance_type,
        a.created_at
    FROM attendance a
    WHERE a.teacher_id = ?
";


/*
|--------------------------------------------------------------------------
| Date filter
|--------------------------------------------------------------------------
*/

if ($attendance_date !== "") {

    $sql .= "
        AND a.attendance_date = ?
    ";
}


/*
|--------------------------------------------------------------------------
| Latest first
|--------------------------------------------------------------------------
*/

$sql .= "
    ORDER BY a.attendance_date DESC, a.id DESC
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
*/

if ($attendance_date !== "") {

    mysqli_stmt_bind_param(
        $stmt,
        "is",
        $teacher_id,
        $attendance_date
    );

} else {

    mysqli_stmt_bind_param(
        $stmt,
        "i",
        $teacher_id
    );
}


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


/*
|--------------------------------------------------------------------------
| Get result
|--------------------------------------------------------------------------
*/

$result = mysqli_stmt_get_result($stmt);

$attendance = [];


while ($row = mysqli_fetch_assoc($result)) {

    $attendance[] = $row;
}


/*
|--------------------------------------------------------------------------
| Response
|--------------------------------------------------------------------------
*/

echo json_encode([

    "status" => true,

    "message" => "Attendance fetched successfully",

    "data" => $attendance

]);


mysqli_stmt_close($stmt);

?>