
<?php

// session_start();

// header("Content-Type: application/json");
// header("Access-Control-Allow-Origin: http://localhost:5173");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Methods: POST, OPTIONS");

// include("../config/db.php");
// if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
//     http_response_code(200);
//     exit;
// }

// if ($_SERVER["REQUEST_METHOD"] !== "POST") {

//     echo json_encode([
//         "status" => false,
//         "message" => "Invalid Request"
//     ]);

//     exit;
// }
// $data = json_decode(
//     file_get_contents("php://input"),
//     true
// );

// $email = trim($data["email"] ?? "");
// $password = $data["password"] ?? "";

// if ($email === "" || $password === "") {

//     echo json_encode([
//         "status" => false,
//         "message" => "Email and Password are required"
//     ]);

//     exit;
// }
// $sql = "
//     SELECT
//         users.id,
//         users.full_name,
//         users.email,
//         users.password,
//         users.role,

//         students.id AS student_id,
//         students.class,
//         students.section,
//         students.roll_no,
//         students.admission_no

//     FROM users
//     LEFT JOIN students
//         ON students.user_id = users.id

//     WHERE users.email = ?
//     LIMIT 1
// ";

// $stmt = mysqli_prepare($conn, $sql);
// if (!$stmt) {

//     echo json_encode([
//         "status" => false,
//         "message" => "Database query preparation failed"
//     ]);

//     exit;
// }
// mysqli_stmt_bind_param(
//     $stmt,
//     "s",
//     $email
// );
// mysqli_stmt_execute($stmt);
// $result = mysqli_stmt_get_result($stmt);

// if (!$result) {

//     echo json_encode([
//         "status" => false,
//         "message" => "Database query failed"
//     ]);

//     exit;
// }
// if (mysqli_num_rows($result) === 0) {

//     echo json_encode([
//         "status" => false,
//         "message" => "Email is not registered"
//     ]);

//     exit;
// }

// $user = mysqli_fetch_assoc($result);

// if ($user["password"] !== $password) {

//     echo json_encode([
//         "status" => false,
//         "message" => "Incorrect password"
//     ]);

//     exit;
// }
// $dbRole = $user["role"];

// $_SESSION["user_id"] = $user["id"];
// $_SESSION["role"] = $dbRole;
// $_SESSION["name"] = $user["full_name"];

// $userResponse = [

//     "id" => (int)$user["id"],

//     "full_name" => $user["full_name"],

//     "email" => $user["email"],

//     "role" => $dbRole

// ];

// if ($dbRole === "student") {

//     $userResponse["student_id"] =
//         $user["student_id"]
//             ? (int)$user["student_id"]
//             : null;

//     $userResponse["class"] =
//         $user["class"];

//     $userResponse["section"] =
//         $user["section"];

//     $userResponse["roll_no"] =
//         $user["roll_no"];

//     $userResponse["admission_no"] =
//         $user["admission_no"];
// }

// echo json_encode([

//     "status" => true,

//     "message" => "Login Successful",

//     "role" => $dbRole,

//     "user" => $userResponse

// ]);

// mysqli_stmt_close($stmt);
// mysqli_close($conn);
// ?>




<?php

session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include("../config/db.php");

//  OPTIONS

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(200);
    exit;

}

//  ONLY POST

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
    ]);

    exit;
}

// GET REQUEST DATA

$data = json_decode(
    file_get_contents("php://input"),
    true
);


$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";


// VALIDATION

if ($email === "" || $password === "") {

    echo json_encode([
        "status" => false,
        "message" => "Email and Password are required"
    ]);

    exit;
}

// USER + STUDENT + PARENT DATA

$sql = "
    SELECT

        users.id,
        users.full_name,
        users.email,
        users.password,
        users.role,

        /* STUDENT */

        students.id AS student_id,
        students.class,
        students.section,
        students.roll_no,
        students.admission_no,

        /* PARENT */

        parents.id AS parent_id,
        parents.student_id AS parent_student_id

    FROM users

    LEFT JOIN students
        ON students.user_id = users.id

    LEFT JOIN parents
        ON parents.user_id = users.id

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

// EMAIL CHECK

if (mysqli_num_rows($result) === 0) {

    echo json_encode([
        "status" => false,
        "message" => "Email is not registered"
    ]);

    exit;
}


$user = mysqli_fetch_assoc($result);

// PASSWORD CHECK

if ($user["password"] !== $password) {

    echo json_encode([
        "status" => false,
        "message" => "Incorrect password"
    ]);

    exit;
}

// ROLE

$dbRole = $user["role"];

// SESSION

$_SESSION["user_id"] = $user["id"];
$_SESSION["role"] = $dbRole;
$_SESSION["name"] = $user["full_name"];

// BASIC USER RESPONSE

$userResponse = [

    "id" => (int)$user["id"],

    "full_name" => $user["full_name"],

    "email" => $user["email"],

    "role" => $dbRole

];

// STUDENT LOGIN DATA

if ($dbRole === "student") {

    $userResponse["student_id"] =
        $user["student_id"]
            ? (int)$user["student_id"]
            : null;

    $userResponse["class"] =
        $user["class"];

    $userResponse["section"] =
        $user["section"];

    $userResponse["roll_no"] =
        $user["roll_no"];

    $userResponse["admission_no"] =
        $user["admission_no"];
}

// PARENT LOGIN DATA

if ($dbRole === "parent") {

    $userResponse["parent_id"] =
        $user["parent_id"]
            ? (int)$user["parent_id"]
            : null;

    $userResponse["student_id"] =
        $user["parent_student_id"]
            ? (int)$user["parent_student_id"]
            : null;
}

// FINAL RESPONSE

echo json_encode([

    "status" => true,

    "message" => "Login Successful",

    "role" => $dbRole,

    "user" => $userResponse

]);

// CLOSE

mysqli_stmt_close($stmt);

mysqli_close($conn);

?>