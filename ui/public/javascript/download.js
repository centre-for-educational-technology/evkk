function downloadCSV(csv, words) {
    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv], {type: 'text/csv;charset=utf-8;'});

    downloadLink = document.createElement("a");

    downloadLink.download = words;

    downloadLink.href = window.URL.createObjectURL(csvFile);

    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function exportTableToCSV(words, onvaja) {
    var csv = [];
    if(onvaja) {
        var rows = document.querySelectorAll("#tabel tr");
    } else {
        var rows = document.querySelectorAll("table tr");
    }
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length - 1; j++) // -1 eemaldab viimase kasutu tulba
            row.push('"' + cols[j].innerText + '"');
        
        csv.push(row.join(","));        

    }
    downloadCSV('\uFEFF' + csv.join("\n"), words);
}

function ExportToExcel_WordFrequency(type, fn, dl) {
    var elt = document.getElementById('words');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
      XLSX.writeFile(wb, fn || ('sonasagedus.' + (type || 'xlsx')));
 }

 function ExportToExcel_Contexts(type, fn, dl) {
    var elt = document.getElementById('context');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
      XLSX.writeFile(wb, fn || ('kontekstid.' + (type || 'xlsx')));
 }