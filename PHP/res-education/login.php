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
    <link rel="stylesheet" 
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" 
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" 
        crossorigin="anonymous">
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
    <div class="container">
        <h1>Please Log In</h1>
        <?php displayMessages(); ?>
        <form method="POST">
            <div class="form-group">
                <label for="id_1723_email">Email:</label>
                <input type="text" name="email" id="id_1723_email" class="form-control">
            </div>
            <div class="form-group">
                <label for="id_1723_pass">Password:</label>
                <input type="password" name="pass" id="id_1723_pass" class="form-control">
            </div>
            <input type="submit" onclick="return doValidate();" value="Log In" class="btn btn-primary">
            <a href="index.php" class="btn btn-default">Cancel</a>
        </form>
    </div>
</body>
</html>