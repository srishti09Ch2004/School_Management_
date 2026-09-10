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
        throw new Exception("Only POST method is allowed");
    }

    $input = json_decode(
        file_get_contents("php://input"),
        true
    );

    if (!is_array($input)) {
        throw new Exception("Invalid request data");
    }

    $user_id = $input["user_id"] ?? null;

    $title = trim($input["title"] ?? "");
    $audience = trim($input["audience"] ?? "Students");

    $class_name = trim(
        $input["class_name"] ?? "ALL"
    );

    $section = trim(
        $input["section"] ?? "ALL"
    );

    $notice_type = trim(
        $input["notice_type"] ?? "General"
    );

    $priority = trim(
        $input["priority"] ?? "Medium"
    );

    $description = trim(
        $input["description"] ?? ""
    );

    $expiry_date = !empty($input["expiry_date"])
        ? trim($input["expiry_date"])
        : null;

    /*
     * Validate Principal
     */
    if (!$user_id || !is_numeric($user_id)) {
        throw new Exception("Invalid user ID");
    }

    $user_id = (int)$user_id;

    $userQuery = "
        SELECT
            id,
            full_name,
            role
        FROM users
        WHERE id = ?
        LIMIT 1
    ";

    $userStmt = $conn->prepare($userQuery);

    if (!$userStmt) {
        throw new Exception(
            "Unable to verify user: " .
            $conn->error
        );
    }

    $userStmt->bind_param(
        "i",
        $user_id
    );

    $userStmt->execute();

    $userResult = $userStmt->get_result();
    $user = $userResult->fetch_assoc();

    $userStmt->close();

    if (!$user) {
        throw new Exception("User not found");
    }

    if (
        strtolower(trim($user["role"])) !==
        "principal"
    ) {
        throw new Exception(
            "Only principals can create school notices"
        );
    }

    /*
     * Validate notice
     */
    if ($title === "") {
        throw new Exception(
            "Notice title is required"
        );
    }

    if ($description === "") {
        throw new Exception(
            "Notice content is required"
        );
    }

    /*
     * Validate priority
     */
    $allowedPriorities = [
        "Low",
        "Medium",
        "High"
    ];

    if (
        !in_array(
            $priority,
            $allowedPriorities,
            true
        )
    ) {
        $priority = "Medium";
    }

    /*
     * Convert frontend audience
     * to notices.notice_for enum
     */
    $audienceMap = [
        "Students" => "Student",
        "Parents" => "Parent",
        "Teachers" => "Teacher",
        "All" => "All"
    ];

    if (
        !isset($audienceMap[$audience])
    ) {
        throw new Exception(
            "Invalid notice audience"
        );
    }

    $noticeFor =
        $audienceMap[$audience];

    /*
     * Normalize class / section
     */
    $class_name =
        strtoupper($class_name) === "ALL"
            ? "ALL"
            : $class_name;

    $section =
        strtoupper($section) === "ALL"
            ? "ALL"
            : $section;

    $conn->begin_transaction();

    /*
     * Create notice
     */
    $noticeQuery = "
        INSERT INTO notices
        (
            title,
            description,
            notice_type,
            priority,
            notice_for,
            created_by,
            created_role,
            publish_date,
            expiry_date,
            status
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            'principal',
            NOW(),
            ?,
            'Published'
        )
    ";

    $noticeStmt =
        $conn->prepare($noticeQuery);

    if (!$noticeStmt) {
        throw new Exception(
            "Unable to prepare notice query: " .
            $conn->error
        );
    }

    $noticeStmt->bind_param(
        "sssssis",
        $title,
        $description,
        $notice_type,
        $priority,
        $noticeFor,
        $user_id,
        $expiry_date
    );

    if (!$noticeStmt->execute()) {
        throw new Exception(
            "Failed to save notice: " .
            $noticeStmt->error
        );
    }

    $noticeId =
        (int)$noticeStmt->insert_id;

    $noticeStmt->close();

    /*
     * Get target users
     */
    $recipients = [];

    /*
     * STUDENTS
     */
    if ($noticeFor === "Student") {

        if ($class_name === "ALL") {

            $query = "
                SELECT
                    id,
                    user_id
                FROM students
                WHERE status = 'Active'
                  AND user_id IS NOT NULL
            ";

            $stmt =
                $conn->prepare($query);

        } elseif ($section === "ALL") {

            $query = "
                SELECT
                    id,
                    user_id
                FROM students
                WHERE class = ?
                  AND status = 'Active'
                  AND user_id IS NOT NULL
            ";

            $stmt =
                $conn->prepare($query);

        } else {

            $query = "
                SELECT
                    id,
                    user_id
                FROM students
                WHERE class = ?
                  AND section = ?
                  AND status = 'Active'
                  AND user_id IS NOT NULL
            ";

            $stmt =
                $conn->prepare($query);
        }

        if (!$stmt) {
            throw new Exception(
                "Unable to find students: " .
                $conn->error
            );
        }

        if ($class_name === "ALL") {

            $stmt->execute();

        } elseif ($section === "ALL") {

            $stmt->bind_param(
                "s",
                $class_name
            );

            $stmt->execute();

        } else {

            $stmt->bind_param(
                "ss",
                $class_name,
                $section
            );

            $stmt->execute();
        }

        $result =
            $stmt->get_result();

        while (
            $row =
                $result->fetch_assoc()
        ) {

            $recipients[] = [
                "target_type" =>
                    (
                        $class_name === "ALL" ||
                        $section === "ALL"
                    )
                    ? "class"
                    : "student",

                "target_role" =>
                    "student",

                "target_id" =>
                    (int)$row["id"],

                "user_id" =>
                    (int)$row["user_id"]
            ];
        }

        $stmt->close();
    }

    /*
     * PARENTS
     */
    elseif ($noticeFor === "Parent") {

        if ($class_name === "ALL") {

            $query = "
                SELECT
                    p.student_id,
                    p.user_id
                FROM parents p
                INNER JOIN students s
                    ON s.id = p.student_id
                WHERE s.status = 'Active'
                  AND p.user_id IS NOT NULL
            ";

            $stmt =
                $conn->prepare($query);

        } elseif ($section === "ALL") {

            $query = "
                SELECT
                    p.student_id,
                    p.user_id
                FROM parents p
                INNER JOIN students s
                    ON s.id = p.student_id
                WHERE s.class = ?
                  AND s.status = 'Active'
                  AND p.user_id IS NOT NULL
            ";

            $stmt =
                $conn->prepare($query);

        } else {

            $query = "
                SELECT
                    p.student_id,
                    p.user_id
                FROM parents p
                INNER JOIN students s
                    ON s.id = p.student_id
                WHERE s.class = ?
                  AND s.section = ?
                  AND s.status = 'Active'
                  AND p.user_id IS NOT NULL
            ";

            $stmt =
                $conn->prepare($query);
        }

        if (!$stmt) {
            throw new Exception(
                "Unable to find parents: " .
                $conn->error
            );
        }

        if ($class_name === "ALL") {

            $stmt->execute();

        } elseif ($section === "ALL") {

            $stmt->bind_param(
                "s",
                $class_name
            );

            $stmt->execute();

        } else {

            $stmt->bind_param(
                "ss",
                $class_name,
                $section
            );

            $stmt->execute();
        }

        $result =
            $stmt->get_result();

        while (
            $row =
                $result->fetch_assoc()
        ) {

            $recipients[] = [
                "target_type" =>
                    (
                        $class_name === "ALL" ||
                        $section === "ALL"
                    )
                    ? "class"
                    : "student",

                "target_role" =>
                    "parent",

                "target_id" =>
                    (int)$row["student_id"],

                "user_id" =>
                    (int)$row["user_id"]
            ];
        }

        $stmt->close();
    }

    /*
     * TEACHERS
     */
    elseif ($noticeFor === "Teacher") {

        $query = "
            SELECT
                id,
                user_id
            FROM teachers
            WHERE user_id IS NOT NULL
        ";

        $stmt =
            $conn->prepare($query);

        if (!$stmt) {
            throw new Exception(
                "Unable to find teachers: " .
                $conn->error
            );
        }

        $stmt->execute();

        $result =
            $stmt->get_result();

        while (
            $row =
                $result->fetch_assoc()
        ) {

            $recipients[] = [
                "target_type" =>
                    "role",

                "target_role" =>
                    "teacher",

                "target_id" =>
                    (int)$row["id"],

                "user_id" =>
                    (int)$row["user_id"]
            ];
        }

        $stmt->close();
    }

    /*
     * ENTIRE SCHOOL
     */
    elseif ($noticeFor === "All") {

        /*
         * Students
         */
        $query = "
            SELECT user_id
            FROM students
            WHERE status = 'Active'
              AND user_id IS NOT NULL
        ";

        $stmt =
            $conn->prepare($query);

        if (!$stmt) {
            throw new Exception(
                "Unable to find school users"
            );
        }

        $stmt->execute();

        $result =
            $stmt->get_result();

        while (
            $row =
                $result->fetch_assoc()
        ) {

            $recipients[] = [
                "target_type" =>
                    "role",

                "target_role" =>
                    "student",

                "target_id" =>
                    null,

                "user_id" =>
                    (int)$row["user_id"]
            ];
        }

        $stmt->close();

        /*
         * Parents
         */
        $query = "
            SELECT DISTINCT
                p.user_id
            FROM parents p
            INNER JOIN students s
                ON s.id = p.student_id
            WHERE s.status = 'Active'
              AND p.user_id IS NOT NULL
        ";

        $stmt =
            $conn->prepare($query);

        if (!$stmt) {
            throw new Exception(
                "Unable to find parent users"
            );
        }

        $stmt->execute();

        $result =
            $stmt->get_result();

        while (
            $row =
                $result->fetch_assoc()
        ) {

            $recipients[] = [
                "target_type" =>
                    "role",

                "target_role" =>
                    "parent",

                "target_id" =>
                    null,

                "user_id" =>
                    (int)$row["user_id"]
            ];
        }

        $stmt->close();

        /*
         * Teachers
         */
        $query = "
            SELECT user_id
            FROM teachers
            WHERE user_id IS NOT NULL
        ";

        $stmt =
            $conn->prepare($query);

        if (!$stmt) {
            throw new Exception(
                "Unable to find teacher users"
            );
        }

        $stmt->execute();

        $result =
            $stmt->get_result();

        while (
            $row =
                $result->fetch_assoc()
        ) {

            $recipients[] = [
                "target_type" =>
                    "role",

                "target_role" =>
                    "teacher",

                "target_id" =>
                    null,

                "user_id" =>
                    (int)$row["user_id"]
            ];
        }

        $stmt->close();

        /*
         * Admins
         */
        $query = "
            SELECT id
            FROM users
            WHERE LOWER(role) = 'admin'
        ";

        $stmt =
            $conn->prepare($query);

        if ($stmt) {

            $stmt->execute();

            $result =
                $stmt->get_result();

            while (
                $row =
                    $result->fetch_assoc()
            ) {

                $recipients[] = [
                    "target_type" =>
                        "role",

                    "target_role" =>
                        "admin",

                    "target_id" =>
                        null,

                    "user_id" =>
                        (int)$row["id"]
                ];
            }

            $stmt->close();
        }
    }

    /*
     * Remove duplicate users
     */
    $uniqueRecipients = [];

    foreach ($recipients as $recipient) {

        $key =
            $recipient["user_id"];

        if (!isset(
            $uniqueRecipients[$key]
        )) {

            $uniqueRecipients[$key] =
                $recipient;
        }
    }

    $recipients =
        array_values(
            $uniqueRecipients
        );

    /*
     * No recipient
     */
    if (count($recipients) === 0) {

        throw new Exception(
            "No active recipients found for the selected audience"
        );
    }

    /*
     * Prepare target insert
     */
    $targetQuery = "
        INSERT INTO notice_targets
        (
            notice_id,
            target_type,
            target_role,
            target_id
        )
        VALUES
        (?, ?, ?, ?)
    ";

    $targetStmt =
        $conn->prepare($targetQuery);

    if (!$targetStmt) {
        throw new Exception(
            "Unable to prepare target query: " .
            $conn->error
        );
    }

    /*
     * Prepare notification insert
     */
    $notificationQuery = "
        INSERT INTO notifications
        (
            notice_id,
            user_id,
            is_read,
            read_at
        )
        VALUES
        (?, ?, 0, NULL)
    ";

    $notificationStmt =
        $conn->prepare(
            $notificationQuery
        );

    if (!$notificationStmt) {
        throw new Exception(
            "Unable to prepare notification query: " .
            $conn->error
        );
    }

    /*
     * Insert recipients
     */
    foreach ($recipients as $recipient) {

        $targetId =
            $recipient["target_id"];

        $targetStmt->bind_param(
            "issi",
            $noticeId,
            $recipient["target_type"],
            $recipient["target_role"],
            $targetId
        );

        if (!$targetStmt->execute()) {
            throw new Exception(
                "Failed to save notice target: " .
                $targetStmt->error
            );
        }

        $notificationStmt->bind_param(
            "ii",
            $noticeId,
            $recipient["user_id"]
        );

        if (!$notificationStmt->execute()) {
            throw new Exception(
                "Failed to create notification: " .
                $notificationStmt->error
            );
        }
    }

    $targetStmt->close();
    $notificationStmt->close();

    $conn->commit();

    ob_clean();

    echo json_encode([
        "status" => true,
        "message" =>
            "Principal notice published successfully",
        "notice_id" => $noticeId,
        "recipient_count" =>
            count($recipients)
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