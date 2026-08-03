<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../../config/db.php");

$sql = "SELECT * FROM exams ORDER BY exam_date DESC";

$result = mysqli_query($conn, $sql);

$exams = [];

while ($row = mysqli_fetch_assoc($result)) {
    $exams[] = $row;
}

echo json_encode([
    "status" => true,
    "data" => $exams
]);

?>