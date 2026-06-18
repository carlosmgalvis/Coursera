<?php
require_once 'utils.php';
$pdo = getDB();

if (!isLoggedIn()) {
    die("Not logged in");
}

if (!isset($_GET['profile_id'])) {
    die("Missing profile_id");
}

$profile_id = $_GET['profile_id'];

// Check if profile exists and belongs to user
if (!profileBelongsToUser($pdo, $profile_id, $_SESSION['user_id'])) {
    die("You don't have permission to delete this profile");
}

if (isset($_POST['cancel'])) {
    header("Location: index.php");
    return;
}

if (isset($_POST['delete'])) {
    $stmt = $pdo->prepare('DELETE FROM Profile WHERE profile_id = :pid AND user_id = :uid');
    $stmt->execute(array(
        ':pid' => $profile_id,
        ':uid' => $_SESSION['user_id']
    ));
    $_SESSION['success'] = "Profile deleted successfully";
    header("Location: index.php");
    return;
}

// Get profile info for confirmation
$stmt = $pdo->prepare('SELECT first_name, last_name FROM Profile WHERE profile_id = :pid');
$stmt->execute(array(':pid' => $profile_id));
$profile = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - Delete Profile</title>
</head>
<body>
    <h1>Delete Profile</h1>
    <p>Are you sure you want to delete the profile for: 
       <?= escape($profile['first_name'] . ' ' . $profile['last_name']) ?>?</p>
    <form method="POST">
        <input type="submit" name="delete" value="Delete">
        <input type="submit" name="cancel" value="Cancel">
    </form>
</body>
</html>