<?php
require_once 'utils.php';
$pdo = getDB();

if (!isLoggedIn()) {
    die("ACCESS DENIED");
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
    
    // Validate profile fields
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
    
    // Validate positions
    $pos_validate = validatePositions();
    if ($pos_validate !== true) {
        $_SESSION['error'] = $pos_validate;
        header("Location: add.php");
        return;
    }
    
    // Insert profile
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
    $profile_id = $pdo->lastInsertId();
    
    // Insert positions - FIXED: added the logic directly here
    $rank = 1;
    for($i=1; $i<=9; $i++) {
        if ( ! isset($_POST['year'.$i]) ) continue;
        if ( ! isset($_POST['desc'.$i]) ) continue;
        $year = $_POST['year'.$i];
        $desc = $_POST['desc'.$i];
        
        $stmt = $pdo->prepare('INSERT INTO Position
            (profile_id, rank, year, description)
            VALUES ( :pid, :rank, :year, :desc)');
        $stmt->execute(array(
            ':pid' => $profile_id,
            ':rank' => $rank,
            ':year' => $year,
            ':desc' => $desc)
        );
        $rank++;
    }
    
    $_SESSION['success'] = "Profile added successfully";
    header("Location: index.php");
    return;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - Add Profile</title>
    <link rel="stylesheet" 
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" 
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" 
        crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.js"
        integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
        crossorigin="anonymous"></script>
</head>
<body>
    <div class="container">
        <h1>Add Profile</h1>
        <?php displayMessages(); ?>
        <form method="POST">
            <div class="form-group">
                <label>First Name:</label>
                <input type="text" name="first_name" size="60" class="form-control">
            </div>
            <div class="form-group">
                <label>Last Name:</label>
                <input type="text" name="last_name" size="60" class="form-control">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="text" name="email" size="60" class="form-control">
            </div>
            <div class="form-group">
                <label>Headline:</label>
                <input type="text" name="headline" size="80" class="form-control">
            </div>
            <div class="form-group">
                <label>Summary:</label>
                <textarea name="summary" rows="8" cols="80" class="form-control"></textarea>
            </div>
            
            <div id="position_fields">
                <div class="form-group">
                    <label>Positions:</label>
                    <input type="button" id="addPos" value="+" class="btn btn-default">
                </div>
            </div>
            
            <p>
                <input type="submit" value="Add" class="btn btn-primary">
                <input type="submit" name="cancel" value="Cancel" class="btn btn-default">
            </p>
        </form>
        
        <script>
        countPos = 0;
        
        $(document).ready(function(){
            $('#addPos').click(function(event){
                event.preventDefault();
                if (countPos >= 9) {
                    alert("Maximum of nine position entries exceeded");
                    return;
                }
                countPos++;
                window.console && console.log("Adding position "+countPos);
                
                $('#position_fields').append(
                    '<div id="position'+countPos+'"> \
                    <p>Year: <input type="text" name="year'+countPos+'" value="" /> \
                    <input type="button" value="-" onclick="$(\'#position'+countPos+'\').remove(); return false;"></p> \
                    <textarea name="desc'+countPos+'" rows="8" cols="80"></textarea> \
                    </div>'
                );
            });
        });
        </script>
    </div>
</body>
</html>