import React, {useState} from "react";
import "./upload.css";

function Modal(props) {
    var load_popup = true;
    return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            {props.children }
            
        </div>
    </div>) : ""
}
export default Modal