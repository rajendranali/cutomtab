<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow requests with credentials (e.g., cookies)
header("Access-Control-Allow-Credentials: true");

// Allow requests with the following methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow requests with the following headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Check if the request method is OPTIONS (preflight request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond with a 200 OK status
    http_response_code(200);
    exit();
}

// Process the proxy request
$url = isset($_GET['url']) ? $_GET['url'] : '';
if ($url) {
    // Fetch the content from the requested URL
    $content = file_get_contents($url);
    // Output the fetched content
    echo $content;
} else {
    // No URL provided
    http_response_code(400); // Bad Request
    echo 'Error: No URL provided';
}
?>