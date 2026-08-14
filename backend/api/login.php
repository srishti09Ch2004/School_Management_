<!-- <?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

if($_SERVER["REQUEST_METHOD"] != "POST"){
    echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";
$role = $data["role"] ?? "";

if(empty($email) || empty($password)){
    echo json_encode([
        "status" => false,
        "message" => "Email and Password Required"
    ]);
    exit;
}

$sql = "SELECT * FROM users WHERE email='$email'";

$result = mysqli_query($conn,$sql);

if(mysqli_num_rows($result)==0){

    session_start();

$_SESSION["user_id"] = $user["id"];
$_SESSION["role"] = $user["role"];
$_SESSION["name"] = $user["full_name"];

echo json_encode([
    "status" => true,
    "message" => "Login Successful",
    "role" => $user["role"],
    "user" => [
        "id" => $user["id"],
        "name" => $user["full_name"],
        "email" => $user["email"],
        "role" => $user["role"]
    ]
]);

    exit;
}

$user = mysqli_fetch_assoc($result);

if($user["password"] != $password){

    echo json_encode([
        "status"=>false,
        "message"=>"Wrong Password"
    ]);

    exit;
}
if($user["role"] != $role){

    echo json_encode([
        "status"=>false,
        "message"=>"You selected the wrong portal."
    ]);

    exit;
}


echo json_encode([
    "status"=>true,
    "message"=>"Login Successful",
    "role"=>$user["role"],
    "user"=>$user
]);

?> -->



<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include("../config/db.php");


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}


if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
    ]);

    exit;
}


$data = json_decode(
    file_get_contents("php://input"),
    true
);

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";
$role = trim($data["role"] ?? "");


if ($email === "" || $password === "" || $role === "") {

    echo json_encode([
        "status" => false,
        "message" => "Email, Password and Role are required"
    ]);

    exit;
}


$sql = "
    SELECT
        users.id,
        users.full_name,
        users.email,
        users.password,
        users.role,

        students.id AS student_id,
        students.class,
        students.section,
        students.roll_no,
        students.admission_no

    FROM users

    LEFT JOIN students
        ON students.user_id = users.id

    WHERE users.email = ?

    LIMIT 1
";


$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {

    echo json_encode([
        "status" => false,
        "message" => "Database query preparation failed"
    ]);

    exit;
}


mysqli_stmt_bind_param(
    $stmt,
    "s",
    $email
);


mysqli_stmt_execute($stmt);


$result = mysqli_stmt_get_result($stmt);


if (!$result) {

    echo json_encode([
        "status" => false,
        "message" => "Database query failed"
    ]);

    exit;
}


if (mysqli_num_rows($result) === 0) {

    echo json_encode([
        "status" => false,
        "message" => "User not found"
    ]);

    exit;
}


$user = mysqli_fetch_assoc($result);


if ($user["password"] !== $password) {

    echo json_encode([
        "status" => false,
        "message" => "Wrong Password"
    ]);

    exit;
}


if ($user["role"] !== $role) {

    echo json_encode([
        "status" => false,
        "message" => "You selected the wrong portal."
    ]);

    exit;
}


$_SESSION["user_id"] = $user["id"];
$_SESSION["role"] = $user["role"];
$_SESSION["name"] = $user["full_name"];



$userResponse = [
    "id" => (int)$user["id"],
    "full_name" => $user["full_name"],
    "email" => $user["email"],
    "role" => $user["role"]
];


if ($user["role"] === "student") {

    $userResponse["student_id"] = $user["student_id"]
        ? (int)$user["student_id"]
        : null;

    $userResponse["class"] = $user["class"];
    $userResponse["section"] = $user["section"];
    $userResponse["roll_no"] = $user["roll_no"];
    $userResponse["admission_no"] = $user["admission_no"];
}

echo json_encode([

    "status" => true,

    "message" => "Login Successful",

    "role" => $user["role"],

    "user" => $userResponse

]);

?>