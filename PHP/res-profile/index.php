<?php
require_once 'utils.php';
$pdo = getDB();

// Get all profiles
$stmt = $pdo->query("SELECT profile_id, first_name, last_name, headline FROM Profile");
$profiles = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title> e2edd660 Carlos Galvis - Resume Registry</title>
</head>
<body>
    <h1>Carlos Galvis - Resume Registry</h1>
    
    <?php displayMessages(); ?>
    
    <?php if (isLoggedIn()): ?>
        <p><a href="logout.php">Logout</a></p>
        <p><a href="add.php">Add New Entry</a></p>
    <?php else: ?>
        <p><a href="login.php">Please log in</a></p>
    <?php endif; ?>
    
    <table border="1">
        <tr><th>Name</th><th>Headline</th>
        <?php if (isLoggedIn()): ?><th>Action</th><?php endif; ?>
        </tr>
        <?php foreach ($profiles as $profile): ?>
        <tr>
            <td><a href="view.php?profile_id=<?= $profile['profile_id'] ?>">
                <?= escape($profile['first_name'] . ' ' . $profile['last_name']) ?>
            </a></td>
            <td><?= escape($profile['headline']) ?></td>
            <?php if (isLoggedIn()): ?>
            <td>
                <a href="edit.php?profile_id=<?= $profile['profile_id'] ?>">Edit</a>
                <a href="delete.php?profile_id=<?= $profile['profile_id'] ?>">Delete</a>
            </td>
            <?php endif; ?>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>