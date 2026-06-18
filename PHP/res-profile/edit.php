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
    die("You don't have permission to edit this profile");
}

if (isset($_POST['cancel'])) {
    header("Location: index.php");
    return;
}

if (isset($_POST['first_name']) && isset($_POST['last_name']) && 
    isset($_POST['email']) && isset($_POST['headline']) && isset($_POST['summary'])) {
    
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $headline = $_POST['headline'];
    $summary = $_POST['summary'];
    
    // Validation
    if (empty($first_name) || empty($last_name) || empty($email) || 
        empty($headline) || empty($summary)) {
        $_SESSION['error'] = "All fields are required";
        header("Location: edit.php?profile_id=" . $profile_id);
        return;
    }
    
    if (strpos($email, '@') === false) {
        $_SESSION['error'] = "Email address must contain @";
        header("Location: edit.php?profile_id=" . $profile_id);
        return;
    }
    
    $stmt = $pdo->prepare('UPDATE Profile SET
        first_name = :fn, last_name = :ln, email = :em, 
        headline = :he, summary = :su
        WHERE profile_id = :pid AND user_id = :uid');
    $stmt->execute(array(
        ':fn' => $first_name,
        ':ln' => $last_name,
        ':em' => $email,
        ':he' => $headline,
        ':su' => $summary,
        ':pid' => $profile_id,
        ':uid' => $_SESSION['user_id']
    ));
    
    $_SESSION['success'] = "Profile updated successfully";
    header("Location: index.php");
    return;
}

// Get current data
$stmt = $pdo->prepare('SELECT * FROM Profile WHERE profile_id = :pid');
$stmt->execute(array(':pid' => $profile_id));
$profile = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - Edit Profile</title>
</head>
<body>
    <h1>Edit Profile</h1>
    <?php displayMessages(); ?>
    <form method="POST">
        <p>First Name: <input type="text" name="first_name" size="60" 
            value="<?= escape($profile['first_name']) ?>"></p>
        <p>Last Name: <input type="text" name="last_name" size="60" 
            value="<?= escape($profile['last_name']) ?>"></p>
        <p>Email: <input type="text" name="email" size="60" 
            value="<?= escape($profile['email']) ?>"></p>
        <p>Headline: <input type="text" name="headline" size="80" 
            value="<?= escape($profile['headline']) ?>"></p>
        <p>Summary: <textarea name="summary" rows="8" cols="80"><?= escape($profile['summary']) ?></textarea></p>
        <p>
            <input type="submit" value="Save">
            <input type="submit" name="cancel" value="Cancel">
        </p>
    </form>
</body>
</html>