<?php
require_once 'utils.php';
$pdo = getDB();

if (!isLoggedIn()) {
    die("ACCESS DENIED");
}

if (!isset($_GET['profile_id'])) {
    die("Missing profile_id");
}

$profile_id = $_GET['profile_id'];

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

$stmt = $pdo->prepare('SELECT first_name, last_name FROM Profile WHERE profile_id = :pid');
$stmt->execute(array(':pid' => $profile_id));
$profile = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - Delete Profile</title>
    <link rel="stylesheet" 
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" 
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" 
        crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <h1>Delete Profile</h1>
        <p>Are you sure you want to delete the profile for: 
           <?php echo htmlentities($profile['first_name'] . ' ' . $profile['last_name']); ?>?</p>
        <form method="POST">
            <input type="submit" name="delete" value="Delete" class="btn btn-danger">
            <input type="submit" name="cancel" value="Cancel" class="btn btn-default">
        </form>
    </div>
</body>
</html>