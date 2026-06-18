<?php
session_start();

// Database connection function
function getDB() {
    try {
        $pdo = new PDO('mysql:host=localhost;port=3306;dbname=misc', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}

// Check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Redirect with message
function redirectWithMessage($url, $message) {
    $_SESSION['error'] = $message;
    header("Location: $url");
    return;
}

// Redirect with success message
function redirectWithSuccess($url, $message) {
    $_SESSION['success'] = $message;
    header("Location: $url");
    return;
}

// Escape HTML
function escape($text) {
    return htmlentities($text, ENT_QUOTES, 'UTF-8');
}

// Display flash messages
function displayMessages() {
    if (isset($_SESSION['error'])) {
        echo '<p style="color: red;">' . escape($_SESSION['error']) . '</p>';
        unset($_SESSION['error']);
    }
    if (isset($_SESSION['success'])) {
        echo '<p style="color: green;">' . escape($_SESSION['success']) . '</p>';
        unset($_SESSION['success']);
    }
}

// Check if profile belongs to logged in user
function profileBelongsToUser($pdo, $profile_id, $user_id) {
    $stmt = $pdo->prepare('SELECT user_id FROM Profile WHERE profile_id = :pid');
    $stmt->execute(array(':pid' => $profile_id));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row && $row['user_id'] == $user_id;
}
?>