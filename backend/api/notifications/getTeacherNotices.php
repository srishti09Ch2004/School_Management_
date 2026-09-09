<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

ob_start();
ini_set("display_errors", 0);

include("../../config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

try {

    if ($_SERVER["REQUEST_METHOD"] !== "GET") {
        throw new Exception("Only GET method is allowed");
    }

    $user_id = $_GET["user_id"] ?? $_GET["teacher_id"] ?? null;

    if (!$user_id || !is_numeric($user_id)) {
        throw new Exception("User ID is required");
    }

    $user_id = (int)$user_id;

    // Verify logged-in Teacher
    $userQuery = "
        SELECT id, full_name, role
        FROM users
        WHERE id = ?
        LIMIT 1
    ";

    $userStmt = $conn->prepare($userQuery);

    if (!$userStmt) {
        throw new Exception(
            "Unable to verify user: " . $conn->error
        );
    }

    $userStmt->bind_param("i", $user_id);
    $userStmt->execute();

    $userResult = $userStmt->get_result();
    $user = $userResult->fetch_assoc();

    $userStmt->close();

    if (!$user) {
        throw new Exception("User not found");
    }

    if (strtolower(trim($user["role"])) !== "teacher") {
        throw new Exception(
            "Only teachers can access teacher notices"
        );
    }

    // Fetch notices created by this Teacher
    $query = "
        SELECT
            id,
            title,
            description,
            notice_type,
            priority,
            notice_for,
            created_by,
            created_role,
            publish_date,
            expiry_date,
            status,
            created_at,
            updated_at
        FROM notices
        WHERE created_by = ?
          AND created_role = 'teacher'
        ORDER BY created_at DESC
    ";

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        throw new Exception(
            "Unable to prepare notice query: " . $conn->error
        );
    }

    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    $result = $stmt->get_result();

    $notices = [];

    // Count recipients from notifications
    $countQuery = "
        SELECT COUNT(*) AS total
        FROM notifications
        WHERE notice_id = ?
    ";

    $countStmt = $conn->prepare($countQuery);

    if (!$countStmt) {
        throw new Exception(
            "Unable to prepare recipient query: " . $conn->error
        );
    }

    while ($row = $result->fetch_assoc()) {

        $noticeId = (int)$row["id"];

        $countStmt->bind_param("i", $noticeId);
        $countStmt->execute();

        $countResult = $countStmt->get_result();
        $countRow = $countResult->fetch_assoc();

        $row["recipient_count"] = (int)(
            $countRow["total"] ?? 0
        );

        // Keep frontend-compatible field
        $row["for"] = $row["notice_for"];

        $notices[] = $row;
    }

    $countStmt->close();
    $stmt->close();

    ob_clean();

    echo json_encode([
        "status" => true,
        "message" => "Teacher notices fetched successfully",
        "data" => $notices
    ]);

} catch (Exception $e) {

    ob_clean();

    http_response_code(400);

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}
?>