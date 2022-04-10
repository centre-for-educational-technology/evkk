muuda()

function muuda() {
    let kasutuskontekst = document.querySelector("#kasutuskontekst");
    let number = document.querySelector("#number");

    let tyyp = kasutuskontekst.value;
    let arv = number.value;
    if(tyyp == "sona") {
        jrk = 1;
        tabel.innerHTML = "";
        //copytud: https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
        var str = localStorage.getItem("sonad");
        var kontekstid = localStorage.getItem("kontekst").split(',');
        for(let j = 0; j < kontekstid.length; j++) {
            var regex = new RegExp("([^a-zA-ZõäöüÕÄÖÜ;:,.!?'/&()=@–-]|^)" + kontekstid[j] + "($|[^a-zA-ZõäöüÕÄÖÜ;:,.!?'/&()=@–-])", "g"), result, sonad = [];
            while ( (result = regex.exec(str)) ) {
                sonad.push(result.index);
            }

            var regex2 = new RegExp("( )", "g"), result2, tyhikud = [];
            while ( (result2 = regex2.exec(str)) ) {
                tyhikud.push(result2.index);
            }

            for(let i = 0; i < sonad.length; i++) {
                rida1 = tyhikud.findIndex(element => element == sonad[i]);
                if(rida1 == -1) {
                    abi = 0;
                    while(tyhikud[abi] < sonad[i]) {
                        abi++;
                    }
                    rida1 = abi;
                }
                indeks1 = rida1 - arv;
                esimenePool = str.substring(tyhikud[indeks1] + 1, sonad[i]);
                indeks2 = indeks1 + (2 * arv) + 1;
                if(i == 0) {
                    lisand = 1;
                } else {
                    lisand = 2;
                }
                teinePool = str.substring((sonad[i] + kontekstid[j].length + lisand), tyhikud[indeks2]);

                if(localStorage.getItem("paritolu") == "TEXTBOX") {
                    tabel.innerHTML += "<tr id='row" + jrk + "'><td>" + jrk + "</td><td class='leftside'>" + esimenePool + "</td><td class='otsitav'>" + kontekstid[j] + "</td><td class='rightside'>" + teinePool + "</td><td class='source'><div class='popup' onclick='openPopup(" + jrk + ")'><span class='popuptext' id='" + jrk + "'><b>Lause metainfo</b><br><br>Lause pärineb tekstiväljale sisestatud tekstist.</span><img src='img/info.png' alt='sourcebutton' class='sourcebutton'></div></td></tr>";
                } else if(localStorage.getItem("paritolu") == "FILEUPLOAD") {
                    tabel.innerHTML += "<tr id='row" + jrk + "'><td>" + jrk + "</td><td class='leftside'>" + esimenePool + "</td><td class='otsitav'>" + kontekstid[j] + "</td><td class='rightside'>" + teinePool + "</td><td class='source'><div class='popup' onclick='openPopup(" + jrk + ")'><span class='popuptext' id='" + jrk + "'><b>Lause metainfo</b><br><br>Faili nimi: </span><img src='img/info.png' alt='sourcebutton' class='sourcebutton'></div></td></tr>";
                } else if(localStorage.getItem("paritolu") == "EVKK") {
                    tabel.innerHTML += "<tr id='row" + jrk + "'><td>" + jrk + "</td><td class='leftside'>" + esimenePool + "</td><td class='otsitav'>" + kontekstid[j] + "</td><td class='rightside'>" + teinePool + "</td><td class='source'><div class='popup' onclick='openPopup(" + jrk + ")'><span class='popuptext' id='" + jrk + "'><b>Lause metainfo</b><br><br>Dokumendi ID: <br>Alamkorpus: <br>Teksti žanr: <br>Keeleoskustase: <br>Autori emakeel: </span><img src='img/info.png' alt='sourcebutton' class='sourcebutton'></div></td></tr>";
                }
                jrk++;
            }
        }
        tabelElement = $('#context').DataTable({
            "pagingType": "full_numbers",
            "pageLength": 25,
            language: {
                url: 'json/dataTables.estonian.json'
            }
        });
    } else if(tyyp == "lauset") {
        jrk = 1;
        tabel.innerHTML = "";
        laused = JSON.parse(localStorage.getItem("laused"));
        var kontekstid = localStorage.getItem("kontekst").split(',');
        for(let x = 0; x < kontekstid.length; x++) {
            var regex = new RegExp("([^a-zA-ZõäöüÕÄÖÜ;:,.!?'/&()=@–-]|^)" + kontekstid[x] + "($|[^a-zA-ZõäöüÕÄÖÜ;:,.!?'/&()=@–-])", "g")
            for(let i = 0; i < laused.length; i++) {
                result = regex.exec(laused[i]);
                if(result != null) {
                    esimenePool = "";
                    teinePool = "";
                    for(let j = (i - arv); j < i; j++) {
                        if(j > -1) {
                            esimenePool += laused[j] + " ";
                        }
                    }
                    esimenePool += " " + laused[i][0].substring(0, result.index);

                    teinePool += laused[i][0].substring(result.index + 2 + kontekstid[x].length) + " ";
                    for(let j = (i + 1); j < (parseInt(i) + parseInt(arv) + 1); j++) {
                        if(j < laused.length) {
                            teinePool += laused[j] + " ";
                        }
                    }

                    if(localStorage.getItem("paritolu") == "TEXTBOX") {
                        tabel.innerHTML += "<tr id='row" + jrk + "'><td>" + jrk + "</td><td class='leftside'>" + esimenePool.replace(/(['"])/g, "").replace("[", "").replace("]", "") + "</td><td class='otsitav'>" + kontekstid[x] + "</td><td class='rightside'>" + teinePool.replace(/(['"])/g, "").replace("[", "").replace("]", "") + "</td><td class='source'><div class='popup' onclick='openPopup(" + jrk + ")'><span class='popuptext' id='" + jrk + "'><b>Lause metainfo</b><br><br>Lause pärineb tekstiväljale sisestatud tekstist.</span><img src='img/info.png' alt='sourcebutton' class='sourcebutton'></div></td></tr>";
                    } else if(localStorage.getItem("paritolu") == "FILEUPLOAD") {
                        tabel.innerHTML += "<tr id='row" + jrk + "'><td>" + jrk + "</td><td class='leftside'>" + esimenePool.replace(/(['"])/g, "").replace("[", "").replace("]", "") + "</td><td class='otsitav'>" + kontekstid[x] + "</td><td class='rightside'>" + teinePool.replace(/(['"])/g, "").replace("[", "").replace("]", "") + "</td><td class='source'><div class='popup' onclick='openPopup(" + jrk + ")'><span class='popuptext' id='" + jrk + "'><b>Lause metainfo</b><br><br>Lause metainfo</b><br>Faili nimi: </span><img src='img/info.png' alt='sourcebutton' class='sourcebutton'></div></td></tr>";
                    } else if(localStorage.getItem("paritolu") == "EVKK") {
                        tabel.innerHTML += "<tr id='row" + jrk + "'><td>" + jrk + "</td><td class='leftside'>" + esimenePool.replace(/(['"])/g, "").replace("[", "").replace("]", "") + "</td><td class='otsitav'>" + kontekstid[x] + "</td><td class='rightside'>" + teinePool.replace(/(['"])/g, "").replace("[", "").replace("]", "") + "</td><td class='source'><div class='popup' onclick='openPopup(" + jrk + ")'><span class='popuptext' id='" + jrk + "'><b>Lause metainfo</b><br><br>Dokumendi ID: <br>Alamkorpus: <br>Teksti žanr: <br>Keeleoskustase: <br>Autori emakeel: </span><img src='img/info.png' alt='sourcebutton' class='sourcebutton'></div></td></tr>";
                    }
                    jrk++;
                }
            }
        }
        tabelElement = $('#context').DataTable({
            "pagingType": "full_numbers",
            "pageLength": 25,
            language: {
                url: 'json/dataTables.estonian.json'
            }
        });
    }
}

document.querySelector("#kasutuskontekst").addEventListener("click", function() {
    if(kasutuskontekst.value == "lauset") {
        number.value = 3;
    } else {
        number.value = 5;
    }
    if ( $.fn.dataTable.isDataTable( '#context' ) ) {
        tabelElement.destroy();
    }
    muuda();
});

document.querySelector("#number").addEventListener("click", function() {
    if ( $.fn.dataTable.isDataTable( '#context' ) ) {
        tabelElement.destroy();
    }
    muuda();
});

function salvestaFailina(failityyp) {
    if(failityyp == 'default') {
        alert("Vali failiformaat!");
    } else if(failityyp == 'csv') {
        tabelElement.destroy();
        exportTableToCSV('kontekstid.csv', false);
        location.reload();
    } else if(failityyp == 'xlsx') {
        tabelElement.destroy();
        removeTableColumn(' ');
        ExportToExcel_Contexts();
        location.reload();
    }
}

function removeTableColumn(str) {
    // Get target th with the name you want to remove.
    var target = $('table').find('th[data-name="' + str +'"]');
    // Find its index among other ths 
    var index = (target).index();
    // For each tr, remove all th and td that match the index.
     $('table tr').find('th:eq(' + index + '),td:eq(' + index + ')' ).remove();
  }

function sulge() {
    window.close();
}

function openPopup(number) {
    var popup = document.getElementById(number);
    var tabelirida = document.getElementById("row" + number);
    popup.classList.toggle("show");
    if(popup.classList.contains("show")) {
        tabelirida.style.backgroundColor = "#E4C0B8";
    } else {
        tabelirida.style.backgroundColor = "";
    }
  }