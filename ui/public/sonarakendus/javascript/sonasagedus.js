let koguTekst = localStorage.getItem("sonad"); //.split(",");
let stoppsonad = localStorage.getItem("stoppsonad");
let valistatud = JSON.parse(localStorage.getItem("valistatud"));
let vorm = localStorage.getItem("vorm");
let tahesuurus = localStorage.getItem("tahesuurus");
let tabel = document.querySelector("#tabel");
let sonadearv = {};
let sonadearv2 = {};
let sonavormidearv = {};
let sonadeprotsent = {};
let sonavormideprotsent = {};
const reg = /[^a-zA-Z õäöüÕÄÖÜ-]/g;
const response = new XMLHttpRequest();

document.addEventListener(
    "click",
    (e) => {
        if (freeze) {
            e.stopPropagation();
            e.preventDefault();
        }
    },
    true
);
freeze = true;

if (vorm == "algvormid") {
    let sonavormidData;
    let algvormidData;
    let finalData = {};
    $.ajax({
        type: "POST",
        url: "/api/texts/lemmad",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        data: '{"tekst": "' + koguTekst + '"}',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                data[i] = data[i].replaceAll('_', '').replaceAll('=', '').replaceAll('+', '').replaceAll("'", '');
            }
            algvormidData = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + "\n" + errorThrown);
        }
    });
    $.ajax({
        type: "POST",
        url: "/api/texts/sonad",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        data: '{"tekst": "' + koguTekst + '"}',
        success: function (data) {
            sonavormidData = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + "\n" + errorThrown);
        }
    });

    for (let i = 0; i < algvormidData.length; i++) {
        if (finalData[algvormidData[i]] == undefined) {
            if (finalData[algvormidData[i].charAt(0).toUpperCase() + algvormidData[i].slice(1)] == undefined) {
                finalData[algvormidData[i]] = sonavormidData[i] + ",";
            } else if (!tahesuurus) {
                finalData[algvormidData[i].charAt(0).toUpperCase() + algvormidData[i].slice(1)] += sonavormidData[i] + ",";
            }
        } else {
            if ((finalData[algvormidData[i]].startsWith(sonavormidData[i] + ",") == false) && (finalData[algvormidData[i]].search("," + sonavormidData[i] + ",") == -1) && (finalData[algvormidData[i]].endsWith("," + sonavormidData[i] + ",") == false)) {
                finalData[algvormidData[i]] += sonavormidData[i] + ",";
            }
        }
    }

    Object.keys(finalData).forEach(key => {
        finalData[key] = finalData[key].slice(0, -1);
    });

    tekstiTootlus_sonavormidega(algvormidData, finalData);

} else if (vorm == "sonavormid") {
    $.ajax({
        type: "POST",
        url: "/api/texts/sonad",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: '{"tekst": "' + koguTekst + '"}',
        success: function (data) {
            tekstiTootlus(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + "\n" + errorThrown);
        }
    });
} else if (vorm == "koikvormid") {
    let tekstidKokkuMolemastParingust;
    $.ajax({
        type: "POST",
        url: "/api/texts/lemmad",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        data: '{"tekst": "' + koguTekst + '"}',
        success: function (data) {
            tekstidKokkuMolemastParingust = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + "\n" + errorThrown);
        }
    });
    $.ajax({
        type: "POST",
        url: "/api/texts/sonad",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        data: '{"tekst": "' + koguTekst + '"}',
        success: function (data) {
            data.forEach(element => {
                tekstidKokkuMolemastParingust.push(element);
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + "\n" + errorThrown);
        }
    });
    tekstiTootlus(tekstidKokkuMolemastParingust);
}

