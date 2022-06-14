import React, {Component, useEffect, useState} from 'react';
import TextUploadModal from "./TextUploadModal";
import "../styles/TextUpload.css";
import {Button} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
function TextUpload(props) {
    const [buttonPopup, setButtonPopup] = useState(false);

    function fileUpload(){
        let data_input = document.getElementById("form_data");
        let oData = new FormData(data_input);
        const request_test = {
            method: "POST",
            body: oData
        }

        fetch("/api/textfromfile", request_test)
        .then(response => response.text())
        .then(data => {
            props.sendTextFromFile(data);
        });
        document.getElementById("file_name").innerHTML = "";

    }

    function filechange(){
        var fileNameData = document.getElementById("file_name");
        fileNameData.textContent = "";
        let div = document.createElement("div");
        let fileNameDataContent = document.createTextNode("Valitud failid:");
        fileNameData.appendChild(fileNameDataContent);

        let file_length = document.getElementById("text_1").files.length;
        for(let i = 0; i<file_length; i++){
            let eachBr = document.createElement("br");
            let temp_name = document.createTextNode(document.getElementById("text_1").files[i].name);
            div.appendChild(temp_name);
            div.appendChild(eachBr);
        }
        fileNameData.appendChild(div);
    }
    
        return(
            <div className='container'>
                <input type="image" id="upload_button" value="Vali tekst(id)" class="buttonFail" onClick={() => {setButtonPopup(true)}} style={{height: 30, width: 30}} ata-testid="FileUploadIcon"/>
                <TextUploadModal trigger={buttonPopup}>
                    <form encType="multipart/form-data" method="post" id='form_data'>
                        <div id='popup_1'>
                            <h1 id="pop_title">Vali tekst üleslaadimiseks</h1>
                            <Button className="close" class="close-btn" onClick={() => {setButtonPopup(false)}}> X</Button>
                            <Button component="label" htmlFor='text_1' id="pickfile"> vali fail</Button>
                            <label id="file_name" ></label>
                            <input style={{visibility:"hidden"}} type="file" name="file" id="text_1"onChange={filechange} title="your text" multiple={true} accept=".txt,.pdf,.docx,.doc,.odt"></input>
                            <Button type='button' id="upload" onClick={() => {setButtonPopup(false)}} onMouseDown={fileUpload} >Lae fail ules</Button>
                        </div>
                    </form>
                </TextUploadModal>
            </div>
        )
}
export default TextUpload;