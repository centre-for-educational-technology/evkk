import React, {useState} from 'react';
import TextUploadModal from "./TextUploadModal";
import "../styles/TextUpload.css";
import {Button, Grid, Tooltip} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useTranslation} from "react-i18next";
import "../../../translations/i18n";

function TextUpload(props) {

  const formDataElement = React.createRef();
  const fileNameElement = React.createRef();
  const text1Element = React.createRef();

  const [buttonPopup, setButtonPopup] = useState(false);

  const {t} = useTranslation();

  function fileUpload() {
    let oData = new FormData(formDataElement.current);
    const request_test = {
      method: "POST",
      body: oData
    }

    fetch("/api/textfromfile", request_test)
      .then(response => response.text())
      .then(data => {
        props.sendTextFromFile(data);

      });
    fileNameElement.current.textContent = "";
  }

  function filechange() {
    fileNameElement.current.textContent = "";
    let br = document.createElement("br");
    let b = document.createElement("b");
    let div = document.createElement("div");
    let fileNameDataContent = document.createTextNode(t("textupload_chosen_files"));
    b.appendChild(fileNameDataContent);
    div.appendChild(b);
    div.appendChild(br);

    let file_length = text1Element.current.files.length;
    for (let i = 0; i < file_length; i++) {
      let eachBr = document.createElement("br");
      let temp_name = document.createTextNode(text1Element.current.files[i].name);
      div.appendChild(temp_name);
      div.appendChild(eachBr);
    }

    fileNameElement.current.appendChild(div);
  }

  return (
    <div className='container'>
      <Tooltip title={"Lae tekst ülesse."} placement={"top-start"}>
        <FileUploadIcon id="upload_button"
                        value="Vali tekst(id)"
                        className="buttonFail"
                        onClick={() => {
                          setButtonPopup(true)
                        }}
                        style={{height: 30, width: 30, cursor: "pointer", margin: "0 0 1rem -.25rem"}}/>
      </Tooltip>
      <TextUploadModal trigger={buttonPopup}>
        <form encType="multipart/form-data"
              method="post"
              id='form_data'
              ref={formDataElement}>
          <div id='popup_1'>
            <Grid container
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                  direction="column">
              <Grid item
                    xs={12}>
                <h1 id="pop_title">{t("textupload_title")}</h1>
              </Grid>
              <Button className="close-btn"
                      id="close"
                      onClick={() => {
                        setButtonPopup(false)
                      }}
                      style={{paddingTop: ".85rem"}}>X</Button>
              <Grid item
                    xs={12}>
                <Button component="label"
                        htmlFor='text_1'
                        variant="contained">{t("textupload_choose_files")}</Button>
              </Grid>
              <Grid item
                    xs={12}>
                <div id="file_name"
                     style={{height: "150px", width: "500px", textAlign: "center"}}
                     ref={fileNameElement}></div>
              </Grid>
              <Grid item
                    xs={12}>
                <Button type='button'
                        variant="contained"
                        onClick={() => {
                          setButtonPopup(false)
                        }}
                        onMouseDown={fileUpload}>{t("textupload_upload")}</Button>
              </Grid>
              <input style={{visibility: "hidden"}}
                     type="file"
                     name="file"
                     id="text_1"
                     onChange={filechange}
                     title="your text"
                     multiple={true}
                     accept=".txt,.pdf,.docx,.doc,.odt"
                     ref={text1Element}></input>
            </Grid>
          </div>
        </form>
      </TextUploadModal>
    </div>
  )
}

export default TextUpload;
