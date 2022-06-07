import React, { useState } from "react";
import { Button, Checkbox, FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';
import "../styles/Query.css";

function Query() {

    const selectWidth = 180;
    const yearNow = new Date().getFullYear();
    const defaultAddedYear = [(yearNow - 7), (yearNow - 2)];

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

    const [textData, setTextData] = useState({
        type: 'teadmata',
        language: 'eesti',
        level: 'teadmata',
        usedMaterials: 'teadmata',
        addedYear: [],
        characters: '',
        words: '',
        sentences: ''
    });

    const [authorData, setAuthorData] = useState({
        age: 'teadmata',
        gender: 'teadmata',
        education: 'teadmata',
        nativeLang: 'teadmata',
        country: 'teadmata'
    });

    function submitted() {
        console.log(corpusCheckboxStatus);
        console.log(textData);
        console.log(authorData);
    }

    const alterCorpusCheckbox = (event) => {
        let newCorpusCheckboxStatus = {...corpusCheckboxStatus};
        let trueCount = 0;
        newCorpusCheckboxStatus[event.target.id] = event.target.checked;
        for (let checkbox in newCorpusCheckboxStatus) {
            console.log(checkbox.value);
            if (checkbox.value && checkbox !== "all") {
                trueCount++;
            }
        }
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

    const alterTextData = (event) => {
        let newTextData = {...textData};
        newTextData[event.target.name] = event.target.value;
        setTextData(newTextData);
    }

    const alterAuthorData = (event) => {
        let newAuthorData = {...authorData};
        newAuthorData[event.target.name] = event.target.value;
        setAuthorData(newAuthorData);
    }

    const alterSliderCheckbox = (event) => {
        let newTextData = {...textData};
        if (event.target.checked) {
            if (event.target.id === 'addedYear') {
                newTextData[event.target.id] = defaultAddedYear;
            }
        } else {
            if (event.target.id === 'addedYear') {
                newTextData[event.target.id] = [];
            }
        }
        console.log(newTextData);
        setTextData(newTextData);
    }

    return (
        <div className={"container"}>
            <form action="" onSubmit={(e) => {e.preventDefault()}} id="vorm">
                <div className="queryContainer">
                    <div>
                        {/*<div id="cover-spin"></div>*/}
                        <b>Korpus</b>
                        <br/><br/>
                        <span style={{ fontSize: "smaller" }}>Hiirega korpuse nimele liikudes näeb selle selgitust</span>
                        <br/><br/>
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
                        <label className="corpustitle" data-hover="Sisaldab eri emakeelega õpilaste eesti keele olümpiaadi esseid">
                        K2 olümpiaadi tööd
                        </label>
                        <br/>
                        <Checkbox
                            id="clWmOIrLa"
                            checked={corpusCheckboxStatus.clWmOIrLa}
                            onChange={alterCorpusCheckbox}
                        />
                        <label className="corpustitle" data-hover="Sisaldab riiklikke eksami- ja tasemetöid">
                            K2 tasemeeksamite tekstid
                        </label>
                        <br/>
                        <Checkbox
                            id="cFOoRQekA"
                            checked={corpusCheckboxStatus.cFOoRQekA}
                            onChange={alterCorpusCheckbox}
                        />
                        <label className="corpustitle" data-hover="Sisaldab eksamiväliselt kirjutatud A2-, B1-, B2- ja C1-taseme tekste, mille tase on määratud kolme tunnustatud hindamise spetsialisti ühise arvamuse põhjal">
                            K2 tuumkorpus
                        </label>
                        <br/>
                        <Checkbox
                            id="cYDRkpymb"
                            checked={corpusCheckboxStatus.cYDRkpymb}
                            onChange={alterCorpusCheckbox}
                        />
                        <label className="corpustitle" data-hover="Võrdluskorpus, sisaldab emakeelekõnelejate arvamuslugusid ajalehtedest">
                            K1 eesti keel
                        </label>
                        <br/>
                        <Checkbox
                            id="cgSRJPKTr"
                            checked={corpusCheckboxStatus.cgSRJPKTr}
                            onChange={alterCorpusCheckbox}
                        />
                        <label className="corpustitle" data-hover="Sisaldab põhikooli ja gümnaasiumi vene emakeelega õpilaste loomingulist laadi tekste">
                            K1 vene keel
                        </label>
                        <br/>
                        <Checkbox
                            id="cZjHWUPtD"
                            checked={corpusCheckboxStatus.cZjHWUPtD}
                            onChange={alterCorpusCheckbox}
                        />
                        <label className="corpustitle" data-hover="Sisaldab tekste eesti emakeelega õpilastelt, kes õpivad koolis vene keelt kolmanda keelena">
                            K3 vene keel
                        </label>
                        <br/>
                        <Checkbox
                            id="cwUSEqQLt"
                            checked={corpusCheckboxStatus.cwUSEqQLt}
                            onChange={alterCorpusCheckbox}
                        />
                        <label className="corpustitle" data-hover="Sisaldab emakeelekõneleja ja eesti keelt teise keelena kasutava üliõpilase akadeemilise keelekasutuse näiteid (referaadid, seminaritööd, lõputööd jm)">
                            Akadeemiline õppijakeel
                        </label>
                        <br/>
                        {/* <Checkbox
                            id="cwUprXCTL"
                            checked={corpusCheckboxStatus.cwUprXCTL}
                            onChange={alterCorpusCheckbox}
                        />
                        <label className="corpustitle">Eesti teaduskeel</label>
                        <br/> */}
                    </div>
                    <div>
                        <b>Teksti andmed</b>
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="type-label">Teksti liik</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="type-label"
                                name="type"
                                value={textData.type}
                                label="Teksti liik"
                                onChange={alterTextData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="isikiri">isiklik kiri</MenuItem>
                                <MenuItem value="amtkiri">ametlik kiri</MenuItem>
                                <MenuItem value="essee">essee</MenuItem>
                                <MenuItem value="referaat">referaat</MenuItem>
                                <MenuItem value="trilumunud">trükis ilmunud</MenuItem>
                                <MenuItem value="analyys">analüüs</MenuItem>
                                <MenuItem value="vastkys">vastus küsimusele</MenuItem>
                                <MenuItem value="ymberjutustus">ümberjutustus</MenuItem>
                                <MenuItem value="tolge">tõlge</MenuItem>
                                <MenuItem value="harjutus">harjutus</MenuItem>
                                <MenuItem value="teadus">teadusartikkel</MenuItem>
                                <MenuItem value="monograafia">monograafia</MenuItem>
                                <MenuItem value="vaitekiri">väitekiri</MenuItem>
                                <MenuItem value="ma">MA-töö</MenuItem>
                                <MenuItem value="batoo">BA-töö</MenuItem>
                                <MenuItem value="arvamuslugu">arvamuslugu</MenuItem>
                                <MenuItem value="teade">teade</MenuItem>
                                <MenuItem value="kirjeldus/jutustus">kirjeldus/jutustus</MenuItem>
                                <MenuItem value="muu">muu</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="language-label">Teksti keel</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="language-label"
                                name="language"
                                value={textData.language}
                                label="Teksti keel"
                                onChange={alterTextData}
                            >
                                <MenuItem value="eesti">eesti</MenuItem>
                                <MenuItem value="inglise">inglise</MenuItem>
                                <MenuItem value="soome">soome</MenuItem>
                                <MenuItem value="vene">vene</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="level-label">Teksti tase</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="level-label"
                                name="level"
                                value={textData.level}
                                label="Teksti tase"
                                onChange={alterTextData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                                <MenuItem value="A">C</MenuItem>
                                <MenuItem value="A1">A1</MenuItem>
                                <MenuItem value="A2">A2</MenuItem>
                                <MenuItem value="B1">B1</MenuItem>
                                <MenuItem value="B2">B2</MenuItem>
                                <MenuItem value="C1">C1</MenuItem>
                                <MenuItem value="C2">C2</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="usedMaterials-label">Kasutatud õppematerjale</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="usedMaterials-label"
                                name="usedMaterials"
                                value={textData.usedMaterials}
                                label="Kasutatud õppematerjale"
                                onChange={alterTextData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="jah">jah</MenuItem>
                                <MenuItem value="ei">ei</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <Checkbox
                            id="addedYear"
                            checked={textData.addedYear.length > 0}
                            onChange={alterSliderCheckbox}
                        />
                        <label id="addedYear-label">
                            Teksti lisamise aasta
                        </label>
                        <Slider
                            getAriaLabel={() => 'Teksti lisamise aasta'}
                            value={textData.addedYear}
                            onChange={alterTextData}
                            valueLabelDisplay="auto"
                            label="Teksti lisamise aasta"
                            name="addedYear"
                            min={2004}
                            max={new Date().getFullYear()}
                            sx={{ width: 300 }}
                            disabled={textData.addedYear.length === 0}
                            marks={[{value: 2004, label: 2004}, {value: yearNow, label: yearNow}]}
                        />
                        <br/>
                        <input type="checkbox" name="charactersOn" id="charactersOn" className="checkboxBack" disabled/>
                        <label htmlFor="characters" className="selectionFront">Tähemärke</label>
                        <input type="number" name="characters" id="characters" placeholder="250" min="1"/>
                        <br/>
                        <input type="checkbox" name="wordsOn" id="wordsOn" className="checkboxBack" disabled/>
                        <label htmlFor="words" className="selectionFront">Sõnu</label>
                        <input type="number" name="words" id="words" placeholder="170" min="1" className="checkboxBack"/>
                        <br/>
                        <input type="checkbox" name="sentencesOn" id="sentencesOn" className="checkboxBack" disabled/>
                        <label htmlFor="sentences" className="selectionFront">Lauseid</label>
                        <input type="number" name="sentences" id="sentences" placeholder="20" min="1" className="checkboxBack"/>
                        <br/>
                        {/*input type="checkbox" name="exercise" id="exercise" className="checkboxBack" disabled/>
                        <label htmlFor="exercise" className="selectionFront">Osa harjutusest</label>
                        <br/>*/}
                    </div>
                    <div>
                        <b>Teksti autori andmed</b>
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="age-label">Vanus</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="age-label"
                                name="age"
                                value={authorData.age}
                                label="Vanus"
                                onChange={alterAuthorData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="kuni18">- 18</MenuItem>
                                <MenuItem value="kuni26">18 - 26</MenuItem>
                                <MenuItem value="kuni40">27 - 40</MenuItem>
                                <MenuItem value="41plus">41 +</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="gender-label">Sugu</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="gender-label"
                                name="gender"
                                value={authorData.gender}
                                label="Sugu"
                                onChange={alterAuthorData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="mees">mees</MenuItem>
                                <MenuItem value="naine">naine</MenuItem>
                                {/*<MenuItem value="muu">muu</MenuItem>*/}
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="education-label">Haridus</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="education-label"
                                name="education"
                                value={authorData.education}
                                label="Haridus"
                                onChange={alterAuthorData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="Alg-/põhiharidus,alg,pohi">algharidus/põhiharidus</MenuItem>
                                <MenuItem value="Keskharidus,kesk">keskharidus</MenuItem>
                                <MenuItem value="Keskeriharidus/kutseharidus,keskeri,kutse">keskeriharidus/kutseharidus</MenuItem>
                                <MenuItem value="Kõrgharidus,korg">kõrgharidus</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="nativeLang-label">Emakeel</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="nativeLang-label"
                                name="nativeLang"
                                value={authorData.nativeLang}
                                label="Emakeel"
                                onChange={alterAuthorData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="eesti">eesti</MenuItem>
                                <MenuItem value="vene">vene</MenuItem>
                                <MenuItem value="soome">soome</MenuItem>
                                <MenuItem value="saksa">saksa</MenuItem>
                                <MenuItem value="ukraina">ukraina</MenuItem>
                                <MenuItem value="valgevene">valgevene</MenuItem>
                                <MenuItem value="lati">läti</MenuItem>
                                <MenuItem value="leedu">leedu</MenuItem>
                                <MenuItem value="rootsi">rootsi</MenuItem>
                                <MenuItem value="inglise">inglise</MenuItem>
                                <MenuItem value="jidis">jidiš</MenuItem>
                                <MenuItem value="itaalia">itaalia</MenuItem>
                                <MenuItem value="jaapani">jaapani</MenuItem>
                                <MenuItem value="poola">poola</MenuItem>
                                <MenuItem value="hollandi">hollandi</MenuItem>
                                <MenuItem value="sloveenia">sloveenia</MenuItem>
                                <MenuItem value="heebrea">heebrea</MenuItem>
                                <MenuItem value="prantsuse">prantsuse</MenuItem>
                                <MenuItem value="katalaani">katalaani</MenuItem>
                                <MenuItem value="ungari">ungari</MenuItem>
                                <MenuItem value="tsehhi">tšehhi</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="homeLang-label">Kodukeel</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="homeLang-label"
                                name="homeLang"
                                value={authorData.homeLang}
                                label="Kodukeel"
                                onChange={alterAuthorData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="eesti">eesti</MenuItem>
                                <MenuItem value="vene">vene</MenuItem>
                                <MenuItem value="soome">soome</MenuItem>
                                <MenuItem value="saksa">saksa</MenuItem>
                                <MenuItem value="ukraina">ukraina</MenuItem>
                                <MenuItem value="valgevene">valgevene</MenuItem>
                                <MenuItem value="lati">läti</MenuItem>
                                <MenuItem value="leedu">leedu</MenuItem>
                                <MenuItem value="rootsi">rootsi</MenuItem>
                                <MenuItem value="inglise">inglise</MenuItem>
                                <MenuItem value="jidis">jidiš</MenuItem>
                                <MenuItem value="itaalia">itaalia</MenuItem>
                                <MenuItem value="jaapani">jaapani</MenuItem>
                                <MenuItem value="poola">poola</MenuItem>
                                <MenuItem value="hollandi">hollandi</MenuItem>
                                <MenuItem value="sloveenia">sloveenia</MenuItem>
                                <MenuItem value="heebrea">heebrea</MenuItem>
                                <MenuItem value="prantsuse">prantsuse</MenuItem>
                                <MenuItem value="katalaani">katalaani</MenuItem>
                                <MenuItem value="ungari">ungari</MenuItem>
                                <MenuItem value="tsehhi">tšehhi</MenuItem>
                            </Select>
                        </FormControl> */}
                        <br/><br/>
                        <FormControl size="small">
                            <InputLabel id="country-label">Elukohariik</InputLabel>
                            <Select
                                sx={{ minWidth: selectWidth }}
                                labelId="country-label"
                                name="country"
                                value={authorData.country}
                                label="Elukohariik"
                                onChange={alterAuthorData}
                            >
                                <MenuItem value="teadmata" className="empty-select"></MenuItem>
                                <MenuItem value="eesti">Eesti</MenuItem>
                                <MenuItem value="soome">Soome</MenuItem>
                                <MenuItem value="rootsi">Rootsi</MenuItem>
                                <MenuItem value="venemaa">Venemaa</MenuItem>
                                <MenuItem value="lati">Läti</MenuItem>
                                <MenuItem value="leedu">Leedu</MenuItem>
                                <MenuItem value="saksamaa">Saksamaa</MenuItem>
                                {/*<MenuItem value="inglismaa">Suurbritannia</MenuItem>*/}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <br/><br/>
                <Button variant="contained" onClick={() => {submitted()}}>Saada päring</Button>
            </form>
        </div>
    )
}

export default Query;