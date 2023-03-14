<?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = "Strider101@";
$dbname = "employee_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get data from the registration form
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$department = $_POST['department'];
$position = $_POST['position'];

// Insert data into the employees table
$sql = "INSERT INTO employees (first_name, last_name, email, password, department, position) VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $first_name, $last_name, $email, $password, $department, $position);

if ($stmt->execute()) {
  header("Location: employee_success_page.php"); // Redirect to the employee success page
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
