
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include("../../config/db.php");

try {
// ONLY POST

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode([
            "status" => false,
            "message" => "Only POST method is allowed"
        ]);
        exit;
    }

     // GET JSON BODY

    $input = json_decode(
        file_get_contents("php://input"),
        true
    );

    if (!$input) {
        echo json_encode([
            "status" => false,
            "message" => "Invalid JSON data"
        ]);
        exit;
    }

    $notification_id = intval(
        $input['notification_id'] ?? 0
    );

    $user_id = intval(
        $input['user_id'] ?? 0
    );

   // VALIDATION

    if ($notification_id <= 0) {
        echo json_encode([
            "status" => false,
            "message" => "Valid notification_id is required"
        ]);
        exit;
    }

    if ($user_id <= 0) {
        echo json_encode([
            "status" => false,
            "message" => "Valid user_id is required"
        ]);
        exit;
    }

    // CHECK NOTIFICATION BELONGS TO USER

    $checkStmt = $conn->prepare("
        SELECT id, is_read
        FROM notifications
        WHERE id = ?
          AND user_id = ?
        LIMIT 1
    ");

    if (!$checkStmt) {
        throw new Exception(
            "Notification check failed: " . $conn->error
        );
    }

    $checkStmt->bind_param(
        "ii",
        $notification_id,
        $user_id
    );

    $checkStmt->execute();

    $checkResult = $checkStmt->get_result();
    $notification = $checkResult->fetch_assoc();

    $checkStmt->close();

    if (!$notification) {
        echo json_encode([
            "status" => false,
            "message" => "Notification not found for this user"
        ]);
        exit;
    }
// ALREADY READ

    if ((int)$notification['is_read'] === 1) {

        echo json_encode([
            "status" => true,
            "message" => "Notification is already marked as read"
        ]);

        exit;
    }

    // MARK AS READ

    $stmt = $conn->prepare("
        UPDATE notifications
        SET
            is_read = 1,
            read_at = NOW()
        WHERE id = ?
          AND user_id = ?
    ");

    if (!$stmt) {
        throw new Exception(
            "Update preparation failed: " . $conn->error
        );
    }

    $stmt->bind_param(
        "ii",
        $notification_id,
        $user_id
    );

    if (!$stmt->execute()) {
        throw new Exception(
            "Notification update failed: " . $stmt->error
        );
    }

    $stmt->close();

     // GET UPDATED UNREAD COUNT

    $countStmt = $conn->prepare("
        SELECT COUNT(*) AS unread_count
        FROM notifications
        WHERE user_id = ?
          AND is_read = 0
    ");

    if (!$countStmt) {
        throw new Exception(
            "Unread count query failed: " . $conn->error
        );
    }

    $countStmt->bind_param(
        "i",
        $user_id
    );

    $countStmt->execute();

    $countResult = $countStmt->get_result();
    $countData = $countResult->fetch_assoc();

    $countStmt->close();

    $unread_count = intval(
        $countData['unread_count'] ?? 0
    );

 // SUCCESS

    echo json_encode([
        "status" => true,
        "message" => "Notification marked as read",
        "notification_id" => $notification_id,
        "user_id" => $user_id,
        "is_read" => 1,
        "read_at" => date("Y-m-d H:i:s"),
        "unread_count" => $unread_count
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}

$conn->close();

?>
