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
        url: "api/texts/kysikorpusetekstiIDjapealkiri",
        data: {korpusekood : korpused[i]},
        success: function(data){
            for(let i = 0; i < data.length; i++) {
                tekstideIDd.push(data[i].split("!!!")[0]);
                if(data[i].split("!!!")[1] == "") {
                    tekstidePealkirjad.push("pealkiri puudub");
                } else {
                    tekstidePealkirjad.push(data[i].split("!!!")[1]);
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
    let puhver = [];
    for(let i = 0; i < tekstideIDd.length; i++) {
        puhver.push("<tr><td class='checkbox'><input type='checkbox' name='chk' class='korpus' value='" + tekstideIDd[i] + "'></input></td><td class='text'><a href='javascript:eelvaade(\"" + tekstideIDd[i] + "\")'>" + tekstidePealkirjad[i] + "</a></td></tr>");
    }
    kaivitaTabel(puhver);
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
    result = getSelectedCheckboxValues('chk');
    if(result.length == 0) {
      alert("Vali vähemalt üks tekst!");
    } else {
        uhendatudtekst = "";
        loendur = 0;
        for(let i = 0; i < result.length; i++) {
            $.ajax({
                type: "GET",
                url: "api/texts/kysitekst",
                data: {id : result[i]},
                success: function(data){
                    uhendatudtekst += data.split("!!!")[1];
                    loendur++;
                    if(loendur == result.length) {
                        localStorage.setItem("sonad", uhendatudtekst);
                        window.location = "filter.html";
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("teine"); 
                    alert(textStatus + "\n" + errorThrown);
                }
            });
        }
    }
});

function eelvaade(tekstiID) {
    $.ajax({
        type: "GET",
        url: "api/texts/kysitekst",
        data: {id : tekstiID},
        success: function(data){
            tekstisisu = data.split("!!!")[1];
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
    puhver.shift();
    tabel.innerHTML = puhver.join(' ');
    tabelElement = $('#texts').DataTable({
        "pagingType": "full_numbers",
        "pageLength": 25,
        language: {
            url: '../json/dataTables.estonian.json'
        }
    });
    freeze = false;
    document.querySelector("#cover-spin").style.display = "none";
}