<?php
require_once 'utils.php';

// Get database connection
$pdo = getDB();

// Check login
if (!isset($_SESSION['user_id'])) {
    die("ACCESS DENIED");
}

// Check profile_id
if (!isset($_GET['profile_id'])) {
    die("Missing profile_id");
}

$profile_id = $_GET['profile_id'];

// Check if profile belongs to user
$stmt = $pdo->prepare("SELECT user_id FROM Profile WHERE profile_id = :pid");
$stmt->execute(array(":pid" => $profile_id));
$row = $stmt->fetch(PDO::FETCH_ASSOC);
if ($row === false || $row['user_id'] != $_SESSION['user_id']) {
    die("You don't have permission to edit this profile");
}

// Handle POST
if (isset($_POST['cancel'])) {
    header("Location: index.php");
    return;
}

if (isset($_POST['first_name'])) {
    // Get form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $headline = $_POST['headline'];
    $summary = $_POST['summary'];
    
    // Validate fields
    $errors = array();
    if (empty($first_name) || empty($last_name) || empty($email) || 
        empty($headline) || empty($summary)) {
        $errors[] = "All fields are required";
    }
    
    if (strpos($email, '@') === false) {
        $errors[] = "Email address must contain @";
    }
    
    // Validate positions
    for($i=1; $i<=9; $i++) {
        if (isset($_POST['year'.$i]) && isset($_POST['desc'.$i])) {
            $year = $_POST['year'.$i];
            $desc = $_POST['desc'.$i];
            if (strlen($year) > 0 || strlen($desc) > 0) {
                if (strlen($year) == 0 || strlen($desc) == 0) {
                    $errors[] = "All fields are required";
                }
                if (!is_numeric($year)) {
                    $errors[] = "Position year must be numeric";
                }
            }
        }
    }
    
    if (count($errors) > 0) {
        $_SESSION['error'] = implode("<br>", $errors);
        header("Location: edit.php?profile_id=" . $profile_id);
        return;
    }
    
    // Update profile
    $sql = "UPDATE Profile SET first_name = :fn, last_name = :ln, email = :em, headline = :he, summary = :su WHERE profile_id = :pid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        ":fn" => $first_name,
        ":ln" => $last_name,
        ":em" => $email,
        ":he" => $headline,
        ":su" => $summary,
        ":pid" => $profile_id
    ));
    
    // Delete old positions
    $sql = "DELETE FROM Position WHERE profile_id = :pid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(":pid" => $profile_id));
    
    // Insert new positions
    $rank = 1;
    for($i=1; $i<=9; $i++) {
        if (isset($_POST['year'.$i]) && isset($_POST['desc'.$i])) {
            $year = $_POST['year'.$i];
            $desc = $_POST['desc'.$i];
            if (strlen($year) > 0 && strlen($desc) > 0 && is_numeric($year)) {
                $sql = "INSERT INTO Position (profile_id, rank, year, description) VALUES (:pid, :rank, :year, :desc)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute(array(
                    ":pid" => $profile_id,
                    ":rank" => $rank,
                    ":year" => $year,
                    ":desc" => $desc
                ));
                $rank++;
            }
        }
    }
    
    $_SESSION['success'] = "Profile updated successfully";
    header("Location: index.php");
    return;
}

// Get profile data - THIS IS WHERE LINE 126 IS
$sql = "SELECT profile_id, user_id, first_name, last_name, email, headline, summary FROM Profile WHERE profile_id = :pid";
$stmt = $pdo->prepare($sql);
$stmt->execute(array(":pid" => $profile_id));
$profile = $stmt->fetch(PDO::FETCH_ASSOC);

if ($profile === false) {
    $_SESSION['error'] = "Profile not found";
    header("Location: index.php");
    return;
}

// Get positions
$sql = "SELECT position_id, profile_id, `rank`, `year`, `description` FROM `position` WHERE profile_id = :pid ORDER BY `rank`";
$stmt = $pdo->prepare($sql);
$stmt->execute(array(":pid" => $profile_id));
$positions = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Count positions for JavaScript
$countPos = count($positions);
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Name - Edit Profile</title>
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
        <h1>Edit Profile</h1>
        <?php displayMessages(); ?>
        <form method="POST">
            <div class="form-group">
                <label>First Name:</label>
                <input type="text" name="first_name" size="60" class="form-control"
                    value="<?php echo htmlentities($profile['first_name']); ?>">
            </div>
            <div class="form-group">
                <label>Last Name:</label>
                <input type="text" name="last_name" size="60" class="form-control"
                    value="<?php echo htmlentities($profile['last_name']); ?>">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="text" name="email" size="60" class="form-control"
                    value="<?php echo htmlentities($profile['email']); ?>">
            </div>
            <div class="form-group">
                <label>Headline:</label>
                <input type="text" name="headline" size="80" class="form-control"
                    value="<?php echo htmlentities($profile['headline']); ?>">
            </div>
            <div class="form-group">
                <label>Summary:</label>
                <textarea name="summary" rows="8" cols="80" class="form-control"><?php echo htmlentities($profile['summary']); ?></textarea>
            </div>
            
            <div id="position_fields">
                <div class="form-group">
                    <label>Positions:</label>
                    <input type="button" id="addPos" value="+" class="btn btn-default">
                </div>
                <?php 
                $posIndex = 0;
                if (isset($positions) && is_array($positions)) {
                    foreach ($positions as $position):
                        $posIndex++;
                ?>
                <div id="position<?php echo $posIndex; ?>">
                    <p>Year: <input type="text" name="year<?php echo $posIndex; ?>" value="<?php echo htmlentities($position['year']); ?>">
                    <input type="button" value="-" onclick="$('#position<?php echo $posIndex; ?>').remove(); return false;"></p>
                    <textarea name="desc<?php echo $posIndex; ?>" rows="8" cols="80"><?php echo htmlentities($position['description']); ?></textarea>
                </div>
                <?php 
                    endforeach;
                }
                ?>
            </div>
            
            <p>
                <input type="submit" value="Save" class="btn btn-primary">
                <input type="submit" name="cancel" value="Cancel" class="btn btn-default">
            </p>
        </form>
        
        <script>
        countPos = <?php echo $posIndex; ?>;
        
        $(document).ready(function(){
            $('#addPos').click(function(event){
                event.preventDefault();
                if (countPos >= 9) {
                    alert("Maximum of nine position entries exceeded");
                    return;
                }
                countPos++;
                
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