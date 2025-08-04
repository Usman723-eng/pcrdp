<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if(isset($_POST['submitContact'])) {
    $fullname = $_POST['full_name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        //Server settings
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER; // Enable verbose debug output
        $mail->isSMTP();
        $mail->Host       = 'mail.pcrdp.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'social@pcrdp.com';
        $mail->Password   = 'v-41Kz^odjAD';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        //Recipients
        $mail->setFrom('social@pcrdp.com', 'Funda of Web IT');
        $mail->addAddress('usmanhafiz723@gmail.com', 'Funda of Web IT'); // Add a recipient

        // Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'New enquiry - Funda of Web IT Contact Form';

        $bodyContent = '<div>Hello, you got a new enquiry</div>
            <div>Fullname: '.$fullname.'</div>
            <div>Email: '.$email.'</div>
            <div>Subject: '.$subject.'</div>
            <div>Message: '.$message.'</div>';

        $mail->Body = $bodyContent;
        $mail->AltBody = strip_tags($bodyContent); // Set the plain text body for non-HTML mail clients

        // Additional Headers
        $mail->XMailer = ' '; // Hide the X-Mailer header
        $mail->addCustomHeader('X-Priority', '3'); // Normal priority
        $mail->addCustomHeader('X-MSMail-Priority', 'Normal');
        $mail->addCustomHeader('Importance', 'Normal');

        if($mail->send()) {
            $_SESSION['status'] = "Thank you for contacting us - Team Funda of Web IT";
            header("Location: {$_SERVER["HTTP_REFERER"]}");
            exit(0);
        } else {
            $_SESSION['status'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            header("Location: {$_SERVER["HTTP_REFERER"]}");
            exit(0);
        }
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    header('Location: index.php');
    exit(0);
}
?>
