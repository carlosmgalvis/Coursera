<?php
require_once 'utils.php';
$pdo = getDB();

if (!isset($_GET['profile_id'])) {
    die("Missing profile_id");
}

$profile_id = $_GET['profile_id'];

$stmt = $pdo->prepare("SELECT * FROM Profile WHERE profile_id = :pid");
$stmt->execute(array(":pid" => $profile_id));
$profile = $stmt->fetch(PDO::FETCH_ASSOC);

if ($profile === false) {
    die("Profile not found");
}

// Get positions
$stmt = $pdo->prepare("SELECT * FROM Position WHERE profile_id = :pid ORDER BY rank");
$stmt->execute(array(":pid" => $profile_id));
$positions = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get education
$stmt = $pdo->prepare("SELECT Education.year, Institution.name FROM Education JOIN Institution ON Education.institution_id = Institution.institution_id WHERE Education.profile_id = :pid ORDER BY Education.rank");
$stmt->execute(array(":pid" => $profile_id));
$educations = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - View Profile</title>
    <link rel="stylesheet" 
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" 
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" 
        crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <h1>Profile Information</h1>
        <p><strong>First Name:</strong> <?php echo htmlentities($profile['first_name']); ?></p>
        <p><strong>Last Name:</strong> <?php echo htmlentities($profile['last_name']); ?></p>
        <p><strong>Email:</strong> <?php echo htmlentities($profile['email']); ?></p>
        <p><strong>Headline:</strong> <?php echo htmlentities($profile['headline']); ?></p>
        <p><strong>Summary:</strong> <?php echo htmlentities($profile['summary']); ?></p>
        
        <?php if (count($positions) > 0): ?>
            <p><strong>Positions:</strong></p>
            <ul>
            <?php foreach ($positions as $position): ?>
                <li><?php echo htmlentities($position['year']); ?>: <?php echo htmlentities($position['description']); ?></li>
            <?php endforeach; ?>
            </ul>
        <?php endif; ?>
        
        <?php if (count($educations) > 0): ?>
            <p><strong>Education:</strong></p>
            <ul>
            <?php foreach ($educations as $education): ?>
                <li><?php echo htmlentities($education['year']); ?>: <?php echo htmlentities($education['name']); ?></li>
            <?php endforeach; ?>
            </ul>
        <?php endif; ?>
        
        <p><a href="index.php" class="btn btn-default">Done</a></p>
    </div>
</body>
</html>