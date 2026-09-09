<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ob_start();
ini_set("display_errors", 0);

include("../../config/db.php");

try {

    $query = "
        SELECT DISTINCT
            class,
            section
        FROM students
        WHERE status = 'Active'
          AND class IS NOT NULL
          AND class != ''
          AND section IS NOT NULL
          AND section != ''
        ORDER BY class, section
    ";

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        throw new Exception("Unable to prepare classes query");
    }

    $stmt->execute();

    $result = $stmt->get_result();

    $classes = [];

    while ($row = $result->fetch_assoc()) {

        $classes[] = [
            "class_name" => $row["class"],
            "section" => $row["section"]
        ];
    }

    $stmt->close();

    ob_clean();

    echo json_encode([
        "status" => true,
        "message" => "Classes fetched successfully",
        "data" => $classes
    ]);

} catch (Exception $e) {

    ob_clean();

    http_response_code(400);

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}