function tekstiTootlus(data) {
    //data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
        if (tahesuurus) {
            data[i] = String(data[i]).replaceAll(reg, "").trim();
        } else {
            data[i] = String(data[i]).replaceAll(reg, "").toLowerCase().trim();
        }
        if (data[i].slice(-1) == "-") {
            data[i] = data[i].slice(0, data[i].length - 1);
        }
        if (data[i] == "") {
            data.splice(i, 1);
            i--;
        }
    }

    if (stoppsonad != null) {
        for (let i = 0; i < data.length; i++) {
            if (stoppsonad.includes(data[i])) {
                data.splice(i, 1);
                i--;
            }
        }
    }

    if (valistatud != null) {
        for (let i = 0; i < data.length; i++) {
            if (valistatud.includes(data[i])) {
                data.splice(i, 1);
                i--;
            }
        }
    }

    data.forEach(function (element) {
        if (element in sonadearv) {
            sonadearv[element] += 1;
        } else {
            sonadearv[element] = 1;
        }
    });

    data.forEach(function (element) {
        num = (sonadearv[element] * 100) / data.length;
        sonadeprotsent[element] = Math.round((num + Number.EPSILON) * 100) / 100;
    });

    sorteeritud = sort_object(sonadearv);
    for (let i = 0; i < Object.keys(sorteeritud).length; i++) {
        if(!tahesuurus) {
            kontekstiotsing = Object.keys(sorteeritud)[i] + "," + Object.keys(sorteeritud)[i].charAt(0).toUpperCase() + Object.keys(sorteeritud)[i].slice(1) + "," + Object.keys(sorteeritud)[i].toUpperCase();
        } else {
            kontekstiotsing = Object.keys(sorteeritud)[i];
        }

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let td1_content = document.createTextNode(i + 1);
        td1.appendChild(td1_content);

        let td2 = document.createElement("td");
        let td2_content = document.createTextNode(Object.keys(sorteeritud)[i]);
        td2.appendChild(td2_content);

        let td3 = document.createElement("td");
        let td3_content = document.createTextNode(Object.values(sorteeritud)[i]);
        td3.appendChild(td3_content);

        let td4 = document.createElement("td");
        let td4_content = document.createTextNode(sonadeprotsent[Object.keys(sorteeritud)[i]] + "%");
        td4.appendChild(td4_content);

        let td5 = document.createElement("td");
        let div1 = document.createElement("div");
        div1.className = "dropdown";
        let div2 = document.createElement("div");
        div2.setAttribute("onclick", "openPopup(\'" + Object.keys(sorteeritud)[i] + "')");
        div2.className = "dropbtn";
        let div2_content = document.createTextNode("⋮");
        div2.appendChild(div2_content);
        let div3 = document.createElement("div");
        div3.setAttribute("id", Object.keys(sorteeritud)[i]);
        div3.className = "dropdown-content";
        let a1 = document.createElement("a");
        a1.setAttribute("href", "javascript:kontekst('" + kontekstiotsing + "')");
        let a1_content = document.createTextNode("Kasutuskontekst");
        a1.appendChild(a1_content);
        let a2 = document.createElement("a");
        a2.setAttribute("href", "https://sonaveeb.ee/search/unif/dlall/dsall/" + Object.keys(sorteeritud)[i] + "/1");
        a2.setAttribute("target", "_blank");
        let a2_content = document.createTextNode("Sõna tähendus (sonaveeb.ee)");
        a2.appendChild(a2_content);
        let div4 = document.createElement("div");
        let div4_content = document.createTextNode("Sõna tõlge (neurotolge.ee)");
        div4.appendChild(div4_content);
        let select = document.createElement("select");
        select.setAttribute("name", "language");
        select.setAttribute("id", "language_" + Object.keys(sorteeritud)[i]);
        select.setAttribute("onchange", "translateFunc('" + Object.keys(sorteeritud)[i] + "')");
        let option1 = document.createElement("option");
        option1.setAttribute("selected", "");
        option1.setAttribute("disabled", "");
        let option1_content = document.createTextNode("Vali keel");
        option1.appendChild(option1_content);

        let option2 = document.createElement("option");
        option2.setAttribute("value", "eng");
        let option2_content = document.createTextNode("inglise");
        option2.appendChild(option2_content);

        let option3 = document.createElement("option");
        option3.setAttribute("value", "rus");
        let option3_content = document.createTextNode("vene");
        option3.appendChild(option3_content);

        let option4 = document.createElement("option");
        option4.setAttribute("value", "ger");
        let option4_content = document.createTextNode("saksa");
        option4.appendChild(option4_content);

        let option5 = document.createElement("option");
        option5.setAttribute("value", "fin");
        let option5_content = document.createTextNode("soome");
        option5.appendChild(option5_content);

        let option6 = document.createElement("option");
        option6.setAttribute("value", "lit");
        let option6_content = document.createTextNode("leedu");
        option6.appendChild(option6_content);

        let option7 = document.createElement("option");
        option7.setAttribute("value", "lav");
        let option7_content = document.createTextNode("läti");
        option7.appendChild(option7_content);

        let div5 = document.createElement("div");
        let div5_content = document.createTextNode("Vastus: ");
        div5.appendChild(div5_content);
        let div6 = document.createElement("div");
        div6.setAttribute("id", "result_" + Object.keys(sorteeritud)[i]);
        div5.appendChild(div6);

        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        select.appendChild(option4);
        select.appendChild(option5);
        select.appendChild(option6);
        select.appendChild(option7);

        div4.appendChild(select);

        div3.appendChild(a1);
        div3.appendChild(a2);
        div3.appendChild(div4);
        div3.appendChild(div5);

        div1.appendChild(div2);
        div1.appendChild(div3);
        td5.appendChild(div1);
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tabel.appendChild(tr);
    }

    tabelElement = $('#words').DataTable({
        "pagingType": "full_numbers",
        "pageLength": 50,
        "columns": [
            { "searchable": false },
            null,
            null,
            null,
            { "searchable": false }
        ],
        language: {
            url: 'json/dataTables.estonian.json'
        }
    });

    freeze = false;
    document.querySelector("#cover-spin").style.display = "none";
}

