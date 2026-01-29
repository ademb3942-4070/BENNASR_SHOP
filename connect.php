<?php
// Configuration de la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecom_project"; // Baddel hedhi b esm l base de données mte3ek

// Création de la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Famma mochkla fil connexion: " . $conn->connect_error);
}

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    // Sekurité : Crypter le mot de passe (Hachage)
    // Au lieu de l'enregistrer clair, on l'enregistre crypter.
    // Dans la base, il apparaitra comme un code bizarre (ex: $2y$10$...) 
    // c'est ça la méthode professionnelle pour qu'il soit caché.
    $user_password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $message = $_POST['message'];

    // Préparation de la requête SQL (Prepared Statements pour la sécurité)
    // Assurez-vous que la table s'appelle 'clients' ou changez le nom ici
    $sql = "INSERT INTO clients (name, email, subject, password, message) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        // "sssss" signifie que les 5 paramètres sont des chaînes de caractères (Strings)
        $stmt->bind_param("sssss", $name, $email, $subject, $user_password, $message);

        // Exécution de la requête
        if ($stmt->execute()) {
            echo "Les données ont été envoyées avec succès !";
        } else {
            echo "Erreur lors de l'envoi : " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Erreur de préparation de la requête : " . $conn->error;
    }
}

// Fermeture de la connexion
$conn->close();
?>
