# EVKK Proto paigaldamise juhend
Eesti Vahekeele Korpuse prototüüp

Videoõpetus -> https://www.youtube.com/watch?v=-OU3s2sYv1M

### XAMPP või mingi muu riistvara

XAMPP on rakendus, mis paigaldab su arvutisse kõikvajalikud tööriistad, et jooksutada PHP + MySQL + phpMyAdmin serveri
[XAMPP](https://www.apachefriends.org/index.html)

### Andmebaasi importimine

PhpMyAdminiga ei ole see nii lihtne - fail on liiga suur importimiseks.
Sul peab olema Kippari keelekorpus.sql.zip, seda leiate [siin](http://www.tlu.ee/~jaagup/andmed/keel/korpus/)

1. Käivita MySQL ja Apache.
2. Vajutage Admin nuppu. Tuleb ette phpMyAdmin
3. Koosta endale tühja andmebaasi ning anna talle nime
4. Minge tagasi XAMPP'i.
5. Vajutage 'Shell'
6. Navigeerige läbi 'cd' käsku sinna, kus asub .sql.zip fail.
7. kirjutage: mysql -u root andmebaasi_nimi < keelekorpus.sql
8. Kui sisestasid käsu ja cmd ei teinud midagi (kui kõik on õige, siis ei peaks), siis kontrolli phpMyAdmini, kas oli importitud

### EVKK jooksutamine

1. Pulli/klooni/tõmba repo alla
2. Paigalda failid htdocs kausta C:\xampp\htdocs\ (näiteks C:\xampp\htdocs\evkkProto)
3. Sinna saab sattuda läbi 'Explorer' nuppu XAMPP'is.
4. Käivita Apache ja MySQL, kui veel ei ole.
5. db kaustas modifitseerige 'database.php'-s nii, et $dbName = "teie_andmebaasi_nimi"
6. Kirjuta localhost brauserisse ja proovi, kas toimib

### Mis failid teevad mida

Olen kommenteerinud koodis iga funktsiooni, vaadake üle ja katsetage aru saada xd.

#### db
- database.php - sisaldab andmebaasi ühendamiseks andmed (user, pass etc)
- server.php - Siia suunavad kõik ajax päringud

#### scripts
- echarts.js - Echarts raamistik, ära puutu pls
- stats.js - kõik js kood, ajaxid, echartsid, checkmarkide stiilimine etc

#### css
- style.css - stylesheet

#### img
- Praegu seal on ainult logo.img, ehk pealkirja juures olev roheline TLU logo


