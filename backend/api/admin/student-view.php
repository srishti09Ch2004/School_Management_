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


/* ================================
   GET STUDENT ID
================================ */

$id = isset($_GET["id"])
    ? intval($_GET["id"])
    : 0;


if ($id <= 0) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid student ID"
    ]);

    exit;
}


/* ================================
   GET STUDENT + PARENT
================================ */

$sql = "

SELECT

    /* ==========================
       STUDENT INFORMATION
    ========================== */

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
    students.status,


    /* ==========================
       PARENT INFORMATION
    ========================== */

    parents.id AS parent_id,
    parents.user_id AS parent_user_id,

    parents.student_id,

    parents.father_name,
    parents.mother_name,
    parents.phone AS parent_phone,
    parents.occupation,
    parents.address AS parent_address,

    parent_users.full_name AS parent_name,
    parent_users.email AS parent_email,

    CASE

        WHEN parents.father_name IS NOT NULL
             AND parents.mother_name IS NOT NULL
             AND parents.father_name != ''
             AND parents.mother_name != ''

        THEN 'Father & Mother'

        WHEN parents.father_name IS NOT NULL
             AND parents.father_name != ''

        THEN 'Father'

        WHEN parents.mother_name IS NOT NULL
             AND parents.mother_name != ''

        THEN 'Mother'

        ELSE 'Guardian'

    END AS parent_relation


FROM students


/* STUDENT USER */

INNER JOIN users

    ON students.user_id = users.id


/* PARENT */

LEFT JOIN parents

    ON students.id = parents.student_id


/* PARENT USER ACCOUNT */

LEFT JOIN users AS parent_users

    ON parents.user_id = parent_users.id


WHERE students.id = ?


LIMIT 1
";


/* ================================
   PREPARE QUERY
================================ */

$stmt = mysqli_prepare($conn, $sql);


if (!$stmt) {

    echo json_encode([
        "status" => false,
        "message" => "Database statement failed",
        "error" => mysqli_error($conn)
    ]);

    exit;
}


/* ================================
   BIND STUDENT ID
================================ */

mysqli_stmt_bind_param(
    $stmt,
    "i",
    $id
);


/* ================================
   EXECUTE
================================ */

mysqli_stmt_execute($stmt);


$result = mysqli_stmt_get_result($stmt);


/* ================================
   RESPONSE
================================ */

if (
    $result &&
    mysqli_num_rows($result) > 0
) {

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


/* ================================
   CLOSE
================================ */

mysqli_stmt_close($stmt);

?>