<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Methods: POST");
// header("Content-Type: application/json");

// include("../../config/db.php");


// if ($_SERVER["REQUEST_METHOD"] !== "POST") {

//     echo json_encode([
//         "status" => false,
//         "message" => "Invalid request method"
//     ]);

//     exit;
// }

// $data = json_decode(
//     file_get_contents("php://input"),
//     true
// );

// if (!$data) {

//     echo json_encode([
//         "status" => false,
//         "message" => "No data received"
//     ]);

//     exit;
// }

// $teacher_id = intval($data["teacher_id"] ?? 0);

// $attendance_date = $data["attendance_date"] ?? "";

// $attendance = $data["attendance"] ?? [];

// if ($teacher_id <= 0) {

//     echo json_encode([
//         "status" => false,
//         "message" => "Invalid teacher ID"
//     ]);

//     exit;
// }

// if (empty($attendance_date)) {

//     echo json_encode([
//         "status" => false,
//         "message" => "Attendance date is required"
//     ]);

//     exit;
// }

// if (empty($attendance)) {

//     echo json_encode([
//         "status" => false,
//         "message" => "No attendance records received"
//     ]);

//     exit;
// }

// mysqli_begin_transaction($conn);

// try {

//     foreach ($attendance as $record) {

//         $student_id = intval(
//             $record["student_id"] ?? 0
//         );

//         $status = trim(
//             $record["status"] ?? ""
//         );

//         $attendance_type = trim(
//             $record["attendance_type"] ?? "Manual"
//         );

//         if ($student_id <= 0) {

//             throw new Exception(
//                 "Invalid student ID"
//             );
//         }
//         if ($status === "") {

//             throw new Exception(
//                 "Attendance status is required"
//             );
//         }

//         $checkSql = "
//             SELECT id
//             FROM attendance
//             WHERE student_id = ?
//             AND attendance_date = ?
//             LIMIT 1
//         ";

//         $checkStmt = mysqli_prepare(
//             $conn,
//             $checkSql
//         );

//         mysqli_stmt_bind_param(
//             $checkStmt,
//             "is",
//             $student_id,
//             $attendance_date
//         );

//         mysqli_stmt_execute(
//             $checkStmt
//         );

//         $checkResult =
//             mysqli_stmt_get_result(
//                 $checkStmt
//             );

//         if (
//             $checkResult &&
//             mysqli_num_rows($checkResult) > 0
//         ) {

//             $existing =
//                 mysqli_fetch_assoc(
//                     $checkResult
//                 );

//             $attendance_id =
//                 intval($existing["id"]);

//             $updateSql = "
//                 UPDATE attendance
//                 SET
//                     teacher_id = ?,
//                     status = ?,
//                     attendance_type = ?
//                 WHERE id = ?
//             ";

//             $updateStmt = mysqli_prepare(
//                 $conn,
//                 $updateSql
//             );

//             mysqli_stmt_bind_param(
//                 $updateStmt,
//                 "issi",
//                 $teacher_id,
//                 $status,
//                 $attendance_type,
//                 $attendance_id
//             );

//             if (
//                 !mysqli_stmt_execute(
//                     $updateStmt
//                 )
//             ) {

//                 throw new Exception(
//                     mysqli_stmt_error(
//                         $updateStmt
//                     )
//                 );
//             }

//             mysqli_stmt_close(
//                 $updateStmt
//             );
//         }

//         else {

//             $insertSql = "
//                 INSERT INTO attendance
//                 (
//                     student_id,
//                     teacher_id,
//                     attendance_date,
//                     status,
//                     attendance_type,
//                     created_at
//                 )
//                 VALUES
//                 (
//                     ?,
//                     ?,
//                     ?,
//                     ?,
//                     ?,
//                     NOW()
//                 )
//             ";

//             $insertStmt = mysqli_prepare(
//                 $conn,
//                 $insertSql
//             );

//             mysqli_stmt_bind_param(
//                 $insertStmt,
//                 "iisss",
//                 $student_id,
//                 $teacher_id,
//                 $attendance_date,
//                 $status,
//                 $attendance_type
//             );

//             if (
//                 !mysqli_stmt_execute(
//                     $insertStmt
//                 )
//             ) {

//                 throw new Exception(
//                     mysqli_stmt_error(
//                         $insertStmt
//                     )
//                 );
//             }

//             mysqli_stmt_close(
//                 $insertStmt
//             );
//         }

//         mysqli_stmt_close(
//             $checkStmt
//         );
//     }

//     mysqli_commit($conn);

//     echo json_encode([

//         "status" => true,

//         "message" =>
//             "Attendance saved successfully"

//     ]);

// } catch (Exception $e) {    

//     mysqli_rollback($conn);

//     http_response_code(500);

//     echo json_encode([

//         "status" => false,

//         "message" =>
//             $e->getMessage()

