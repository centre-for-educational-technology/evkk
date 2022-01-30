let pealkiri = document.querySelector("#pealkiri");
let sisu = document.querySelector("#sisu");

let korpus = document.querySelector("#korpus");
let tekstiliik = document.querySelector("#tekstiliik");
let tekstikeel = document.querySelector("#tekstikeel");
let tekstitase = document.querySelector("#tekstitase");
let oppematerjalid = document.querySelector("#oppematerjalid");
let lisamiseaasta = document.querySelector("#lisamiseaasta");
let vanus = document.querySelector("#vanus");
let sugu = document.querySelector("#sugu");
let haridus = document.querySelector("#haridus");
let emakeel = document.querySelector("#emakeel");
/* let kodukeel = document.querySelector("#kodukeel"); */
let elukohariik = document.querySelector("#elukohariik");

let riikOlemas = '';

let korpused = {
    'cFqPphvYi': 'K2 olümpiaadi tööd',
    'clWmOIrLa': 'K2 tasemeeksamite teksid',
    'cFOoRQekA': 'K2 tuumkorpus',
    'cYDRkpymb': 'K1 eesti keel',
    'cgSRJPKTr': 'K1 vene keel',
    'cZjHWUPtD': 'K3 vene keel',
    'cwUSEqQLt': 'Akadeemiline õppijakeel'
}

let liigid = {
    'isikiri': 'isiklik kiri',
    'amtkiri': 'ametlik kiri',
    'essee': 'essee',
    'referaat': 'referaat',
    'trilumunud': 'trükis ilmunud',
    'analyys': 'analüüs',
    'vastkys': 'vastus küsimusele',
    'ymberjutustus': 'ümberjutustus',
    'tolge': 'tõlge',
    'harjutus': 'harjutus',
    'teadus': 'teadusartikkel',
    'monograafia': 'monograafia',
    'vaitekiri': 'väitekiri',
    'ma': 'MA-töö',
    'batoo': 'BA-töö',
    'arvamuslugu': 'arvamuslugu',
    'muu': 'muu',
    'teade': 'teade',
    'kirjeldus/jutustus': 'kirjeldus/jutustus'
}

let vanused = {
    'kuni18': 'kuni 18',
    'kuni26': '18 - 26',
    'kuni40': '27 - 40',
    '41plus': '41 +'
}

let sood = {
    'N': 'naine',
    'M': 'mees',
    'mees': 'mees',
    'naine': 'naine'
}

let haridused = {
    'Alg-/põhiharidus': 'algharidus/põhiharidus',
    'Keskharidus': 'keskharidus',
    'Keskeriharidus/kutseharidus': 'keskeriharidus/kutseharidus',
    'Kõrgharidus': 'kõrgharidus',
    'pohi': 'põhiharidus',
    'kesk': 'keskharidus',
    'alg': 'algharidus',
    'korg': 'kõrgharidus',
    'keskeri': 'keskeriharidus',
    'kutse': 'kutseharidus'
}

let elukohad = "idaviru,tallinn,tartu";

pealkiri.textContent = localStorage.getItem("tekstipealkiri");
sisu.innerHTML = localStorage.getItem("kuvatavtekst").replace(/\\n/g, '<br>');

let raw_metainfo = JSON.parse(localStorage.getItem("raw-metainfo"));

raw_metainfo.forEach(element => {
    if(element.property_name == 'riik') {
        riikOlemas = element.property_value;
    }
});

raw_metainfo.forEach(element => {
    parameeter = element.property_name;
    vaartus = element.property_value;
    if(parameeter == 'korpus') {
        korpus.textContent = korpused[vaartus];
    } else if(parameeter == 'tekstityyp') {
        if(liigid[vaartus] == undefined) {
            tekstiliik.textContent = 'tundmatu teksti liik';
        } else {
            tekstiliik.textContent = liigid[vaartus];
        }
    } else if(parameeter == 'tekstikeel') {
        tekstikeel.textContent = vaartus;
    } else if(parameeter == 'keeletase') {
        tekstitase.textContent = vaartus;
    } else if(parameeter == 'abivahendid') {
        oppematerjalid.textContent = vaartus;
    } else if(parameeter == 'aasta') {
        lisamiseaasta.textContent = vaartus;
    } else if(parameeter == 'vanus') {
        if(vanused[vaartus] == undefined) {
            if(vaartus <= 18) {
                vanus.textContent = vanused['kuni18'];
            } else if(vaartus > 18 && vaartus < 27) {
                vanus.textContent = vanused['kuni26'];
            } else if(vaartus > 26 && vaartus < 41) {
                vanus.textContent = vanused['kuni40'];
            } else if(vaartus > 40) {
                vanus.textContent = vanused['41plus'];
            }
        } else {
            vanus.textContent = vanused[vaartus];
        } 
    } else if(parameeter == 'sugu') {
        sugu.textContent = sood[vaartus];
    } else if(parameeter == 'haridus') {
        haridus.textContent = haridused[vaartus];
    } else if(parameeter == 'emakeel') {
        emakeel.textContent = vaartus;
    } else if(parameeter == 'elukoht') {
        if(riikOlemas != '') {
            suurtaht = riikOlemas.charAt(0).toUpperCase();
            loplikriik = suurtaht + riikOlemas.slice(1);
            elukohariik.textContent = loplikriik;
        } else {
            if(elukohad.includes(vaartus)) {
                elukohariik.textContent = 'Eesti';
            } else {
                suurtaht = vaartus.charAt(0).toUpperCase();
                loplikriik = suurtaht + vaartus.slice(1);
                elukohariik.textContent = loplikriik;
            }
        }
    }
});

if(tekstiliik.textContent == '') {
    tekstiliik.textContent = '-';
}
if(lisamiseaasta.textContent == '') {
    lisamiseaasta.textContent = "-";
}
if(emakeel.textContent == '') {
    emakeel.textContent = '-';
}
if(tekstitase.textContent == '') {
    tekstitase.textContent = '-';
}
if(oppematerjalid.textContent == '') {
    oppematerjalid.textContent = '-';
}
if(vanus.textContent == '') {
    vanus.textContent = '-';
}
if(sugu.textContent == '') {
    sugu.textContent = '-';
}
if(haridus.textContent == '') {
    haridus.textContent = '-';
}
if(elukohariik.textContent == '') {
    elukohariik.textContent = '-';
}

function sulge() {
    window.close();
}