import React, {Component, useEffect, useState} from 'react';
import TextUploadModal from "./TextUploadModal";
import "../styles/TextUpload.css";
function TextUpload() {
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
            document.getElementById("vastus").innerHTML = data;
        });
        //console.log(document.getElementById("text_1").value);
        document.getElementById("file_name").innerHTML = "";

    }

    function filechange(){
        console.log(document.getElementById("text_1").files[0].name);
        document.getElementById("file_name").innerHTML = "";
        let file_length = document.getElementById("text_1").files.length;
        for(let i = 0; i<file_length; i++){
            document.getElementById("file_name").innerHTML += document.getElementById("text_1").files[i].name
            document.getElementById("file_name").innerHTML += "<br>"
        }
    }
    
        return(
            <div className='container'>
                <input type="image" id="upload_button" value="Vali tekst(id)" className="buttonFail" onClick={() => {setButtonPopup(true)}} style={{height: 30, width: 30}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAQlBMVEX///8AAADc3NyUlJSGhoZTU1Pw8PAYGBjl5eX09PQ9PT329vb7+/s5OTlCQkI7Ozs1NTVKSkorKyuOjo5eXl5wcHD3NdmMAAACmklEQVR4nO3dgVbiMBCFYbO6q6VVUNb3f9VdrEUDKYQ2ydzE/3sATu7JTGcq5+DdHQAAAAAAAAAAwM80/B2sj5BXv3W7zvoQOfUvzrlNwxGHrTt4brZQh40bPffWR8mjmwI6t22yUD96cLJp8BY/e3DSXi/2G+drrRe7F3eqraFxdoMfj5uGbnEIBWypF/ttMOD/iI0Uan/eg2314jB3gwe7Bgo1+JD5VqjVP266ywHrX+Au9OCxF6u+xZkxcVKoFffi7JhopRcDq9pMoVbai1ElWvMt3hCwzl68MgfPIlZXqBFjwlfb0Li4qoXVtcDdWKKjmh430WPCV8/QuLkHjxErucWbxoSvjqERuaqF1fC1zeISHen34ooSHakX6uqA6kPj6ht9DOW3/pU9ONEdGgtWtTDVXly0qs1ElLzFhatamOLQSHiDB3pf2yQYEz61Xly1qoVpLXCJxoRPqReTjQmfzlt/4ofMF5WhkWRVC9NY4LL04ERhgUs+Jnz2QyPDmDiJaHyLSVe1MNuhkblER5YLXJGAlr2YbQ6eRTQq1KxjwmfTi5lWtTCLBa5YiY7KD40CY8JXulAL9uAxYtFbLDQmfCWHRvZVLWxX7BYNSnRUqhdNSnRUplANA5YZGhnf6KMiZi9U44AFIr6//r7ubeHp3yI++/U9c8IoDwsTPlgfPBoJSaiPhCTUR0IS6iMhCfWRkIT6SEhCfSQkoT4SklAfCUmoj4Qk1EdCEuojIQn1kZCE+khIQn0kJKE+EpJQHwlJqI+EJNS3d49LuL31waP1f5YR+BEMAAAAAAB+iOGXvby/4PK08G9MKT2RkIQkNEdCEpLQHglJSEJ7JCQhCe2RcJ1uf29tL/F/SwAAAAAAAAAAAAAAAEL+AckuO4NI0tv7AAAAAElFTkSuQmCC"/>
                <TextUploadModal trigger={buttonPopup}>
                    <form encType="multipart/form-data" method="post" id='form_data'>
                        <div id='popup_1'>
                            <h1 id="pop_title">Vali tekst üleslaadimiseks</h1>
                            <span className="close-btn" onClick={() => {setButtonPopup(false)}}> X</span>
                            <label htmlFor='text_1' id="pickfile"> vali fail</label>
                            <label id="file_name" ></label>
                            <input style={{visibility:"hidden"}} type="file" name="file" id="text_1"onChange={filechange} title="your text" multiple={true} class="button" accept=".txt,.pdf,.docx,.doc,.odt"/>
                            <span type='button' id="upload" onClick={() => {setButtonPopup(false)}} onMouseDown={fileUpload} >Lae fail ules</span>
                        </div>
                    </form>
                </TextUploadModal>
            </div>
        )
}
export default TextUpload;