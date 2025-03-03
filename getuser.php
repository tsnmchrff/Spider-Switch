<?php
$conConfig = parse_ini_file(".env");

$host = $conConfig["host"];
$username = $conConfig["username"];
$password = $conConfig["password"];
$dbName = $conConfig["dbName"];

try {
    $pdo = new PDO(
        'mysql:host=' . $host . ';dbname=' . $dbName,
        $username,
        $password,
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8')
    );
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $birthdate = $_POST["birthdate"];

    // Vérifie si l'utilisateur existe déjà
    $stmt = $pdo->prepare("SELECT * FROM pseudo WHERE email = :email");
    $stmt->execute(["email" => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo "Cet email est déjà utilisé.";
    } else {
        // Hachage du mot de passe pour la sécurité
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insère l'utilisateur en base de données
        $stmt = $pdo->prepare("INSERT INTO pseudo (email, password, birthdate) VALUES (:email, :password, :birthdate)");
        $success = $stmt->execute([
            "email" => $email,
            "password" => $hashedPassword,
            "birthdate" => $birthdate
        ]);

        if ($success) {
            echo "success";
        } else {
            echo "Erreur lors de l'inscription.";
        }
    }
}
?>
