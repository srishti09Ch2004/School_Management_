<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);
    exit;
}

$id = $data["id"];

// Delete from students table
mysqli_query($conn, "DELETE FROM students WHERE user_id='$id'");

// Delete from users table
mysqli_query($conn, "DELETE FROM users WHERE id='$id'");

echo json_encode([
    "status" => true,
    "message" => "Student Deleted Successfully"
]);

?>