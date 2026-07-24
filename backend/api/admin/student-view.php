<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../../config/db.php");

$id = $_GET["id"] ?? 0;

$sql = "SELECT
users.full_name,
users.email,
students.*
FROM students
JOIN users
ON students.user_id = users.id
WHERE students.id='$id'";

$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result)>0){

    echo json_encode([
        "status"=>true,
        "data"=>mysqli_fetch_assoc($result)
    ]);

}else{

    echo json_encode([
        "status"=>false,
        "message"=>"Student not found"
    ]);

}