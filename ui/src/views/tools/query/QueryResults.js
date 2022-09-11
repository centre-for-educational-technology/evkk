import React, {useState} from "react";
import {Box, ListItemButton, ListItemText, Modal} from "@mui/material";

function QueryResults(props) {

  const data = props.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [previewId, setPreviewId] = useState('');

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  function previewText(id) {
    setPreviewId(id);
    setModalOpen(true);
  }

  return (
    <>
      {data.length > 0 ? <h4><strong>Leitud tekste:</strong> {data.length}</h4> : <></>}
      <br/>
      {data.map((e) => (
        <ListItemButton
          key={e.text_id}
          onClick={() => previewText(e.text_id)}
        >
          <ListItemText primary={e.property_value}/>
        </ListItemButton>
      ))}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
      >
        <Box style={modalStyle}>
          <div id="modal-modal-title">
            pealkiri
          </div>
          <div id="modal-modal-description">
            teksti id: {previewId}
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default QueryResults;
