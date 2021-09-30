let salvesta_tekst = document.querySelector("#salvesta_tekst");
let sisesta_tekst = document.querySelector("#sisesta_tekst");
let BASE64_MARKER = ";base64,";
let allFormatText = [];
let allFormatFile = [];

salvesta_tekst.addEventListener("click", function () {
	if (sisesta_tekst.value == "") {
		document.querySelector("#error").innerHTML = "Tekstiväli ei saa olla tühi!";
	} else {
		document.querySelector("#error").innerHTML = "";
		koguTekst = sisesta_tekst.value.replaceAll("\n", " ");
		localStorage.setItem("sonad", koguTekst);
		window.location = "filter.html";
	}
});

//--------------------PDFFile---------------------

function convertDataURIToBinary(dataURI) {
	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));

	for (i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}

	readPdfAsArray(array);
}

function readPdfAsArray(readPdfAsArray) {
	PDFJS.getDocument(readPdfAsArray).then(
		function (pdf) {
			var pdfDocument = pdf;
			var pagesPromises = [];
			let pdfText = [];

			for (i = 0; i < pdf.pdfInfo.numPages; i++) {
				(function (pageNumber) {
					pagesPromises.push(readPdfFile(pageNumber, pdfDocument));
				})(i + 1);
			}

			Promise.all(pagesPromises).then(function (pagesText) {
				for (i in pagesText) {
					pdfText.push(pagesText[i]);
				}

				main();
			});
		},
		function (reason) {
			console.error(reason);
		}
	);
}

function readPdfFile(pageNum, PDFDocumentInstance) {
	return new Promise(function (resolve, reject) {
		PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
			pdfPage.getTextContent().then(function (textContent) {
				var textItems = textContent.items;
				var finalString = "";

				for (i = 0; i < textItems.length; i++) {
					var item = textItems[i];

					finalString += item.str + " ";
				}
				resolve(finalString);
				allFormatText.push(finalString);
			});
		});
	});
}

// -----------------------DOCXFile-------------------------

// function readDocxFile() {
// 	let input = document.getElementById("file-id");
// 	let docxFiles = input.files;
// 	let docxReaders = [];

// 	if (!docxFiles.length) return;

// 	function readDocxText(file) {
// 		return new Promise(function (resolve, reject) {
// 			let reader = new FileReader();

// 			reader.onload = function () {
// 				var zip = new JSZip(reader.result);
// 				var doc = new window.docxtemplater().loadZip(zip);
// 				var text = doc.getFullText();
// 				resolve(text);
// 			};

// 			reader.onerror = function () {
// 				reject(reader);
// 			};

// 			reader.readAsBinaryString(file);
// 		});
// 	}

// 	for (i = 0; i < docxFiles.length; i++) {
// 		docxReaders.push(readDocxText(docxFiles[i]));
// 		allFormatFile.push(docxFiles[i].name);
// 	}

// 	Promise.all(docxReaders).then((values) => {
// 		for (i in values) {
// 			allFormatText.push(values[i]);
// 		}
// 		main();
// 	});
// }

// -----------------------TXTFile-------------------------

function readTxtFile() {
	let input = document.getElementById("file-id");
	let txtFiles = input.files;
	let txtReaders = [];

	if (!txtFiles.length) return;

	function readTxtAsText(file) {
		return new Promise(function (resolve, reject) {
			let reader = new FileReader();

			reader.onload = function () {
				resolve(reader.result);
			};

			reader.onerror = function () {
				reject(reader);
			};

			reader.readAsText(file);
		});
	}

	for (i = 0; i < txtFiles.length; i++) {
		txtReaders.push(readTxtAsText(txtFiles[i]));
		allFormatFile.push(txtFiles[i].name);
	}
	//🔽naq su isa kui ta lubas tagasi tulla🤣🤣
	Promise.all(txtReaders).then((values) => {
		for (i in values) {
			allFormatText.push(values[i]);
		}
		main();
	});
}

// -----------------------DOCFile-------------------------

function readDocFile() {
	let input = document.getElementById("file-id");

	let docFile = input.files;
	let docReaders = [];
	let docText = [];

	if (!docFile.length) return;

	function readDocAsText(file) {
		return new Promise(function (resolve, reject) {
			let reader = new FileReader();

			reader.onload = function () {
				resolve(reader.result);
			};

			reader.onerror = function () {
				reject(reader);
			};

			reader.readAsBinaryString(file);
		});
	}

	for (let i = 0; i < docFile.length; i++) {
		docReaders.push(readDocAsText(docFile[i]));
		allFormatFile.push(docFile[i].name);
	}

	Promise.all(docReaders).then((values) => {
		for (i in values) {
			let docParse = values[i].toString().substring(2560, values[i].toString().length - 19600);
			docText.push(docParse);
			allFormatText.push(docText[i]);
		}

		main();
	});
}

