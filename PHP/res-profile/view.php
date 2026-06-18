<?php
require_once 'utils.php';
$pdo = getDB();

if (!isset($_GET['profile_id'])) {
    die("Missing profile_id");
}

$stmt = $pdo->prepare('SELECT * FROM Profile WHERE profile_id = :pid');
$stmt->execute(array(':pid' => $_GET['profile_id']));
$profile = $stmt->fetch(PDO::FETCH_ASSOC);

if ($profile === false) {
    die("Profile not found");
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - View Profile</title>
</head>
<body>
    <h1>Profile Information</h1>
    <p>First Name: <?= escape($profile['first_name']) ?></p>
    <p>Last Name: <?= escape($profile['last_name']) ?></p>
    <p>Email: <?= escape($profile['email']) ?></p>
    <p>Headline: <?= escape($profile['headline']) ?></p>
    <p>Summary: <?= escape($profile['summary']) ?></p>
    <p><a href="index.php">Done</a></p>
</body>
</html>