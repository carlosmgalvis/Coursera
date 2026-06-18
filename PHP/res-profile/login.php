<?php
require_once 'utils.php';
$pdo = getDB();
$salt = 'XyZzy12*_';

if (isset($_POST['email']) && isset($_POST['pass'])) {
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    
    $check = hash('md5', $salt . $pass);
    $stmt = $pdo->prepare('SELECT user_id, name FROM users WHERE email = :em AND password = :pw');
    $stmt->execute(array(':em' => $email, ':pw' => $check));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($row !== false) {
        $_SESSION['name'] = $row['name'];
        $_SESSION['user_id'] = $row['user_id'];
        header("Location: index.php");
        return;
    } else {
        $_SESSION['error'] = "Incorrect email or password";
        header("Location: login.php");
        return;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - Login</title>
    <script>
        function doValidate() {
            console.log('Validating...');
            try {
                email = document.getElementById('id_1723_email').value;
                pw = document.getElementById('id_1723_pass').value;
                console.log("Validating email="+email+" pw="+pw);
                if (email == null || email == "" || pw == null || pw == "") {
                    alert("Both fields must be filled out");
                    return false;
                }
                if (email.indexOf('@') == -1) {
                    alert("Email address must contain @");
                    return false;
                }
                return true;
            } catch(e) {
                return false;
            }
        }
    </script>
</head>
<body>
    <h1>Please Log In</h1>
    <?php displayMessages(); ?>
    <form method="POST">
        <label for="id_1723_email">Email:</label>
        <input type="text" name="email" id="id_1723_email"><br/>
        <label for="id_1723_pass">Password:</label>
        <input type="password" name="pass" id="id_1723_pass"><br/>
        <input type="submit" onclick="return doValidate();" value="Log In">
    </form>
    <p><a href="index.php">Cancel</a></p>
</body>
</html>