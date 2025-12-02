<?php
// Prevent PHP warnings from breaking JSON
error_reporting(0);
ini_set('display_errors', 0);

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection Details
$servername = " sql212.infinityfree.com "; // CHANGE THIS
$username = "if0_37827467";             // CHANGE THIS
$password = "abdullahrajab";                 // CHANGE THIS
$dbname = " if0_37827467_dif_payments_database";    // CHANGE THIS

// Create connection (suppress warnings with @)
$conn = @new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Return 200 to ensure frontend sees the JSON, but with error status
    echo json_encode(["status" => "error", "message" => "DB Connection Failed: " . $conn->connect_error]);
    exit();
}

// Get the code
if (!isset($_GET['code'])) {
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
    echo json_encode(["status" => "invalid", "message" => "Invalid or Expired Code"]);
}

$conn->close();
// No closing PHP tag to avoid trailing whitespace
