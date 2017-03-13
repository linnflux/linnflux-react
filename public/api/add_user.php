<?php
// include core configuration
include_once '../../config/core.php';
 
// include database connection
include_once '../../config/database.php';
 
// product object
//include_once '../objects/product.php';
$email = mysqli_real_escape_string($conn, $_POST['email']);
$salt = mysqli_real_escape_string($conn, $_POST['salt']);
$hash = mysqli_real_escape_string($conn, $_POST['hash']);


$sql = "INSERT INTO users (pwd_hash, pwd_salt, email) VALUES ('$hash', '$salt', '$email')";
$result = $conn->query($sql);
$conn->close();

header('Content-Type: application/json');
echo "user added.";
?>


