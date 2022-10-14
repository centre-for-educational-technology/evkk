import React, {Component} from 'react';
import "./Correction.css";
import {Card} from "@mui/material";

class Correction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alasisu: "", tasemevastus: ["algusväärtus"],
      tasemetekst: "",
      korrektorivastus: ["", ""],
      vastuskood: "", vastusnahtav: false, muutuskood: "", yksikmuutus: false, taustatekst: <span></span>,
      taselisa: false, avatudkaart: "korrektuur", kordab: false, sisukohad: [], sisusonad: [], vastussonad: []
    };
    this.alaMuutus = this.alaMuutus.bind(this);
    this.ala1 = React.createRef();
    this.taust1 = React.createRef();
    this.kysi3 = this.kysi3.bind(this);
    this.korda = this.korda.bind(this);
  }

  puhasta(sona) {
    return sona.replace(/^[^0-9a-zA-ZõäöüÕÄÖÜ]+/, '').replace(/[^0-9a-zA-ZõäöüÕÄÖÜ]+$/, '')
  }

  puhasta2(sona) {
    let re = /(^[^0-9a-zA-ZõäöüÕÄÖÜ]*)(.*[0-9a-zA-ZõäöüÕÄÖÜ]+)([^0-9a-zA-ZõäöüÕÄÖÜ]*)/;
    return re.exec(sona);
  }

  kordama() {
    this.setState({kordab: true});
    this.korda();
    setInterval(this.korda, 3000);
  }

  korda() {
    this.kysi3();
    this.kysi4();
  }

  alaMuutus(event) {
    this.setState({alasisu: event.target.value});
  }

  asenda(algus, sisu, vahetus) {
    this.margi(algus, sisu);
    let uus = this.state.alasisu.substring(0, this.ala1.selectionStart) + vahetus +
      this.state.alasisu.substring(this.ala1.selectionEnd);
    this.setState({alasisu: uus});
  }

  margi(algus, sisu, puhastab = false) {
    this.ala1.focus();
    let koht = this.state.alasisu.indexOf(sisu, (algus > 10 ? algus - 10 : algus));
    if (koht === -1) {
      koht = this.state.alasisu.indexOf(sisu);
    }
    this.ala1.selectionStart = koht;
    this.ala1.selectionEnd = koht + sisu.length;
    if (puhastab) {
      this.setState({yksikmuutus: false});
    }
    // scroll !!
  }

  kysi4 = () => {
    if (this.state.alasisu === this.state.tasemetekst) {
      return;
    }

    let obj = {};
    obj["tekst"] = this.state.alasisu;
    const asisu = this.state.alasisu;
    fetch("/api/texts/keeletase", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(v => v.json()).then(t => {
      this.setState({"tasemevastus": t});
      this.setState({tasemetekst: asisu});
    })
  }

  korrektuuriVajutus = () => {
    this.setState({avatudkaart: "korrektuur"})
    if (this.state.kordab) {
      this.kysi3();
    }
  }

  hindajaVajutus = () => {
    this.setState({avatudkaart: "hindamine"})
    if (this.state.kordab) {
      this.kysi4();
    }
  }

  kysi3 = () => {
    if (this.state.alasisu === this.state.korrektorivastus[1]) {
      return;
    }
    let obj = {};
    obj["tekst"] = this.state.alasisu;
    fetch("/api/texts/korrektuur", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(v => v.json()).then(t => {
      this.setState({"korrektorivastus": t});
      let sm = t[1].split(" ");
      let vm = t[0].split(" ");
      let vastustekst = [];
      let taustatekst = [];
      let sisutekst = "";
      let muutused = [];
      let sisukohad = [];
      for (let i = 0; i < vm.length; i++) {
        if (sm[i] === vm[i]) {
          vastustekst[i] = <span key={"s" + i}>{vm[i] + " "}</span>;
          taustatekst[i] = <span key={"t" + i}>{sm[i] + " "}</span>;
        } else {
          const algus = sisutekst.length;
          const sisu = sm[i];
          muutused[i] = <span key={"sm" + i}>
                <span onClick={() => this.margi(algus, sisu, true)}
                      style={{'backgroundColor': 'lightpink'}}>{sm[i]}</span> - <span>{vm[i]}</span> <button onClick={() => this.asenda(algus, sisu, vm[i])}>Asenda</button><br/>
             </span>
          let kpl = this.puhasta2(sm[i]);
          taustatekst[i] = <span key={"t" + i}><span>{kpl[1]}</span><span className="margitud"
                                                                          title={vm[i]}>{kpl[2]}</span><span>{kpl[3]}</span><span> </span></span>;
          vastustekst[i] = <span key={"s" + i}><span title={vm[i]}
                                                     onClick={() => this.margi(algus, sisu)}
                                                     style={{'backgroundColor': 'lightgray'}}>{sm[i]}</span><span> </span></span>;
        }
        sisutekst += sm[i] + " ";
        sisukohad[i] = sisutekst.length;
      }
      this.setState({"muutuskood": <div>{muutused.length > 0 ? muutused : "Parandused puuduvad!"}</div>})
      this.setState({"vastuskood": <div>{vastustekst}<br/><br/><br/><br/><br/><br/></div>})
      this.setState({"taustakood": <div>{taustatekst}</div>}, () => {
        this.kerimine()
      });
      this.setState({"sisukohad": sisukohad});
      this.setState({"sisusonad": sm});
      this.setState({"vastussonad": vm});
      this.setState({yksikmuutus: false});
    })
  }

  renderTasemed = () => {
    if (this.state.taselisa) {
      return <div onClick={() => this.setState({taselisa: false})}
                  style={{width: "100%"}}>
        Loe täpsemalt ↑
        <p style={{width: "100%"}}><b>Teksti üldine keerukus: <br/> {this.state.tasemevastus[4][1]} </b>
          (tõenäosus {(this.state.tasemevastus[4][0] * 100).toFixed(0)}
          %)<br/>Arvesse on võetud teksti, sõnade ja lausete pikkus.</p>
        <p style={{width: "100%"}}><b>Morfoloogia ehk vormikasutus: <br/>{this.state.tasemevastus[8][1]} </b>
          (tõenäosus {(this.state.tasemevastus[8][0] * 100).toFixed(0)}%)<br/>Arvesse on võetud sõnaliikide ja
          muutevormide osakaalud ning sõnade vormirohkus.)</p>

        <p style={{width: "100%"}}><b>Sõnavara: <br/>{this.state.tasemevastus[12][1]} </b>
          {this.state.tasemevastus[12][0] > 0 &&
            <span>(tõenäosus {(this.state.tasemevastus[12][0] * 100).toFixed(0)} %)<br/></span>}

          Arvesse on võetud sõnavaliku mitmekesisus ja ulatus (unikaalsete sõnade hulk, harvem esineva sõnavara
          osakaal), sõnavara tihedus (sisusõnade osakaal) ja nimisõnade abstraktsus.</p>
        <br/>
        <br/>
        <br/>
      </div>
    }
    return <div onClick={() => this.setState({taselisa: true})}>Loe täpsemalt ...</div>
  }

  ketas() {
    return <div
      style={{
        borderStyle: "solid", borderRadius: "50%", width: "10px", height: "10px",
        borderTopColor: "transparent", animation: "spin .8s linear infinite",
        float: "left", content: "  "
      }}></div>
  }

  renderTase() {
    return <span>{this.state.kordab ? <span>{this.state.alasisu.length > 0 ?
      (this.state.tasemevastus.length > 0 ?
        (this.state.tasemevastus.length === 1 ? "" : <div style={{float: 'left', width: '95%'}}>
          <h1>{this.state.tasemevastus[0][1]} {(this.state.tasemevastus[0][0] * 100).toFixed(0)}%</h1>
          Muude tasemete tõenäosus: <br/>
          <ul>
            {this.state.tasemevastus.slice(1, 4).map((vastus) =>
              <li key={vastus[1]}>{vastus[1] + " - " + (vastus[0] * 100).toFixed(0)}%</li>
            )}
          </ul>

          {this.renderTasemed()}
        </div>) : <div>Tekst liiga lühike</div>) : ""}</span> : "Tekst on liiga lühike"}</span>
  }

  kerimine() {
    this.taust1.scrollTop = this.ala1.scrollTop;
  }

  tekstialaHiir(_e) {
    let koht = this.ala1.selectionStart;
    let algus = koht;
    let ots = koht;
    while (algus > 0 && this.state.alasisu[algus] !== ' ') {
      algus--;
    }
    while (ots < this.state.alasisu.length && this.state.alasisu[ots] !== ' ') {
      ots++;
    }
    let sona = this.state.alasisu.substring(algus + 1, ots);
    console.log(this.ala1.selectionStart, sona);
    this.vali(sona, this.ala1.selectionStart);
  }

  vali(sona, koht) {
    let k = 0, v = -1;
    while (this.state.sisukohad[k] < koht) {
      k++;
    }
    if (this.state.sisusonad[k] === sona) {
      v = k;
    }
    for (let i = 0; i < 3; i++) {
      if (this.state.sisusonad[k + i] === sona) {
        v = k + i;
      }
      if (this.state.sisusonad[k - i] === sona) {
        v = k - i;
      }
    }
    if (this.state.sisusonad[v] !== this.state.vastussonad[v]) {
      let vahetus = <span key={"sm" + v}>
      <span style={{'backgroundColor': 'lightpink'}}>{this.puhasta(this.state.sisusonad[v])}</span> - <span>{this.puhasta(this.state.vastussonad[v])}</span> <button onClick={() => this.asenda(this.state.sisukohad[v] - this.state.sisusonad[v].length, this.state.sisusonad[v], this.state.vastussonad[v])}>asenda</button><br/>
   </span>
      this.setState({yksikmuutus: vahetus});
    } else {
      this.setState({yksikmuutus: false});
    }
  }

  render() {
    return (
      <Card raised={true}
            square={true}
            elevation={2}>
        <p/>
        <div style={{'float': 'left', 'margin': '10px', 'width': '45%'}}>
          <div className="wrapper">
            <div id="highlights"
                 ref={(e) => this.taust1 = e}>{this.state.taustakood}</div>
            <textarea id="textarea"
                      onScroll={(_e) => this.kerimine()}
                      ref={(e) => this.ala1 = e}
                      onChange={(event) => this.alaMuutus(event)}
                      rows="15"
                      cols="60"
                      value={this.state.alasisu}
                      spellCheck={false}
                      onMouseUp={(event) => this.tekstialaHiir(event)}
                      placeholder={"Kopeeri või kirjuta siia analüüsitav tekst"}/>
            <div className={"borderbox"}></div>
          </div>
          <br/>
          <br/>
          <div style={{width: "300px", marginLeft: '40px'}}>Rakenduse abil saad parandada oma teksti õigekirja ja
            vaadata,
            mis keeleoskustasemele see vastab (A2–C1).
            Loe lähemalt <a href={"https://github.com/centre-for-educational-technology/evkk/wiki/Demos"}>siit</a>.
          </div>
          <br/>
          <br/>
          <br/>
        </div>
        <div style={{'float': 'left', 'margin': '10px', 'width': '50%'}}>
          <style>{`
             @keyframes spin{
                  from {transform:rotate(0deg);}
                  to {transform:rotate(360deg);}
                  }
                  `}
          </style>
          <nav className="navbar navbar-expand-sm bg-light">
            <ul className={"nav nav-tabs nav-justified"}
                style={{width: "100%"}}>
              <li className={"nav-item nav-link"}
                  onClick={() => this.korrektuuriVajutus()}
                  style={this.state.avatudkaart === "korrektuur" ? {fontWeight: "bold"} : {}}
              >Eksimused
              </li>
              <li className={"nav-item nav-link"}
                  onClick={() => this.hindajaVajutus()}
                  style={this.state.avatudkaart === "hindamine" ? {fontWeight: "bold"} : {}}
              >Tasemehinnang
              </li>
            </ul>
          </nav>
          {!this.state.kordab &&
            <div><br/> <br/><br/> <br/>
              <div style={{width: "100%", textAlign: "center"}}>
                <button onClick={() => this.kordama()}>Analüüsi</button>
              </div>
            </div>
          }
          <br/>
          <br/>
          {this.state.avatudkaart === "korrektuur" && <span>
             {this.state.kordab && this.state.alasisu !== this.state.korrektorivastus[1] && this.ketas()}<br/>
            {(this.state.yksikmuutus) ? this.state.yksikmuutus : ""
            }<br/>
            {this.state.vastusnahtav && <span>{this.state.tasemevastus ? this.state.vastuskood : "algus"}</span>}
             </span>}
          {this.state.avatudkaart === "hindamine" && this.state.kordab && <div>
            {(this.state.alasisu !== this.state.tasemetekst) ? this.ketas() : ""} <br/>
            <span>{this.renderTase()}</span></div>}
        </div>
      </Card>
    );
  }
}

export default Correction;
