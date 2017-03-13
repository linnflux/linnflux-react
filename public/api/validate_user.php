<?php
// include core configuration
include_once '../../config/core.php';
 
// include database connection
include_once '../../config/database.php';
 
// product object
//include_once '../objects/product.php';

$email = mysqli_real_escape_string($conn, $_POST['email']);


$sql = "SELECT pwd_hash, pwd_salt FROM users WHERE email='$email'";
$result = $conn->query($sql);

$dbSalt = "";
$dbHash = "";

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $dbSalt = $row["pwd_salt"];
        $dbHash = $row["pwd_hash"];
    }

    //build the JSON array for return
	/*$json = array(array('field' => 'dbSalt', 
	                    'value' => $dbSalt), 
	              array('field' => 'dbHash', 
	                    'value' => $dbHash));*/
	$json = array(array('dbSalt' => $dbSalt,
						'dbHash' => $dbHash));
    header('Content-Type: application/json');
	echo json_encode($json);
} else {
    echo "0 results";
}

$conn->close();
?>