import React, {useState} from 'react';
import TextUploadModal from "./TextUploadModal";
import "../styles/TextUpload.css";
import {Button, Grid} from "@mui/material";
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
        let br = document.createElement("br");
        let b = document.createElement("b");
        let div = document.createElement("div");
        let fileNameDataContent = document.createTextNode("Valitud failid:");
        b.appendChild(fileNameDataContent);
        div.appendChild(b);
        div.appendChild(br);

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
                <FileUploadIcon id="upload_button" value="Vali tekst(id)" className="buttonFail" onClick={() => {setButtonPopup(true)}} style={{height: 30, width: 30, cursor: "pointer", margin: "0 0 1rem -.25rem" }} />
                <TextUploadModal trigger={buttonPopup}>
                    <form encType="multipart/form-data" method="post" id='form_data'>
                        <div id='popup_1'>
                            <Grid container spacing={2} alignItems="center" justifyContent="space-between" direction="column">
                                <Grid item xs={12}>
                                    <h1 id="pop_title">Vali tekst</h1>
                                </Grid>
                                <Button className="close-btn" id="close" onClick={() => {setButtonPopup(false)}} style={{paddingTop: ".85rem"}}>X</Button>
                                <Grid item xs={12}>
                                    <Button component="label" htmlFor='text_1' variant="contained">Vali failid</Button>
                                </Grid>
                                <Grid item xs={12} >
                                    <div id="file_name" style={{ height: "150px", width: "500px", textAlign: "center"}}></div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='button' variant="contained" style={{ position: "absolute", top: "85%", left: "38%"}} onClick={() => {setButtonPopup(false)}} onMouseDown={fileUpload}>Laadi failid üles</Button>
                                </Grid>
                                <input style={{visibility:"hidden"}} type="file" name="file" id="text_1" onChange={filechange} title="your text" multiple={true} accept=".txt,.pdf,.docx,.doc,.odt"></input>
                                </Grid>
                        </div>
                    </form>
                </TextUploadModal>
            </div>
        )
}
export default TextUpload;