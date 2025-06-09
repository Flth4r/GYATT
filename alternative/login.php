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
        header("Location: login.html");
    }
}
?>