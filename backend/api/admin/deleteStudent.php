<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");


/*
|--------------------------------------------------------------------------
| Only POST
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
| Get Request Data
|--------------------------------------------------------------------------
*/

$data = json_decode(
    file_get_contents("php://input"),
    true
);


$studentId = intval(
    $data["id"] ?? 0
);

$deleteParent = isset($data["delete_parent"])
    ? (bool)$data["delete_parent"]
    : false;

$forceDeleteStudent = isset($data["force_delete_student"])
    ? (bool)$data["force_delete_student"]
    : false;


/*
|--------------------------------------------------------------------------
| Validate Student
|--------------------------------------------------------------------------
*/

if ($studentId <= 0) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid Student ID"
    ]);

    exit;
}


try {

    /*
    |--------------------------------------------------------------------------
    | Get Student
    |--------------------------------------------------------------------------
    */

    $studentStmt = mysqli_prepare(
        $conn,
        "SELECT id, user_id
         FROM students
         WHERE id = ?
         LIMIT 1"
    );

    if (!$studentStmt) {
        throw new Exception(
            "Student query preparation failed"
        );
    }

    mysqli_stmt_bind_param(
        $studentStmt,
        "i",
        $studentId
    );

    mysqli_stmt_execute(
        $studentStmt
    );

    $studentResult =
        mysqli_stmt_get_result(
            $studentStmt
        );


    if (
        !$studentResult ||
        mysqli_num_rows($studentResult) === 0
    ) {

        echo json_encode([
            "status" => false,
            "message" => "Student not found"
        ]);

        exit;
    }


    $student =
        mysqli_fetch_assoc(
            $studentResult
        );


    $studentUserId =
        intval($student["user_id"]);


    /*
    |--------------------------------------------------------------------------
    | Find Linked Parent
    |--------------------------------------------------------------------------
    */

    $parentStmt = mysqli_prepare(
        $conn,
        "SELECT id, user_id
         FROM parents
         WHERE student_id = ?
         LIMIT 1"
    );


    if (!$parentStmt) {
        throw new Exception(
            "Parent query preparation failed"
        );
    }


    mysqli_stmt_bind_param(
        $parentStmt,
        "i",
        $studentId
    );


    mysqli_stmt_execute(
        $parentStmt
    );


    $parentResult =
        mysqli_stmt_get_result(
            $parentStmt
        );


    $parent = null;


    if (
        $parentResult &&
        mysqli_num_rows($parentResult) > 0
    ) {

        $parent =
            mysqli_fetch_assoc(
                $parentResult
            );
    }


    /*
    |--------------------------------------------------------------------------
    | Parent exists but Admin has not decided
    |--------------------------------------------------------------------------
    */

    if (
        $parent &&
        !$deleteParent &&
        !$forceDeleteStudent
    ) {

        echo json_encode([

            "status" => false,

            "requires_parent_confirmation" => true,

            "message" =>
                "This student has a linked parent. Do you also want to delete the parent?"

        ]);

        exit;
    }


    /*
    |--------------------------------------------------------------------------
    | Start Transaction
    |--------------------------------------------------------------------------
    */

    mysqli_begin_transaction(
        $conn
    );


    /*
    |--------------------------------------------------------------------------
    | OPTION 1
    |
    | Admin said YES
    |
    | Delete Parent + Parent User
    |--------------------------------------------------------------------------
    */

    if (
        $parent &&
        $deleteParent
    ) {

        $parentId =
            intval($parent["id"]);

        $parentUserId =
            intval($parent["user_id"]);


        /*
        | Delete Parent Record
        */

        $deleteParentStmt =
            mysqli_prepare(
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
        | Delete Parent Login
        */

        if ($parentUserId > 0) {

            $deleteParentUser =
                mysqli_prepare(
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
    |--------------------------------------------------------------------------
    | OPTION 2
    |
    | Admin said NO
    |
    | Keep Parent but UNLINK student
    |--------------------------------------------------------------------------
    */

    if (
        $parent &&
        !$deleteParent &&
        $forceDeleteStudent
    ) {

        $parentId =
            intval($parent["id"]);


        $unlinkParentStmt =
            mysqli_prepare(
                $conn,
                "UPDATE parents
                 SET student_id = NULL
                 WHERE id = ?"
            );


        mysqli_stmt_bind_param(
            $unlinkParentStmt,
            "i",
            $parentId
        );


        if (
            !mysqli_stmt_execute(
                $unlinkParentStmt
            )
        ) {

            throw new Exception(
                mysqli_stmt_error(
                    $unlinkParentStmt
                )
            );
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Delete Student Record
    |--------------------------------------------------------------------------
    */

    $deleteStudentStmt =
        mysqli_prepare(
            $conn,
            "DELETE FROM students
             WHERE id = ?"
        );


    mysqli_stmt_bind_param(
        $deleteStudentStmt,
        "i",
        $studentId
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
    |--------------------------------------------------------------------------
    | Delete Student Login
    |--------------------------------------------------------------------------
    */

    if ($studentUserId > 0) {

        $deleteStudentUser =
            mysqli_prepare(
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
    |--------------------------------------------------------------------------
    | Commit
    |--------------------------------------------------------------------------
    */

    mysqli_commit(
        $conn
    );


    /*
    |--------------------------------------------------------------------------
    | Final Response
    |--------------------------------------------------------------------------
    */

    if (
        $parent &&
        $deleteParent
    ) {

        echo json_encode([

            "status" => true,

            "message" =>
                "Student and linked parent deleted successfully"

        ]);

    } else {

        echo json_encode([

            "status" => true,

            "message" =>
                "Student deleted successfully. Linked parent was kept."

        ]);
    }


} catch (Exception $e) {


    /*
    |--------------------------------------------------------------------------
    | Rollback
    |--------------------------------------------------------------------------
    */

    mysqli_rollback(
        $conn
    );


    echo json_encode([

        "status" => false,

        "message" =>
            $e->getMessage()

    ]);
}

?>