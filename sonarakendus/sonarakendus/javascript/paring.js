document.querySelector("#texts").style.display = "none";

let freeze = false;
document.querySelector("#cover-spin").style.display = "none";

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

tekstideIDd = [];
tekstidePealkirjad = [];

let k2olymp = document.getElementById("cFqPphvYi");
let k2taseme = document.getElementById("clWmOIrLa");
let k2tuum = document.getElementById("cFOoRQekA");
let k1eesti = document.getElementById("cYDRkpymb");
let k1vene = document.getElementById("cgSRJPKTr");
let k3vene = document.getElementById("cZjHWUPtD");
let akadoppija = document.getElementById("cwUSEqQLt");
//let eestitead = document.getElementById("cwUprXCTL");

let koikkorpused = document.getElementById("koikkorpused");

k2olymp.addEventListener("click", function() {
    if(k2olymp.checked == false) {
        koikkorpused.checked = false;
    }
})

k2taseme.addEventListener("click", function() {
    if(k2taseme.checked == false) {
        koikkorpused.checked = false;
    }
})

k2tuum.addEventListener("click", function() {
    if(k2tuum.checked == false) {
        koikkorpused.checked = false;
    }
})

k1eesti.addEventListener("click", function() {
    if(k1eesti.checked == false) {
        koikkorpused.checked = false;
    }
})

k1vene.addEventListener("click", function() {
    if(k1vene.checked == false) {
        koikkorpused.checked = false;
    }
})

k3vene.addEventListener("click", function() {
    if(k3vene.checked == false) {
        koikkorpused.checked = false;
    }
})

akadoppija.addEventListener("click", function() {
    if(akadoppija.checked == false) {
        koikkorpused.checked = false;
    }
})

document.querySelector("#addedyear").max = new Date().getFullYear();

document.getElementById("backbutton").addEventListener("click", function() {
    location.reload();
})

document.getElementById("koikkorpused").addEventListener("click", function() {
    if(document.getElementById("koikkorpused").checked) {
        k2olymp.checked = true;
        k2taseme.checked = true;
        k2tuum.checked = true;
        k1eesti.checked = true;
        k1vene.checked = true;
        k3vene.checked = true;
        akadoppija.checked = true;
        //eestitead.checked = true;
    } else {
        k2olymp.checked = false;
        k2taseme.checked = false;
        k2tuum.checked = false;
        k1eesti.checked = false;
        k1vene.checked = false;
        k3vene.checked = false;
        akadoppija.checked = false;
        //eestitead.checked = false;
    }
})

let element_type = document.getElementById("type");
let element_level = document.getElementById("level");
let element_usedmaterials = document.getElementById("usedmaterials");
let element_addedyear = document.getElementById("addedyear");
let element_characters = document.getElementById("characters");
let element_words = document.getElementById("words");
let element_sentences = document.getElementById("sentences");
let element_age = document.getElementById("age");
let element_gender = document.getElementById("gender");
let element_education = document.getElementById("education");
let element_nativelang = document.getElementById("nativelang");
let element_country = document.getElementById("country");

let element_typeOn = document.getElementById("typeOn");
let element_levelOn = document.getElementById("levelOn");
let element_usedmaterialsOn = document.getElementById("usedmaterialsOn");
let element_addedyearOn = document.getElementById("addedyearOn");
let element_charactersOn = document.getElementById("charactersOn");
let element_wordsOn = document.getElementById("wordsOn");
let element_sentencesOn = document.getElementById("sentencesOn");
let element_ageOn = document.getElementById("ageOn");
let element_genderOn = document.getElementById("genderOn");
let element_educationOn = document.getElementById("educationOn");
let element_nativelangOn = document.getElementById("nativelangOn");
let element_countryOn = document.getElementById("countryOn");

element_type.addEventListener("click", function() {
    if(element_type.value != "teadmata") {
        element_typeOn.checked = true;
        element_typeOn.disabled = false;
    } else {
        element_typeOn.checked = false;
        element_typeOn.disabled = true;
    }
});

element_typeOn.addEventListener("click", function() {
    element_typeOn.disabled = true;
    element_type.value = "teadmata";
});

