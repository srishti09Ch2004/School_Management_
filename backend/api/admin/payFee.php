<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);
    exit;
}

$fee_id = $data["fee_id"] ?? "";
$payment_amount = $data["payment_amount"] ?? 0;
$payment_date = $data["payment_date"] ?? date("Y-m-d");

if (empty($fee_id) || $payment_amount <= 0) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid payment details"
    ]);
    exit;
}

$result = mysqli_query(
    $conn,
    "SELECT total_fee, paid_fee, due_fee FROM fees WHERE id='$fee_id'"
);

if (mysqli_num_rows($result) === 0) {
    echo json_encode([
        "status" => false,
        "message" => "Fee record not found"
    ]);
    exit;
}

$fee = mysqli_fetch_assoc($result);

$due_fee = (float)$fee["due_fee"];

if ((float)$payment_amount > $due_fee) {
    echo json_encode([
        "status" => false,
        "message" => "Payment cannot be greater than due fee"
    ]);
    exit;
}

$new_paid_fee = (float)$fee["paid_fee"] + (float)$payment_amount;
$new_due_fee = (float)$fee["total_fee"] - $new_paid_fee;

$new_status = ($new_due_fee <= 0) ? "Paid" : "Pending";

$update = mysqli_query(
    $conn,
    "UPDATE fees
     SET
       paid_fee='$new_paid_fee',
       due_fee='$new_due_fee',
       payment_date='$payment_date',
       status='$new_status'
     WHERE id='$fee_id'"
);

if ($update) {
    echo json_encode([
        "status" => true,
        "message" => "Payment Updated Successfully"
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => "Payment update failed"
    ]);
}

?>