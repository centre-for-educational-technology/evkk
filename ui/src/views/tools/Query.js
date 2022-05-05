import React, { useState } from "react";
import "../../styles/Query.css";

function Query() {
    const [checkboxStatus, setCheckboxStatus] = useState({
        cFqPphvYi: false,
        clWmOIrLa: false,
        cFOoRQekA: false,
        cYDRkpymb: false,
        cgSRJPKTr: false,
        cZjHWUPtD: false,
        cwUSEqQLt: false
    });

    function submitted() {
        return null;
    }

    function alterCheckbox() {
        if(checkboxStatus.cFqPphvYi === true) {
            setCheckboxStatus(
                checkboxStatus,
                checkboxStatus.cFqPphvYi = false
            )
        } else {
            setCheckboxStatus(
                checkboxStatus,
                checkboxStatus.cFqPphvYi = true
            )
        }
        console.log(checkboxStatus.cFqPphvYi);
    }

    return (
        <div className={"container"}>
            <form action="" onSubmit={(e) => {e.preventDefault()}} id="vorm">
                <div className="queryContainer">
                    <div>
                        {/*<div id="cover-spin"></div>*/}
                        <b>Korpus</b>
                        <br/><br/>
                        <span style={{fontSize: "smaller"}}>Hiirega korpuse nimele liikudes näeb selle selgitust</span>
                        <br/><br/>
                        <input type="checkbox" name="koikkorpused" id="koikkorpused" className="checkboxBack"/>
                        <label htmlFor="koikkorpused">kõik</label>
                        <br/>
                        <input type="checkbox" name="cFqPphvYi" id="cFqPphvYi" className="checkboxBack" checked={checkboxStatus.cFqPphvYi} onClick={() => alterCheckbox()} readOnly/>
                        <label htmlFor="cFqPphvYi" className="corpustitle" data-hover="Sisaldab eri emakeelega õpilaste eesti keele olümpiaadi esseid">
                        K2 olümpiaadi tööd
                        </label>
                        <br/>
                        <input type="checkbox" name="clWmOIrLa" id="clWmOIrLa" className="checkboxBack"/>
                        <label htmlFor="clWmOIrLa" className="corpustitle" data-hover="Sisaldab riiklikke eksami- ja tasemetöid">
                            K2 tasemeeksamite tekstid
                        </label>
                        <br/>
                        <input type="checkbox" name="cFOoRQekA" id="cFOoRQekA" className="checkboxBack"/>
                        <label htmlFor="cFOoRQekA" className="corpustitle" data-hover="Sisaldab eksamiväliselt kirjutatud A2-, B1-, B2- ja C1-taseme tekste, mille tase on määratud kolme tunnustatud hindamise spetsialisti ühise arvamuse põhjal">
                            K2 tuumkorpus
                        </label>
                        <br/>
                        <input type="checkbox" name="cYDRkpymb" id="cYDRkpymb" className="checkboxBack"/>
                        <label htmlFor="cYDRkpymb" className="corpustitle" data-hover="Võrdluskorpus, sisaldab emakeelekõnelejate arvamuslugusid ajalehtedest">
                            K1 eesti keel
                        </label>
                        <br/>
                        <input type="checkbox" name="cgSRJPKTr" id="cgSRJPKTr" className="checkboxBack"/>
                        <label htmlFor="cgSRJPKTr" className="corpustitle" data-hover="Sisaldab põhikooli ja gümnaasiumi vene emakeelega õpilaste loomingulist laadi tekste">
                            K1 vene keel
                        </label>
                        <br/>
                        <input type="checkbox" name="cZjHWUPtD" id="cZjHWUPtD" className="checkboxBack"/>
                        <label htmlFor="cZjHWUPtD" className="corpustitle" data-hover="Sisaldab tekste eesti emakeelega õpilastelt, kes õpivad koolis vene keelt kolmanda keelena">
                            K3 vene keel
                        </label>
                        <br/>
                        <input type="checkbox" name="cwUSEqQLt" id="cwUSEqQLt" className="checkboxBack"/>
                        <label htmlFor="cwUSEqQLt" className="corpustitle" data-hover="Sisaldab emakeelekõneleja ja eesti keelt teise keelena kasutava üliõpilase akadeemilise keelekasutuse näiteid (referaadid, seminaritööd, lõputööd jm)">
                            Akadeemiline õppijakeel
                        </label>
                        <br/>
                        {/*<input type="checkbox" name="cwUprXCTL" id="cwUprXCTL" className="checkboxBack"/>
                        <label htmlFor="cwUprXCTL" className="selectionFront">Eesti teaduskeel</label>
                        <br/>*/}
                    </div>
                    <div>
                        <b>Teksti andmed</b>
                        <br/><br/>
                        <input type="checkbox" name="typeOn" id="typeOn" className="checkboxBack" disabled/>
                        <label htmlFor="type" className="selectionFront">Teksti liik</label>
                        <select name="type" id="type">
                            <option value="teadmata"></option>
                            <option value="isikiri">isiklik kiri</option>
                            <option value="amtkiri">ametlik kiri</option>
                            <option value="essee">essee</option>
                            <option value="referaat">referaat</option>
                            <option value="trilumunud">trükis ilmunud</option>
                            <option value="analyys">analüüs</option>
                            <option value="vastkys">vastus küsimusele</option>
                            <option value="ymberjutustus">ümberjutustus</option>
                            <option value="tolge">tõlge</option>
                            <option value="harjutus">harjutus</option>
                            <option value="teadus">teadusartikkel</option>
                            <option value="monograafia">monograafia</option>
                            <option value="vaitekiri">väitekiri</option>
                            <option value="ma">MA-töö</option>
                            <option value="batoo">BA-töö</option>
                            <option value="arvamuslugu">arvamuslugu</option>
                            <option value="teade">teade</option>
                            <option value="kirjeldus/jutustus">kirjeldus/jutustus</option>
                            <option value="muu">muu</option>
                        </select>
                        <br/>
                        <input type="checkbox" name="textlangOn" id="textlangOn" className="checkboxBack" disabled checked/>
                        <label htmlFor="textlang" className="selectionFront">Teksti keel</label>
                        <select name="textlang" id="textlang">
                            <option value="eesti">eesti</option>
                            <option value="inglise">inglise</option>
                            <option value="soome">soome</option>
                            <option value="vene">vene</option>
                        </select>
                        <br/>
                        <input type="checkbox" name="levelOn" id="levelOn" className="checkboxBack" disabled/>
                        <label htmlFor="level" className="selectionFront">Teksti tase</label>
                        <select name="level" id="level">
                            <option value="teadmata"></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="A">C</option>
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="C1">C1</option>
                            <option value="C2">C2</option>
                        </select>
                        <br/>
                        <input type="checkbox" name="usedmaterialsOn" id="usedmaterialsOn" className="checkboxBack" disabled/>
                        <label htmlFor="usedmaterials" className="selectionFront">Kasutatud õppematerjale</label>
                        <select name="usedmaterials" id="usedmaterials">
                            <option value="teadmata"></option>
                            <option value="jah">jah</option>
                            <option value="ei">ei</option>
                        </select>
                        <br/>
                        <input type="checkbox" name="addedyearOn" id="addedyearOn" className="checkboxBack" disabled/>
                        <label htmlFor="addedyear" className="selectionFront">Teksti lisamise aasta</label>
                        <input type="number" id="addedyear" name="addedyear" placeholder="2019" min="2004"/>
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
                        <input type="checkbox" name="ageOn" id="ageOn" className="checkboxBack" disabled/>
                        <label htmlFor="age" className="selectionFront">Vanus</label>
                        <select name="age" id="age">
                            <option value="teadmata"></option>
                            <option value="kuni18">- 18</option>
                            <option value="kuni26">18 - 26</option>
                            <option value="kuni40">27 - 40</option>
                            <option value="41plus">41 +</option>
                        </select>
                        <br/>
                        <input type="checkbox" name="genderOn" id="genderOn" className="checkboxBack" disabled/>
                        <label htmlFor="gender" className="selectionFront">Sugu</label>
                        <select name="gender" id="gender">
                            <option value="teadmata"></option>
                            <option value="mees">mees</option>
                            <option value="naine">naine</option>
                            {/*<option value="muu">muu</option>*/}
                        </select>
                        <br/>
                        <input type="checkbox" name="educationOn" id="educationOn" className="checkboxBack" disabled/>
                        <label htmlFor="education" className="selectionFront">Haridus</label>
                        <select name="education" id="education">
                            <option value="teadmata"></option>
                            <option value="Alg-/põhiharidus,alg,pohi">algharidus/põhiharidus</option>
                            <option value="Keskharidus,kesk">keskharidus</option>
                            <option value="Keskeriharidus/kutseharidus,keskeri,kutse">keskeriharidus/kutseharidus</option>
                            <option value="Kõrgharidus,korg">kõrgharidus</option>
                        </select>
                        <br/>
                        <input type="checkbox" name="nativelangOn" id="nativelangOn" className="checkboxBack" disabled/>
                        <label htmlFor="nativelang" className="selectionFront">Emakeel</label>
                        <select name="nativelang" id="nativelang">
                            <option value="teadmata"></option>
                            <option value="eesti">eesti</option>
                            <option value="vene">vene</option>
                            <option value="soome">soome</option>
                            <option value="saksa">saksa</option>
                            <option value="ukraina">ukraina</option>
                            <option value="valgevene">valgevene</option>
                            <option value="lati">läti</option>
                            <option value="leedu">leedu</option>
                            <option value="rootsi">rootsi</option>
                            <option value="inglise">inglise</option>
                            <option value="jidis">jidiš</option>
                            <option value="itaalia">itaalia</option>
                            <option value="jaapani">jaapani</option>
                            <option value="poola">poola</option>
                            <option value="hollandi">hollandi</option>
                            <option value="sloveenia">sloveenia</option>
                            <option value="heebrea">heebrea</option>
                            <option value="prantsuse">prantsuse</option>
                            <option value="katalaani">katalaani</option>
                            <option value="ungari">ungari</option>
                            <option value="tsehhi">tšehhi</option>
                        </select>
                        <br/>
                        {/*<input type="checkbox" name="homelangOn" id="homelangOn" className="checkboxBack" disabled/>
                        <label htmlFor="homelang" className="selectionFront">Kodukeel</label>
                        <select name="homelang" id="homelang">
                            <option value="teadmata"></option>
                            <option value="eesti">eesti</option>
                            <option value="vene">vene</option>
                            <option value="soome">soome</option>
                            <option value="saksa">saksa</option>
                            <option value="ukraina">ukraina</option>
                            <option value="valgevene">valgevene</option>
                            <option value="lati">läti</option>
                            <option value="leedu">leedu</option>
                            <option value="rootsi">rootsi</option>
                            <option value="inglise">inglise</option>
                            <option value="jidis">jidiš</option>
                            <option value="itaalia">itaalia</option>
                            <option value="jaapani">jaapani</option>
                            <option value="poola">poola</option>
                            <option value="hollandi">hollandi</option>
                            <option value="sloveenia">sloveenia</option>
                            <option value="heebrea">heebrea</option>
                            <option value="prantsuse">prantsuse</option>
                            <option value="katalaani">katalaani</option>
                            <option value="ungari">ungari</option>
                            <option value="tsehhi">tšehhi</option>
                        </select>
                        <br/>*/}
                        <input type="checkbox" name="countryOn" id="countryOn" className="checkboxBack" disabled/>
                        <label htmlFor="country" className="selectionFront">Elukohariik</label>
                        <select name="country" id="country">
                            <option value="teadmata"></option>
                            <option value="eesti">Eesti</option>
                            <option value="soome">Soome</option>
                            <option value="rootsi">Rootsi</option>
                            <option value="venemaa">Venemaa</option>
                            <option value="lati">Läti</option>
                            <option value="leedu">Leedu</option>
                            <option value="saksamaa">Saksamaa</option>
                            {/*<option value="inglismaa">Suurbritannia</option>*/}
                        </select>
                    </div>
                </div>
                <br/><br/>
                <button id="submit" onClick={() => {submitted()}}>Saada päring</button>
            </form>
        </div>
    )
}

export default Query;