document.getElementById("textlangOn").checked = true;

element_level.addEventListener("click", function() {
    if(element_level.value != "teadmata") {
        element_levelOn.checked = true;
        element_levelOn.disabled = false;
    } else {
        element_levelOn.checked = false;
        element_levelOn.disabled = true;
    }
});

element_levelOn.addEventListener("click", function() {
    element_levelOn.disabled = true;
    element_level.value = "teadmata";
});

element_usedmaterials.addEventListener("click", function() {
    if(element_usedmaterials.value != "teadmata") {
        element_usedmaterialsOn.checked = true;
        element_usedmaterialsOn.disabled = false;
    } else {
        element_usedmaterialsOn.checked = false;
        element_usedmaterialsOn.disabled = true;
    }
});

element_usedmaterialsOn.addEventListener("click", function() {
    element_usedmaterialsOn.disabled = true;
    element_usedmaterials.value = "teadmata";
});

element_addedyear.addEventListener("change", function() {
    if(element_addedyear.value != "") {
        element_addedyearOn.checked = true;
        element_addedyearOn.disabled = false;
    } else {
        element_addedyearOn.checked = false;
        element_addedyearOn.disabled = true;
    }
});

element_addedyearOn.addEventListener("click", function() {
    element_addedyearOn.disabled = true;
    element_addedyear.value = "";
});

element_characters.addEventListener("change", function() {
    if(element_characters.value != "") {
        element_charactersOn.checked = true;
        element_charactersOn.disabled = false;
    } else {
        element_charactersOn.checked = false;
        element_charactersOn.disabled = true;
    }
});

element_charactersOn.addEventListener("click", function() {
    element_charactersOn.disabled = true;
    element_characters.value = "";
});

element_words.addEventListener("change", function() {
    if(element_words.value != "") {
        element_wordsOn.checked = true;
        element_wordsOn.disabled = false;
    } else {
        element_wordsOn.checked = false;
        element_wordsOn.disabled = true;
    }
});

element_wordsOn.addEventListener("click", function() {
    element_wordsOn.disabled = true;
    element_words.value = "";
});

element_sentences.addEventListener("change", function() {
    if(element_sentences.value != "") {
        element_sentencesOn.checked = true;
        element_sentencesOn.disabled = false;
    } else {
        element_sentencesOn.checked = false;
        element_sentencesOn.disabled = true;
    }
});

element_sentencesOn.addEventListener("click", function() {
    element_sentencesOn.disabled = true;
    element_sentences.value = "";
});

/* document.getElementById("homelang").addEventListener("click", function() {
    if(document.getElementById("homelang").value != "teadmata") {
        document.getElementById("homelangOn").checked = true;
    } else {
        document.getElementById("homelangOn").checked = false;
    }
}); */

element_age.addEventListener("click", function() {
    if(element_age.value != "teadmata") {
        element_ageOn.checked = true;
        element_ageOn.disabled = false;
    } else {
        element_ageOn.checked = false;
        element_ageOn.disabled = true;
    }
});

element_ageOn.addEventListener("click", function() {
    element_ageOn.disabled = true;
    element_age.value = "teadmata";
});

element_gender.addEventListener("click", function() {
    if(element_gender.value != "teadmata") {
        element_genderOn.checked = true;
        element_genderOn.disabled = false;
    } else {
        element_genderOn.checked = false;
        element_genderOn.disabled = true;
    }
});

element_genderOn.addEventListener("click", function() {
    element_genderOn.disabled = true;
    element_gender.value = "teadmata";
});

element_education.addEventListener("click", function() {
    if(element_education.value != "teadmata") {
        element_educationOn.checked = true;
        element_educationOn.disabled = false;
    } else {
        element_educationOn.checked = false;
        element_educationOn.disabled = true;
    }
});

element_educationOn.addEventListener("click", function() {
    element_educationOn.disabled = true;
    element_education.value = "teadmata";
});

element_nativelang.addEventListener("click", function() {
    if(element_nativelang.value != "teadmata") {
        element_nativelangOn.checked = true;
        element_nativelangOn.disabled = false;
    } else {
        element_nativelangOn.checked = false;
        element_nativelangOn.disabled = true;
    }
});

