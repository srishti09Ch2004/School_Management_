<?php

$url = "http://localhost/SCHOOL_MANAGEMENT_SYSTEM/backend/api/login.php";

$data = [
    "email" => "admin@gmail.com",
    "password" => "123456"
];

$options = [
    "http" => [
        "header"  => "Content-Type: application/json",
        "method"  => "POST",
        "content" => json_encode($data),
    ]
];

$context = stream_context_create($options);

$result = file_get_contents($url, false, $context);

echo $result;

?>