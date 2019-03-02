"use strict";

class app{
	constructor(){
		this.api = "http://localhost:4568/api/";
        this.initInputFields();
		this.bindEvents();
	}
	
	bindEvents(){
        this.grab("models").addEventListener("change", (e)=>{
            let value = e.target.options[e.target.selectedIndex].value;
            this.ajax("config/update/activeModel/" + value, "PUT");
        });
        this.grab("b_sd").addEventListener("change", (e)=>{
            let value = e.target.options[e.target.selectedIndex].value;
            this.ajax("config/update/trainingData/" + value, "PUT");
        });
        this.grab("b_tf").addEventListener("change", (e)=>{
            let value = e.target.checked;
            this.ajax("config/update/tf/" + value, "PUT");
        });
        this.grab("b_idf").addEventListener("change", (e)=>{
            let value = e.target.checked;
            this.ajax("config/update/idf/" + value, "PUT");
        });
        this.grab("b_owc").addEventListener("change", (e)=>{
            let value = e.target.checked;
            this.ajax("config/update/outputWordCounts/" + value, "PUT");
        });
        this.grab("b_lct").addEventListener("change", (e)=>{
            let value = e.target.checked;
            this.ajax("config/update/lowerCaseTokens/" + value, "PUT");
        });
        this.grab("b_na").addEventListener("change", (e)=>{
            let value = e.target.checked;
            this.ajax("config/update/normalizeAttributes/" + value, "PUT");
        });
        this.grab("b_momentum").addEventListener("change", (e)=>{
            let value = e.target.value;
            this.ajax("config/update/momentum/" + value, "PUT");
        });
        this.grab("b_lr").addEventListener("change", (e)=>{
            let value = e.target.value;
            this.ajax("config/update/learningRate/" + value, "PUT");
        });
        this.grab("b_wtk").addEventListener("change", (e)=>{
            let value = e.target.value;
            this.ajax("config/update/wordsToKeep/" + value, "PUT");
        });
        this.grab("b_hl").addEventListener("change", (e)=>{
            let value = e.target.value;
            this.ajax("config/update/hiddenLayers/" + value, "PUT");
        });
        this.grab("b_tt").addEventListener("change", (e)=>{
            let value = e.target.value;
            this.ajax("config/update/trainingTime/" + value, "PUT");
        });
        this.grab("b_ai").addEventListener("change", (e)=>{
            let value = e.target.value;
            this.ajax("config/update/attributeIndices/" + value, "PUT");
        });
        this.grab("submitPrediction").addEventListener("click", (e)=>{
            let text = this.grab("inputTA").value;
            let ngram = this.grab("ngram").checked;
            let fd = new FormData();
            fd.append("text", text);
            if(ngram){
                this.ajax("predictNgram", "POST", fd).then(data => {
                    this.grab("output").innerHTML = data;
                });
            }else{
                this.ajax("predictText", "POST", fd).then(data => {
                    this.grab("output").innerHTML = data;
                });
            }
        });
        this.grab("buildModel").addEventListener("click", (e)=>{
            let b_mn = this.grab("b_mn").value;
            let mname = b_mn.length == 0 ? "model-" + new Date().timestamp() : b_mn;
            this.grab("modelBuildQueue").innerHTML += "<tr id='"+mname+"'>"+
                "<td>"+mname+"</td>"+
                "<td id='"+mname+"_state'>Ehitamas</td>"+
                "<td id='"+mname+"_compt'>Puudub</td>"+
                "<td id='"+mname+"_close'>X</td>"+
                "</tr>";
            this.ajax("buildModel/" + mname, "GET").then(data => {
                this.grab(mname+"_state").innerHTML = "Valmis";
                this.grab(mname+"_compt").innerHTML = new Date().timestamp();
                this.grab(mname+"_close").addEventListener("click", this.closableModel);
                this.ajax("listModels", "GET").then(data => {
                    this.ajax("config/get/activeModel", "GET").then(sdata => {
                        let arr = data.replace(" ", "").replace("[", "").replace("]", "").split(",");
                        this.populateSelectTag(arr, "models", arr.indexOf(sdata.replace("/models/", "")));
                    });
                });
            });
        });
        
	}	
	
    initInputFields(){
        this.ajax("listModels", "GET").then(data => {
            this.ajax("config/get/activeModel", "GET").then(sdata => {
                let arr = data.replace(" ", "").replace("[", "").replace("]", "").split(",");
                this.populateSelectTag(arr, "models", arr.indexOf(sdata.replace("/models/", "")));
            });
        });
        this.ajax("listArffs", "GET").then(data => {
            this.ajax("config/get/trainingData", "GET").then(sdata => {
                let arr = data.replace(" ", "").replace("[", "").replace("]", "").split(",");
                this.populateSelectTag(arr, "b_sd", arr.indexOf(sdata.replace("/arff/", "")));
            });
        });
        this.ajax("config/get/tf", "GET").then(data => {
            this.grab("b_tf").checked = data == "true" ? true : false; 
        });
        this.ajax("config/get/idf", "GET").then(data => {
            this.grab("b_idf").checked = data == "true" ? true : false; 
        });
        this.ajax("config/get/outputWordCounts", "GET").then(data => {
            this.grab("b_owc").checked = data == "true" ? true : false;
        });
        this.ajax("config/get/momentum", "GET").then(data => {
            this.grab("b_momentum").value = data;
        });
        this.ajax("config/get/wordsToKeep", "GET").then(data => {
            this.grab("b_wtk").value = data;
        });
        this.ajax("config/get/hiddenLayers", "GET").then(data => {
            this.grab("b_hl").value = data;
        });
        this.ajax("config/get/trainingTime", "GET").then(data => {
            this.grab("b_tt").value = data;
        });
        this.ajax("config/get/learningRate", "GET").then(data => {
            this.grab("b_lr").value = data;
        });
        this.ajax("config/get/lowerCaseTokens", "GET").then(data => {
            this.grab("b_lct").checked = data == "true" ? true : false;
        });
        this.ajax("config/get/attributeIndices", "GET").then(data => {
            this.grab("b_ai").value = data;
        });
        this.ajax("config/get/normalizeAttributes", "GET").then(data => {
            this.grab("b_na").checked = data == "true" ? true : false;
        });
                
    }
    
    populateSelectTag(arr, id, selIndx = 0){
		let select = document.getElementById(id);
        select.innerHTML = "";
        for(let i = 0; i < arr.length; i++){
			let option = document.createElement("option");
			option.text = arr[i];
			select.add(option);
		}
        select.selectedIndex = selIndx;
	}
    
    closableModel(e){
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        e.target.removeEventListener("click", this.closableModel);
    }
    
	ajax(path, type, data = ""){
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(type, this.api + path);
			xhr.onload = () => resolve(xhr.response);		
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send(data);
		});
	}
    
	grab(id){
		return document.getElementById(id);
	}
}

new app();

Date.prototype.timestamp = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1,2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)

    return yyyy+"_"+MM+"_"+dd+"-"+hh+"_"+mm+"_"+ss;
};

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}