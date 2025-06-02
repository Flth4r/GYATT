<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/loginstyl.css">
    <title>Login</title>
</head>
<body>
    <nav>

    </nav>
    <main>
    </main>
    <div class="formularz">
        <form action="" method="post" class="sr">
            <input type="text" placeholder="podaj login" name="login" class="tekst" id="inputKontakt" required> <br>
            <input type="password" name="password" id="" placeholder="podaj Hasło" class="tekst" required> <br>
            <button class="przycisk">Zaloguj</button> <br>
        </form>
        <a href="" class="register">Załóż Konto</a> 
    </div>

    <script>
        let emailRadio = document.getElementById("email");
        let telRadio = document.getElementById("tel");
        let inputKontakt = document.getElementById("inputKontakt");

        emailRadio.addEventListener("change", () => {
            if (emailRadio.checked) {
                inputKontakt.placeholder = "podaj E-mail";
            }
        });

        telRadio.addEventListener("change", () => {
            if (telRadio.checked) {
                inputKontakt.placeholder = "podaj numer telefonu";
            }
        });
    </script>

    <?php
    if (isset($_POST["login"]) && isset($_POST["password"]))
    {
        $login = $_POST["login"];
        $password = $_POST["password"];
    
        $con = mysqli_connect("localhost", "root", "", "fryzjer") or die ("Błąd połączenia");
        $query = "select count(*) from konta where login = '$login' and haslo = '$password'";
        $result = mysqli_query($con, $query) or die ("Błąd zapytania");
    
        if(mysqli_fetch_array($result)[0] == 1)
        {
            header('Location: main.html');
        }
        else
        {
            header("Location: login.php");
        }
    }
    ?>

</body>
</html>