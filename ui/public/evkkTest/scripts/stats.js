// global variables
let selectedKorpus = []; // every selected korpus
let selectedValues = []; // every selected value (väärtus)
let selectedFilters = []; // kitsendused
let filter;
const helpToggle = document.getElementById('help-toggle');
let availableValues = [];
let isHelpOn = true;
let mode = "tulp";
let selectedBy;
let title;
let beautifySelected;

/*vaeg nägija nupp*/
let accsesebility = document.getElementById('accsesebilty_button');
let isAccsesebilityOn = true;
let normal = document.getElementById("normal");
let secondary = document.getElementById("secondary");

// On page load
$(document).ready(async function () {
    selectedBy = document.querySelector("#selectedValue").value;

    filter = document.querySelector("#filterBy").value; // current filter
    // initial fetchers on page load, to display stats

    await updateFilter();


    showDefault();
    // event listeners
    document.querySelectorAll('input[name=korpus]')
        .forEach(el => el
            .addEventListener('click', updateKorpusCheckboxes));
    document.querySelectorAll('input[name=filterDetailed]')
        .forEach(el => {
            el.addEventListener('click', updateFilters)
    });
    document.querySelector("#selectAllKorpus").addEventListener("click", selectKorpus);
    document.querySelector("#unselectAllKorpus").addEventListener("click", deselectKorpus);
    helpToggle.addEventListener('click', show);
    document.querySelector("#filterBy").addEventListener("change", updateFilter);
    // await addValueSelection()
});





// AJAX for fetching data from SELECTED korpuses
async function fetchDetailed() {
    let result;
    let lcValues = [];
    selectedValues.forEach((e) => {
        if (e == "tundmatu" && selectedValues.length != 0) {
            lcValues.splice(0, 0, "");
        } else {
            if (filter == 'keeletase') {
                lcValues.push(e.toUpperCase());
            } else {
                lcValues.push(e.toLowerCase());
            }
        }
    });

    let data = {
        corpus: selectedKorpus,
        pName: filter,
        pValue: lcValues,
        selectedFilters: selectedFilters
    }

    // checks which chart mode is selected
    if (document.querySelector("#tulp").checked) {
        mode = "tulp";
    } else if (document.querySelector("#sector").checked) {
        mode = "pie";
    }


    try {
        if (selectedKorpus.join().length == 0) {
            document.querySelector('#alamkorpused').style.display = 'none'
        } else {
            result = await $.ajax({
                url: "/api/texts/detailedSearch?data=" + encodeURI(JSON.stringify(data)),
                type: "GET",
                dataType: 'json',
                contentType: "application/json",
            });
            if (mode == "tulp") {
                loadStats(result);
            } else {
                loadPie(result);
            }

            console.log("ajax successful, parsed data: " + result)
        }

    } catch (error) {
        console.error(error);
    }
    console.log("ATTEMPTING TO SEND JSON:")
    console.log(data)
    showActiveFilters();
}



// collapsable containers, contents are inside of class .content in html
async function initCollapsable() { 
    let coll = document.getElementsByClassName("collapsible");
    for (e of coll) {
        e.removeEventListener("click", toggleDropdown)
    }
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", toggleDropdown);
    }
    await getSelectedValues();
}

// toggles collapsible dropdown menu activity state, hides or unhides it.
function toggleDropdown() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
    content.style.display = "none";
    } else {
    content.style.display = "block";
    }
}

async function updateFilters() {
    selectedFilters = [];
    let checkboxes = document.querySelectorAll('input[name=filterDetailed]:checked');
    let allCheckboxes = document.querySelectorAll('input[name=filterDetailed]');
    for (let i = 0; i < allCheckboxes.length; i++) {
        let next = allCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (checkboxes.length == 0) {
        for (i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            let next = checkboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
        }
        document.querySelector('#alamkorpused').style.display = 'none'
    
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            selectedFilters.push({filter: checkboxes[i].defaultValue, data: []});
            let next = checkboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
        }
        document.querySelector('.echarts').style.display = 'block'
    }
    await addValueSelection()
}

