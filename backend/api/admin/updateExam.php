<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

include("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No Data Received"
    ]);
    exit;
}

$id = $data['id'];
$exam_name = $data['exam_name'];
$class = $data['class'];
$section = $data['section'];
$subject = $data['subject'];
$exam_date = $data['exam_date'];
$start_time = $data['start_time'];
$end_time = $data['end_time'];
$total_marks = $data['total_marks'];
$passing_marks = $data['passing_marks'];
$status = $data['status'];

$sql = "UPDATE exams SET
exam_name=?,
class=?,
section=?,
subject=?,
exam_date=?,
start_time=?,
end_time=?,
total_marks=?,
passing_marks=?,
status=?
WHERE id=?";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssssssissi",
    $exam_name,
    $class,
    $section,
    $subject,
    $exam_date,
    $start_time,
    $end_time,
    $total_marks,
    $passing_marks,
    $status,
    $id
);

if ($stmt->execute()) {

    echo json_encode([
        "status" => true,
        "message" => "Exam Updated Successfully"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Update Failed"
    ]);

}