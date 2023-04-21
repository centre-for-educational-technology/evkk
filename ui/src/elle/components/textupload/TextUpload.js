import { createRef, useState } from 'react';
import TextUploadModal from './TextUploadModal';
import '../styles/TextUpload.css';
import { Alert, Button, Grid, Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useTranslation } from 'react-i18next';
import '../../translations/i18n';

function TextUpload(props) {

  const [showError, setShowError] = useState(false);
  const formDataElement = createRef();
  const fileNameElement = createRef();
  const text1Element = createRef();
  const [buttonPopup, setButtonPopup] = useState(false);
  const {t} = useTranslation();

  function fileUpload() {
    let formData = new FormData(formDataElement.current);
    const requestBody = {
      method: 'POST',
      body: formData
    };

    fetch('/api/textfromfile', requestBody)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        return Promise.reject(response);
      })
      .then(response => {
        props.sendTextFromFile(response);
        setShowError(false);
      })
      .catch(() => {
        props.sendTextFromFile('');
        setShowError(true);
      });
    fileNameElement.current.textContent = '';
  }

  function fileChange() {
    fileNameElement.current.textContent = '';
    let br = document.createElement('br');
    let b = document.createElement('b');
    let div = document.createElement('div');
    let fileNameDataContent = document.createTextNode(t('textupload_chosen_files'));
    b.appendChild(fileNameDataContent);
    div.appendChild(b);
    div.appendChild(br);

    let fileLength = text1Element.current.files.length;
    for (let i = 0; i < fileLength; i++) {
      let brElement = document.createElement('br');
      let tempName = document.createTextNode(text1Element.current.files[i].name);
      div.appendChild(tempName);
      div.appendChild(brElement);
    }

    fileNameElement.current.appendChild(div);
  }

  return (
    <>
      {showError &&
        <span>
          <Alert severity="error">{t('error_file_upload_failed')}</Alert>
          <br/>
        </span>
      }
      <div className="container">
        <Tooltip title={t('textupload_tooltip')} placement={'top-start'}>
          <FileUploadIcon id="upload_button"
                          className="button-file"
                          onClick={() => {
                            setButtonPopup(true);
                          }}
          />
        </Tooltip>
        <TextUploadModal trigger={buttonPopup}>
          <form encType="multipart/form-data"
                method="post"
                id="form_data"
                ref={formDataElement}>
            <div id="popup_1">
              <Grid container
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    direction="column">
                <Grid item
                      xs={12}>
                  <h1 id="pop_title">{t('textupload_title')}</h1>
                </Grid>
                <Button className="close-btn"
                        id="close"
                        onClick={() => {
                          setButtonPopup(false);
                        }}
                        style={{paddingTop: '.85rem'}}>X</Button>
                <Grid item
                      xs={12}>
                  <Button component="label"
                          htmlFor="text_1"
                          variant="contained">{t('textupload_choose_files')}</Button>
                </Grid>
                <Grid item
                      xs={12}>
                  <div id="file_name"
                       style={{height: '150px', width: '500px', textAlign: 'center'}}
                       ref={fileNameElement}></div>
                </Grid>
                <Grid item
                      xs={12}>
                  <Button type="button"
                          variant="contained"
                          onClick={() => {
                            setButtonPopup(false);
                          }}
                          onMouseDown={fileUpload}>{t('textupload_upload')}</Button>
                </Grid>
                <input style={{visibility: 'hidden'}}
                       type="file"
                       name="file"
                       id="text_1"
                       onChange={fileChange}
                       multiple={true}
                       accept=".txt,.pdf,.docx,.doc,.odt"
                       ref={text1Element}></input>
              </Grid>
            </div>
          </form>
        </TextUploadModal>
      </div>
    </>
  );
}

export default TextUpload;
