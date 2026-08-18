<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Content-Type: application/json");

// include("../../config/db.php");

// // Only POST request allowed
// if ($_SERVER["REQUEST_METHOD"] != "POST") {
//     echo json_encode([
//         "status" => false,
//         "message" => "Invalid Request"
//     ]);
//     exit;
// }

// $data = json_decode(file_get_contents("php://input"), true);

// // Get Data
// $full_name = $data["full_name"] ?? "";
// $email = $data["email"] ?? "";
// $password = $data["password"] ?? "";
// $class = $data["class"] ?? "";
// $section = $data["section"] ?? "";
// $roll_no = $data["roll_no"] ?? "";
// $gender = $data["gender"] ?? "";
// $dob = $data["dob"] ?? "";
// $phone = $data["phone"] ?? "";
// $address = $data["address"] ?? "";

// // Validation
// if (
//     empty($full_name) ||
//     empty($email) ||
//     empty($password) ||
//     empty($class) ||
//     empty($section) ||
//     empty($roll_no) ||
//     empty($gender) ||
//     empty($dob) ||
//     empty($phone) ||
//     empty($address)
// ) {
//     echo json_encode([
//         "status" => false,
//         "message" => "All fields are required"
//     ]);
//     exit;
// }

// // Check Email
// $check = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");


// // duplicate roll_no
// $rollCheck = mysqli_query($conn,"SELECT * FROM students WHERE roll_no='$roll_no'");

// if(mysqli_num_rows($rollCheck)>0){

//     echo json_encode([
//         "status"=>false,
//         "message"=>"Roll Number already exists"
//     ]);

//     exit;
// }

// if (mysqli_num_rows($check) > 0) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Email already exists"
//     ]);
//     exit;
// }

// // Insert into users table
// mysqli_query($conn, "INSERT INTO users(full_name,email,password,role)
// VALUES('$full_name','$email','$password','student')");

// $user_id = mysqli_insert_id($conn);

// // Generate Admission Number
// $admission_no = "FA" . rand(1000, 9999);

// // Insert into students table
// mysqli_query($conn, "INSERT INTO students
// (user_id,admission_no,class,section,roll_no,gender,dob,phone,address,status)
// VALUES
// ('$user_id','$admission_no','$class','$section','$roll_no','$gender','$dob','$phone','$address','Active')");

// // Success Response
// echo json_encode([
//     "status" => true,
//     "message" => "Student Added Successfully"
// ]);

// ?>










<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");


/*
|--------------------------------------------------------------------------
| Only POST request allowed
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Get JSON Data
|--------------------------------------------------------------------------
*/

$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!$data) {

    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| STUDENT DATA
|--------------------------------------------------------------------------
*/

$full_name = trim($data["full_name"] ?? "");
$email     = trim($data["email"] ?? "");
$password  = trim($data["password"] ?? "");

$class     = trim($data["class"] ?? "");
$section   = trim($data["section"] ?? "");
$roll_no   = trim($data["roll_no"] ?? "");
$gender    = trim($data["gender"] ?? "");
$dob       = trim($data["dob"] ?? "");
$phone     = trim($data["phone"] ?? "");
$address   = trim($data["address"] ?? "");
$status    = trim($data["status"] ?? "Active");


/*
|--------------------------------------------------------------------------
| FAMILY DATA
|--------------------------------------------------------------------------
*/

$father_name = trim(
    $data["father_name"] ?? ""
);

$mother_name = trim(
    $data["mother_name"] ?? ""
);

$parent_email = trim(
    $data["parent_email"] ?? ""
);

$parent_password = trim(
    $data["parent_password"] ?? ""
);

$parent_phone = trim(
    $data["parent_phone"] ?? ""
);

$parent_occupation = trim(
    $data["parent_occupation"] ?? ""
);

$parent_address = trim(
    $data["parent_address"] ?? ""
);


/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

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
        "message" => "All student fields are required"
    ]);

    exit;
}


if (
    empty($father_name) &&
    empty($mother_name)
) {

    echo json_encode([
        "status" => false,
        "message" => "At least Father Name or Mother Name is required"
    ]);

    exit;
}


