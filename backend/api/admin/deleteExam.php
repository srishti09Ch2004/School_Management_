<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id"])) {

    echo json_encode([
        "status" => false,
        "message" => "Exam ID is required"
    ]);

    exit;
}

$id = intval($data["id"]);

$sql = "DELETE FROM exams WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    if ($stmt->affected_rows > 0) {

        echo json_encode([
            "status" => true,
            "message" => "Exam Deleted Successfully"
        ]);

    } else {

        echo json_encode([
            "status" => false,
            "message" => "Exam not found"
        ]);

    }

} else {

    echo json_encode([
        "status" => false,
        "message" => "Delete Failed"
    ]);

}

$stmt->close();
$conn->close();