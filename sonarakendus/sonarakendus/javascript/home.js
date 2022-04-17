let salvesta_tekst = document.querySelector("#salvesta_tekst");
let sisesta_tekst = document.querySelector("#sisesta_tekst");

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

salvesta_tekst.addEventListener("click", function () {
	if (sisesta_tekst.value == "") {
		alert("Tekstiväli ei saa olla tühi!");
	} else {
		document.querySelector("#cover-spin").style.display = "block";
		freeze = true;
		var regex = new RegExp("[^a-zA-ZõäöüÕÄÖÜ;:,.!?'/&()=@–-]", "gi");
		koguTekst = sisesta_tekst.value.replace(/\\n/g, ' ').replaceAll('"', "'").replaceAll(regex, " ");
		$.ajax({
			type: "POST",
			url: "/api/texts/laused",
			dataType: "json",
        	contentType: "application/json; charset=utf-8",
			data: '{"tekst": "' + koguTekst + '"}',
			success: function(data) {
				localStorage.setItem("laused", JSON.stringify(data));
				localStorage.setItem("sonad", koguTekst.replaceAll("'", "").replace(/ +/g, " "));
				localStorage.setItem("paritolu", "TEXTBOX");
				window.location = "filter.html";
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				alert(textStatus + "\n" + errorThrown);
			}
		});
	}
});

var form = document.forms.namedItem("fileinfo");

function readFileNames() {
	var fileNameData = document.querySelector("#output");
	var fData = new FormData(form);
	
	fileNameData.textContent = "";
	let br = document.createElement("br");
	let bold = document.createElement("b");
	let fileNameDataContent = document.createTextNode("Valitud failid:");
	bold.appendChild(fileNameDataContent);
	fileNameData.appendChild(bold);
	fileNameData.appendChild(br);

	for ([key, value] of fData.entries()) {
		let eachFileContent = document.createTextNode(value.name);
		let eachBr = document.createElement("br");
		fileNameData.appendChild(eachFileContent);
		fileNameData.appendChild(eachBr);
	}
}

form.addEventListener('submit', function(ev) {

	ev.preventDefault();
	document.querySelector("#cover-spin").style.display = "block";
	freeze = true;
	var oData = new FormData(form);
	//console.log(...oData);

	$.ajax({
		type: "POST",
		enctype: 'multipart/form-data',
		url: "/api/textfromfile",
		data: oData,
		processData: false,
		contentType: false,
		cache: false,
		success: function (data) {
			var regex = new RegExp("[^a-zA-ZõäöüÕÄÖÜ;:,.!?'/&()=@–-]", "gi");
			allFormatText = data.replace(/\\n/g, ' ').replaceAll('"', "'").replaceAll(regex, " ");
			localStorage.setItem("sonad", allFormatText.replaceAll("'", "").replace(/ +/g, " "));
			localStorage.setItem("paritolu", "FILEUPLOAD");
			$.ajax({
				type: "POST",
				url: "/api/texts/laused",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: '{"tekst": "' + allFormatText + '"}',
				success: function(data) {
					localStorage.setItem("laused", JSON.stringify(data));
					window.location = "filter.html";
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(textStatus + "\n" + errorThrown);
				}
			});
		},
		error: function (e) {
			console.log("ERROR: ", e);
			alert("Tekkis viga failide üleslaadimisel! Kontrolli, et valisid ainult lubatud formaadis faile või proovi hiljem uuesti.")
		}
	});
}, false);