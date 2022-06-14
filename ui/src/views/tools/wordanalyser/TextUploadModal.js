import React, {useState} from "react";
import "./styles/TextUpload.css";

function TextUploadModal(props) {
    var load_popup = true;
    return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            {props.children }
            
        </div>
    </div>) : ""
}
export default TextUploadModal