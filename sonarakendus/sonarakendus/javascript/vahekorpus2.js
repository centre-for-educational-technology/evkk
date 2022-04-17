korpused = JSON.parse(localStorage.getItem("korpused"));
tekstideIDd = [];
tekstidePealkirjad = [];

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

loendur = 0;
for(let i = 0; i < korpused.length; i++) {
    $.ajax({
        type: "GET",
        url: "/api/texts/kysikorpusetekstiIDjapealkiri",
        data: {korpusekood : korpused[i]},
        success: function(data){
            data = JSON.parse(data);
            for(let i = 0; i < data.length; i++) {
                tekstideIDd.push(data[i]["text_id"]);
                if(data[i]["property_value"] == "") {
                    tekstidePealkirjad.push("pealkiri puudub");
                } else {
                    tekstidePealkirjad.push(data[i]["property_value"]);
                }
            }
            loendur++;
            if(loendur == korpused.length) {
                tekstideKuvamine();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(textStatus + "\n" + errorThrown);
        }
    });
}

function tekstideKuvamine() {
    for(let i = 0; i < tekstideIDd.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let input = document.createElement("input");
        let a = document.createElement("a");
        let textContent = document.createTextNode(tekstidePealkirjad[i]);

        td1.setAttribute("class", "checkbox");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "chk");
        input.setAttribute("class", "korpus");
        input.setAttribute("value", tekstideIDd[i]);
        td2.setAttribute("class", "text");
        a.setAttribute("href", "javascript:eelvaade('" + tekstideIDd[i] + "')");

        a.appendChild(textContent);
        td1.appendChild(input);
        td2.appendChild(a);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tabel.appendChild(tr);
    }
    kaivitaTabel();
}

function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
  }
  
  const btn = document.querySelector('#salvesta');
  btn.addEventListener('click', (event) => {
    freeze = true;
    document.querySelector("#cover-spin").style.display = "block";
    result = getSelectedCheckboxValues('chk');
    if(result.length == 0) {
      alert("Vali vähemalt üks tekst!");
    } else {
        uhendatudtekst = "";
        loendur = 0;
        for(let i = 0; i < result.length; i++) {
            $.ajax({
                type: "GET",
                url: "/api/texts/kysitekst",
                data: {id : result[i]},
                success: function(data){
                    var regex = new RegExp("[^a-zA-ZõäöüÕÄÖÜ ;:,.!?/-/'/%&()=]", "gi");
                    uhendatudtekst += data.replace(/\\n/g, ' ').replaceAll('"', "'").replaceAll(regex, " ");
                    loendur++;
                    if(loendur == result.length) {
                        localStorage.setItem("sonad", uhendatudtekst.replaceAll("'", "").replace(/ +/g, " "));
                        $.ajax({
                            type: "POST",
                            url: "/api/texts/laused",
                            dataType: "json",
        	                contentType: "application/json; charset=utf-8",
                            data: '{"tekst": "' + uhendatudtekst + '"}',
                            success: function(data) {
                                localStorage.setItem("laused", JSON.stringify(data));
                                localStorage.setItem("paritolu", "EVKK");
                                window.location = "filter.html";
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                alert(textStatus + "\n" + errorThrown);
                            }
                        });
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + "\n" + errorThrown);
                }
            });
        }
    }
});

function eelvaade(tekstiID) {
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
            localStorage.setItem("kuvatavtekst", tekstisisu);
            localStorage.setItem("tekstipealkiri", pealkiri);
            window.open("tekst.html", "_blank");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert(textStatus + "\n" + errorThrown);
        }
    });
}

function kaivitaTabel() {
    tabelElement = $('#texts').DataTable({
        "pagingType": "full_numbers",
        "pageLength": 25,
        language: {
            url: 'json/dataTables.estonian.json'
        }
    });
    freeze = false;
    document.querySelector("#cover-spin").style.display = "none";
}