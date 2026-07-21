<?php

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

    echo json_encode([
        "status"=>false,
        "message"=>"User Not Found"
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

echo json_encode([
    "status"=>true,
    "message"=>"Login Successful",
    "role"=>$user["role"],
    "user"=>$user
]);

?>