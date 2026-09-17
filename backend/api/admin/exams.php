<?php

// header("Content-Type: application/json");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

// if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
//     http_response_code(200);
//     exit();
// }

// include("../../config/db.php");

// $sql = "SELECT
//     id,
//     exam_name,
//     class,
//     section,
//     subject,
//     exam_date,
//     start_time,
//     end_time,
//     total_marks,
//     passing_marks,
//     status
//     FROM exams
//     ORDER BY exam_date ASC, start_time ASC";

// $result = mysqli_query($conn, $sql);

// if (!$result) {
//     echo json_encode([
//         "status" => false,
//         "message" => mysqli_error($conn),
//         "data" => []
//     ]);
//     exit();
// }

// $exams = [];

// while ($row = mysqli_fetch_assoc($result)) {
//     $exams[] = $row;
// }

// echo json_encode([
//     "status" => true,
//     "data" => $exams
// ]);

// mysqli_close($conn);

// ?>



<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include("../../config/db.php");

$sql = "SELECT
            e.id,
            e.exam_session_id,
            e.exam_name,
            e.class,
            e.section,
            e.subject,
            e.exam_date,
            e.start_time,
            e.end_time,
            e.total_marks,
            e.passing_marks,
            e.status,
            e.created_at,
            s.academic_year,
            s.exam_type,
            s.status AS session_status,
            s.start_date AS session_start_date,
            s.end_date AS session_end_date
        FROM exams e
        LEFT JOIN exam_sessions s
            ON s.id = e.exam_session_id
        ORDER BY e.exam_date ASC, e.start_time ASC";

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "status" => false,
        "message" => "Database error: " . mysqli_error($conn),
        "data" => []
    ]);
    exit();
}

$exams = [];

while ($row = mysqli_fetch_assoc($result)) {
    $exams[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $exams
]);

mysqli_close($conn);
?>
