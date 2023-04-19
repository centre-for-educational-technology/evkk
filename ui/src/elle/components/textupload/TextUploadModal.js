import React from 'react';
import '../styles/TextUpload.css';

function TextUploadModal(props) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
      </div>
    </div>) : ""
}

export default TextUploadModal
