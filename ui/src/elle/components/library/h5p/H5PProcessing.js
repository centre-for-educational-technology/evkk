//algeline allalaadimise ja ümbertöötlemise asi - Sten

import { saveAs } from 'file-saver'

const correctUrl = 'https://sisuloome.e-koolikott.ee/node/';
const ext = '.h5p';
let id = 0;
let exportUrl;

export function getH5PFile(url) {
    try {
        if(url.includes(correctUrl)){
            exportUrl = "https:\/\/sisuloome.e-koolikott.ee\/sites\/default\/files\/h5p\/exports\/interactive-content-" //eslint-disable-line
            id = url.substring(38);
            exportUrl = exportUrl + id + ext;
            //console.log(id, exportUrl);
            return exportUrl;
        }
        else{
            console.log("vale link!")
        }

    }
    catch (err) {
        return new Error(err, 400)
    }
};


export function uploadH5PFile(){ // no clue miks ei funka, midagi kas asynci tõttu või fetch ei lähe läbi, kuna POST ei lähe läbi
    return async () => {
        const h5p_fetch = await fetch(exportUrl);
        if(!h5p_fetch.ok) throw new Error("Viga", h5p_fetch.statusText);

        const h5p_fetch_buffer = await h5p_fetch.arrayBuffer();

        const res =  await fetch('http://localhost:9090/api/h5p-parse', {
            method: 'POST',
            headers: { 'content-type': 'application/octet-stream' },
            body: h5p_fetch_buffer
        })
        if (!res.ok) throw new Error('Backend failed');

        const data = await res.json();
        saveAs(new Blob([JSON.stringify(data, null, 2)], {type: "application/json"}), `./storage/${id}.json`);
        console.log("Parsed:", data);
    }
}