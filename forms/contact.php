<?php
/**
 * Contact Form Handler
 * Sends form submissions to your email address
 */

// ============================================
// CONFIGURATION - UPDATE WITH YOUR EMAIL
// ============================================
$receiving_email_address = 'your-email@example.com'; // CHANGE THIS TO YOUR EMAIL

// ============================================
// EMAIL SETTINGS
// ============================================
// Option 1: Use PHP mail() function (simplest, but may not work on all servers)
$use_smtp = false; // Set to true if you want to use SMTP

// Option 2: SMTP Configuration (more reliable)
// Uncomment and fill in your SMTP details if you want to use SMTP
/*
$smtp_config = array(
    'host' => 'smtp.gmail.com',        // Gmail: smtp.gmail.com, Outlook: smtp-mail.outlook.com
    'username' => 'your-email@gmail.com',
    'password' => 'your-app-password',  // Use app-specific password for Gmail
    'port' => 587,                       // 587 for TLS, 465 for SSL
    'encryption' => 'tls'                // 'tls' or 'ssl'
);
*/

// ============================================
// VALIDATION
// ============================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('status' => 'error', 'message' => 'Method not allowed'));
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : 'Contact Form Submission';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(array('status' => 'error', 'message' => 'Please fill in all required fields.'));
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(array('status' => 'error', 'message' => 'Invalid email address.'));
    exit;
}

// ============================================
// PREPARE EMAIL
// ============================================
$email_subject = "Contact Form: " . $subject;
$email_body = "You have received a new message from your website contact form.\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Subject: " . $subject . "\n\n";
$email_body .= "Message:\n" . $message . "\n";

// Email headers
$headers = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ============================================
// SEND EMAIL
// ============================================
if ($use_smtp && isset($smtp_config)) {
    // Use SMTP (requires PHPMailer or similar library)
    // For now, we'll use mail() function
    $mail_sent = mail($receiving_email_address, $email_subject, $email_body, $headers);
} else {
    // Use PHP mail() function
    $mail_sent = @mail($receiving_email_address, $email_subject, $email_body, $headers);
}

// ============================================
// RESPONSE
// ============================================
if ($mail_sent) {
    http_response_code(200);
    echo json_encode(array('status' => 'success', 'message' => 'Your message has been sent. Thank you!'));
} else {
    http_response_code(500);
    echo json_encode(array('status' => 'error', 'message' => 'Failed to send message. Please try again later.'));
}
?>
