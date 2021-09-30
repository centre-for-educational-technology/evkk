muuda()

function muuda() {
    let kasutuskontekst = document.querySelector("#kasutuskontekst");
    let number = document.querySelector("#number");

    let tyyp = kasutuskontekst.value;
    let arv = number.value;
    if(tyyp == "sona") {
        //copytud: https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
        var str = localStorage.getItem("sonad");
        var regex = new RegExp("([^a-zA-ZõäöüÕÄÖÜ]|^)" + localStorage.getItem("kontekst") + "($|[^a-zA-ZõäöüÕÄÖÜ])", "gi"), result, sonad = [];
        while ( (result = regex.exec(str)) ) {
            sonad.push(result.index);
        }
        console.log(sonad);
        var regex2 = new RegExp("( )", "g"), result2, tyhikud = [];
        while ( (result2 = regex2.exec(str)) ) {
            tyhikud.push(result2.index);
        }
        console.log(tyhikud);
        tabel.innerHTML = "";
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
            teinePool = str.substring((sonad[i] + localStorage.getItem("kontekst").length + lisand), tyhikud[indeks2]);
            tabel.innerHTML += "<tr><td>" + (i + 1) + "</td><td class='leftside'>" + esimenePool + "</td><td class='otsitav'>" + localStorage.getItem("kontekst") + "</td><td class='rightside'>" + teinePool + "</td>";
        }
        tabelElement = $('#context').DataTable({
            "pagingType": "full_numbers",
            "pageLength": 25,
            language: {
                url: '../json/dataTables.estonian.json'
            }
        });
    } else if(tyyp == "lauset") {
        jrk = 1;
        laused = JSON.parse(localStorage.getItem("laused"));
        var regex = new RegExp("([^a-zA-ZõäöüÕÄÖÜ]|^)" + localStorage.getItem("kontekst") + "($|[^a-zA-ZõäöüÕÄÖÜ])", "gi")
        tabel.innerHTML = "";
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

                teinePool += laused[i][0].substring(result.index + 2 + localStorage.getItem("kontekst").length) + " ";
                for(let j = (i + 1); j < (parseInt(i) + parseInt(arv) + 1); j++) {
                    if(j < laused.length) {
                        teinePool += laused[j] + " ";
                    }
                }

                tabel.innerHTML += "<tr><td>" + jrk + "</td><td class='leftside'>" + esimenePool.replace(/(['"])/g, "").replace("[", "").replace("]", "") + "</td><td class='otsitav'>" + localStorage.getItem("kontekst") + "</td><td class='rightside'>" + teinePool.replace(/(['"])/g, "").replace("[", "").replace("]", "") + "</td>";
                jrk++;
            }
        }
        tabelElement = $('#context').DataTable({
            "pagingType": "full_numbers",
            "pageLength": 25,
            language: {
                url: '../json/dataTables.estonian.json'
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

function salvestaCSV(failinimi, onvaja) {
    tabelElement.destroy();
    exportTableToCSV(failinimi, onvaja);
    tabelElement = $('#words').DataTable({
        "pagingType": "full_numbers",
        "pageLength": 50,
        language: {
            url: '../json/dataTables.estonian.json'
        }
    });
}

function sulge() {
    window.close();
}