element_nativelangOn.addEventListener("click", function() {
    element_nativelangOn.disabled = true;
    element_nativelang.value = "teadmata";
});

element_country.addEventListener("click", function() {
    if(element_country.value != "teadmata") {
        element_countryOn.checked = true;
        element_countryOn.disabled = false;
    } else {
        element_countryOn.checked = false;
        element_countryOn.disabled = true;
    }
});

element_countryOn.addEventListener("click", function() {
    element_countryOn.disabled = true;
    element_country.value = "teadmata";
});

function submitted() {
    values = [];
    countValues = [];
    korpusValues = '';

    if(k2olymp.checked) {
        korpusValues += 'cFqPphvYi,'
    }
    if(k2taseme.checked) {
        korpusValues += 'clWmOIrLa,'
    }
    if(k2tuum.checked) {
        korpusValues += 'cFOoRQekA,'
    }
    if(k1eesti.checked) {
        korpusValues += 'cYDRkpymb,'
    }
    if(k1vene.checked) {
        korpusValues += 'cgSRJPKTr,'
    }
    if(k3vene.checked) {
        korpusValues += 'cZjHWUPtD,'
    }
    if(akadoppija.checked) {
        korpusValues += 'cwUSEqQLt,'
    }
    /* if(eestitead.checked) {
        korpusValues += 'cwUprXCTL,'
    } */
    values.push(korpusValues);

    if(element_typeOn.checked) {
        values.push(element_type.value);
    } else {
        values.push("NO");
    }
    values.push(document.querySelector("#textlang").value);
    if(element_levelOn.checked) {
        values.push(element_level.value);
    } else {
        values.push("NO");
    }
    if(element_usedmaterialsOn.checked) {
        values.push(element_usedmaterials.value);
    } else {
        values.push("NO");
    }
    if(element_charactersOn.checked) {
        countValues.push(element_characters.value);
    } else {
        countValues.push("NO");
    }
    if(element_wordsOn.checked) {
        countValues.push(element_words.value);
    } else {
        countValues.push("NO");
    }
    if(element_sentencesOn.checked) {
        countValues.push(element_sentences.value);
    } else {
        countValues.push("NO");
    }
    // if(document.querySelector("#exercise").checked) {
    //     exercise = true;
    //     values.push(true);
    // } else {
    //     exercise = "NO";
    //     values.push("NO");
    // }
    if(element_nativelangOn.checked) {
        values.push(element_nativelang.value);
    } else {
        values.push("NO");
    }
    /* if(document.querySelector("#homelangOn").checked) {
        homelang = document.querySelector("#homelang").value;
        values.push(homelang);
    } else {
        homelang = "NO";
        values.push("NO");
    } */
    if(element_genderOn.checked) {
        values.push(element_gender.value);
    } else {
        values.push("NO");
    }
    if(element_educationOn.checked) {
        values.push(element_education.value);
    } else {
        values.push("NO");
    }
    if(element_addedyearOn.checked) {
        values.push(element_addedyear.value);
    } else {
        values.push("NO");
    }
    if(element_ageOn.checked) {
        age = element_age.value;
        if(age == "kuni18") {
            vahevaartus = "kuni18";
            for(let i = 0; i < 19; i++) {
                vahevaartus += "," + i;
            }
            values.push(vahevaartus);
        } else if(age == "kuni26") {
            vahevaartus = "kuni26";
            for(let i = 18; i < 27; i++) {
                vahevaartus += "," + i;
            }
            values.push(vahevaartus);
        } else if(age == "kuni40") {
            vahevaartus = "kuni40";
            for(let i = 27; i < 41; i++) {
                vahevaartus += "," + i;
            }
            values.push(vahevaartus);
        } else {
            vahevaartus = "41plus";
            for(let i = 41; i < 200; i++) {
                vahevaartus += "," + i;
            }
            values.push(vahevaartus);
        }
    } else {
        values.push("NO");
    }
    if(element_countryOn.checked) {
        country = element_country.value;
        if(country == "eesti") {
            //values.push(["idaviru", "tallinn", "tartu"]);
            values.push("idaviru,tallinn,tartu,Tallinn,Maardu linn,Kiili vald,Rae vald,Kohtla-Järve linn,Narva linn,Narva-Jõesuu linn,Valga vald,Jõhvi vald,Sillamäe linn,Tartu linn,Viimsi vald,Mustvee vald,Anija vald,Rakvere vald,Pärnu linn,Toila vald,Lääne-Harju vald,Kambja vald,Alutaguse vald,Saue vald,Viru-Nigula vald,Võru vald,Rakvere linn,Tori vald,Elva vald,Jõgeva vald,Harku vald,Hiiumaa vald,Viljandi linn,Tartu vald,Luunja vald");
        } else {
            values.push(country);
        }
    } else {
        values.push("NO");
    }

    if(!k2olymp.checked && !k2taseme.checked && !k2tuum.checked && !k1eesti.checked && !k1vene.checked && !k3vene.checked && !akadoppija.checked) {
        alert('Vali vähemalt üks korpus!');
    } else {
        document.querySelector("#cover-spin").style.display = "block";
	    freeze = true;

        $.ajax({
            type: "POST",
            url: "/api/texts/detailneparing",
            data: JSON.stringify([values, countValues]),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                for(let i = 0; i < data.length; i++) {
                    tekstideIDd.push(data[i]["text_id"]);
                    if(data[i]["property_value"] == "") {
                        tekstidePealkirjad.push("pealkiri puudub");
                    } else {
                        tekstidePealkirjad.push(data[i]["property_value"]);
                    }
                }
                tekstideKuvamine();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if(textStatus == "parsererror") {
                    alert("Ei leitud ühtegi teksti!");
                    document.querySelector("#cover-spin").style.display = "none";
		            freeze = false;
                } else {
                    alert(XMLHttpRequest + "\n" + textStatus + "\n" + errorThrown);
                }
            }
        });
    }
}

    function tekstideKuvamine() {
        let tekstideLoendur = 0;
        for(let i = 0; i < tekstideIDd.length; i++) {
            let tabel = document.querySelector("#tabel");
            let tr = document.createElement("tr");
            let a = document.createElement("a");
            let textContent = document.createTextNode(tekstidePealkirjad[i]);

            tr.setAttribute("value", tekstideIDd[i]);
            a.setAttribute("href", "javascript:eelvaade('" + tekstideIDd[i] + "')");

            a.appendChild(textContent);
            tr.appendChild(a);
            tabel.appendChild(tr);

            tekstideLoendur++;
        }
        kaivitaTabel(tekstideLoendur);
    }

    function eelvaade(tekstiID) {
        document.querySelector("#cover-spin").style.display = "block";
		freeze = true;
        $.ajax({
            type: "GET",
            url: "/api/texts/kysitekstimetainfo",
            data: {id : tekstiID},
            success: function(data) {
                localStorage.setItem('raw-metainfo', data);
            }
        })
        $.ajax({
            type: "GET",
            url: "/api/texts/kysitekst",
            data: {id : tekstiID},
            success: function(data) {
                tekstisisu = data;
                pealkirjaID = tekstideIDd.indexOf(tekstiID);
                pealkiri = tekstidePealkirjad[pealkirjaID];
                if(tekstisisu == '') {
                    tekstisisu = 'sisu puudub';
                }
                localStorage.setItem("kuvatavtekst", tekstisisu);
                localStorage.setItem("tekstipealkiri", pealkiri);
                document.querySelector("#cover-spin").style.display = "none";
		        freeze = false;
                window.open("tekst.html", "_blank");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert(textStatus + "\n" + errorThrown);
            }
        });
    }

    function kaivitaTabel(tekstideLoendur) {
        document.querySelector("#vorm").style.display = "none";
        document.querySelector("#texts").style.display = "block";
        document.querySelector("#textAmount").textContent = "Leiti " + tekstideLoendur + " teksti.";
        document.querySelector("#cover-spin").style.display = "none";
		freeze = false;
    }
