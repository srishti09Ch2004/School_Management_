<?php

// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");

// include("../../config/db.php");

// $id = $_GET["id"] ?? 0;

// $sql = "SELECT
// users.full_name,
// users.email,
// students.*
// FROM students
// JOIN users
// ON students.user_id = users.id
// WHERE students.id='$id'";

// $result = mysqli_query($conn, $sql);

// if(mysqli_num_rows($result)>0){

//     echo json_encode([
//         "status"=>true,
//         "data"=>mysqli_fetch_assoc($result)
//     ]);

// }else{

//     echo json_encode([
//         "status"=>false,
//         "message"=>"Student not found"
//     ]);

// }





header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include("../../config/db.php");

$id = isset($_GET["id"]) ? intval($_GET["id"]) : 0;

if ($id <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid student ID"
    ]);
    exit;
}

$sql = "SELECT
    students.id,
    students.user_id,
    users.full_name,
    users.email,
    students.admission_no,
    students.class,
    students.section,
    students.roll_no,
    students.gender,
    students.dob,
    students.phone,
    students.address,
    students.status

FROM students

INNER JOIN users
    ON students.user_id = users.id

WHERE students.id = ?

LIMIT 1";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "Database statement failed"
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, "i", $id);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if ($result && mysqli_num_rows($result) > 0) {

    $student = mysqli_fetch_assoc($result);

    echo json_encode([
        "status" => true,
        "data" => $student
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Student not found"
    ]);
}

mysqli_stmt_close($stmt);

?>