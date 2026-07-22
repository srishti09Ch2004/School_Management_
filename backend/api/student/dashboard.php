<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../../config/db.php");

$user_id = $_GET["user_id"] ?? 0;

$sql = "SELECT
users.id,
users.full_name,
users.email,
users.role,
students.class,
students.section,
students.roll_no,
students.admission_no,
students.gender,
students.dob,
students.phone,
students.address
FROM students
JOIN users ON students.user_id = users.id
WHERE users.id = '$user_id'";

$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){

    $student = mysqli_fetch_assoc($result);

    echo json_encode([
        "status" => true,
        "data" => $student
    ]);

}else{

    echo json_encode([
        "status" => false,
        "message" => "Student not found"
    ]);

}

?>