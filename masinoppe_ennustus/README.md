# Masinõppe abil eesti keele keeletaset ennustava rakenduse arendus
Bakalaurusetöö raames loodud veebirakendus, mis ennustab keeletaset kasutades Eesti Vahekeele Korpuse kirjeid ning masinõppet.

### Rakendus ise:
* Loodud Java's
* Masinõppe osa kasutab WEKA't.
* Serveri pool on tehtud Spark Framework'is.
* Ngramme teeb pythoni estnltk teek.
* Lisana on R keeles skript, kus on näidiskoodi andmestike ettevalmistamisest.
### Rakendus hetkel:
* Suudab ennustada 67% täpsusega A2, B1, B2 ja C1 keeletasemete vahel, kasutades mudelit "keeletase_ngramid_4_nn_mudel.model"
* Suudab luua mõnel määral konfigureeritavaid Neural Network'i (koos StringToWordVector'iga) mudeleid teksti ennustamiseks.
* Jooksutatav käsurealt, et teha ennustusi või luua mudeleid.
* On kõvasti konfigureeritav config.txt failist, mille ta ise loob kui seda ei eksisteeri. Konfigureerida saab loodavate mudelite parameetreid ning mis mudelit hetkel ennustamiseks kasutatakse.

### Kasutus:
Käivitus toimub käsurealt (java -jar \<rakendusenimi\>.jar), kuhu võib lisada järgnevaid parameetreid:
* "-m" - loob Neural Network mudeli vastavalt config.txt faili seadistustele. Nimeks paneb loomise aja.
* "-m \<nimi\>" - sama mis eelminegi, aga loodud mudeli nimeks paneb seda, mis on \<nimi\> parameetri kohale kirjutatud.
* "-p \<tekst\>" - ennustab config.txt failis sätestatud mudeli järgi parameetri \<tekst\> kohale kirjutatud teksti.
* "-a" - paneb serveri käima rakenduses paika pandud pordi peal.
* "-a \<port\>" - sama mis eelminegi, kuid kasutusele võetakse \<port\> parameetri kohale kirjutatud teksti.
### Nõuded:
* Java 8
* Python 3 ja estnltk teek sellele (https://github.com/estnltk/estnltk).