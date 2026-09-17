<?php

// header("Content-Type: application/json");
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

// if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
//     http_response_code(200);
//     exit();
// }

// include("../../config/db.php");

// $data = json_decode(file_get_contents("php://input"), true);

// if (!$data) {
//     echo json_encode([
//         "status" => false,
//         "message" => "No Data Received"
//     ]);
//     exit();
// }

// $exam_name = trim($data["exam_name"] ?? "");
// $class = trim($data["class"] ?? "");
// $section = trim($data["section"] ?? "");
// $subject = trim($data["subject"] ?? "");
// $exam_date = $data["exam_date"] ?? "";
// $start_time = $data["start_time"] ?? "";
// $end_time = $data["end_time"] ?? "";
// $total_marks = isset($data["total_marks"]) ? (int)$data["total_marks"] : 0;
// $passing_marks = isset($data["passing_marks"]) ? (int)$data["passing_marks"] : 0;
// $status = trim($data["status"] ?? "");

// if (
//     $exam_name === "" ||
//     $class === "" ||
//     $section === "" ||
//     $subject === "" ||
//     $exam_date === "" ||
//     $start_time === "" ||
//     $end_time === ""
// ) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Please fill all required fields"
//     ]);
//     exit();
// }

// if ($total_marks < 0 || $passing_marks < 0) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Marks cannot be negative"
//     ]);
//     exit();
// }

// if ($passing_marks > $total_marks) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Passing marks cannot be greater than total marks"
//     ]);
//     exit();
// }

// $sql = "INSERT INTO exams
//     (
//         exam_name,
//         class,
//         section,
//         subject,
//         exam_date,
//         start_time,
//         end_time,
//         total_marks,
//         passing_marks,
//         status
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// $stmt = $conn->prepare($sql);

// if (!$stmt) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Database statement preparation failed"
//     ]);
//     exit();
// }

// $stmt->bind_param(
//     "sssssssiss",
//     $exam_name,
//     $class,
//     $section,
//     $subject,
//     $exam_date,
//     $start_time,
//     $end_time,
//     $total_marks,
//     $passing_marks,
//     $status
// );

// if ($stmt->execute()) {

//     echo json_encode([
//         "status" => true,
//         "message" => "Exam Added Successfully",
//         "id" => $stmt->insert_id
//     ]);

// } else {

//     echo json_encode([
//         "status" => false,
//         "message" => "Exam Add Failed: " . $stmt->error
//     ]);
// }

// $stmt->close();
// $conn->close();

// ?>





<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);
    exit();
}

$exam_session_id = isset($data["exam_session_id"])
    ? (int)$data["exam_session_id"]
    : 0;

$exam_name = trim($data["exam_name"] ?? "");
$class = trim($data["class"] ?? "");
$section = trim($data["section"] ?? "");
$subject = trim($data["subject"] ?? "");
$exam_date = trim($data["exam_date"] ?? "");
$start_time = trim($data["start_time"] ?? "");
$end_time = trim($data["end_time"] ?? "");
$total_marks = isset($data["total_marks"])
    ? (int)$data["total_marks"]
    : 0;
$passing_marks = isset($data["passing_marks"])
    ? (int)$data["passing_marks"]
    : 0;

$status = trim($data["status"] ?? "Scheduled");

if ($exam_session_id <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Exam session is required"
    ]);
    exit();
}

if (
    $exam_name === "" ||
    $class === "" ||
    $section === "" ||
    $subject === "" ||
    $exam_date === "" ||
    $start_time === "" ||
    $end_time === ""
) {
    echo json_encode([
        "status" => false,
        "message" => "Please fill all required fields"
    ]);
    exit();
}

if ($total_marks < 0 || $passing_marks < 0) {
    echo json_encode([
        "status" => false,
        "message" => "Marks cannot be negative"
    ]);
    exit();
}

if ($passing_marks > $total_marks) {
    echo json_encode([
        "status" => false,
        "message" => "Passing marks cannot be greater than total marks"
    ]);
    exit();
}

$sessionCheck = $conn->prepare(
    "SELECT id, status FROM exam_sessions WHERE id = ?"
);

$sessionCheck->bind_param("i", $exam_session_id);
$sessionCheck->execute();

$sessionResult = $sessionCheck->get_result();

if ($sessionResult->num_rows === 0) {
    echo json_encode([
        "status" => false,
        "message" => "Exam session not found"
    ]);
    exit();
}

$session = $sessionResult->fetch_assoc();

if ($session["status"] === "Completed" || $session["status"] === "Cancelled") {
    echo json_encode([
        "status" => false,
        "message" => "This exam session cannot be modified"
    ]);
    exit();
}

$sessionCheck->close();

$sql = "INSERT INTO exams
        (
            exam_session_id,
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
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "Database statement preparation failed"
    ]);
    exit();
}

$stmt->bind_param(
    "isssssssiss",
    $exam_session_id,
    $exam_name,
    $class,
    $section,
    $subject,
    $exam_date,
    $start_time,
    $end_time,
    $total_marks,
    $passing_marks,
    $status
);

if ($stmt->execute()) {
    echo json_encode([
        "status" => true,
        "message" => "Exam subject added successfully",
        "id" => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => "Exam add failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
