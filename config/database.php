<?php
    // specify your own database credentials
    $host = "localhost";
    $db_name = "[DB_NAME]";
    $username = "[DB_USER]";
    $password = "[DB_PASS]";

 
    $conn = new mysqli($host, $username, $password, $db_name);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>