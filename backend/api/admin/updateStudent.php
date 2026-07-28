<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

// Get JSON Data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);
    exit;
}

// Data
$id = $data["id"];
$full_name = $data["full_name"];
$email = $data["email"];
$password = $data["password"];

$class = $data["class"];
$section = $data["section"];
$roll_no = $data["roll_no"];
$gender = $data["gender"];
$dob = $data["dob"];
$phone = $data["phone"];
$address = $data["address"];
$status = $data["status"] ?? "Active";


// ================= USERS TABLE =================

if (!empty($password)) {

    mysqli_query($conn,"
        UPDATE users
        SET
        full_name='$full_name',
        email='$email',
        password='$password'
        WHERE id='$id'
    ");

} else {

    mysqli_query($conn,"
        UPDATE users
        SET
        full_name='$full_name',
        email='$email'
        WHERE id='$id'
    ");

}


// ================= STUDENTS TABLE =================

mysqli_query($conn,"
    UPDATE students
    SET
    class='$class',
    section='$section',
    roll_no='$roll_no',
    gender='$gender',
    dob='$dob',
    phone='$phone',
    address='$address',
    status='$status'
    WHERE user_id='$id'
");


// ================= RESPONSE =================

echo json_encode([
    "status" => true,
    "message" => "Student Updated Successfully"
]);

?>