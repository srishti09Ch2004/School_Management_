<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

// Only POST request allowed
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Get Data
$full_name = $data["full_name"] ?? "";
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";
$class = $data["class"] ?? "";
$section = $data["section"] ?? "";
$roll_no = $data["roll_no"] ?? "";
$gender = $data["gender"] ?? "";
$dob = $data["dob"] ?? "";
$phone = $data["phone"] ?? "";
$address = $data["address"] ?? "";

// Validation
if (
    empty($full_name) ||
    empty($email) ||
    empty($password) ||
    empty($class) ||
    empty($section) ||
    empty($roll_no) ||
    empty($gender) ||
    empty($dob) ||
    empty($phone) ||
    empty($address)
) {
    echo json_encode([
        "status" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

// Check Email
$check = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");


// duplicate roll_no
$rollCheck = mysqli_query($conn,"SELECT * FROM students WHERE roll_no='$roll_no'");

if(mysqli_num_rows($rollCheck)>0){

    echo json_encode([
        "status"=>false,
        "message"=>"Roll Number already exists"
    ]);

    exit;
}

if (mysqli_num_rows($check) > 0) {
    echo json_encode([
        "status" => false,
        "message" => "Email already exists"
    ]);
    exit;
}

// Insert into users table
mysqli_query($conn, "INSERT INTO users(full_name,email,password,role)
VALUES('$full_name','$email','$password','student')");

$user_id = mysqli_insert_id($conn);

// Generate Admission Number
$admission_no = "FA" . rand(1000, 9999);

// Insert into students table
mysqli_query($conn, "INSERT INTO students
(user_id,admission_no,class,section,roll_no,gender,dob,phone,address,status)
VALUES
('$user_id','$admission_no','$class','$section','$roll_no','$gender','$dob','$phone','$address','Active')");

// Success Response
echo json_encode([
    "status" => true,
    "message" => "Student Added Successfully"
]);

?>