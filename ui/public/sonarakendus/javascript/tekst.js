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

let elukohad = "idaviru,tallinn,tartu,Tallinn,Maardu linn,Kiili vald,Rae vald,Kohtla-Järve linn,Narva linn,Narva-Jõesuu linn,Valga vald,Jõhvi vald,Sillamäe linn,Tartu linn,Viimsi vald,Mustvee vald,Anija vald,Rakvere vald,Pärnu linn,Toila vald,Lääne-Harju vald,Kambja vald,Alutaguse vald,Saue vald,Viru-Nigula vald,Võru vald,Rakvere linn,Tori vald,Elva vald,Jõgeva vald,Harku vald,Hiiumaa vald,Viljandi linn,Tartu vald,Luunja vald";

pealkiri.innerHTML = localStorage.getItem("tekstipealkiri");
sisu.innerHTML = localStorage.getItem("kuvatavtekst");

let raw_metainfo = JSON.parse(localStorage.getItem("raw-metainfo"));

raw_metainfo.forEach(element => {
    parameeter = element.property_name;
    vaartus = element.property_value;
    if(parameeter == 'korpus') {
        korpus.innerHTML = korpused[vaartus];
    } else if(parameeter == 'tekstityyp') {
        if(liigid[vaartus] == undefined) {
            tekstiliik.innerHTML = 'tundmatu teksti liik';
        } else {
            tekstiliik.innerHTML = liigid[vaartus];
        }
    } else if(parameeter == 'tekstikeel') {
        tekstikeel.innerHTML = vaartus;
    } else if(parameeter == 'keeletase') {
        tekstitase.innerHTML = vaartus;
    } else if(parameeter == 'abivahendid') {
        oppematerjalid.innerHTML = vaartus;
    } else if(parameeter == 'aasta') {
        lisamiseaasta.innerHTML = vaartus;
    } else if(parameeter == 'vanus') {
        if(vanused[vaartus] == undefined) {
            if(vaartus <= 18) {
                vanus.innerHTML = vanused['kuni18'];
            } else if(vaartus > 18 && vaartus < 27) {
                vanus.innerHTML = vanused['kuni26'];
            } else if(vaartus > 26 && vaartus < 41) {
                vanus.innerHTML = vanused['kuni40'];
            } else if(vaartus > 40) {
                vanus.innerHTML = vanused['41plus'];
            }
        } else {
            vanus.innerHTML = vanused[vaartus];
        } 
    } else if(parameeter == 'sugu') {
        sugu.innerHTML = sood[vaartus];
    } else if(parameeter == 'haridus') {
        haridus.innerHTML = haridused[vaartus];
    } else if(parameeter == 'emakeel') {
        emakeel.innerHTML = vaartus;
    } else if(parameeter == 'elukoht') {
        if(elukohad.includes(vaartus)) {
            elukohariik.innerHTML = 'eesti';
        } else {
            elukohariik.innerHTML = vaartus;
        }
    }
});

if(tekstiliik.innerHTML == '') {
    tekstiliik.innerHTML = '-';
}
if(lisamiseaasta.innerHTML == '') {
    lisamiseaasta.innerHTML = "-";
}
if(emakeel.innerHTML == '') {
    emakeel.innerHTML = '-';
}
if(tekstitase.innerHTML == '') {
    tekstitase.innerHTML = '-';
}
if(oppematerjalid.innerHTML == '') {
    oppematerjalid.innerHTML = '-';
}
if(vanus.innerHTML == '') {
    vanus.innerHTML = '-';
}
if(sugu.innerHTML == '') {
    sugu.innerHTML = '-';
}
if(haridus.innerHTML == '') {
    haridus.innerHTML = '-';
}
if(elukohariik.innerHTML == '') {
    elukohariik.innerHTML = '-';
}

function sulge() {
    window.close();
}