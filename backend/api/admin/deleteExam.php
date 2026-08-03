<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

$sql = "DELETE FROM exams WHERE id=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if($stmt->execute())
{
    echo json_encode([
        "status"=>true,
        "message"=>"Exam Deleted Successfully"
    ]);
}
else
{
    echo json_encode([
        "status"=>false,
        "message"=>"Delete Failed"
    ]);
}