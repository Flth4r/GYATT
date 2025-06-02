<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/loginstyl.css">
    <title>Login</title>
</head>
<body>
    <nav></nav>
    <main>
    </main>
    <div class="formularz">
        <?php
        $login = $_POST["login"];
        $password = $_POST["password"];

        $con = mysqli_connect("localhost", "root", "", "fryzjer") or die ("Błąd połączenia");
        $query = "select count(*) from konta where login = '$login' and haslo = '$password'";
        $result = mysqli_query($con, $query) or die ("Błąd zapytania");

        if(mysqli_fetch_array($result)[0] == 1)
        {
            echo "Zalogowano";
        }
        else
        {
            echo "Logowanie nie powiodło się";
        }
        ?>
    </div>
</body>
</html>