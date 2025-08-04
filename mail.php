<?php
//get data from form  
$fname = $_POST['fname'];
$phone = $_POST['phone'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "support@pcrdp.com";
$subject = "AmazeTechn - Offering Results Driven Marketing Solutions";
$txt ="Full Name = ". $fname . "\r\nPhone = ". $phone . "\r\nEmail = " . $email . "\r\nMessage = " . $message;
$headers = "From: support@pcrdp.com" . "\r\n";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:index.html");
?>