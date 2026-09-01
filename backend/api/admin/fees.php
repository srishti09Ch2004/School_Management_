
<?php

// header("Access-Control-Allow-Origin: http://localhost:5173");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Methods: GET, OPTIONS");
// header("Content-Type: application/json");

// include("../../config/db.php");

// if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
//     exit;
// }

// if ($_SERVER["REQUEST_METHOD"] !== "GET") {

//     echo json_encode([
//         "status" => false,
//         "message" => "Invalid request method"
//     ]);

//     exit;
// }


// /*
//     Fetch Active / Pending Fees

//     Only fees having due amount are returned.

//     Paid fee remains in database but disappears from
//     Admin's active/pending fee list.
// */

// $sql = "
//     SELECT
//         f.id,
//         f.student_id,

//         u.full_name,
//         u.email,

//         s.admission_no,
//         s.class,
//         s.section,
//         s.roll_no,

//         f.total_fee,
//         f.paid_fee,
//         f.due_fee,
//         f.payment_date,
//         f.status,
//         f.created_at

//     FROM fees f

//     INNER JOIN students s
//         ON f.student_id = s.id

//     INNER JOIN users u
//         ON s.user_id = u.id

//     ORDER BY f.id DESC
// ";


// $result = mysqli_query($conn, $sql);


// if (!$result) {

//     echo json_encode([
//         "status" => false,
//         "message" => "Failed to fetch fee records",
//         "error" => mysqli_error($conn)
//     ]);

//     exit;
// }


// $fees = [];

// $totalFee = 0;
// $totalPaid = 0;
// $totalDue = 0;


// while ($row = mysqli_fetch_assoc($result)) {

//     $total =
//         floatval($row["total_fee"]);

//     $paid =
//         floatval($row["paid_fee"]);

//     $due =
//         floatval($row["due_fee"]);


//     $fees[] = [

//         "id" =>
//             intval($row["id"]),

//         "student_id" =>
//             intval($row["student_id"]),

//         "full_name" =>
//             $row["full_name"],

//         "email" =>
//             $row["email"],

//         "admission_no" =>
//             $row["admission_no"],

//         "class" =>
//             $row["class"],

//         "section" =>
//             $row["section"],

//         "roll_no" =>
//             $row["roll_no"],

//         "total_fee" =>
//             $total,

//         "paid_fee" =>
//             $paid,

//         "due_fee" =>
//             $due,

//         "payment_date" =>
//             $row["payment_date"],

//         "status" =>
//             $row["status"],

//         "created_at" =>
//             $row["created_at"]
//     ];


//     $totalFee += $total;
//     $totalPaid += $paid;
//     $totalDue += $due;
// }


// echo json_encode([

//     "status" => true,

//     "message" =>
//         "Active fee records fetched successfully",

//     "summary" => [

//         "total_fee" =>
//             $totalFee,

//         "total_paid" =>
//             $totalPaid,

//         "total_due" =>
//             $totalDue,

//         "pending_records" =>
//             count($fees)
//     ],

//     "data" =>
//         $fees

// ]);

// ?>






<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

include("../../config/db.php");


// OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}


// Only GET allowed
if ($_SERVER["REQUEST_METHOD"] !== "GET") {

    echo json_encode([
        "status" => false,
        "message" => "Invalid request method"
    ]);

    exit;
}


/*

| Fetch All Fee Records|
| Admin ko Pending + Partially Paid + Paid
| sabhi fee records dikhne chahiye.
|
*/

$sql = "
    SELECT
        f.id,
        f.student_id,

        u.full_name,
        u.email,

        s.admission_no,
        s.class,
        s.section,
        s.roll_no,

        f.total_fee,
        f.paid_fee,
        f.due_fee,
        f.payment_date,
        f.status

    FROM fees f

    INNER JOIN students s
        ON f.student_id = s.id

    INNER JOIN users u
        ON s.user_id = u.id

    ORDER BY f.id DESC
";


$result = mysqli_query($conn, $sql);


if (!$result) {

    echo json_encode([
        "status" => false,
        "message" => "Failed to fetch fee records",
        "error" => mysqli_error($conn)
    ]);

    exit;
}

// Prepare Fee Data

$fees = [];

$totalFee = 0;
$totalPaid = 0;
$totalDue = 0;


while ($row = mysqli_fetch_assoc($result)) {

    $total = floatval($row["total_fee"]);
    $paid  = floatval($row["paid_fee"]);
    $due   = floatval($row["due_fee"]);


    $fees[] = [

        "id" =>
            intval($row["id"]),

        "student_id" =>
            intval($row["student_id"]),

        // Student Information

        "full_name" =>
            $row["full_name"],

        "student_name" =>
            $row["full_name"],

        "email" =>
            $row["email"],

        "admission_no" =>
            $row["admission_no"],

        "class" =>
            $row["class"],

        "section" =>
            $row["section"],

        "roll_no" =>
            $row["roll_no"],


//  Fee Information

        "total_fee" =>
            $total,

        "paid_fee" =>
            $paid,

        "due_fee" =>
            $due,

        "payment_date" =>
            $row["payment_date"],

        "status" =>
            $row["status"]
    ];

//  Admin Summary

    $totalFee += $total;
    $totalPaid += $paid;
    $totalDue += $due;
}

// Final Response

echo json_encode([

    "status" => true,

    "message" =>
        "Fee records fetched successfully",

    "summary" => [

        "total_fee" =>
            $totalFee,

        "total_paid" =>
            $totalPaid,

        "total_due" =>
            $totalDue,

        "total_records" =>
            count($fees)
    ],

    "data" =>
        $fees

]);

?>

