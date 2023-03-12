<?php
// Get the form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Validate the form data
if (empty($name) || empty($email) || empty($password) || empty($confirm_password)) {
  die('Please fill all required fields.');
}

if ($password != $confirm_password) {
  die('Passwords do not match. Please try again.');
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Connect to the SQL database
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Insert the data into the SQL database
$sql = "INSERT INTO employees (name, email, password) VALUES ('$name', '$email', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
  echo "Employee registration successful!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection to the SQL database
$conn->close();
?>
