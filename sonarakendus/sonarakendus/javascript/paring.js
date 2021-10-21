document.querySelector("#texts").style.display = "none";

tekstideIDd = [];
tekstidePealkirjad = [];

document.getElementById("type").addEventListener("click", function() {
    if(document.getElementById("type").value != "teadmata") {
        document.getElementById("typeOn").checked = true;
    } else {
        document.getElementById("typeOn").checked = false;
    }
});

document.getElementById("level").addEventListener("click", function() {
    if(document.getElementById("level").value != "teadmata") {
        document.getElementById("levelOn").checked = true;
    } else {
        document.getElementById("levelOn").checked = false;
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

document.getElementById("homelang").addEventListener("click", function() {
    if(document.getElementById("homelang").value != "teadmata") {
        document.getElementById("homelangOn").checked = true;
    } else {
        document.getElementById("homelangOn").checked = false;
    }
});

document.getElementById("gender").addEventListener("click", function() {
    if(document.getElementById("gender").value != "teadmata") {
        document.getElementById("genderOn").checked = true;
    } else {
        document.getElementById("genderOn").checked = false;
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
    parameters = ["korpus", "tekstityyp", "keeletase", "characters", "emakeel", "kodukeel", "sugu", "vanus", "elukoht"]; //exercise
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
    if(document.querySelector("#levelOn").checked) {
        level = document.querySelector("#level").value;
        values.push(level);
    } else {
        level = "NO";
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
    if(document.querySelector("#homelangOn").checked) {
        homelang = document.querySelector("#homelang").value;
        values.push(homelang);
    } else {
        homelang = "NO";
        values.push("NO");
    }
    if(document.querySelector("#genderOn").checked) {
        gender = document.querySelector("#gender").value;
        values.push(gender);
    } else {
        gender = "NO";
        values.push("NO");
    }
    if(document.querySelector("#ageOn").checked) {
        age = document.querySelector("#age").value;
        values.push(age);
    } else {
        age = "NO";
        values.push("NO");
    }
    if(document.querySelector("#countryOn").checked) {
        country = document.querySelector("#country").value;
        if(country == "eesti") {
            //values.push(["idaviru", "tallinn", "tartu"]);
            values.push("idaviru,tallinn,tartu");
        } else {
            values.push(country);
        }
    } else {
        country = "NO";
        values.push("NO");
    }

    // queryJoinPart = "";
    // queryWherePart = "";
    // startingNumber = 3;
    // for(let i = 0; i < parameters.length; i++) {
    //     if(Array.isArray(values[i])) {
    //         queryJoinPart += "join core.text_property as p" + startingNumber + " on p2.text_id = p" + startingNumber + ".text_id ";
    //         queryWherePart += " and p" + startingNumber + ".property_name = '" + parameters[i] + "' and p" + startingNumber + ".property_value in ("
    //         for(let j = 0; j < values[i].length; j++) {
    //             queryWherePart += "'" + values[i][j] + "', ";
    //         }
    //         queryWherePart = queryWherePart.slice(0, -2);
    //         queryWherePart += ")";
    //         startingNumber++;
    //     } else if(parameters[i] == "characters" && values[i] != "NO") {
    //         queryJoinPart += "join core.text as p" + startingNumber + " on p2.text_id = p" + startingNumber + ".id ";
    //         queryWherePart += " and char_length(p" + startingNumber + ".content) <= " + values[i];
    //         startingNumber++;
    //     } else if(values[i] != "NO") {
    //         queryJoinPart += "join core.text_property as p" + startingNumber + " on p2.text_id = p" + startingNumber + ".text_id ";
    //         queryWherePart += " and p" + startingNumber + ".property_name = '" + parameters[i] + "' and p" + startingNumber + ".property_value = '" + values[i] + "'";
    //         startingNumber++;
    //     }
    // }
    // queryWherePart += ";";

    //console.log(queryJoinPart);
    //console.log(queryWherePart);

    // $.ajax({
    //     type: "POST",
    //     url: "api/texts/detailneparing",
    //     data: {queryJoin : queryJoinPart,
    //     queryWhere : queryWherePart},
    //     success: function(data) {
    //         for(let i = 0; i < data.length; i++) {
    //             tekstideIDd.push(data[i].split("!!!")[0]);
    //             if(data[i].split("!!!")[1] == "") {
    //                 tekstidePealkirjad.push("pealkiri puudub");
    //             } else {
    //                 tekstidePealkirjad.push(data[i].split("!!!")[1]);
    //             }
    //         }
    //         tekstideKuvamine();
    //     },
    //     error: function(XMLHttpRequest, textStatus, errorThrown) {
    //         alert(XMLHttpRequest + "\n" + textStatus + "\n" + errorThrown);
    //     }
    // });

    $.ajax({
        type: "POST",
        url: "/api/texts/detailneparing2",
        data: JSON.stringify(values),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            //console.log(data);
            //console.log(data[0]["text_id"]);
            for(let i = 0; i < data.length; i++) {
                tekstideIDd.push(data[i]["text_id"]);
                if(data[i]["property_value"] == "") {
                    tekstidePealkirjad.push("pealkiri puudub");
                } else {
                    tekstidePealkirjad.push(data[i]["property_value"]);
                }

                // tekstideIDd.push(data[i].split("!!!")[0]);
                // if(data[i].split("!!!")[1] == "") {
                //     tekstidePealkirjad.push("pealkiri puudub");
                // } else {
                //     tekstidePealkirjad.push(data[i].split("!!!")[1]);
                // }
            }
            tekstideKuvamine();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest + "\n" + textStatus + "\n" + errorThrown);
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
            url: "/api/texts/kysitekst",
            data: {id : tekstiID},
            success: function(data){
                tekstisisu = data;
                pealkirjaID = tekstideIDd.indexOf(tekstiID);
                pealkiri = tekstidePealkirjad[pealkirjaID];
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