import React, { createRef, useState } from 'react';
import './styles/TextUpload.css';
import { Box, Button, Grid, IconButton, Modal, Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useTranslation } from 'react-i18next';
import '../translations/i18n';
import CloseIcon from '@mui/icons-material/Close';
import { loadFetch } from '../service/LoadFetch';

function TextUpload({sendTextFromFile}) {

  const [modalOpen, setModalOpen] = useState(false);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);
  const formDataElement = createRef();
  const fileNameElement = createRef();
  const text1Element = createRef();
  const {t} = useTranslation();

  function fileUpload() {
    let formData = new FormData(formDataElement.current);
    const requestBody = {
      method: 'POST',
      body: formData
    };

    loadFetch('/api/textfromfile', requestBody)
      .then(res => res.text())
      .then(response => {
        sendTextFromFile(response);
      })
      .catch(() => {
        sendTextFromFile('');
      });

    setUploadButtonDisabled(true);
    fileNameElement.current.textContent = '';
    setModalOpen(false);
  }

  function fileChange() {
    fileNameElement.current.textContent = '';
    let br = document.createElement('br');
    let b = document.createElement('b');
    let div = document.createElement('div');
    let fileNameDataContent = document.createTextNode(t('textupload_secondary_modal_chosen_files'));
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

    setUploadButtonDisabled(false);
    fileNameElement.current.appendChild(div);
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40em',
    bgcolor: '#FCFCFC',
    boxShadow: 24,
    borderRadius: '12px',
    p: 4,
    height: '28em',
    overflow: 'auto'
  };

  return (
    <>
      <div className="container">
        <Tooltip title={t('textupload_secondary_modal_tooltip')} placement={'top-start'}>
          <FileUploadIcon id="upload_button"
                          className="button-file"
                          onClick={() => {
                            setModalOpen(true);
                          }}
          />
        </Tooltip>
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={() => {
                setModalOpen(false);
              }}
              className="closeButton"
            >
              <CloseIcon/>
            </IconButton>
            <br/>
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
                    <h1 id="pop_title">{t('textupload_secondary_modal_title')}</h1>
                  </Grid>
                  <Grid item
                        xs={12}>
                    <Button component="label"
                            htmlFor="text_1"
                            variant="contained">{t('textupload_secondary_modal_choose_files')}</Button>
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
                              setModalOpen(false);
                            }}
                            disabled={uploadButtonDisabled}
                            onMouseDown={fileUpload}>{t('textupload_secondary_modal_upload')}</Button>
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
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default TextUpload;
