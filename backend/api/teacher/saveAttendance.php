<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
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
        "message" => "Invalid request method"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Get JSON data
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
| Get main information
|--------------------------------------------------------------------------
*/

$teacher_id = intval($data["teacher_id"] ?? 0);

$attendance_date = $data["attendance_date"] ?? "";

$attendance = $data["attendance"] ?? [];


/*
|--------------------------------------------------------------------------
| Basic validation
|--------------------------------------------------------------------------
*/

if ($teacher_id <= 0) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid teacher ID"
    ]);

    exit;
}


if (empty($attendance_date)) {

    echo json_encode([
        "status" => false,
        "message" => "Attendance date is required"
    ]);

    exit;
}


if (empty($attendance)) {

    echo json_encode([
        "status" => false,
        "message" => "No attendance records received"
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| Start Transaction
|--------------------------------------------------------------------------
*/

mysqli_begin_transaction($conn);


try {

    /*
    |--------------------------------------------------------------------------
    | Process every student attendance
    |--------------------------------------------------------------------------
    */

    foreach ($attendance as $record) {

        $student_id = intval(
            $record["student_id"] ?? 0
        );

        $status = trim(
            $record["status"] ?? ""
        );

        $attendance_type = trim(
            $record["attendance_type"] ?? "Manual"
        );


        /*
        |--------------------------------------------------------------------------
        | Validate student
        |--------------------------------------------------------------------------
        */

        if ($student_id <= 0) {

            throw new Exception(
                "Invalid student ID"
            );
        }


        if ($status === "") {

            throw new Exception(
                "Attendance status is required"
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Check if attendance already exists
        |--------------------------------------------------------------------------
        */

        $checkSql = "
            SELECT id
            FROM attendance
            WHERE student_id = ?
            AND attendance_date = ?
            LIMIT 1
        ";


        $checkStmt = mysqli_prepare(
            $conn,
            $checkSql
        );


        mysqli_stmt_bind_param(
            $checkStmt,
            "is",
            $student_id,
            $attendance_date
        );


        mysqli_stmt_execute(
            $checkStmt
        );


        $checkResult =
            mysqli_stmt_get_result(
                $checkStmt
            );


        /*
        |--------------------------------------------------------------------------
        | If attendance already exists → UPDATE
        |--------------------------------------------------------------------------
        */

        if (
            $checkResult &&
            mysqli_num_rows($checkResult) > 0
        ) {

            $existing =
                mysqli_fetch_assoc(
                    $checkResult
                );


            $attendance_id =
                intval($existing["id"]);


            $updateSql = "
                UPDATE attendance
                SET
                    teacher_id = ?,
                    status = ?,
                    attendance_type = ?
                WHERE id = ?
            ";


            $updateStmt = mysqli_prepare(
                $conn,
                $updateSql
            );


            mysqli_stmt_bind_param(
                $updateStmt,
                "issi",
                $teacher_id,
                $status,
                $attendance_type,
                $attendance_id
            );


            if (
                !mysqli_stmt_execute(
                    $updateStmt
                )
            ) {

                throw new Exception(
                    mysqli_stmt_error(
                        $updateStmt
                    )
                );
            }


            mysqli_stmt_close(
                $updateStmt
            );

        }


        /*
        |--------------------------------------------------------------------------
        | Otherwise → INSERT new attendance
        |--------------------------------------------------------------------------
        */

        else {

            $insertSql = "
                INSERT INTO attendance
                (
                    student_id,
                    teacher_id,
                    attendance_date,
                    status,
                    attendance_type,
                    created_at
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    NOW()
                )
            ";


            $insertStmt = mysqli_prepare(
                $conn,
                $insertSql
            );


            mysqli_stmt_bind_param(
                $insertStmt,
                "iisss",
                $student_id,
                $teacher_id,
                $attendance_date,
                $status,
                $attendance_type
            );


            if (
                !mysqli_stmt_execute(
                    $insertStmt
                )
            ) {

                throw new Exception(
                    mysqli_stmt_error(
                        $insertStmt
                    )
                );
            }


            mysqli_stmt_close(
                $insertStmt
            );
        }


        mysqli_stmt_close(
            $checkStmt
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Everything successful
    |--------------------------------------------------------------------------
    */

    mysqli_commit($conn);


    echo json_encode([

        "status" => true,

        "message" =>
            "Attendance saved successfully"

    ]);


} catch (Exception $e) {


    /*
    |--------------------------------------------------------------------------
    | Something failed → rollback
    |--------------------------------------------------------------------------
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