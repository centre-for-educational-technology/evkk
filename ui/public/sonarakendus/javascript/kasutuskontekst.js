muuda()

function muuda() {
    let kasutuskontekst = document.querySelector("#kasutuskontekst");
    let number = document.querySelector("#number");

    let tyyp = kasutuskontekst.value;
    let arv = number.value;
    if(tyyp == "sona") {
        jrk = 1;
        tabel.textContent = "";
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

                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td1_content = document.createTextNode(jrk);
                let td2 = document.createElement("td");
                let td2_content = document.createTextNode(esimenePool);
                let td3 = document.createElement("td");
                let td3_content = document.createTextNode(kontekstid[j]);
                let td4 = document.createElement("td");
                let td4_content = document.createTextNode(teinePool);
                let td5 = document.createElement("td");
                let div = document.createElement("div");
                let span = document.createElement("span");
                let b = document.createElement("b");
                let b_content = document.createTextNode("Lause metainfo");
                let br1 = document.createElement("br");
                let br2 = document.createElement("br");
                let img = document.createElement("img");

                tr.setAttribute("id", "row" + jrk);
                td2.setAttribute("class", "leftside");
                td3.setAttribute("class", "otsitav");
                td4.setAttribute("class", "rightside");
                td5.setAttribute("class", "source");
                div.setAttribute("class", "popup");
                div.setAttribute("onclick", "openPopup(" + jrk + ")");
                span.setAttribute("class", "popuptext");
                span.setAttribute("id", jrk);
                img.setAttribute("src", "img/info.png");
                img.setAttribute("alt", "sourcebutton");
                img.setAttribute("class", "sourcebutton");

                td1.appendChild(td1_content);
                td2.appendChild(td2_content);
                td3.appendChild(td3_content);
                td4.appendChild(td4_content);
                b.appendChild(b_content);
                span.appendChild(b);
                span.appendChild(br1);
                span.appendChild(br2);

                if(localStorage.getItem("paritolu") == "TEXTBOX") {
                    let span_content = document.createTextNode("Lause pärineb tekstiväljale sisestatud tekstist.");
                    span.appendChild(span_content);
                } else if(localStorage.getItem("paritolu") == "FILEUPLOAD") {
                    let span_content = document.createTextNode("Faili nimi: ");
                    span.appendChild(span_content);
                } else if(localStorage.getItem("paritolu") == "EVKK") {
                    let br3 = document.createElement("br");
                    let br4 = document.createElement("br");
                    let br5 = document.createElement("br");
                    let br6 = document.createElement("br");
                    let span_content1 = document.createTextNode("Dokumendi ID: ");
                    let span_content2 = document.createTextNode("Alamkorpus: ");
                    let span_content3 = document.createTextNode("Teksti žanr: ");
                    let span_content4 = document.createTextNode("Keeleoskustase: ");
                    let span_content5 = document.createTextNode("Autori emakeel: ");

                    span.appendChild(span_content1);
                    span.appendChild(br3);
                    span.appendChild(span_content2);
                    span.appendChild(br4);
                    span.appendChild(span_content3);
                    span.appendChild(br5);
                    span.appendChild(span_content4);
                    span.appendChild(br6);
                    span.appendChild(span_content5);
                }

                div.appendChild(span);
                div.appendChild(img);
                td5.appendChild(div);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tabel.appendChild(tr);

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
        tabel.textContent = "";
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

                    let tr = document.createElement("tr");
                    let td1 = document.createElement("td");
                    let td1_content = document.createTextNode(jrk);
                    let td2 = document.createElement("td");
                    let td2_content = document.createTextNode(esimenePool.replace(/(['"])/g, "").replace("[", "").replace("]", ""));
                    let td3 = document.createElement("td");
                    let td3_content = document.createTextNode(kontekstid[x]);
                    let td4 = document.createElement("td");
                    let td4_content = document.createTextNode(teinePool.replace(/(['"])/g, "").replace("[", "").replace("]", ""));
                    let td5 = document.createElement("td");
                    let div = document.createElement("div");
                    let span = document.createElement("span");
                    let b = document.createElement("b");
                    let b_content = document.createTextNode("Lause metainfo");
                    let br1 = document.createElement("br");
                    let br2 = document.createElement("br");
                    let img = document.createElement("img");

                    tr.setAttribute("id", "row" + jrk);
                    td2.setAttribute("class", "leftside");
                    td3.setAttribute("class", "otsitav");
                    td4.setAttribute("class", "rightside");
                    td5.setAttribute("class", "source");
                    div.setAttribute("class", "popup");
                    div.setAttribute("onclick", "openPopup(" + jrk + ")");
                    span.setAttribute("class", "popuptext");
                    span.setAttribute("id", jrk);
                    img.setAttribute("src", "img/info.png");
                    img.setAttribute("alt", "sourcebutton");
                    img.setAttribute("class", "sourcebutton");

                    td1.appendChild(td1_content);
                    td2.appendChild(td2_content);
                    td3.appendChild(td3_content);
                    td4.appendChild(td4_content);
                    b.appendChild(b_content);
                    span.appendChild(b);
                    span.appendChild(br1);
                    span.appendChild(br2);

                    if(localStorage.getItem("paritolu") == "TEXTBOX") {
                        let span_content = document.createTextNode("Lause pärineb tekstiväljale sisestatud tekstist.");
                        span.appendChild(span_content);
                    } else if(localStorage.getItem("paritolu") == "FILEUPLOAD") {
                        let span_content = document.createTextNode("Faili nimi: ");
                        span.appendChild(span_content);
                    } else if(localStorage.getItem("paritolu") == "EVKK") {
                        let br3 = document.createElement("br");
                        let br4 = document.createElement("br");
                        let br5 = document.createElement("br");
                        let br6 = document.createElement("br");
                        let span_content1 = document.createTextNode("Dokumendi ID: ");
                        let span_content2 = document.createTextNode("Alamkorpus: ");
                        let span_content3 = document.createTextNode("Teksti žanr: ");
                        let span_content4 = document.createTextNode("Keeleoskustase: ");
                        let span_content5 = document.createTextNode("Autori emakeel: ");

                        span.appendChild(span_content1);
                        span.appendChild(br3);
                        span.appendChild(span_content2);
                        span.appendChild(br4);
                        span.appendChild(span_content3);
                        span.appendChild(br5);
                        span.appendChild(span_content4);
                        span.appendChild(br6);
                        span.appendChild(span_content5);
                    }

                    div.appendChild(span);
                    div.appendChild(img);
                    td5.appendChild(div);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tabel.appendChild(tr);

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