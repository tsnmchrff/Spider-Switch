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


   /* echo "Successfully connected to database";*/
} catch (PDOException $e) {
    die("Can't connect to $dbName :" . $e->getMessage());
}

$request =$pdo->prepare('SELECT * FROM pseudo');
$allUsers =$request->execute();
$allUsers = $request->fetch(mode: PDO::FETCH_ASSOC);

/*echo $allUsers;*/
echo implode (array: $allUsers);

?>