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

    $teacher_id = $input["teacher_id"] ?? null;
    $title = trim($input["title"] ?? "");
    $class_name = trim($input["class_name"] ?? "");
    $section = trim($input["section"] ?? "");
    $notice_type = trim($input["notice_type"] ?? "General");
    $priority = trim($input["priority"] ?? "Normal");
    $description = trim($input["description"] ?? "");
    $expiry_date = $input["expiry_date"] ?? null;

    if (!$teacher_id || !is_numeric($teacher_id)) {
        throw new Exception("Invalid teacher ID");
    }

    if ($title === "") {
        throw new Exception("Notice title is required");
    }

    if ($class_name === "") {
        throw new Exception("Class is required");
    }

    if ($description === "") {
        throw new Exception("Notice content is required");
    }

    $teacherQuery = "
        SELECT id, full_name
        FROM teachers
        WHERE id = ?
        LIMIT 1
    ";

    $teacherStmt = $conn->prepare($teacherQuery);

    if (!$teacherStmt) {
        throw new Exception("Unable to verify teacher");
    }

    $teacherStmt->bind_param("i", $teacher_id);
    $teacherStmt->execute();

    $teacherResult = $teacherStmt->get_result();
    $teacher = $teacherResult->fetch_assoc();

    $teacherStmt->close();

    if (!$teacher) {
        throw new Exception("Teacher not found");
    }

    if ($class_name === "ALL") {

        $forValue = "All Students";

    } else {

        if ($section === "" || $section === "ALL") {
            $forValue = "Class " . $class_name . " - All Sections";
        } else {
            $forValue = "Class " . $class_name . " - Section " . $section;
        }
    }

    $publishDate = date("Y-m-d");

    $conn->begin_transaction();

    $noticeQuery = "
        INSERT INTO notices
        (
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
        )
        VALUES
        (?, ?, ?, ?, ?, ?, 'Teacher', ?, ?, 'Active', NOW(), NOW())
    ";

    $noticeStmt = $conn->prepare($noticeQuery);

    if (!$noticeStmt) {
        throw new Exception("Unable to create notice");
    }

    $noticeStmt->bind_param(
        "sssssi ss",
        $title,
        $description,
        $notice_type,
        $priority,
        $forValue,
        $teacher_id,
        $publishDate,
        $expiry_date
    );

    if (!$noticeStmt->execute()) {
        throw new Exception("Failed to save notice");
    }

    $noticeId = $noticeStmt->insert_id;

    $noticeStmt->close();

    if ($class_name === "ALL") {

        $studentQuery = "
            SELECT
                id,
                user_id,
                full_name
            FROM students
            WHERE status = 'Active'
              AND user_id IS NOT NULL
        ";

        $studentStmt = $conn->prepare($studentQuery);

    } else {

        if ($section === "ALL" || $section === "") {

            $studentQuery = "
                SELECT
                    id,
                    user_id,
                    full_name
                FROM students
                WHERE class = ?
                  AND status = 'Active'
                  AND user_id IS NOT NULL
            ";

            $studentStmt = $conn->prepare($studentQuery);

        } else {

            $studentQuery = "
                SELECT
                    id,
                    user_id,
                    full_name
                FROM students
                WHERE class = ?
                  AND section = ?
                  AND status = 'Active'
                  AND user_id IS NOT NULL
            ";

            $studentStmt = $conn->prepare($studentQuery);
        }
    }

    if (!$studentStmt) {
        throw new Exception("Unable to find students");
    }

    if ($class_name === "ALL") {

        $studentStmt->execute();

    } elseif ($section === "ALL" || $section === "") {

        $studentStmt->bind_param(
            "s",
            $class_name
        );

        $studentStmt->execute();

    } else {

        $studentStmt->bind_param(
            "ss",
            $class_name,
            $section
        );

        $studentStmt->execute();
    }

    $studentResult = $studentStmt->get_result();

    $notificationQuery = "
        INSERT INTO notifications
        (
            notice_id,
            user_id,
            title,
            description,
            notice_type,
            priority,
            creator_name,
            is_read,
            created_at
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, 0, NOW())
    ";

    $notificationStmt = $conn->prepare($notificationQuery);

    if (!$notificationStmt) {
        throw new Exception("Unable to prepare notification");
    }

    $recipientCount = 0;

    while ($student = $studentResult->fetch_assoc()) {

        $studentUserId = (int)$student["user_id"];

        $notificationStmt->bind_param(
            "iisssss",
            $noticeId,
            $studentUserId,
            $title,
            $description,
            $notice_type,
            $priority,
            $teacher["full_name"]
        );

        if ($notificationStmt->execute()) {
            $recipientCount++;
        }
    }

    $notificationStmt->close();
    $studentStmt->close();

    $conn->commit();

    ob_clean();

    echo json_encode([
        "status" => true,
        "message" => "Notice sent successfully",
        "notice_id" => $noticeId,
        "recipient_count" => $recipientCount
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