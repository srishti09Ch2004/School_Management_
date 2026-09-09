<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ob_start();
ini_set("display_errors", 0);

include("../../config/db.php");

try {

    $teacher_id = $_GET["teacher_id"] ?? null;

    if (!$teacher_id || !is_numeric($teacher_id)) {
        throw new Exception("Teacher ID is required");
    }

    $query = "
        SELECT
            id,
            title,
            description,
            notice_type,
            priority,
            `for`,
            created_by,
            created_role,
            publish_date,
            expiry_date,
            status,
            created_at,
            updated_at
        FROM notices
        WHERE created_by = ?
          AND created_role = 'Teacher'
        ORDER BY created_at DESC
    ";

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        throw new Exception("Unable to prepare notice query");
    }

    $stmt->bind_param("i", $teacher_id);
    $stmt->execute();

    $result = $stmt->get_result();

    $notices = [];

    while ($row = $result->fetch_assoc()) {

        $noticeId = (int)$row["id"];

        $recipientCount = 0;

        $countQuery = "
            SELECT COUNT(*) AS total
            FROM notifications
            WHERE notice_id = ?
        ";

        $countStmt = $conn->prepare($countQuery);

        if ($countStmt) {
            $countStmt->bind_param("i", $noticeId);
            $countStmt->execute();

            $countResult = $countStmt->get_result();
            $countRow = $countResult->fetch_assoc();

            $recipientCount = (int)($countRow["total"] ?? 0);

            $countStmt->close();
        }

        $row["recipient_count"] = $recipientCount;

        $notices[] = $row;
    }

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