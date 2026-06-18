<?php
require_once 'utils.php';
$pdo = getDB();

if (!isLoggedIn()) {
    die("Not logged in");
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
        header("Location: add.php");
        return;
    }
    
    if (strpos($email, '@') === false) {
        $_SESSION['error'] = "Email address must contain @";
        header("Location: add.php");
        return;
    }
    
    $stmt = $pdo->prepare('INSERT INTO Profile
        (user_id, first_name, last_name, email, headline, summary)
        VALUES (:uid, :fn, :ln, :em, :he, :su)');
    $stmt->execute(array(
        ':uid' => $_SESSION['user_id'],
        ':fn' => $first_name,
        ':ln' => $last_name,
        ':em' => $email,
        ':he' => $headline,
        ':su' => $summary
    ));
    
    $_SESSION['success'] = "Profile added successfully";
    header("Location: index.php");
    return;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - Add Profile</title>
</head>
<body>
    <h1>Add Profile</h1>
    <?php displayMessages(); ?>
    <form method="POST">
        <p>First Name: <input type="text" name="first_name" size="60"></p>
        <p>Last Name: <input type="text" name="last_name" size="60"></p>
        <p>Email: <input type="text" name="email" size="60"></p>
        <p>Headline: <input type="text" name="headline" size="80"></p>
        <p>Summary: <textarea name="summary" rows="8" cols="80"></textarea></p>
        <p>
            <input type="submit" value="Add">
            <input type="submit" name="cancel" value="Cancel">
        </p>
    </form>
</body>
</html>