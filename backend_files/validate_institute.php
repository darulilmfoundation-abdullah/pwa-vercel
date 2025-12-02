<?php
// Prevent PHP warnings from breaking JSON
error_reporting(0);
ini_set('display_errors', 0);

// Allow CORS from any origin (since PWA might run from anywhere)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection Details
$servername = "sql123.infinityfree.com"; // CHANGE THIS
$username = "if0_12345678";             // CHANGE THIS
$password = "password";                 // CHANGE THIS
$dbname = "if0_12345678_attendance";    // CHANGE THIS

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Get the code from the request
if (!isset($_GET['code'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No code provided"]);
    exit();
}

$code = $conn->real_escape_string($_GET['code']);

// Check if code exists and is active
$sql = "SELECT * FROM institute_codes WHERE code = '$code' AND status = 'active' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode(["status" => "valid", "message" => "Access Granted"]);
} else {
    // Return 200 even for invalid code so frontend can parse JSON easily, 
    // but with status 'invalid'
    echo json_encode(["status" => "invalid", "message" => "Invalid or Expired Code"]);
}

$conn->close();
?>