//     ]);
// }
// ?> 



<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include("../../config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => false,
        "message" => "Invalid request method"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$teacher_id = intval($data["teacher_id"] ?? 0);
$attendance_date = trim($data["attendance_date"] ?? "");
$attendance = $data["attendance"] ?? [];

// BASIC VALIDATION

if ($teacher_id <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid teacher ID"
    ]);
    exit;
}

if (
    empty($attendance_date) ||
    !preg_match("/^\d{4}-\d{2}-\d{2}$/", $attendance_date)
) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid attendance date"
    ]);
    exit;
}

if (!is_array($attendance) || count($attendance) === 0) {
    echo json_encode([
        "status" => false,
        "message" => "Attendance data is required"
    ]);
    exit;
}

// VERIFY TEACHER

$teacherSql = "
    SELECT id
    FROM users
    WHERE id = ?
      AND role = 'teacher'
    LIMIT 1
";

$teacherStmt = mysqli_prepare($conn, $teacherSql);

if (!$teacherStmt) {
    echo json_encode([
        "status" => false,
        "message" => "Teacher verification failed"
    ]);
    exit;
}

mysqli_stmt_bind_param(
    $teacherStmt,
    "i",
    $teacher_id
);

mysqli_stmt_execute($teacherStmt);

$teacherResult = mysqli_stmt_get_result($teacherStmt);

if (
    !$teacherResult ||
    mysqli_num_rows($teacherResult) === 0
) {
    mysqli_stmt_close($teacherStmt);

    echo json_encode([
        "status" => false,
        "message" => "Teacher account not found"
    ]);
    exit;
}

mysqli_stmt_close($teacherStmt);

// START TRANSACTION

mysqli_begin_transaction($conn);

try {

    /*
     * One student + one date = one attendance.

     * Database already has:
     
     * UNIQUE(student_id, attendance_date)
     
     * So this safely INSERTS new attendance
     * or UPDATES existing attendance.
     */

    $sql = "
        INSERT INTO attendance (
            student_id,
            teacher_id,
            attendance_date,
            status,
            attendance_type,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, NOW())

        ON DUPLICATE KEY UPDATE
            teacher_id = VALUES(teacher_id),
            status = VALUES(status),
            attendance_type = VALUES(attendance_type)
    ";

    $stmt = mysqli_prepare($conn, $sql);

    if (!$stmt) {
        throw new Exception(
            "Unable to prepare attendance query"
        );
    }


    $saved = 0;
    $updated = 0;

    // PROCESS ATTENDANCE

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


        if ($student_id <= 0) {
            throw new Exception(
                "Invalid student ID"
            );
        }

        // ALLOWED STATUS

        $allowedStatuses = [
            "Present",
            "Absent",
            "Leave"
        ];

        if (!in_array($status, $allowedStatuses, true)) {
            throw new Exception(
                "Invalid attendance status for student ID "
                . $student_id
            );
        }

        // VERIFY ACTIVE STUDENT

        $studentSql = "
            SELECT id
            FROM students
            WHERE id = ?
              AND status = 'Active'
            LIMIT 1
        ";

        $studentStmt = mysqli_prepare(
            $conn,
            $studentSql
        );

        if (!$studentStmt) {
            throw new Exception(
                "Student verification failed"
            );
        }

        mysqli_stmt_bind_param(
            $studentStmt,
            "i",
            $student_id
        );

        mysqli_stmt_execute(
            $studentStmt
        );

        $studentResult = mysqli_stmt_get_result(
            $studentStmt
        );

        if (
            !$studentResult ||
            mysqli_num_rows($studentResult) === 0
        ) {
            mysqli_stmt_close(
                $studentStmt
            );

            throw new Exception(
                "Active student not found: "
                . $student_id
            );
        }

        mysqli_stmt_close(
            $studentStmt
        );

        // INSERT / UPDATE

        mysqli_stmt_bind_param(
            $stmt,
            "iisss",
            $student_id,
            $teacher_id,
            $attendance_date,
            $status,
            $attendance_type
        );

        if (!mysqli_stmt_execute($stmt)) {
            throw new Exception(
                mysqli_stmt_error($stmt)
            );
        }


        $affected = mysqli_stmt_affected_rows($stmt);

        if ($affected === 1) {
            $saved++;
        } else {
            $updated++;
        }
    }

    mysqli_stmt_close($stmt);

    mysqli_commit($conn);

    echo json_encode([
        "status" => true,
        "message" => "Attendance saved successfully",
        "teacher_id" => $teacher_id,
        "attendance_date" => $attendance_date,
        "saved_records" => $saved,
        "updated_records" => $updated,
        "total_records" => count($attendance)
    ]);

} catch (Exception $e) {

    mysqli_rollback($conn);

    echo json_encode([
        "status" => false,
        "message" => $e->getMessage()
    ]);
}

?>