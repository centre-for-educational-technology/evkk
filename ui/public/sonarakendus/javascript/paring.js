document.querySelector("#texts").style.display = "none";

tekstideIDd = [];
tekstidePealkirjad = [];

document.getElementById("backbutton").addEventListener("click", function() {
    location.reload();
})

document.getElementById("type").addEventListener("click", function() {
    if(document.getElementById("type").value != "teadmata") {
        document.getElementById("typeOn").checked = true;
    } else {
        document.getElementById("typeOn").checked = false;
    }
});

document.getElementById("textlangOn").checked = true;

document.getElementById("level").addEventListener("click", function() {
    if(document.getElementById("level").value != "teadmata") {
        document.getElementById("levelOn").checked = true;
    } else {
        document.getElementById("levelOn").checked = false;
    }
});

document.getElementById("usedmaterials").addEventListener("click", function() {
    if(document.getElementById("usedmaterials").value != "teadmata") {
        document.getElementById("usedmaterialsOn").checked = true;
    } else {
        document.getElementById("usedmaterialsOn").checked = false;
    }
});

// document.getElementById("characters").addEventListener("change", function() {
//     if(document.getElementById("characters").value != "") {
//         document.getElementById("charactersOn").checked = true;
//     } else {
//         document.getElementById("charactersOn").checked = false;
//     }
// });

document.getElementById("nativelang").addEventListener("click", function() {
    if(document.getElementById("nativelang").value != "teadmata") {
        document.getElementById("nativelangOn").checked = true;
    } else {
        document.getElementById("nativelangOn").checked = false;
    }
});

/* document.getElementById("homelang").addEventListener("click", function() {
    if(document.getElementById("homelang").value != "teadmata") {
        document.getElementById("homelangOn").checked = true;
    } else {
        document.getElementById("homelangOn").checked = false;
    }
}); */

document.getElementById("gender").addEventListener("click", function() {
    if(document.getElementById("gender").value != "teadmata") {
        document.getElementById("genderOn").checked = true;
    } else {
        document.getElementById("genderOn").checked = false;
    }
});

document.getElementById("education").addEventListener("click", function() {
    if(document.getElementById("education").value != "teadmata") {
        document.getElementById("educationOn").checked = true;
    } else {
        document.getElementById("educationOn").checked = false;
    }
});

document.getElementById("addedyear").addEventListener("change", function() {
    if(document.getElementById("addedyear").value != "") {
        document.getElementById("addedyearOn").checked = true;
    } else {
        document.getElementById("addedyearOn").checked = false;
    }
});

document.getElementById("age").addEventListener("click", function() {
    if(document.getElementById("age").value != "teadmata") {
        document.getElementById("ageOn").checked = true;
    } else {
        document.getElementById("ageOn").checked = false;
    }
});

document.getElementById("country").addEventListener("click", function() {
    if(document.getElementById("country").value != "teadmata") {
        document.getElementById("countryOn").checked = true;
    } else {
        document.getElementById("countryOn").checked = false;
    }
});

function submitted() {
    values = [];
    if(document.querySelector("#korpus").value != "koik") {
        corpus = document.querySelector("#korpus").value;
        values.push(corpus);
    } else {
        corpus = "NO";
        values.push("NO");
    }
    if(document.querySelector("#typeOn").checked) {
        type = document.querySelector("#type").value;
        values.push(type);
    } else {
        type = "NO";
        values.push("NO");
    }
    textlang = document.querySelector("#textlang").value;
    values.push(textlang);
    if(document.querySelector("#levelOn").checked) {
        level = document.querySelector("#level").value;
        values.push(level);
    } else {
        level = "NO";
        values.push("NO");
    }
    if(document.querySelector("#usedmaterialsOn").checked) {
        usedmaterials = document.querySelector("#usedmaterials").value;
        values.push(usedmaterials);
    } else {
        usedmaterials = "NO";
        values.push("NO");
    }
    // if(document.querySelector("#charactersOn").checked) {
    //     characters = document.querySelector("#characters").value;
    //     values.push(characters);
    // } else {
    //     characters = "NO";
    //     values.push("NO");
    // }
    // if(document.querySelector("#exercise").checked) {
    //     exercise = true;
    //     values.push(true);
    // } else {
    //     exercise = "NO";
    //     values.push("NO");
    // }
    if(document.querySelector("#nativelangOn").checked) {
        nativelang = document.querySelector("#nativelang").value;
        values.push(nativelang);
    } else {
        nativelang = "NO";
        values.push("NO");
    }
    /* if(document.querySelector("#homelangOn").checked) {
        homelang = document.querySelector("#homelang").value;
        values.push(homelang);
    } else {
        homelang = "NO";
        values.push("NO");
    } */
    if(document.querySelector("#genderOn").checked) {
        gender = document.querySelector("#gender").value;
        values.push(gender);
    } else {
        gender = "NO";
        values.push("NO");
    }
    if(document.querySelector("#educationOn").checked) {
        education = document.querySelector("#education").value;
        values.push(education);
    } else {
        education = "NO";
        values.push("NO");
    }
    if(document.querySelector("#addedyearOn").checked) {
        addedyear = document.querySelector("#addedyear").value;
        values.push(addedyear);
    } else {
        addedyear = "NO";
        values.push("NO");
    }
    if(document.querySelector("#ageOn").checked) {
        age = document.querySelector("#age").value;
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
        age = "NO";
        values.push("NO");
    }
    if(document.querySelector("#countryOn").checked) {
        country = document.querySelector("#country").value;
        if(country == "eesti") {
            //values.push(["idaviru", "tallinn", "tartu"]);
            values.push("idaviru,tallinn,tartu,Tallinn,Maardu linn,Kiili vald,Rae vald,Kohtla-Järve linn,Narva linn,Narva-Jõesuu linn,Valga vald,Jõhvi vald,Sillamäe linn,Tartu linn,Viimsi vald,Mustvee vald,Anija vald,Rakvere vald,Pärnu linn,Toila vald,Lääne-Harju vald,Kambja vald,Alutaguse vald,Saue vald,Viru-Nigula vald,Võru vald,Rakvere linn,Tori vald,Elva vald,Jõgeva vald,Harku vald,Hiiumaa vald,Viljandi linn,Tartu vald,Luunja vald");
        } else {
            values.push(country);
        }
    } else {
        country = "NO";
        values.push("NO");
    }

    $.ajax({
        type: "POST",
        url: "/api/texts/detailneparing",
        data: JSON.stringify(values),
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
            } else {
                alert(XMLHttpRequest + "\n" + textStatus + "\n" + errorThrown);
            }
        }
    });
}

    function tekstideKuvamine() {
        let puhver = [];
        for(let i = 0; i < tekstideIDd.length; i++) {
            puhver.push("<tr value='" + tekstideIDd[i] + "'><a href='javascript:eelvaade(\"" + tekstideIDd[i] + "\")'>" + tekstidePealkirjad[i] + "</a></tr>");
        }
        kaivitaTabel(puhver);
    }

    function eelvaade(tekstiID) {
        $.ajax({
            type: "GET",
            url: "/api/texts/kysitekstimetainfo",
            data: {id : tekstiID},
            success: function(data) {
                //console.log(data);
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
                window.open("tekst.html", "_blank");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert(textStatus + "\n" + errorThrown);
            }
        });
    }

    function kaivitaTabel(puhver) {
        document.querySelector("#tabel").innerHTML = puhver.join(' ');
        document.querySelector("#vorm").style.display = "none";
        document.querySelector("#texts").style.display = "block";
        document.querySelector("#textAmount").innerHTML = "Leiti " + puhver.length + " teksti.";
    }