//------------------------ODTFile---------------------------

function readOdtFile() {
	let input = document.getElementById("file-id");
	var $result = $("#result");

	// let odtFile = input.files;
	// let docReaders = [];
	// let docText = [];

	// remove content
	$result.html("");
	// be sure to show the results
	$("#result_block").removeClass("hidden").addClass("show");

	// Closure to capture the file information.
	function handleFile(f) {
		var $title = $("<h4>", {
			text: f.name,
		});
		var $fileContent = $("<ul>");
		$result.append($title);
		$result.append($fileContent);

		JSZip.loadAsync(f)
			.then(
				function (zip) {
					zip.forEach(function (relativePath, zipEntry) {
						$fileContent.append(
							$("<li>", {
								text: zipEntry.name,
							})
						);
					});
					return zip.file("content.xml").async("text");
				},
				function (e) {
					$result.append(
						$("<div>", {
							class: "alert alert-danger",
							text: "Error reading " + f.name + ": " + e.message,
						})
					);
				}
			)
			.then(function (txt) {
				finalTxt = txt.match(/<text:(p|span|h)[^>]*>([^<]*)<\/text:(p|span|h)[^>]*/g);
				var finalFinalTxt = "";

				for (i = 0; i < finalTxt.length; i++) {
					temp = finalTxt[i].match(/<text:(p|span|h)[^>]*>([^<]*)<\/text:(p|span|h)[^>]*/);
					finalFinalTxt += temp[2];
				}

				allFormatText.push(finalFinalTxt);
				main();
			});
	}

	var files = input.files;
	for (var i = 0; i < files.length; i++) {
		handleFile(files[i]);
		allFormatFile.push(files[i].name);
	}
}

//-------------------------Main--------------------------

function checkFileExtension() {
	//check if filetypes match
	let filesToCheckInput = document.getElementById("file-id");
	let filesToCheck = filesToCheckInput.files;
	let extensionsToCheck = [];
	let readFiles = "true";

	for (i = 0; i < filesToCheck.length; i++) {
		extensionsToCheck.push(filesToCheck[i].name.split(".").pop());
	}

	for (var i = 0; i < extensionsToCheck.length - 1; i++) {
		if (extensionsToCheck[i] !== extensionsToCheck[i + 1]) {
			readFiles = "false";
		}
	}

	if (readFiles == "true") {
		readAllFiles();
	} else {
		alert("Error 420, OV: Failitüübid ei kattu!");
	}
	//

	function readAllFiles() {
		fileName = document.querySelector("#file-id").value;
		extension = fileName.split(".").pop();

		if (extension == "docx") {
			readDocxFile();
		} else if (extension == "pdf") {
			var input = document.getElementById("file-id");

			let pdfFiles = input.files;

			for (i = 0; i < pdfFiles.length; i++) {
				allFormatFile.push(pdfFiles[i].name);

				var fReader = new FileReader();
				fReader.readAsDataURL(pdfFiles[i]);
				fReader.onloadend = function (event) {
					convertDataURIToBinary(event.target.result);
				};
			}
		} else if (extension == "txt") {
			readTxtFile();
		} else if (extension == "doc") {
			readDocFile();
		} else if (extension == "odt") {
			readOdtFile();
		}
	}
}

function deleteText() {
	let deleteFileName = document.getElementById("fileDelete").value;
	if (allFormatFile.includes(deleteFileName)) {
		var deleteTextIndex = allFormatFile.indexOf(deleteFileName);
		console.log(deleteTextIndex);

		allFormatFile.splice(deleteTextIndex, 1);
		allFormatText.splice(deleteTextIndex, 1);
	} else {
		alert("Error: 420, Kasutaja poolne viga!");
	}

	main();
}

function main() {
	document.getElementById("output").innerHTML = "Valitud failid: ";

	for (i in allFormatFile) {
		var fileName = document.createElement("div");
		fileName.id = allFormatFile[i];
		fileName.innerHTML = allFormatFile[i];
		fileName.className = "files";
		document.getElementById("output").appendChild(fileName);
	}

	console.log(allFormatFile);
	console.log(allFormatText);
}

function passToLocalStr() {
	localStorage.setItem("sonad", allFormatText.join(" "));
}
