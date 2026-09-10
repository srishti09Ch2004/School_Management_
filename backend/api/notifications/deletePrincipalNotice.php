<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

ob_start();
ini_set("display_errors", 0);

include("../../config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

try {

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception(
            "Only POST method is allowed"
        );
    }

    $input = json_decode(
        file_get_contents("php://input"),
        true
    );

    if (!is_array($input)) {
        throw new Exception(
            "Invalid request data"
        );
    }

    $notice_id =
        $input["notice_id"] ?? null;

    $user_id =
        $input["user_id"] ?? null;

    if (
        !$notice_id ||
        !is_numeric($notice_id)
    ) {
        throw new Exception(
            "Notice ID is required"
        );
    }

    if (
        !$user_id ||
        !is_numeric($user_id)
    ) {
        throw new Exception(
            "User ID is required"
        );
    }

    $notice_id = (int)$notice_id;
    $user_id = (int)$user_id;

    /*
     * Verify Principal
     */
    $userQuery = "
        SELECT id, role
        FROM users
        WHERE id = ?
        LIMIT 1
    ";

    $userStmt =
        $conn->prepare($userQuery);

    if (!$userStmt) {
        throw new Exception(
            "Unable to verify user"
        );
    }

    $userStmt->bind_param(
        "i",
        $user_id
    );

    $userStmt->execute();

    $user =
        $userStmt
            ->get_result()
            ->fetch_assoc();

    $userStmt->close();

    if (!$user) {
        throw new Exception(
            "User not found"
        );
    }

    if (
        strtolower(
            trim($user["role"])
        ) !== "principal"
    ) {
        throw new Exception(
            "Only principals can delete principal notices"
        );
    }

    /*
     * Verify ownership
     */
    $checkQuery = "
        SELECT id
        FROM notices
        WHERE id = ?
          AND created_by = ?
          AND created_role = 'principal'
        LIMIT 1
    ";

    $checkStmt =
        $conn->prepare($checkQuery);

    if (!$checkStmt) {
        throw new Exception(
            "Unable to verify notice"
        );
    }

    $checkStmt->bind_param(
        "ii",
        $notice_id,
        $user_id
    );

    $checkStmt->execute();

    $exists =
        $checkStmt
            ->get_result()
            ->fetch_assoc();

    $checkStmt->close();

    if (!$exists) {
        throw new Exception(
            "You are not allowed to delete this notice."
        );
    }

    $conn->begin_transaction();

    /*
     * Delete notifications
     */
    $query = "
        DELETE FROM notifications
        WHERE notice_id = ?
    ";

    $stmt =
        $conn->prepare($query);

    if (!$stmt) {
        throw new Exception(
            "Unable to delete notifications"
        );
    }

    $stmt->bind_param(
        "i",
        $notice_id
    );

    $stmt->execute();
    $stmt->close();

    /*
     * Delete targets
     */
    $query = "
        DELETE FROM notice_targets
        WHERE notice_id = ?
    ";

    $stmt =
        $conn->prepare($query);

    if (!$stmt) {
        throw new Exception(
            "Unable to delete notice targets"
        );
    }

    $stmt->bind_param(
        "i",
        $notice_id
    );

    $stmt->execute();
    $stmt->close();

    /*
     * Delete notice
     */
    $query = "
        DELETE FROM notices
        WHERE id = ?
          AND created_by = ?
          AND created_role = 'principal'
    ";

    $stmt =
        $conn->prepare($query);

    if (!$stmt) {
        throw new Exception(
            "Unable to delete notice"
        );
    }

    $stmt->bind_param(
        "ii",
        $notice_id,
        $user_id
    );

    if (!$stmt->execute()) {
        throw new Exception(
            "Failed to delete notice"
        );
    }

    $stmt->close();

    $conn->commit();

    ob_clean();

    echo json_encode([
        "status" => true,
        "message" =>
            "Principal notice deleted successfully"
    ]);

} catch (Exception $e) {

    if (isset($conn)) {
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
?>