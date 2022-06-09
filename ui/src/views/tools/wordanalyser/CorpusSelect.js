import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Checkbox, Button, Alert } from "@mui/material";

function CorpusSelect() {

    const history = useHistory();

    const [corpusCheckboxStatus, setCorpusCheckboxStatus] = useState({
        all: false,
        cFqPphvYi: false,
        clWmOIrLa: false,
        cFOoRQekA: false,
        cYDRkpymb: false,
        cgSRJPKTr: false,
        cZjHWUPtD: false,
        cwUSEqQLt: false
    });

    const [alert, setAlert] = useState(false);

    function submitted() {
        let selectedCorpuses = [];
        Object.entries(corpusCheckboxStatus).forEach((entry) => {
            const [key, value] = entry;
            if (value && key !== "all") {
                selectedCorpuses.push(key);
            }
        });
        if (selectedCorpuses.length === 0) {
            setAlert(true);
        } else {
            history.push({
                pathname: "/tools/wordanalyser/corpus/text",
                state: { corpuses: selectedCorpuses }
            });
        }
    }

    const alterCorpusCheckbox = (event) => {
        let newCorpusCheckboxStatus = {...corpusCheckboxStatus};
        let trueCount = 0;
        newCorpusCheckboxStatus[event.target.id] = event.target.checked;
        Object.entries(newCorpusCheckboxStatus).forEach((entry) => {
            const [key, value] = entry;
            if (value && key !== "all") {
                trueCount++;
            }
        });
        if (trueCount === 7) {
            newCorpusCheckboxStatus.all = true;
        } else {
            newCorpusCheckboxStatus.all = false;
        }
        setCorpusCheckboxStatus(newCorpusCheckboxStatus);
    }

    const alterAllCorpusCheckboxes = (event) => {
        let newCorpusCheckboxStatus = {...corpusCheckboxStatus};
        for (let checkbox in newCorpusCheckboxStatus) {
            newCorpusCheckboxStatus[checkbox] = event.target.checked;
        }
        setCorpusCheckboxStatus(newCorpusCheckboxStatus);
    }

    return (
        <div className={"container"}>
            {alert ? <div><Alert severity="error">Vali vähemalt üks korpus!</Alert><br/></div> : <></>}
            <h2><strong>Eesti vahekeele korpus</strong></h2>
            <br/>
            <p style={{ fontSize: "large" }}>Korpus(t)e valik</p>
            <br/>
            <Checkbox
                checked={corpusCheckboxStatus.all}
                onChange={alterAllCorpusCheckboxes}
            />
            <label>kõik</label>
            <br/>
            <Checkbox
                id="cFqPphvYi"
                checked={corpusCheckboxStatus.cFqPphvYi}
                onChange={alterCorpusCheckbox}
            />
            <label>
            K2 olümpiaadi tööd
            </label>
            <br/>
            <Checkbox
                id="clWmOIrLa"
                checked={corpusCheckboxStatus.clWmOIrLa}
                onChange={alterCorpusCheckbox}
            />
            <label>
                K2 tasemeeksamite tekstid
            </label>
            <br/>
            <Checkbox
                id="cFOoRQekA"
                checked={corpusCheckboxStatus.cFOoRQekA}
                onChange={alterCorpusCheckbox}
            />
            <label>
                    K2 tuumkorpus
            </label>
            <br/>
            <Checkbox
                id="cYDRkpymb"
                checked={corpusCheckboxStatus.cYDRkpymb}
                onChange={alterCorpusCheckbox}
            />
            <label>
                K1 eesti keel
            </label>
            <br/>
            <Checkbox
                id="cgSRJPKTr"
                checked={corpusCheckboxStatus.cgSRJPKTr}
                onChange={alterCorpusCheckbox}
            />
            <label>
                K1 vene keel
            </label>
            <br/>
            <Checkbox
                id="cZjHWUPtD"
                checked={corpusCheckboxStatus.cZjHWUPtD}
                onChange={alterCorpusCheckbox}
            />
            <label>
                K3 vene keel
            </label>
            <br/>
            <Checkbox
                id="cwUSEqQLt"
                checked={corpusCheckboxStatus.cwUSEqQLt}
                onChange={alterCorpusCheckbox}
            />
            <label>
                Akadeemiline õppijakeel
            </label>
            <br/><br/><br/>
            <Button variant="contained" onClick={() => {submitted()}}>Salvesta ja jätka</Button>
        </div>
    );
}

export default CorpusSelect;