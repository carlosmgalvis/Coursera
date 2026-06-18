<?php
require_once 'utils.php';
$pdo = getDB();

$stmt = $pdo->query("SELECT profile_id, first_name, last_name, headline FROM Profile");
$profiles = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Me2edd660 Carlos Galvis - Resume Registry</title>
    <link rel="stylesheet" 
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" 
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" 
        crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <h1>Carlos Galvis - Resume Registry</h1>
        
        <?php displayMessages(); ?>
        
        <?php if (isLoggedIn()): ?>
            <p><a href="logout.php">Logout</a></p>
            <p><a href="add.php">Add New Entry</a></p>
        <?php else: ?>
            <p><a href="login.php">Please log in</a></p>
        <?php endif; ?>
        
        <table border="1" class="table">
            <tr><th>Name</th><th>Headline</th>
            <?php if (isLoggedIn()): ?><th>Action</th><?php endif; ?>
            </tr>
            <?php foreach ($profiles as $profile): ?>
            <tr>
                <td><a href="view.php?profile_id=<?php echo $profile['profile_id']; ?>">
                    <?php echo htmlentities($profile['first_name'] . ' ' . $profile['last_name']); ?>
                </a></td>
                <td><?php echo htmlentities($profile['headline']); ?></td>
                <?php if (isLoggedIn()): ?>
                <td>
                    <a href="edit.php?profile_id=<?php echo $profile['profile_id']; ?>">Edit</a>
                    <a href="delete.php?profile_id=<?php echo $profile['profile_id']; ?>">Delete</a>
                </td>
                <?php endif; ?>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>
</body>
</html>