function tekstiTootlus_sonavormidega(data, sonavormidData) {
    let dataForContext = [];
    Object.assign(dataForContext, data);
    for (let i = 0; i < data.length; i++) {
        sonavormidData[data[i]] = String(sonavormidData[data[i]]).trim();
        if (tahesuurus) {
            data[i] = String(data[i]).replaceAll(reg, "").trim();
        } else {
            data[i] = String(data[i]).replaceAll(reg, "").toLowerCase().trim();
        }
        if (data[i].slice(-1) == "-") {
            data[i] = data[i].slice(0, data[i].length - 1);
            sonavormidData[data[i]] = sonavormidData[data[i]].slice(0, sonavormidData[data[i]].length - 1);
        }
        if (data[i] == "") {
            data.splice(i, 1);
            i--;
        }
    }

    if (stoppsonad != null) {
        for (let i = 0; i < data.length; i++) {
            if (stoppsonad.includes(data[i])) {
                data.splice(i, 1);
                i--;
            }
        }
    }

    if (valistatud != null) {
        for (let i = 0; i < data.length; i++) {
            if (valistatud.includes(data[i])) {
                data.splice(i, 1);
                i--;
            }
        }
    }

    dataForContext.forEach(function (element) {
        if (element.toLowerCase() in sonadearv) {
            sonadearv[element.toLowerCase()] += 1;
        } else if ((element.charAt(0).toUpperCase() + element.slice(1)) in sonadearv) {
            sonadearv[element.charAt(0).toUpperCase() + element.slice(1)] += 1;
        } else {
            sonadearv[element] = 1;
        }
    });

    data.forEach(function (element) {
        if (element in sonadearv2) {
            sonadearv2[element] += 1;
        } else {
            sonadearv2[element] = 1;
        }
    });

    data.forEach(function (element) {
        num = (sonadearv2[element] * 100) / data.length;
        sonadeprotsent[element] = Math.round((num + Number.EPSILON) * 100) / 100;
    });

    sorteeritud = sort_object(sonadearv);
    sorteeritud2 = sort_object(sonadearv2);

    //https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object
    Object.keys(sonavormidData).forEach(key => {
        if (sonavormidData[key] == 'undefined') {
            delete sonavormidData[key];
        }
    });

    if(tahesuurus) {
        sorteerimisalus = sorteeritud2;
    } else {
        sorteerimisalus = sorteeritud;
    }

    for (let i = 0; i < Object.keys(sorteerimisalus).length; i++) {
        let otsing;
        if (sonavormidData[Object.keys(sorteerimisalus)[i]] == undefined) {
            otsing = Object.keys(sorteerimisalus)[i];
        } else {
            otsing = sonavormidData[Object.keys(sorteerimisalus)[i]];
        }

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let td1_content = document.createTextNode(i + 1);
        td1.appendChild(td1_content);

        let td2 = document.createElement("td");
        let td2_content = document.createTextNode(Object.keys(sorteeritud2)[i]);
        td2.appendChild(td2_content);

        let td3 = document.createElement("td");
        let td3_content = document.createTextNode(Object.values(sorteeritud2)[i]);
        td3.appendChild(td3_content);

        let td4 = document.createElement("td");
        let td4_content = document.createTextNode(sonadeprotsent[Object.keys(sorteeritud2)[i]] + "%");
        td4.appendChild(td4_content);

        let td5 = document.createElement("td");
        let div1 = document.createElement("div");
        div1.className = "dropdown";
        let div2 = document.createElement("div");
        div2.setAttribute("onclick", "openPopup(\'" + Object.keys(sorteeritud2)[i] + "')");
        div2.className = "dropbtn";
        let div2_content = document.createTextNode("⋮");
        div2.appendChild(div2_content);
        let div3 = document.createElement("div");
        div3.setAttribute("id", Object.keys(sorteeritud2)[i]);
        div3.className = "dropdown-content";
        let a1 = document.createElement("a");
        a1.setAttribute("href", "javascript:kontekst('" + otsing + "')");
        let a1_content = document.createTextNode("Kasutuskontekst");
        a1.appendChild(a1_content);
        let a2 = document.createElement("a");
        a2.setAttribute("href", "https://sonaveeb.ee/search/unif/dlall/dsall/" + Object.keys(sorteeritud2)[i] + "/1");
        a2.setAttribute("target", "_blank");
        let a2_content = document.createTextNode("Sõna tähendus (sonaveeb.ee)");
        a2.appendChild(a2_content);
        let div4 = document.createElement("div");
        let div4_content = document.createTextNode("Sõna tõlge (neurotolge.ee)");
        div4.appendChild(div4_content);
        let select = document.createElement("select");
        select.setAttribute("name", "language");
        select.setAttribute("id", "language_" + Object.keys(sorteeritud2)[i]);
        select.setAttribute("onchange", "translateFunc('" + Object.keys(sorteeritud2)[i] + "')");
        let option1 = document.createElement("option");
        option1.setAttribute("selected", "");
        option1.setAttribute("disabled", "");
        let option1_content = document.createTextNode("Vali keel");
        option1.appendChild(option1_content);

        let option2 = document.createElement("option");
        option2.setAttribute("value", "eng");
        let option2_content = document.createTextNode("inglise");
        option2.appendChild(option2_content);

        let option3 = document.createElement("option");
        option3.setAttribute("value", "rus");
        let option3_content = document.createTextNode("vene");
        option3.appendChild(option3_content);

        let option4 = document.createElement("option");
        option4.setAttribute("value", "ger");
        let option4_content = document.createTextNode("saksa");
        option4.appendChild(option4_content);

        let option5 = document.createElement("option");
        option5.setAttribute("value", "fin");
        let option5_content = document.createTextNode("soome");
        option5.appendChild(option5_content);

        let option6 = document.createElement("option");
        option6.setAttribute("value", "lit");
        let option6_content = document.createTextNode("leedu");
        option6.appendChild(option6_content);

        let option7 = document.createElement("option");
        option7.setAttribute("value", "lav");
        let option7_content = document.createTextNode("läti");
        option7.appendChild(option7_content);

        let div5 = document.createElement("div");
        let div5_content = document.createTextNode("Vastus: ");
        div5.appendChild(div5_content);
        let div6 = document.createElement("div");
        div6.setAttribute("id", "result_" + Object.keys(sorteeritud2)[i]);
        div5.appendChild(div6);

        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        select.appendChild(option4);
        select.appendChild(option5);
        select.appendChild(option6);
        select.appendChild(option7);

        div4.appendChild(select);

        div3.appendChild(a1);
        div3.appendChild(a2);
        div3.appendChild(div4);
        div3.appendChild(div5);

        div1.appendChild(div2);
        div1.appendChild(div3);
        td5.appendChild(div1);
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tabel.appendChild(tr);
    }

    tabelElement = $('#words').DataTable({
        "pagingType": "full_numbers",
        "pageLength": 50,
        "columns": [
            { "searchable": false },
            null,
            null,
            null,
            { "searchable": false }
        ],
        language: {
            url: 'json/dataTables.estonian.json'
        }
    });

    freeze = false;
    document.querySelector("#cover-spin").style.display = "none";
}

