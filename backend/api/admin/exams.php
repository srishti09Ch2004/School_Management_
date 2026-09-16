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
    id,
    exam_name,
    class,
    section,
    subject,
    exam_date,
    start_time,
    end_time,
    total_marks,
    passing_marks,
    status
    FROM exams
    ORDER BY exam_date ASC, start_time ASC";

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "status" => false,
        "message" => mysqli_error($conn),
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