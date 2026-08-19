<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Content-Type: application/json");

// include("../../config/db.php");

// $data = json_decode(file_get_contents("php://input"), true);

// if (!$data || !isset($data["id"])) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Student ID is required"
//     ]);
//     exit;
// }

// $user_id = intval($data["id"]);

// if ($user_id <= 0) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Invalid Student ID"
//     ]);
//     exit;
// }



// $find_sql = "
//     SELECT id
//     FROM students
//     WHERE user_id = ?
//     LIMIT 1
// ";

// $stmt = mysqli_prepare($conn, $find_sql);

// if (!$stmt) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Database error"
//     ]);
//     exit;
// }

// mysqli_stmt_bind_param($stmt, "i", $user_id);
// mysqli_stmt_execute($stmt);

// $result = mysqli_stmt_get_result($stmt);

// $student = mysqli_fetch_assoc($result);

// mysqli_stmt_close($stmt);

// if (!$student) {
//     echo json_encode([
//         "status" => false,
//         "message" => "Student record not found"
//     ]);
//     exit;
// }

// $student_id = intval($student["id"]);


// mysqli_begin_transaction($conn);

// try {

    

//     $table_check = mysqli_query(
//         $conn,
//         "SHOW TABLES LIKE 'attendance'"
//     );

//     if ($table_check && mysqli_num_rows($table_check) > 0) {

//         $stmt = mysqli_prepare(
//             $conn,
//             "DELETE FROM attendance WHERE student_id = ?"
//         );

//         if (!$stmt) {
//             throw new Exception("Attendance delete failed");
//         }

//         mysqli_stmt_bind_param($stmt, "i", $student_id);
//         mysqli_stmt_execute($stmt);
//         mysqli_stmt_close($stmt);
//     }



//     $table_check = mysqli_query(
//         $conn,
//         "SHOW TABLES LIKE 'fees'"
//     );

//     if ($table_check && mysqli_num_rows($table_check) > 0) {

//         $stmt = mysqli_prepare(
//             $conn,
//             "DELETE FROM fees WHERE student_id = ?"
//         );

//         if (!$stmt) {
//             throw new Exception("Fees delete failed");
//         }

//         mysqli_stmt_bind_param($stmt, "i", $student_id);
//         mysqli_stmt_execute($stmt);
//         mysqli_stmt_close($stmt);
//     }


//     $table_check = mysqli_query(
//         $conn,
//         "SHOW TABLES LIKE 'assignments'"
//     );

//     if ($table_check && mysqli_num_rows($table_check) > 0) {

//         $stmt = mysqli_prepare(
//             $conn,
//             "DELETE FROM assignments WHERE student_id = ?"
//         );

//         if ($stmt) {
//             mysqli_stmt_bind_param($stmt, "i", $student_id);
//             mysqli_stmt_execute($stmt);
//             mysqli_stmt_close($stmt);
//         }
//     }


//     $table_check = mysqli_query(
//         $conn,
//         "SHOW TABLES LIKE 'results'"
//     );

//     if ($table_check && mysqli_num_rows($table_check) > 0) {

//         $stmt = mysqli_prepare(
//             $conn,
//             "DELETE FROM results WHERE student_id = ?"
//         );

//         if ($stmt) {
//             mysqli_stmt_bind_param($stmt, "i", $student_id);
//             mysqli_stmt_execute($stmt);
//             mysqli_stmt_close($stmt);
//         }
//     }


//     $stmt = mysqli_prepare(
//         $conn,
//         "DELETE FROM students WHERE id = ?"
//     );

//     if (!$stmt) {
//         throw new Exception("Student delete failed");
//     }

//     mysqli_stmt_bind_param($stmt, "i", $student_id);
//     mysqli_stmt_execute($stmt);

//     if (mysqli_stmt_affected_rows($stmt) <= 0) {
//         throw new Exception("Student could not be deleted");
//     }

//     mysqli_stmt_close($stmt);


//     $stmt = mysqli_prepare(
//         $conn,
//         "DELETE FROM users WHERE id = ?"
//     );

//     if (!$stmt) {
//         throw new Exception("User delete failed");
//     }

//     mysqli_stmt_bind_param($stmt, "i", $user_id);
//     mysqli_stmt_execute($stmt);

//     if (mysqli_stmt_affected_rows($stmt) <= 0) {
//         throw new Exception("User account could not be deleted");
//     }

//     mysqli_stmt_close($stmt);

//     mysqli_commit($conn);

//     echo json_encode([
//         "status" => true,
//         "message" => "Student and all related records deleted successfully"
//     ]);

// } catch (Exception $e) {


//     mysqli_rollback($conn);

//     echo json_encode([
//         "status" => false,
//         "message" => $e->getMessage()
//     ]);
// }

// ?>









<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");


/* Only POST allowed */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid Request"
    ]);

    exit;
}


