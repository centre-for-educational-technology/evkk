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
		koguTekst = sisesta_tekst.value.replaceAll("\n", " ").replaceAll('"', "'");
		$.ajax({
			type: "POST",
			url: "/api/texts/laused",
			dataType: "json",
        	contentType: "application/json; charset=utf-8",
			data: '{"tekst": "' + koguTekst + '"}',
			success: function(data) {
				localStorage.setItem("laused", data);
				localStorage.setItem("sonad", koguTekst);
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
form.addEventListener('submit', function(ev) {

	ev.preventDefault();
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
			console.log("SUCCESS: ", data);
		},
		error: function (e) {
			console.log("ERROR: ", e);
			alert("Tekkis viga failide üleslaadimisel! Kontrolli, et valisid ainult lubatud formaadis faile või proovi hiljem uuesti.")
		}
	});
}, false);

function passToLocalStr() {
	console.log($('#fileupload'));
	allFormatText = allFormatText.join(" ").replaceAll('\n', " ").replaceAll('"', "'");
	console.log(allFormatText);
	localStorage.setItem("sonad", allFormatText);
	$.ajax({
		type: "POST",
		url: "/api/texts/laused",
		dataType: "json",
        contentType: "application/json; charset=utf-8",
		data: '{"tekst": "' + allFormatText + '"}',
		success: function(data) {
			localStorage.setItem("laused", data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			alert(textStatus + "\n" + errorThrown);
		}
	});
	localStorage.setItem("paritolu", "FILEUPLOAD");
}