async function getSelectedValues() {
    for (let x = 0; x < selectedFilters.length; x++) {
        selectedFilters[x].data = [];
        
        let checkboxes = document.querySelectorAll(`input[name=filter-${selectedFilters[x].filter}]:checked`);
        let allCheckboxes = document.querySelectorAll(`input[name=filter-${selectedFilters[x].filter}]`);
        for (let i = 0; i < allCheckboxes.length; i++) {
            let next = allCheckboxes[i].nextElementSibling.firstChild;
            next.classList.add("hidden");
        }
        if (checkboxes.length == 0) {
            for (i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
                let next = checkboxes[i].nextElementSibling.firstChild;
                next.classList.remove("hidden");
            }
            document.querySelector('#alamkorpused').style.display = 'none'
        
        } else {
            selectedFilters[x].data = [];
            for (let i = 0; i < checkboxes.length; i++) {
                if (selectedFilters[x].filter == "keeletase") {
                    if (checkboxes[i].defaultValue == "tundmatu") {
                        selectedFilters[x].data.push(checkboxes[i].defaultValue);
                    } else {
                        selectedFilters[x].data.push(checkboxes[i].defaultValue.toUpperCase());
                    }
                } else {
                    selectedFilters[x].data.push(checkboxes[i].defaultValue);
                }
                let next = checkboxes[i].nextElementSibling.firstChild;
                next.classList.remove("hidden");
            }
            document.querySelector('.echarts').style.display = 'block'
        }
    }
}

// creates collapsable values selection list
async function addValueSelection() {
    document.querySelector("#filtersDetailed").innerHTML = "";
    for (let i = 0; i < selectedFilters.length; i++) {
        let data = "";
        let filterValues = await fetchAvailableDetailedValues(selectedFilters[i].filter);
        let collapsable = `<button type="button" class="collapsible"><p>${selectedFilters[i].filter} väärtused</p><i class="fas fa-chevron-down"></i></button>
                            <div class="content"><div>`

                                // <!-- Korpus selection -->
        for (let x = 0; x < filterValues.length; x++) {
            data += `
            <input type="checkbox" name="filter-${selectedFilters[i].filter}"
            value="${filterValues[x].toLowerCase()}" class="btn-check" id="${selectedFilters[i].filter}-check${x}" autocomplete="off" checked/>
            <label class="checkbox" for="${selectedFilters[i].filter}-check${x}"><i class="fas fa-check"></i><span>${filterValues[x]}</span></label>
            `
        }
        collapsable += data;
        collapsable += `</div></div>`;
        document.querySelector("#filtersDetailed").insertAdjacentHTML( 'beforeend', collapsable );
        document.querySelectorAll(`input[name=filter-${selectedFilters[i].filter}]`)
        .forEach(el => el
            .addEventListener('click', updateSelectedValues));
    }
    await initCollapsable();
    await fetchDetailed()
}

async function updateSelectedValues() {
    let f = this.name.slice(7);
    let index;
    let filterIndex = 0;
    for (let i = 0; i < selectedFilters.length; i++) {
        if (selectedFilters[i].filter == f) {
            index = selectedFilters.indexOf(this.defaultValue);
            filterIndex = i;
        }
    }
    if (this.checked) {
        selectedFilters[filterIndex].data.push(this.defaultValue);
        
    } else {
        selectedFilters[filterIndex].data.splice(index);
    }
    await fetchDetailed();
}

