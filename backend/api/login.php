<?php
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

?>