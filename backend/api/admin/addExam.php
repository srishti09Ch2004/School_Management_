<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$exam_name = $data["exam_name"];
$class = $data["class"];
$section = $data["section"];
$subject = $data["subject"];
$exam_date = $data["exam_date"];
$start_time = $data["start_time"];
$end_time = $data["end_time"];
$total_marks = $data["total_marks"];
$passing_marks = $data["passing_marks"];
$status = $data["status"];

$sql = "INSERT INTO exams
(exam_name, class, section, subject, exam_date, start_time, end_time, total_marks, passing_marks, status)
VALUES
('$exam_name','$class','$section','$subject','$exam_date','$start_time','$end_time','$total_marks','$passing_marks','$status')";

if(mysqli_query($conn,$sql))
{
    echo json_encode([
        "status"=>true,
        "message"=>"Exam Added Successfully"
    ]);
}
else
{
    echo json_encode([
        "status"=>false,
        "message"=>mysqli_error($conn)
    ]);
}