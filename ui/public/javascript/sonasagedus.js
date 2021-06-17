let koguTekst = localStorage.getItem("sonad").split(",");
let stoppsonad = localStorage.getItem("stoppsonad");
let valistatud = JSON.parse(localStorage.getItem("valistatud"));
let vorm = localStorage.getItem("vorm");
let tahesuurus = localStorage.getItem("tahesuurus");
let tabel = document.querySelector("#tabel");
let sonadearv = {};
let sonadeprotsent = {};
var jsonString = JSON.stringify(koguTekst);
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

if(vorm == "algvormid") {
    $.ajax({
        type: "POST",
        url: "api/texts/lemmad",
        data: {tekst : jsonString},
        success: function(data){
            tekstiTootlus(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(textStatus + "\n" + errorThrown);
        }
    });
} else if(vorm == "sonavormid") {
    $.ajax({
        type: "POST",
        url: "api/texts/sonad",
        data: {tekst : jsonString},
        success: function(data){
            tekstiTootlus(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(textStatus + "\n" + errorThrown);
        }
    });
}

function tekstiTootlus(data) {
    data = JSON.parse(data);
    for(let i = 0; i < data.length; i++) {
        if(tahesuurus) {
            data[i] = data[i].replaceAll(reg, "").trim();
        } else {
            data[i] = data[i].replaceAll(reg, "").toLowerCase().trim();
        }
        if(data[i].slice(-1) == "-") {
            data[i] = data[i].slice(0, data[i].length - 1);
        }
        if(data[i] == "") {
            data.splice(i, 1);
        }
    }

    if(stoppsonad != null) {
        for(let i = 0; i < data.length; i++) {
            if(stoppsonad.includes(data[i])) {
                data.splice(i, 1);
                i--;
            }
        }
    }

    if(valistatud != null) {
        for(let i = 0; i < data.length; i++) {
            if(valistatud.includes(data[i])) {
                data.splice(i, 1);
                i--;
            }
        }
    }

    data.forEach(function(element) {
        if(element in sonadearv) {
            sonadearv[element] += 1;
        } else {
            sonadearv[element] = 1;
        }
    });

    data.forEach(function(element) {
        num = (sonadearv[element] * 100) / data.length;
        sonadeprotsent[element] = Math.round((num + Number.EPSILON) * 100) / 100;
    });

    sorteeritud = sort_object(sonadearv);
    let puhver = [];
    for(let i = 0; i < Object.keys(sorteeritud).length; i++) {
            abi = "onclick=\"openPopup(\'";
            abi += Object.keys(sorteeritud)[i] + "')";
            puhver.push("<tr><td>" + (i + 1) + "</td><td>" + Object.keys(sorteeritud)[i] + "</td><td>" + Object.values(sorteeritud)[i] + "</td><td>" + sonadeprotsent[Object.keys(sorteeritud)[i]] + "%</td><td><div class='dropdown'><div " + abi + "\" class='dropbtn'>⋮</div><div id='" + Object.keys(sorteeritud)[i] + "' class='dropdown-content'><a href=\"javascript:kontekst('" + Object.keys(sorteeritud)[i] + "')\">Kasutuskontekst</a><a href='https://sonaveeb.ee/search/unif/dlall/dsall/" + Object.keys(sorteeritud)[i] + "/1' target='_blank'>Sõna tähendus (sonaveeb.ee)</a><div>Sõna tõlge (neurotolge.ee)<select name='language' id='language_" + Object.keys(sorteeritud)[i] + "' onchange='translateFunc(\"" + Object.keys(sorteeritud)[i] + "\")'><option selected disabled>Vali keel</option><option value='eng'>inglise</option><option value='rus'>vene</option><option value='ger'>saksa</option><option value='fin'>soome</option><option value='lit'>leedu</option><option value='lav'>läti</option></select></div><div>Vastus:<div id='result_" + Object.keys(sorteeritud)[i] + "'></div></div></div></div>");
        }
    tabel.innerHTML = puhver.join(' ');
    
    tabelElement = $('#words').DataTable({
        "pagingType": "full_numbers",
        "pageLength": 50,
        language: {
            url: '../json/dataTables.estonian.json'
        }
    });

    freeze = false;
    document.querySelector("#cover-spin").style.display = "none";
}

//copytud: https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
function sort_object(obj) {
    items = Object.keys(obj).map(function(key) {
        return [key, obj[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    sorted_obj={}
    $.each(items, function(k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj[use_key] = use_value
    })
    return(sorted_obj);
}

function openPopup(rida) {
    if(document.getElementById(rida).style.display == "block") {
        document.getElementById(rida).style.display = "none";
    } else {
        dropdownid = document.getElementsByClassName("dropdown-content");
        for(let i = 0; i < dropdownid.length; i++) {
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

function salvestaCSV(failinimi) {
    tabelElement.destroy();
    exportTableToCSV(failinimi);
    tabelElement = $('#words').DataTable({
        "pagingType": "full_numbers",
        "pageLength": 50,
        language: {
            url: '../json/dataTables.estonian.json'
        }
    });
}