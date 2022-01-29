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
            if ((finalData[algvormidData[i]].startsWith(sonavormidData[i] + ",") == false) && (finalData[algvormidData[i]].search("," + sonavormidData[i] + ",") == -1) && (finalData[algvormidData[i]].endsWith(sonavormidData[i] + ",") == false)) {
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
    let puhver = [];
    for (let i = 0; i < Object.keys(sorteeritud).length; i++) {
        abi = "onclick=\"openPopup(\'";
        abi += Object.keys(sorteeritud)[i] + "')";
        if(!tahesuurus) {
            kontekstiotsing = Object.keys(sorteeritud)[i] + "," + Object.keys(sorteeritud)[i].charAt(0).toUpperCase() + Object.keys(sorteeritud)[i].slice(1) + "," + Object.keys(sorteeritud)[i].toUpperCase();
        } else {
            kontekstiotsing = Object.keys(sorteeritud)[i];
        }
        puhver.push("<tr><td>" + (i + 1) + "</td><td>" + Object.keys(sorteeritud)[i] + "</td><td>" + Object.values(sorteeritud)[i] + "</td><td>" + sonadeprotsent[Object.keys(sorteeritud)[i]] + "%</td><td><div class='dropdown'><div " + abi + "\" class='dropbtn'>⋮</div><div id='" + Object.keys(sorteeritud)[i] + "' class='dropdown-content'><a href=\"javascript:kontekst('" + kontekstiotsing + "')\">Kasutuskontekst</a><a href='https://sonaveeb.ee/search/unif/dlall/dsall/" + Object.keys(sorteeritud)[i] + "/1' target='_blank'>Sõna tähendus (sonaveeb.ee)</a><div>Sõna tõlge (neurotolge.ee)<select name='language' id='language_" + Object.keys(sorteeritud)[i] + "' onchange='translateFunc(\"" + Object.keys(sorteeritud)[i] + "\")'><option selected disabled>Vali keel</option><option value='eng'>inglise</option><option value='rus'>vene</option><option value='ger'>saksa</option><option value='fin'>soome</option><option value='lit'>leedu</option><option value='lav'>läti</option></select></div><div>Vastus:<div id='result_" + Object.keys(sorteeritud)[i] + "'></div></div></div></div>");
    }
    tabel.innerHTML = puhver.join(' ');

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
    //data = JSON.parse(data);
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

    let puhver = [];

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

        abi = "onclick=\"openPopup(\'";
        abi += Object.keys(sorteeritud2)[i] + "')";
        puhver.push("<tr><td>" + (i + 1) + "</td><td>" + Object.keys(sorteeritud2)[i] + "</td><td>" + Object.values(sorteeritud2)[i] + "</td><td>" + sonadeprotsent[Object.keys(sorteeritud2)[i]] + "%</td><td><div class='dropdown'><div " + abi + "\" class='dropbtn'>⋮</div><div id='" + Object.keys(sorteeritud2)[i] + "' class='dropdown-content'><a href=\"javascript:kontekst('" + otsing + "')\">Kasutuskontekst</a><a href='https://sonaveeb.ee/search/unif/dlall/dsall/" + Object.keys(sorteeritud2)[i] + "/1' target='_blank'>Sõna tähendus (sonaveeb.ee)</a><div>Sõna tõlge (neurotolge.ee)<select name='language' id='language_" + Object.keys(sorteeritud2)[i] + "' onchange='translateFunc(\"" + Object.keys(sorteeritud2)[i] + "\")'><option selected disabled>Vali keel</option><option value='eng'>inglise</option><option value='rus'>vene</option><option value='ger'>saksa</option><option value='fin'>soome</option><option value='lit'>leedu</option><option value='lav'>läti</option></select></div><div>Vastus:<div id='result_" + Object.keys(sorteeritud2)[i] + "'></div></div></div></div>");
    }
    tabel.innerHTML = puhver.join(' ');

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
    const json = JSON.stringify({
        text: sona,
        src: "est",
        tgt: language,
    });

    response.open("POST", "https://api.tartunlp.ai/translation/v2");
    response.setRequestHeader("Content-Type", "application/json");
    response.send(json);

    response.onload = () => {
        result = response.response.split(":").pop();

        if ((language = "rus")) {
            var result = result.replace(/\\u/g, "&#x");
        }

        document.getElementById("result_" + sona).innerHTML = result.substring(1, result.length - 3);
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

// tabelElement = $('#words').DataTable({
//     "pagingType": "full_numbers",
//     "pageLength": 50,
//     "columns": [
//         { "searchable": false },
//         null,
//         null,
//         null,
//         { "searchable": false }
//     ],
//     language: {
//         url: '../json/dataTables.estonian.json'
//     }
// });

function removeTableColumn(str) {
    // Get target th with the name you want to remove.
    var target = $('table').find('th[data-name="' + str + '"]');
    // Find its index among other ths 
    var index = (target).index();
    // For each tr, remove all th and td that match the index.
    $('table tr').find('th:eq(' + index + '),td:eq(' + index + ')').remove();
}