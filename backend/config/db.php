<?php

$host = "sql211.infinityfree.com";
$user = "if0_42912018";
$password = "Iu6CJH0x7KJ";
$database = "if0_42912018_mydb";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8mb4");

?>