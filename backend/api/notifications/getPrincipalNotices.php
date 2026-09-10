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

    $user_id =
        $_GET["user_id"] ?? null;

    if (!$user_id || !is_numeric($user_id)) {
        throw new Exception(
            "User ID is required"
        );
    }

    $user_id = (int)$user_id;

    /*
     * Verify Principal
     */
    $userQuery = "
        SELECT id, full_name, role
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
            "Only principals can access principal notices"
        );
    }

    /*
     * Fetch notices
     */
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
          AND created_role = 'principal'
        ORDER BY created_at DESC
    ";

    $stmt =
        $conn->prepare($query);

    if (!$stmt) {
        throw new Exception(
            "Unable to prepare notice query: " .
            $conn->error
        );
    }

    $stmt->bind_param(
        "i",
        $user_id
    );

    $stmt->execute();

    $result =
        $stmt->get_result();

    $notices = [];

    /*
     * Recipient count
     */
    $countQuery = "
        SELECT COUNT(*) AS total
        FROM notifications
        WHERE notice_id = ?
    ";

    $countStmt =
        $conn->prepare($countQuery);

    if (!$countStmt) {
        throw new Exception(
            "Unable to prepare count query"
        );
    }

    /*
     * Target label
     */
    while (
        $row =
            $result->fetch_assoc()
    ) {

        $noticeId =
            (int)$row["id"];

        $countStmt->bind_param(
            "i",
            $noticeId
        );

        $countStmt->execute();

        $count =
            $countStmt
                ->get_result()
                ->fetch_assoc();

        $row["recipient_count"] =
            (int)($count["total"] ?? 0);

        /*
         * Build audience label
         */
        if (
            $row["notice_for"] ===
            "Student"
        ) {

            $targetQuery = "
                SELECT
                    target_type,
                    target_id
                FROM notice_targets
                WHERE notice_id = ?
                LIMIT 1
            ";

            $targetStmt =
                $conn->prepare(
                    $targetQuery
                );

            if ($targetStmt) {

                $targetStmt->bind_param(
                    "i",
                    $noticeId
                );

                $targetStmt->execute();

                $target =
                    $targetStmt
                        ->get_result()
                        ->fetch_assoc();

                if (
                    $target &&
                    $target["target_type"] ===
                    "class"
                ) {

                    $row["target_label"] =
                        "Students";

                } else {

                    $row["target_label"] =
                        "Students";
                }

                $targetStmt->close();
            }

        } elseif (
            $row["notice_for"] ===
            "Parent"
        ) {

            $row["target_label"] =
                "Parents";

        } elseif (
            $row["notice_for"] ===
            "Teacher"
        ) {

            $row["target_label"] =
                "Teachers";

        } elseif (
            $row["notice_for"] ===
            "All"
        ) {

            $row["target_label"] =
                "Entire School";
        }

        $notices[] = $row;
    }

    $countStmt->close();
    $stmt->close();

    ob_clean();

    echo json_encode([
        "status" => true,
        "message" =>
            "Principal notices fetched successfully",
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