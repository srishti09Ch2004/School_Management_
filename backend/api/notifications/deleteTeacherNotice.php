<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

ob_start();
ini_set("display_errors", 0);

include("../../config/db.php");

try {

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception("Only POST method is allowed");
    }

    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        throw new Exception("Invalid request data");
    }

    $notice_id = $input["notice_id"] ?? null;
    $teacher_id = $input["teacher_id"] ?? null;

    if (!$notice_id || !is_numeric($notice_id)) {
        throw new Exception("Notice ID is required");
    }

    if (!$teacher_id || !is_numeric($teacher_id)) {
        throw new Exception("Teacher ID is required");
    }

    $checkQuery = "
        SELECT id
        FROM notices
        WHERE id = ?
          AND created_by = ?
          AND created_role = 'Teacher'
        LIMIT 1
    ";

    $checkStmt = $conn->prepare($checkQuery);

    if (!$checkStmt) {
        throw new Exception("Unable to verify notice");
    }

    $checkStmt->bind_param(
        "ii",
        $notice_id,
        $teacher_id
    );

    $checkStmt->execute();

    $result = $checkStmt->get_result();

    if (!$result->fetch_assoc()) {
        throw new Exception(
            "You are not allowed to delete this notice."
        );
    }

    $checkStmt->close();

    $conn->begin_transaction();

    $notificationQuery = "
        DELETE FROM notifications
        WHERE notice_id = ?
    ";

    $notificationStmt = $conn->prepare($notificationQuery);

    if ($notificationStmt) {
        $notificationStmt->bind_param("i", $notice_id);
        $notificationStmt->execute();
        $notificationStmt->close();
    }

    $deleteQuery = "
        DELETE FROM notices
        WHERE id = ?
          AND created_by = ?
          AND created_role = 'Teacher'
    ";

    $deleteStmt = $conn->prepare($deleteQuery);

    if (!$deleteStmt) {
        throw new Exception("Unable to delete notice");
    }

    $deleteStmt->bind_param(
        "ii",
        $notice_id,
        $teacher_id
    );

    if (!$deleteStmt->execute()) {
        throw new Exception("Failed to delete notice");
    }

    $deleteStmt->close();

    $conn->commit();

    ob_clean();

    echo json_encode([
        "status" => true,
        "message" => "Notice deleted successfully"
    ]);

} catch (Exception $e) {

    if (isset($conn) && $conn->connect_errno === 0) {
        try {
            $conn->rollback();
        } catch (Throwable $ignored) {
        }
    }

    ob_clean();

    http_response_code(400);

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}