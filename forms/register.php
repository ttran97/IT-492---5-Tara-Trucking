<?php
// Database connection parameters
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get submitted form data
$name = $_POST["name"]; // Replace "name" with the actual name attribute of your input field
$email = $_POST["email"]; // Replace "email" with the actual name attribute of your input field
// Add other input fields as necessary

// Insert the employee information into the database
$sql = "INSERT INTO employees (name, email) VALUES ('$name', '$email')"; // Replace "employees" with the actual table name in your database

if ($conn->query($sql) === TRUE) {
    // Redirect to the employee success page after successful registration
    header("Location: employee-success.html");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$conn->close();
?>
