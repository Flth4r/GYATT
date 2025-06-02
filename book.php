<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zarezerwuj</title>
    <link rel="stylesheet" href="css/stylebook.css">
</head>
<body>
    <nav></nav>
    <main>
        
        <form action="booking.php" method="post">
            <select name="type" id="type">
                <option value="strzyżenie">Strzyżenie</option>
                <option value="koloryzacja">Koloryzacja</option>
                <option value="modelowanie">Modelowanie</option>
            </select>

            <input type="date" name="data" id="data"> <!-- wysuwany kalendarz, harmonogram -->
            <input type="submit" value="Zarezerwuj">
        </form>
    </main>
</body>
</html>