if (
    empty($parent_email) ||
    empty($parent_password) ||
    empty($parent_phone) ||
    empty($parent_occupation) ||
    empty($parent_address)
) {

    echo json_encode([
        "status" => false,
        "message" => "All parent fields are required"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| CHECK STUDENT EMAIL
|--------------------------------------------------------------------------
*/

$checkStudentEmail = mysqli_prepare(
    $conn,
    "SELECT id FROM users WHERE email = ? LIMIT 1"
);

mysqli_stmt_bind_param(
    $checkStudentEmail,
    "s",
    $email
);

mysqli_stmt_execute(
    $checkStudentEmail
);

$studentEmailResult =
    mysqli_stmt_get_result($checkStudentEmail);


if (
    mysqli_num_rows($studentEmailResult) > 0
) {

    echo json_encode([
        "status" => false,
        "message" => "Student email already exists"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| CHECK PARENT EMAIL
|--------------------------------------------------------------------------
*/

$checkParentEmail = mysqli_prepare(
    $conn,
    "SELECT id FROM users WHERE email = ? LIMIT 1"
);

mysqli_stmt_bind_param(
    $checkParentEmail,
    "s",
    $parent_email
);

mysqli_stmt_execute(
    $checkParentEmail
);

$parentEmailResult =
    mysqli_stmt_get_result($checkParentEmail);


if (
    mysqli_num_rows($parentEmailResult) > 0
) {

    echo json_encode([
        "status" => false,
        "message" => "Parent email already exists"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| CHECK ROLL NUMBER
|--------------------------------------------------------------------------
*/

$rollCheck = mysqli_prepare(
    $conn,
    "SELECT id FROM students WHERE roll_no = ? LIMIT 1"
);

mysqli_stmt_bind_param(
    $rollCheck,
    "s",
    $roll_no
);

mysqli_stmt_execute($rollCheck);

$rollResult =
    mysqli_stmt_get_result($rollCheck);


if (
    mysqli_num_rows($rollResult) > 0
) {

    echo json_encode([
        "status" => false,
        "message" => "Roll Number already exists"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| START TRANSACTION
|--------------------------------------------------------------------------
*/

mysqli_begin_transaction($conn);


try {


    /*
    |--------------------------------------------------------------------------
    | CREATE STUDENT USER
    |--------------------------------------------------------------------------
    */

    $studentUser = mysqli_prepare(
        $conn,
        "INSERT INTO users
        (full_name, email, password, role)
        VALUES (?, ?, ?, 'student')"
    );

    mysqli_stmt_bind_param(
        $studentUser,
        "sss",
        $full_name,
        $email,
        $password
    );

    if (!mysqli_stmt_execute($studentUser)) {

        throw new Exception(
            mysqli_stmt_error($studentUser)
        );
    }


    $student_user_id =
        mysqli_insert_id($conn);


    /*
    |--------------------------------------------------------------------------
    | GENERATE ADMISSION NUMBER
    |--------------------------------------------------------------------------
    */

    $admission_no =
        "FA" . rand(1000, 9999);


    /*
    |--------------------------------------------------------------------------
    | CREATE STUDENT
    |--------------------------------------------------------------------------
    */

    $studentInsert = mysqli_prepare(
        $conn,
        "INSERT INTO students
        (
            user_id,
            admission_no,
            class,
            section,
            roll_no,
            gender,
            dob,
            phone,
            address,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );


    mysqli_stmt_bind_param(
        $studentInsert,
        "isssssssss",
        $student_user_id,
        $admission_no,
        $class,
        $section,
        $roll_no,
        $gender,
        $dob,
        $phone,
        $address,
        $status
    );


    if (
        !mysqli_stmt_execute($studentInsert)
    ) {

        throw new Exception(
            mysqli_stmt_error($studentInsert)
        );
    }


    /*
    |--------------------------------------------------------------------------
    | GET STUDENT ID
    |--------------------------------------------------------------------------
    */

    $student_id =
        mysqli_insert_id($conn);


    /*
    |--------------------------------------------------------------------------
    | CREATE PARENT USER
    |--------------------------------------------------------------------------
    */

    /*
     * Parent account name
     *
     * Father + Mother available:
     * "Father & Mother"
     *
     * Only father:
     * Father's name
     *
     * Only mother:
     * Mother's name
     */

    if (
        !empty($father_name) &&
        !empty($mother_name)
    ) {

        $parent_full_name =
            $father_name . " & " . $mother_name;

    } elseif (
        !empty($father_name)
    ) {

        $parent_full_name =
            $father_name;

    } else {

        $parent_full_name =
            $mother_name;
    }


    $parentUser = mysqli_prepare(
        $conn,
        "INSERT INTO users
        (full_name, email, password, role)
        VALUES (?, ?, ?, 'parent')"
    );


    mysqli_stmt_bind_param(
        $parentUser,
        "sss",
        $parent_full_name,
        $parent_email,
        $parent_password
    );


    if (
        !mysqli_stmt_execute($parentUser)
    ) {

        throw new Exception(
            mysqli_stmt_error($parentUser)
        );
    }


    $parent_user_id =
        mysqli_insert_id($conn);


    /*
    |--------------------------------------------------------------------------
    | CREATE PARENT RECORD
    |--------------------------------------------------------------------------
    */

    $parentInsert = mysqli_prepare(
        $conn,
        "INSERT INTO parents
        (
            user_id,
            student_id,
            father_name,
            mother_name,
            phone,
            occupation,
            address
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)"
    );


    mysqli_stmt_bind_param(
        $parentInsert,
        "iisssss",
        $parent_user_id,
        $student_id,
        $father_name,
        $mother_name,
        $parent_phone,
        $parent_occupation,
        $parent_address
    );


    if (
        !mysqli_stmt_execute($parentInsert)
    ) {

        throw new Exception(
            mysqli_stmt_error($parentInsert)
        );
    }


    /*
    |--------------------------------------------------------------------------
    | EVERYTHING SUCCESSFUL
    |--------------------------------------------------------------------------
    */

    mysqli_commit($conn);


    echo json_encode([

        "status" => true,

        "message" =>
            "Student and Parent added successfully",

        "student_id" =>
            $student_id,

        "parent_id" =>
            mysqli_insert_id($conn),

        "admission_no" =>
            $admission_no

    ]);


} catch (Exception $e) {


    /*
    |--------------------------------------------------------------------------
    | ROLLBACK
    |--------------------------------------------------------------------------
    */

    mysqli_rollback($conn);


    echo json_encode([

        "status" => false,

        "message" =>
            $e->getMessage()

    ]);

}

?>