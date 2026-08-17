<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Content-Type: application/json");

// include("../../config/db.php");

// // Get JSON data
// $data = json_decode(file_get_contents("php://input"), true);

// if (!$data) {
//     echo json_encode([
//         "status" => false,
//         "message" => "No data received"
//     ]);
//     exit;
// }

// $id = $data["id"];

// // Delete from students table
// mysqli_query($conn, "DELETE FROM students WHERE user_id='$id'");

// // Delete from users table
// mysqli_query($conn, "DELETE FROM users WHERE id='$id'");

// echo json_encode([
//     "status" => true,
//     "message" => "Student Deleted Successfully"
// ]);

// ?>










<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id"])) {
    echo json_encode([
        "status" => false,
        "message" => "Student ID is required"
    ]);
    exit;
}

$user_id = intval($data["id"]);

if ($user_id <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid Student ID"
    ]);
    exit;
}



$find_sql = "
    SELECT id
    FROM students
    WHERE user_id = ?
    LIMIT 1
";

$stmt = mysqli_prepare($conn, $find_sql);

if (!$stmt) {
    echo json_encode([
        "status" => false,
        "message" => "Database error"
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$student = mysqli_fetch_assoc($result);

mysqli_stmt_close($stmt);

if (!$student) {
    echo json_encode([
        "status" => false,
        "message" => "Student record not found"
    ]);
    exit;
}

$student_id = intval($student["id"]);


mysqli_begin_transaction($conn);

try {

    

    $table_check = mysqli_query(
        $conn,
        "SHOW TABLES LIKE 'attendance'"
    );

    if ($table_check && mysqli_num_rows($table_check) > 0) {

        $stmt = mysqli_prepare(
            $conn,
            "DELETE FROM attendance WHERE student_id = ?"
        );

        if (!$stmt) {
            throw new Exception("Attendance delete failed");
        }

        mysqli_stmt_bind_param($stmt, "i", $student_id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }



    $table_check = mysqli_query(
        $conn,
        "SHOW TABLES LIKE 'fees'"
    );

    if ($table_check && mysqli_num_rows($table_check) > 0) {

        $stmt = mysqli_prepare(
            $conn,
            "DELETE FROM fees WHERE student_id = ?"
        );

        if (!$stmt) {
            throw new Exception("Fees delete failed");
        }

        mysqli_stmt_bind_param($stmt, "i", $student_id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }


    $table_check = mysqli_query(
        $conn,
        "SHOW TABLES LIKE 'assignments'"
    );

    if ($table_check && mysqli_num_rows($table_check) > 0) {

        $stmt = mysqli_prepare(
            $conn,
            "DELETE FROM assignments WHERE student_id = ?"
        );

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "i", $student_id);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        }
    }


    $table_check = mysqli_query(
        $conn,
        "SHOW TABLES LIKE 'results'"
    );

    if ($table_check && mysqli_num_rows($table_check) > 0) {

        $stmt = mysqli_prepare(
            $conn,
            "DELETE FROM results WHERE student_id = ?"
        );

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "i", $student_id);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        }
    }


    $stmt = mysqli_prepare(
        $conn,
        "DELETE FROM students WHERE id = ?"
    );

    if (!$stmt) {
        throw new Exception("Student delete failed");
    }

    mysqli_stmt_bind_param($stmt, "i", $student_id);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_affected_rows($stmt) <= 0) {
        throw new Exception("Student could not be deleted");
    }

    mysqli_stmt_close($stmt);


    $stmt = mysqli_prepare(
        $conn,
        "DELETE FROM users WHERE id = ?"
    );

    if (!$stmt) {
        throw new Exception("User delete failed");
    }

    mysqli_stmt_bind_param($stmt, "i", $user_id);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_affected_rows($stmt) <= 0) {
        throw new Exception("User account could not be deleted");
    }

    mysqli_stmt_close($stmt);

    mysqli_commit($conn);

    echo json_encode([
        "status" => true,
        "message" => "Student and all related records deleted successfully"
    ]);

} catch (Exception $e) {


    mysqli_rollback($conn);

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}

?>