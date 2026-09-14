<?php

// $host = "sql203.infinityfree.com";
// $user = "if0_42904591";
// $password = "MdxinZmuACf";
// $database = "if0_42904591_Future_Academy";

// $conn = mysqli_connect($host, $user, $password, $database);

// if (!$conn) {
//     die("Connection Failed: " . mysqli_connect_error());
// }

// mysqli_set_charset($conn, "utf8mb4");

// ?>









<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "future_academy";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8mb4");

?>