function showDefault() {
    $("#helpSecondFilterSelection").attr({"aria-label":"Saab valida, mis väärtused kuvatakse graafikus", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#helpKitsendused").attr({"aria-label":"Saab kitsendada andmeid mingi väärtuse järgi", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#documents2").attr({"aria-label":"Dokumentide koguarv", "data-balloon-pos":"up", "class":"tooltip-green"})
    $("#helpKitsendatudValues").attr({"aria-label":"Kuvab, mis väärtused kuvatakse", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#helpSelectedValue").attr({"aria-label":"Väärtus, mille järgi andmed filtreeritakse", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#radio").attr({"aria-label":"Siin saab valida kuvatud diagrammi tüübi", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#helpCorpus").attr({"aria-label":"Korpused on töödeldud tekstide kogumid, mis on grupeeritud mingite kindlate kategooriate järgi.", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#words2").attr({"aria-label":"Sõnade kogu arv", "data-balloon-pos":"up", "class":"tooltip-green"})
    $("#sentences2").attr({"aria-label":"Lausete kogu arv", "data-balloon-pos":"up", "class":"tooltip-green"})
    $("#helpFilterBy").attr({"aria-label":"Siin saab täpsustada otsingut", "data-balloon-pos":"right", "class":"tooltip-green"})

}

function show(){
    if(isHelpOn){
        $("#selectAllKorpus").removeAttr('aria-label data-balloon-pos class')
        $("#unselectAllKorpus").removeAttr('aria-label data-balloon-pos class')
        $("#documents2").removeAttr('aria-label data-balloon-pos class')
        $("#korpusSelection").removeAttr('aria-label data-balloon-pos class')
        $("#words2").removeAttr('aria-label data-balloon-pos class')
        $("#sentences2").removeAttr('aria-label data-balloon-pos class')
        $("#pede").removeAttr('aria-label data-balloon-pos class')
        helpToggle.style.color = 'rgb(105, 173, 105';
        isHelpOn = false;

    } else {
        helpToggle.style.color = 'rgb(37, 63, 47)';
        
        $("#selectAllKorpus").attr({"aria-label":"Valib kõik korpused", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#unselectAllKorpus").attr({"aria-label":"Eemaldab kõik korpused", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#documents2").attr({"aria-label":"Dokumentide koguarv", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#korpusSelection").attr({"aria-label":"Korpused on töödeldud tekstide kogumid, mis on grupeeritud mingite kindlate kategooriate järgi.", "data-balloon-pos":"right", "class":"tooltip-green"})
        $("#words2").attr({"aria-label":"Sõnade kogu arv", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#sentences2").attr({"aria-label":"Lausete kogu arv", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#pede").attr({"aria-label":"Siin saab täpsustada otsingut", "data-balloon-pos":"right", "class":"tooltip-green"})
        isHelpOn = true;

    }
}


async function readfilter2fromDB(selectionimistasaab) { // LOOME FILTER 2 LOetelu
    document.getElementById('SecondFilterSelection').innerHTML="";
    var x = document.getElementById("filters");
    // availableValues = [];
    await fetchAvailableValues();
    var docFrag = document.createDocumentFragment();

    
    /*
    input type="checkbox" name="korpus"
    value="cFqPphvYi" class="btn-check" id="btn-check0" autocomplete="off" checked/>
    <label class="checkbox" for="btn-check0"><i class="fas fa-check"></i><span>Eesti keele olümpiaadi tööd</span></label>
    */
    for(var x = 0; x < availableValues.length; x++){
        var button = document.createElement('input');
        button.setAttribute('type', 'checkbox');
        button.setAttribute('name', selectionimistasaab);
        button.setAttribute('value', availableValues[x].toLowerCase());
        button.setAttribute('class', 'btn-check');
        button.setAttribute('id', ("btn-check22"+x));
        button.setAttribute('autocomplete', 'off');
        button.setAttribute('checked', '');

        docFrag.appendChild(button);

        var button2 = document.createElement('label');
        button2.setAttribute('class', 'checkbox');
        button2.setAttribute('for', ("btn-check22"+x));
        var button3 = document.createElement('i');
        button3.setAttribute('class', 'fas fa-check');

        button2.appendChild(button3);

        var button4 = document.createElement('span');
        button4.innerHTML = availableValues[x]; // clear existing
        button2.appendChild(button4);

        docFrag.appendChild(button2);

        //docFrag.appendChild(button3);

    }
    
    document.getElementById('SecondFilterSelection').appendChild(docFrag);

    //TEEME FILTER2 NUPULE KUULAJAD
    
    document.querySelectorAll('input[name='+selectionimistasaab+']')
        .forEach(el => el
            .addEventListener('click', updateKorpusCheckboxes));

    document.querySelector("#selectAllChoices").addEventListener("click", selectFilter2Checkboxes);
    document.querySelector("#unselectAllChoices").addEventListener("click", deselectFilter2Checkboxes);

}


async function updateFilter2Checkboxes() {
    filter = document.querySelector("#filterBy").value;
    selectedValues = [];
    let checkboxes = document.querySelectorAll('input[name='+filter+']:checked');
    let allCheckboxes = document.querySelectorAll('input[name='+filter+']');
    for (let i = 0; i < allCheckboxes.length; i++) {
        let next = allCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (checkboxes.length == 0 || selectedKorpus.length == 0) {
        for (i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            let next = checkboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
        }
        document.querySelector('#alamkorpused').style.display = 'none'
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            selectedValues.push(checkboxes[i].defaultValue);
            let next = checkboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
        }
        document.querySelector('.echarts').style.display = 'block'
    }
}

// Checkbox style manipulation (checks everything), then fetches all stats
async function selectFilter2Checkboxes() {
    filter = document.querySelector("#filterBy").value;
    let checkboxes = document.querySelectorAll('input[name='+filter+']');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
        let next = checkboxes[i].nextElementSibling.firstChild;
        next.classList.remove("hidden");
        next.classList.remove("add");
    }
    updateKorpusCheckboxes();
}

// Checkbox style manipulation (unchecks everything)
function deselectFilter2Checkboxes() {
    let checkboxes = document.querySelectorAll('input[name='+filter+']');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        let next = checkboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    document.querySelector("#alamkorpused").style.display = 'none';
}



// AJAX for fetching mini stats
async function fetchMiniStats() {
    filter = document.querySelector("#filterBy").value;
    let result;
    try {
        result = await $.ajax({
            url: "/api/texts/getMiniStats",
            type: "GET",
            data: { corpus: selectedKorpus.join() },
        });
        loadMiniStats(JSON.parse(result));
    } catch (error) {
        console.error(error);
    }
}

// Loading the mini stats
function loadMiniStats(results) {
    if(results == null){
        document.querySelector("#documents").innerHTML = "0";
        document.querySelector("#sentences").innerHTML = "0";
        document.querySelector("#words").innerHTML = "0";
    }
    else if(results[0].sum != 0) {
        document.querySelector("#documents").innerHTML = numberWithCommas(results[0].sum);
        document.querySelector("#sentences").innerHTML = numberWithCommas(results[0].lauseid);
        document.querySelector("#words").innerHTML = numberWithCommas(results[0].sonu);

    }else{
        document.querySelector("#documents").innerHTML = "0";
        document.querySelector("#sentences").innerHTML = "0";
        document.querySelector("#words").innerHTML = "0";
    }
}

// Number beautifier. For example: '123456789' into '123 456 789'
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// updates the stats title, beautifies them, then executes checkbox updater
async function updateFilter() {
    filter = document.querySelector("#filterBy").value;
    selectedBy = document.querySelector("#selectedValue").value;
    let beautify;
    switch (filter) {
        case "vanus":
            beautify = "vanuse";
            break;
        case "haridus":
            beautify = "hariduse";
            break;
        case "sugu":
            beautify = "soo";
            break;
        case "elukoht":
            beautify = "elukoha";
            break;
        case "kodukeel":
            beautify = "kodukeele";
            break;
        case "emakeel":
            beautify = "emakeele";
            break;
        case "tekstikeel":
            beautify = "tekstikeele";
            break;
        case "abivahendid":
            beautify = "abivahendite";
            break;
        case "taust":
            beautify = "sotsiaalse tausta";
            break;
        case "keeletase":
            beautify = "keeletaseme";
            break;
        case "tekstikeel":
            beautify = "tekstikeele";
            break;
        case "tekstityyp":
            beautify = "tekstitüübi";
            break;
    }

    switch (selectedBy) {
        case "sonu":
            beautifySelected = "Sõnad";
            break;
        case "tekste":
            beautifySelected = "Tekstid";
            break;
        case "vigu":
            beautifySelected = "Vead";
            break;
        case "lauseid":
            beautifySelected = "Laused";
            break;
    }

    title = `${beautifySelected} ${beautify} järgi`;
    await readfilter2fromDB(filter);
    await updateKorpusCheckboxes();
}

// Checkbox style manipulation (checks everything), then fetches all stats
async function selectKorpus() {
    let checkboxes = document.querySelectorAll('input[name=korpus]');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
        let next = checkboxes[i].nextElementSibling.firstChild;
        next.classList.remove("hidden");
        next.classList.remove("add");
    }
    await updateKorpusCheckboxes();
    await fetchMiniStats();
}

// Checkbox style manipulation (unchecks everything)
function deselectKorpus() {
    let checkboxes = document.querySelectorAll('input[name=korpus]');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        let next = checkboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    loadMiniStats(null);
    document.querySelector("#alamkorpused").style.display = 'none';
}

// Collects every selected korpus checkbox, styles them and then fetches appropriate stats
async function updateKorpusCheckboxes() {
    filter = document.querySelector("#filterBy").value;
    selectedKorpus = [];
    let checkboxes = document.querySelectorAll('input[name=korpus]:checked');
    let allCheckboxes = document.querySelectorAll('input[name=korpus]');
    for (let i = 0; i < allCheckboxes.length; i++) {
        let next = allCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (checkboxes.length == 0) {
        for (i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            let next = checkboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            selectedKorpus.push(checkboxes[i].defaultValue);
            let next = checkboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    await updateFilter2Checkboxes()
    await updateFilters();
    await fetchMiniStats();
}

function showActiveFilters() {
    let activeFilters = document.querySelector("#activeFilters");
    activeFilters.innerHTML = "";
    let html = "";
    html+= `<div class="activeFilterContainer"><p class="activeFilter"><b>Mille järgi:</b> ${filter}</p>`;
    html+= `<p class="activeFilter"><b>Valitud väärtus:</b> ${selectedBy}</p>`;
    html+= `<p class="activeFilter"><b>Kuvatud väärtused:</b> ${selectedValues.join()}</p>`;
    for (let i = 0; i < selectedFilters.length; i++) {
        html+= `<p class="activeFilter"><b>Kitsendus(${selectedFilters[i].filter}):</b> ${selectedFilters[i].data.join()}</p>`;
    }
    html+= `</div>`

    document.querySelector("#activeFilters").insertAdjacentHTML( 'beforeend', html );
}

async function fetchAvailableValues() {
    let result;
    availableValues = [];
    try {
        result = await $.ajax({
            url: "/api/texts/getAvailableValues",
            type: "GET",
            data: { pName: filter},
        });

        // turn available value data to list
        JSON.parse(result).forEach((e) => {
            if (e.value == "") {
                availableValues.push("TUNDMATU");
            } else {
                availableValues.push(e.value
                    .replace(/y/g, "ü").charAt(0).toUpperCase() + e.value.slice(1));
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchAvailableDetailedValues(filtered) {
    let result;
    returned = [];
    try {
        result = await $.ajax({
            url: "/api/texts/getAvailableValues",
            type: "GET",
            data: { pName: filtered},
        });

        // turn available value data to list
        JSON.parse(result).forEach((e) => {
            if (e.value == "") {
                returned.push("TUNDMATU");
            } else {
                returned.push(e.value
                    .replace(/y/g, "ü").charAt(0).toUpperCase() + e.value.slice(1));
            }
        });
        return returned;
    } catch (error) {
        console.error(error);
        return ["ERROR"]
    }
}

// Echarts code
function loadStats(data) {

    let ages = []
    let filterData = data.sort(function(a, b){
        return b[selectedBy] - a[selectedBy];
    });;

    // filter gained data
    filterData.forEach((e) => {
        if (e.value == "") {
            ages.push("TUNDMATU");
        } else {
            ages.push(e.value
                .replace(/y/g, "ü")
                .toUpperCase());
        }
    });

    // set categories for chart
    let chartData = [];
    filterData.forEach((e) => {
        chartData.push(e[selectedBy]);
    });

    // initialize chart
    let chartDom = document.getElementById('alamkorpused');
    let myChart = echarts.init(chartDom);
    myChart.clear()
    let option;

    // colors
    let colors = ['#5470C6', '#0e6e21', '#EE6666', '#411561',
        '#61154a', '#8a3c0c'];

    // responsive width
    $(window).on('resize', function () {
        myChart.resize();
    });

    // chart settings
    option = {
        title: {
            text: title,
            show: true,
            x: 'center',
            textStyle: {
                fontSize: 22,
                fontFamily: 'Merriweather'
            }
        },
        color: colors,
        calculatable: true,

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },

        grid: {
            containLabel: true,
            width: "auto",
        },
        toolbox: {
            show: true,
            left: "center",
            bottom: "bottom",
            color: '#333',
            itemSize: 30,
            itemGap: 35,
            feature: {
                dataView: { show: true, readOnly: true, title: "Andmed" },
                saveAsImage: { show: true, title: "Laadi alla", color: "red" },
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ages,
                axisLabel: {
                    color: '#333',
                    interval: 0,
                    rotate: 45,
                },
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                position: 'left'
            },
            {
                type: 'value',
                name: beautifySelected,
                position: 'left'
            },
            {
                type: 'value',
                name: beautifySelected,
                position: 'left'
            },
            {
                type: 'value',
                name: beautifySelected,
                position: 'left'
            },
            {
                type: 'value',
                position: 'left',
                name: beautifySelected,
            },
            {
                type: 'value',
                name: beautifySelected,
                position: 'left'
            }
        ],
        series: [
            {
                name: selectedBy,
                type: 'bar',
                yAxisIndex: 1,
                data: chartData,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                      }
                  }
            }
        ]
    };

    option && myChart.setOption(option);

    let normalOn = false;

    //-----------------TABELI RESIZEMINE----------------//
    accsesebility.addEventListener("click", () => {
        if (normalOn) {
            normal.disabled = false;
            secondary.disabled = true;
            chartDom.style.width = (window.innerWidth-450)+'px';
            chartDom.style.height = (window.innerHeight-800)+'px';
            accsesebility.style.color = 'rgb(105, 173, 105';
            $("#alamkorpused.echarts").attr({"style":"width: 100%;height: 700px;"})
            normalOn = false;
            
        } else  {
            normal.disabled = true;
            secondary.disabled = false;
            chartDom.style.width = (window.innerWidth-450)+'px';
            chartDom.style.height = (window.innerHeight-900)+'px';
            accsesebility.style.color = 'rgb(37, 63, 47)';
            $("#alamkorpused.echarts").attr({"style":"width: 100%;height: 980px;"})
            normalOn = true;
        }
        
        myChart.resize();
    });
}











function loadPie(data) {
    let ages = []
    let filterData = data;

    // filter gained data
    filterData.forEach((e) => {
        if (e.value == "") {
            ages.push("TUNDMATU");
        } else {
            ages.push(e.value
                .replace(/y/g, "ü")
                .toUpperCase());
        }
    });

    // set categories for chart
    let percent = [];
    let texts = [];
    let words = [];
    let sentences = [];
    let errors = [];
    let errorTypes = [];
    filterData.forEach((e) => {
        percent.push(parseFloat(e.protsent).toFixed(2));
        texts.push(e.tekste);
        words.push(e.sonu);
        sentences.push(e.lauseid);
        errors.push(e.vigu);
        errorTypes.push(e.veatyype);
    });

    // initialize chart
    let chartDom = document.getElementById('alamkorpused');
    let myChart = echarts.init(chartDom);
    myChart.clear()
    let option;

    // responsive width
    $(window).on('resize', function () {
        myChart.resize();
    });

    // chart settings
    option = {
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            left: "center",
            bottom: "bottom",
            color: '#333',
            itemSize: 30,
            itemGap: 100,
            feature: {
                dataView: { show: true, readOnly: true, title: "Andmed" },
                saveAsImage: { show: true, title: "Laadi alla", color: "red" }
            }
        },
        series: [
            {
                name: 'Protsent',
                type: 'pie',
                radius: '70%',
                data: [
                    {value: percent[0], name: ages[0]},
                    {value: percent[1], name: ages[1]},
                    {value: percent[2], name: ages[2]},
                    {value: percent[3], name: ages[3]},
                    {value: percent[4], name: ages[4]}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // WHAT MONSTROSITY IS THIS, HANS??!
    filter = document.querySelector("#selectedValue").value;
    switch (filter) {
        case "vigu":
            option = {
                title: {
                    text: title,
                    show: true,
                    left: 'center',
                    textStyle: {
                        fontSize: 22,
                        fontFamily: 'Merriweather'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: true,
                    left: "center",
                    bottom: "bottom",
                    color: '#333',
                    itemSize: 30,
                    itemGap: 100,
                    feature: {
                        dataView: { show: true, readOnly: true, title: "Andmed" },
                        saveAsImage: { show: true, title: "Laadi alla", color: "red" }
                    }
                },
                series: [
                    {
                        name: 'Vigu',
                        type: 'pie',
                        radius: '70%',
                        data: [
                            {value: errors[0], name: ages[0]},
                            {value: errors[1], name: ages[1]},
                            {value: errors[2], name: ages[2]},
                            {value: errors[3], name: ages[3]},
                            {value: errors[4], name: ages[4]}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            break;
        case "lauseid":
            option = {
                title: {
                    text: title,
                    show: true,
                    left: 'center',
                    textStyle: {
                        fontSize: 22,
                        fontFamily: 'Merriweather'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: true,
                    left: "center",
                    bottom: "bottom",
                    color: '#333',
                    itemSize: 30,
                    itemGap: 100,
                    feature: {
                        dataView: { show: true, readOnly: true, title: "Andmed" },
                        saveAsImage: { show: true, title: "Laadi alla", color: "red" }
                    }
                },
                series: [
                    {
                        name: 'Lauseid',
                        type: 'pie',
                        radius: '70%',
                        data: [
                            {value: sentences[0], name: ages[0]},
                            {value: sentences[1], name: ages[1]},
                            {value: sentences[2], name: ages[2]},
                            {value: sentences[3], name: ages[3]},
                            {value: sentences[4], name: ages[4]}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            break;
        case "sonu":
            option = {
                title: {
                    text: title,
                    show: true,
                    left: 'center',
                    textStyle: {
                        fontSize: 22,
                        fontFamily: 'Merriweather'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: true,
                    left: "center",
                    bottom: "bottom",
                    color: '#333',
                    itemSize: 30,
                    itemGap: 100,
                    feature: {
                        dataView: { show: true, readOnly: true, title: "Andmed" },
                        saveAsImage: { show: true, title: "Laadi alla", color: "red" }
                    }
                },
                series: [
                    {
                        name: 'Sõnu',
                        type: 'pie',
                        radius: '70%',
                        data: [
                            {value: words[0], name: ages[0]},
                            {value: words[1], name: ages[1]},
                            {value: words[2], name: ages[2]},
                            {value: words[3], name: ages[3]},
                            {value: words[4], name: ages[4]}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            break;
        case "tekste":
            option = {
                title: {
                    text: title,
                    show: true,
                    left: 'center',
                    textStyle: {
                        fontSize: 22,
                        fontFamily: 'Merriweather'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: true,
                    left: "center",
                    bottom: "bottom",
                    color: '#333',
                    itemSize: 30,
                    itemGap: 100,
                    feature: {
                        dataView: { show: true, readOnly: true, title: "Andmed" },
                        saveAsImage: { show: true, title: "Laadi alla", color: "red" }
                    }
                },
                series: [
                    {
                        name: 'Tekste',
                        type: 'pie',
                        radius: '70%',
                        data: [
                            {value: texts[0], name: ages[0]},
                            {value: texts[1], name: ages[1]},
                            {value: texts[2], name: ages[2]},
                            {value: texts[3], name: ages[3]},
                            {value: texts[4], name: ages[4]}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            break;
    }

    option && myChart.setOption(option);
    filter = document.querySelector("#filterBy").value;

    //-----------------TABELI RESIZEMINE----------------//
    let normalOn = false;
    accsesebility.addEventListener("click", () => {
        if (normalOn) {
            normal.disabled = false;
            secondary.disabled = true;
            chartDom.style.width = (window.innerWidth-450)+'px';
            chartDom.style.height = (window.innerHeight-800)+'px';
            accsesebility.style.color = 'rgb(105, 173, 105';
            $("#alamkorpused.echarts").attr({"style":"width: 100%;height: 700px;"})
            normalOn = false;
        
        } else  {
            normal.disabled = true;
            secondary.disabled = false;
            chartDom.style.width = (window.innerWidth-450)+'px';
            chartDom.style.height = (window.innerHeight-900)+'px';
            accsesebility.style.color = 'rgb(37, 63, 47)';
            $("#alamkorpused.echarts").attr({"style":"width: 100%;height: 980px;"})
            normalOn = true;
        }
    
        myChart.resize();
    });
}