//copytud: https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
function sort_object(obj) {
    items = Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });
    items.sort(function (first, second) {
        return second[1] - first[1];
    });
    sorted_obj = {}
    $.each(items, function (k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return (sorted_obj);
}

function openPopup(rida) {
    if (document.getElementById(rida).style.display == "block") {
        document.getElementById(rida).style.display = "none";
    } else {
        dropdownid = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdownid.length; i++) {
            dropdownid[i].style.display = "none";
        }
        document.getElementById(rida).style.setProperty("display", "block", "important");
    }
}

function kontekst(sona) {
    localStorage.setItem("kontekst", sona);
    window.open("kasutuskontekst.html", "_blank");
}

function translateFunc(sona) {
    let language = document.getElementById("language_" + sona).value;
    let element = document.getElementById("result_" + sona);
    const json = JSON.stringify({
        text: sona,
        src: "est",
        tgt: language,
    });

    response.open("POST", "https://api.tartunlp.ai/translation/v2");
    response.setRequestHeader("Content-Type", "application/json");
    response.send(json);

    response.onload = () => {
        result = JSON.parse(response.response).result;

        if ((language = "rus")) {
            var result = result.replace(/\\u/g, "&#x");
        }

        resultElement = document.createTextNode(result);
        element.textContent = "";
        element.appendChild(resultElement);
    };
}

function salvestaFailina(failityyp) {
    if (failityyp == 'default') {
        alert("Vali failiformaat!");
    } else if (failityyp == 'csv') {
        tabelElement.destroy();
        exportTableToCSV('sonasagedus.csv', false);
        location.reload();
    } else if (failityyp == 'xlsx') {
        tabelElement.destroy();
        removeTableColumn(' ');
        ExportToExcel_WordFrequency();
        location.reload();
    }
}

function removeTableColumn(str) {
    // Get target th with the name you want to remove.
    var target = $('table').find('th[data-name="' + str + '"]');
    // Find its index among other ths 
    var index = (target).index();
    // For each tr, remove all th and td that match the index.
    $('table tr').find('th:eq(' + index + '),td:eq(' + index + ')').remove();
}