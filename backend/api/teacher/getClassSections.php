<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

try {

    $classes = [];
    $sections = [];

    // Get all active classes
    $classQuery = "
        SELECT DISTINCT class
        FROM students
        WHERE status = 'Active'
          AND class IS NOT NULL
          AND class != ''
        ORDER BY CAST(class AS UNSIGNED) DESC
    ";

    $classResult = mysqli_query($conn, $classQuery);

    while ($row = mysqli_fetch_assoc($classResult)) {
        $classes[] = $row["class"];
    }


    // Get all sections
    $sectionQuery = "
        SELECT DISTINCT class, section
        FROM students
        WHERE status = 'Active'
          AND class IS NOT NULL
          AND class != ''
          AND section IS NOT NULL
          AND section != ''
        ORDER BY CAST(class AS UNSIGNED) DESC, section ASC
    ";

    $sectionResult = mysqli_query($conn, $sectionQuery);

    while ($row = mysqli_fetch_assoc($sectionResult)) {

        $class = $row["class"];
        $section = $row["section"];

        if (!isset($sections[$class])) {
            $sections[$class] = [];
        }

        $sections[$class][] = $section;
    }


    echo json_encode([
        "status" => true,
        "message" => "Classes and sections fetched successfully",
        "classes" => $classes,
        "sections" => $sections
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => "Something went wrong",
        "error" => $e->getMessage()
    ]);
}