/* Get JSON */

$data = json_decode(
    file_get_contents("php://input"),
    true
);


$id = intval($data["id"] ?? 0);

$deleteParent = !empty($data["delete_parent"]);


if ($id <= 0) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid Student ID"
    ]);

    exit;
}


try {

    /*
     * Student ID se student information nikalo
     */

    $stmt = mysqli_prepare(
        $conn,
        "SELECT id, user_id
         FROM students
         WHERE id = ?
         LIMIT 1"
    );

    mysqli_stmt_bind_param(
        $stmt,
        "i",
        $id
    );

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);


    if (mysqli_num_rows($result) === 0) {

        echo json_encode([
            "status" => false,
            "message" => "Student not found"
        ]);

        exit;
    }


    $student = mysqli_fetch_assoc($result);

    $studentUserId = intval($student["user_id"]);


    /*
     * Student ke saath linked Parent find karo
     */

    $parentStmt = mysqli_prepare(
        $conn,
        "SELECT id, user_id
         FROM parents
         WHERE student_id = ?
         LIMIT 1"
    );

    mysqli_stmt_bind_param(
        $parentStmt,
        "i",
        $id
    );

    mysqli_stmt_execute($parentStmt);

    $parentResult = mysqli_stmt_get_result(
        $parentStmt
    );


    $parentExists = mysqli_num_rows($parentResult) > 0;

    $parentId = 0;
    $parentUserId = 0;


    if ($parentExists) {

        $parent = mysqli_fetch_assoc(
            $parentResult
        );

        $parentId = intval(
            $parent["id"]
        );

        $parentUserId = intval(
            $parent["user_id"]
        );
    }


    /*
     * Transaction
     */

    mysqli_begin_transaction($conn);


    /*
     * 1. Delete linked parent
     *
     * ONLY when admin selected
     * delete_parent = true
     */

    if (
        $parentExists &&
        $deleteParent
    ) {

        /* Delete parent record */

        $deleteParentStmt = mysqli_prepare(
            $conn,
            "DELETE FROM parents
             WHERE id = ?"
        );

        mysqli_stmt_bind_param(
            $deleteParentStmt,
            "i",
            $parentId
        );


        if (
            !mysqli_stmt_execute(
                $deleteParentStmt
            )
        ) {

            throw new Exception(
                mysqli_stmt_error(
                    $deleteParentStmt
                )
            );
        }


        /*
         * Delete parent user account
         */

        if ($parentUserId > 0) {

            $deleteParentUser = mysqli_prepare(
                $conn,
                "DELETE FROM users
                 WHERE id = ?
                 AND role = 'parent'"
            );

            mysqli_stmt_bind_param(
                $deleteParentUser,
                "i",
                $parentUserId
            );


            if (
                !mysqli_stmt_execute(
                    $deleteParentUser
                )
            ) {

                throw new Exception(
                    mysqli_stmt_error(
                        $deleteParentUser
                    )
                );
            }
        }
    }


    /*
     * 2. Delete Student
     */

    $deleteStudentStmt = mysqli_prepare(
        $conn,
        "DELETE FROM students
         WHERE id = ?"
    );

    mysqli_stmt_bind_param(
        $deleteStudentStmt,
        "i",
        $id
    );


    if (
        !mysqli_stmt_execute(
            $deleteStudentStmt
        )
    ) {

        throw new Exception(
            mysqli_stmt_error(
                $deleteStudentStmt
            )
        );
    }


    /*
     * 3. Delete Student user account
     */

    if ($studentUserId > 0) {

        $deleteStudentUser = mysqli_prepare(
            $conn,
            "DELETE FROM users
             WHERE id = ?
             AND role = 'student'"
        );

        mysqli_stmt_bind_param(
            $deleteStudentUser,
            "i",
            $studentUserId
        );


        if (
            !mysqli_stmt_execute(
                $deleteStudentUser
            )
        ) {

            throw new Exception(
                mysqli_stmt_error(
                    $deleteStudentUser
                )
            );
        }
    }


    /*
     * Commit
     */

    mysqli_commit($conn);


    /*
     * Response
     */

    if (
        $parentExists &&
        $deleteParent
    ) {

        $message =
            "Student and linked parent deleted successfully";

    } elseif ($parentExists) {

        $message =
            "Student deleted successfully. Linked parent was kept.";

    } else {

        $message =
            "Student deleted successfully";
    }


    echo json_encode([

        "status" => true,

        "message" => $message,

        "parent_found" => $parentExists,

        "parent_deleted" =>
            $parentExists &&
            $deleteParent

    ]);


} catch (Exception $e) {


    /*
     * Rollback
     */

    mysqli_rollback($conn);


    http_response_code(500);


    echo json_encode([

        "status" => false,

        "message" =>
            $e->getMessage()

    ]);

}

?>