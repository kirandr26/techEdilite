<?php
session_start();

$response = array('status' => 'error', 'message' => 'Invalid request');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    if (isset($_POST['uid']) && isset($_POST['name']) && isset($_POST['email'])) {
        $_SESSION['user'] = array(
            'id' => $_POST['uid'],
            'name' => $_POST['name'],
            'email' => $_POST['email'],
            'role' => 'user'
        );
        $response = array('status' => 'success', 'message' => 'Loggedin successfully');
    } else {
        $response = array('status' => 'error', 'message' => 'Missing parameters');
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
