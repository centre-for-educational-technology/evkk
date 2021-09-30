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
        
        for (var j = 0; j < cols.length; j++) 
            row.push('"' + cols[j].innerText + '"');
        
        csv.push(row.join(","));        

    }
    downloadCSV('\uFEFF' + csv.join("\n"), words);
}