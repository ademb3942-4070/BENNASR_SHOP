<?php
$servername = "localhost";
$username = "root";
$password = "";

// 1. Connexion au serveur MySQL (sans base de données pour le moment)
$conn = new mysqli($servername, $username, $password);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}
echo "Connexion au serveur réussie.<br>";

// 2. Création de la base de données
$dbname = "ecom_project";
$sql_create_db = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql_create_db) === TRUE) {
    echo "Base de données '$dbname' créée ou existe déjà.<br>";
} else {
    die("Erreur lors de la création de la base de données : " . $conn->error);
}

// 3. Sélection de la base de données
$conn->select_db($dbname);

// 4. Création de la table 'clients'
$sql_create_table = "CREATE TABLE IF NOT EXISTS clients (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql_create_table) === TRUE) {
    echo "Table 'clients' créée ou existe déjà.<br>";
} else {
    echo "Erreur lors de la création de la table : " . $conn->error;
}

$conn->close();
?>
