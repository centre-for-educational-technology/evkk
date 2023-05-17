import React, {Component} from 'react';
import EastIcon from '@mui/icons-material/East';
import "./Correction.css";
import {Alert, Box, Button, Card, CircularProgress, IconButton, Slider, styled, Tab, Typography} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextUpload from "../../components/textupload/TextUpload";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
//history to keep all changes step-by-step made to alasisu
let history = [
  "",
]
//integer for indexing history with undo and redo
let currentHistory = 0

class Correction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alasisu: "", tasemevastus: ["algusväärtus"],
      tasemetekst: "",
      korrektorivastus: ["", ""],
      vastuskood: "", vastusnahtav: false, muutuskood: "", yksikmuutus: false, taustatekst: <span></span>,
      taselisa: false, avatudkaart: "korrektuur", kordab: false, sisukohad: [], sisusonad: [], vastussonad: [],
      paringlopetatud: false,
      keerukusvastus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      mitmekesisusvastus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      korrektuur: "",
      selectedError: "",
      colorChanged: false,
    };
    this.handleRedo = this.handleRedo.bind(this)
    this.handleUndo = this.handleUndo.bind(this)
    this.sendTextFromFile = this.sendTextFromFile.bind(this)
    this.alaMuutus = this.alaMuutus.bind(this);
    this.ala1 = React.createRef();
    this.taust1 = React.createRef();
    this.kysi3 = this.kysi3.bind(this);
    this.korda = this.korda.bind(this);

    this.customSlider = styled(Slider)({
      color: '#9cff7e',
      height: 20,
      '& .MuiSlider-track': {
        border: 'none',
      },
      '& .MuiSlider-thumb': {
        height: 0,
        width: 0,
        backgroundColor: '#9cff7e',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
          boxShadow: 'inherit',
        },
        '&:before': {
          display: 'none',
        },
      },
      '.Mui-disabled': {
        color: '#9cff7e',
      },
      '.MuiSlider-valueLabel': {
        lineHeight: 2,
        fontSize: 24,
        background: 'unset',
        padding: 0,
        width: 54,
        height: 54,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(0%, -100%) rotate(-45deg) scale(0)',
        '&:before': {display: 'none'},
        '&.MuiSlider-valueLabelOpen': {
          transform: 'translate(50%, -50%) rotate(-45deg) scale(1)',
        },
        '& > *': {
          transform: 'rotate(45deg)',
        },
      },
    });

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
  }

  korda() {
    if (this.state.alasisu.replace(/(\r\n|\n|\r)/gm, "") === this.state.tasemetekst.replace(/(\r\n|\n|\r)/gm, "")) {
      return;
    }
    this.kysi3();
    this.kysi4();
    this.kysi5();
    this.kysi6();
  }

  alaMuutus(event) {
    this.setState({alasisu: event.target.value.replace(/(\r\n|\n|\r)/gm, "")}, function () {
      this.keepHistory();
    });
  }

  asenda(algus, sisu, vahetus) {
    this.margi(algus, sisu);
    let uus = this.state.alasisu.substring(0, this.ala1.selectionStart) + vahetus +
      this.state.alasisu.substring(this.ala1.selectionEnd);
    this.setState({alasisu: uus}, function () {
      this.keepHistory();
      this.korda();
    });

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

  kysi5 = () => {
    let obj = {};
    obj["tekst"] = this.state.alasisu;
    fetch("/api/texts/keerukus", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(v => v.json()).then(t => {
      this.setState({"keerukusvastus": t});
    })
  }

  kysi6 = () => {
    let obj = {};
    obj["tekst"] = this.state.alasisu;
    fetch("/api/texts/mitmekesisus", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(v => v.json()).then(t => {
      this.setState({"mitmekesisusvastus": t});
    })
  }

  handleTabChange = (event, newValue) => {
    this.setState({"avatudkaart": newValue});
  };


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

  keerukusVajutus = () => {
    this.setState({avatudkaart: "keerukus"})
  }

  mitmekesisusVajutus = () => {
    this.setState({avatudkaart: "mitmekesisus"})
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

      if (sm === vm) {
        this.setState({korrektuur: "Kõik korras"});
      } else {
        for (let i = 0; i < vm.length; i++) {
          if (sm[i] === vm[i]) {
            vastustekst[i] = <span key={"s" + i}>{vm[i] + " "}</span>;
            taustatekst[i] = <span key={"t" + i}>{sm[i] + " "}</span>;
          } else {
            const algus = sisutekst.length;
            const sisu = sm[i];
            muutused[i] = <span key={"sm" + i}>
                <span onClick={() => this.margi(algus, sisu, true)}
                      style={{'backgroundColor': 'lightpink'}}>{sm[i]}</span> - <span>{vm[i]}</span> <button
              onClick={() => {
                this.asenda(algus, sisu, vm[i])
              }}>Asenda</button><br/>
             </span>
            let kpl = this.puhasta2(sm[i]);
            taustatekst[i] =
              <span key={"t" + i}><span>{kpl[1]}</span><span className="corrector-margitud corrector-pointer-hover"
                                                             title={vm[i]}>{kpl[2]}</span><span>{kpl[3]}</span><span> </span></span>
            vastustekst[i] = <span key={"s" + i}><span title={vm[i]}
                                                       onClick={() => {
                                                         this.margi(algus, sisu)
                                                       }}
                                                       style={{
                                                         'backgroundColor': 'lightgray',
                                                         cursor: "pointer"
                                                       }}>{sm[i]}</span><span> </span></span>
          }
          sisutekst += sm[i] + " ";
          sisukohad[i] = sisutekst.length;
        }
      }
      this.setState({"muutuskood": <div>{muutused.length > 0 ? muutused : "puuduvad"}</div>})
      this.setState({"vastuskood": <div>{vastustekst}</div>})
      this.setState({"taustakood": <div>{taustatekst}</div>}, () => {
        this.kerimine()
      });
      this.setState({"sisukohad": sisukohad});
      this.setState({"sisusonad": sm});
      this.setState({"vastussonad": vm});
      this.setState({yksikmuutus: false});
      this.setState({"paringlopetatud": true});
    })
  }

  renderTasemed = () => {
    if (this.state.taselisa) {
      return <div onClick={() => this.setState({taselisa: false})}
                  style={{width: "80%"}}>
        Loe täpsemalt ↑
        <p style={{width: "80%"}}><b>Teksti üldine keerukus: <br/> {this.state.tasemevastus[4][1]} </b>
          (tõenäosus {(this.state.tasemevastus[4][0] * 100).toFixed(0)}
          %)<br/>Arvesse on võetud teksti, sõnade ja lausete pikkus.</p>
        <p style={{width: "80%"}}><b>Morfoloogia ehk vormikasutus: <br/>{this.state.tasemevastus[8][1]} </b>
          (tõenäosus {(this.state.tasemevastus[8][0] * 100).toFixed(0)}%)<br/>Arvesse on võetud sõnaliikide ja
          muutevormide osakaalud ning sõnade vormirohkus.)</p>

        <p style={{width: "80%"}}><b>Sõnavara: <br/>{this.state.tasemevastus[12][1]} </b>
          {this.state.tasemevastus[12][0] > 0 &&
            <span>(tõenäosus {(this.state.tasemevastus[12][0] * 100).toFixed(0)} %)<br/></span>}

          Arvesse on võetud sõnavaliku mitmekesisus ja ulatus (unikaalsete sõnade hulk, harvem esineva sõnavara
          osakaal),
          sõnavara tihedus (sisusõnade osakaal) ja nimisõnade abstraktsus.</p>
        <br/>
        <br/>
        <br/>
      </div>
    }
    return <div className={"corrector-pointer-hover"} onClick={() => this.setState({taselisa: true})}>Loe täpsemalt
      ...</div>
  }
  state;


  ketas() {
    return <div
      style={{
        borderStyle: "solid", borderRadius: "50%", width: "10px", height: "10px",
        borderTopColor: "transparent", animation: "spin .8s linear infinite",
        float: "left", content: "  "
      }}></div>
  }

  renderTase() {
    let degreeValue
    if (this.state.tasemevastus.length !== 1 && this.state.tasemevastus[0] !== undefined) {
      let val1 = parseInt((this.state.tasemevastus[0][0] * 100 * 3.6).toFixed(0), 10);
      let val2 = parseInt((this.state.tasemevastus[1][0] * 100 * 3.6).toFixed(0), 10);
      let val3 = parseInt((this.state.tasemevastus[2][0] * 100 * 3.6).toFixed(0), 10);
      let val4 = parseInt((this.state.tasemevastus[3][0] * 100 * 3.6).toFixed(0), 10);
      degreeValue = "conic-gradient(#b7e4c7 " + val1 + "deg,  #90e0ef " + val1 + "deg " + (val2 + val1) + "deg, #ffb3c1 " + (val2 + val1) + "deg " + (val2 + val1 + val3) + "deg, #90e0ef " + (val2 + val1 + val3) + "deg " + (val2 + val1 + val3 + val4) + "deg)";
    }
    return <Box>
      <Box component={"span"}
           width={"auto"}>{this.state.kordab && parseInt(this.state.mitmekesisusvastus[10]) > 14 ?
        <Box component={"span"} width={"auto"}>{this.state.alasisu.length > 0 ?
          (this.state.tasemevastus.length > 0 ?
            (this.state.tasemevastus.length === 1 ? "" : <Box width={"100%"}>

              <Box style={{display: "flex", paddingRight: "50px", paddingLeft: "50px", width: "100%"}}>

                <Box marginRight={"10%"} width={"80%"} display={"flex"} flexDirection={"column"}
                     justifyContent={"center"}
                     paddingLeft={"20%"}>
                  <Box display={"flex"} alignItems={"center"} justifyContent={"start"}>
                  <Box width={15} height={15} borderRadius={"50px"} bgcolor={"#b7e4c7"} marginRight={"10px"}></Box>
                  <h2>{this.state.tasemevastus[0][1]}: {(this.state.tasemevastus[0][0] * 100).toFixed(0)}%</h2>
                </Box>
                <Box className="other-percentage-values">

                  {this.state.tasemevastus.slice(1, 4).map((vastus) => {
                      if ((vastus[0] * 100).toFixed(0) > 0) {
                        return <Box display={"flex"} alignItems={"center"} justifyContent={"start"}> <Box width={15}
                                                                                                          height={15}
                                                                                                          borderRadius={"50px"}
                                                                                                          marginRight={"10px"}></Box>
                          <h2>{vastus[1]}: {(vastus[0] * 100).toFixed(0)}%</h2></Box>
                      }
                    }
                  )}
                </Box>
              </Box>
              {(this.state.tasemevastus[1][0] * 100).toFixed(0) > 0 ?
                <Box display={"flex"} width={"40%"} justifyContent={"center"}>
                  <Box height={150} width={150} borderRadius={50} paddingRight={"50px"}
                       style={{background: degreeValue}}>
                  </Box>
                </Box>
                :
                null
              }
            </Box>
            <Box paddingLeft={"50px"} marginTop={"30px"} width={"100%"}>
              <Box marginBottom={"20px"}><Typography><h2>Lisainfo</h2></Typography></Box>
              <Box marginBottom={"20px"}><b>Teksti üldine keerukus: <br/> {this.state.tasemevastus[4][1]} </b>
                (tõenäosus {(this.state.tasemevastus[4][0] * 100).toFixed(0)}
                %)<br/>Arvesse on võetud teksti, sõnade ja lausete pikkus.</Box>
              <Box marginBottom={"20px"}><b>Morfoloogia ehk vormikasutus: <br/>{this.state.tasemevastus[8][1]} </b>
                (tõenäosus {(this.state.tasemevastus[8][0] * 100).toFixed(0)}%)<br/>Arvesse on võetud sõnaliikide ja
                muutevormide osakaalud ning sõnade vormirohkus.)</Box>

              <Box marginBottom={"20px"}><b>Sõnavara: <br/>{this.state.tasemevastus[12][1]} </b>
                {this.state.tasemevastus[12][0] > 0 &&
                  <span>(tõenäosus {(this.state.tasemevastus[12][0] * 100).toFixed(0)} %)<br/></span>}

                Arvesse on võetud sõnavaliku mitmekesisus ja ulatus (unikaalsete sõnade hulk, harvem esineva sõnavara
                osakaal),
                sõnavara tihedus (sisusõnade osakaal) ja nimisõnade abstraktsus.</Box>
            </Box>
            </Box>) : <div></div>) : ""}</Box> : "Tekst on liiga lühike"}</Box></Box>
  }

  kerimine() {
    this.taust1.scrollTop = this.ala1.scrollTop;
  }

  tekstialaHiir() {
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
    if (this.state.paringlopetatud) {
    }

    if (this.state.selectedError !== "" && this.state.kordab && this.state.paringlopetatud) {
      if (this.state.colorChanged === "true" && !this.state.korrektorivastus[0].includes(sona)) {
        console.log("tere")
        document.getElementById(this.state.selectedError).style.backgroundColor = "white";
      }
      if (!this.state.korrektorivastus[0].includes(sona)) {
        console.log(sona)
        document.getElementById(sona).style.backgroundColor = "#e8f4f8";
        this.setState({colorChanged: "true"})
      }

    }

    this.setState({selectedError: sona})
  }

  deleteAllErrors() {

  }

  loadErrors() {
    let errorList = [];
    for (let i = 0; i < this.state.sisusonad.length; i++) {
      if (this.state.sisusonad[i] !== this.state.vastussonad[i]) {
        errorList.push([this.state.sisusonad[i], this.state.vastussonad[i], this.state.sisukohad[i]]);
      }
    }
    return (<Box>
      {errorList.map((error) => {
        return (
          <Box display="flex" justifyContent="center">
            <Box id={error[0]} display="inline-flex" borderRadius="10px" maxWidth="min-content" justifyContent="center">
              <Box id={error[0]}
                   style={{
                     padding: "15px",
                     borderRadius: "10px",
                     display: "inline-flex",
                     gap: "10px"
                   }}>
      <span
        style={{
          'backgroundColor': 'lightpink',
          fontSize: "20px",
          paddingLeft: "5px",
          paddingRight: "5px",
          borderRadius: "5px"
        }}>{this.puhasta(error[0])}</span> <EastIcon/> <span style={{
                'backgroundColor': 'lightgreen',
                fontSize: "20px",
                paddingLeft: "5px",
                paddingRight: "5px",
                borderRadius: "5px"
              }}>{this.puhasta(error[1])}</span> <span style={{fontSize: "20px", fontWeight: "bold"}}>|</span>
                <Box display="flex" gap="15px">

                  <Button size="30px" color="success" sx={{borderRadius: 30, padding: 0, minHeight: 30, minWidth: 30}}
                          variant="contained"
                          onClick={() => this.asenda(error[2] - error[0].length, error[0], error[1])}><DoneIcon
                    fontSize="medium"/></Button>
                  <Button size="30px" color="error" sx={{borderRadius: 30, padding: 0, minHeight: 30, minWidth: 30}}
                          variant="contained"
                          onClick={() => this.asenda(error[2] - error[0].length, error[0], error[1])}><CloseIcon
                    fontSize="medium"/></Button>
                </Box>
              </Box></Box></Box>)
      })}
    </Box>)
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
      let vahetus = <Box key={"sm" + v}
                         style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
      <span
        style={{
          'backgroundColor': 'lightpink',
          fontSize: "20px",
          paddingLeft: "5px",
          paddingRight: "5px",
          borderRadius: "5px"
        }}>{this.puhasta(this.state.sisusonad[v])}</span> <EastIcon/> <span style={{
        'backgroundColor': 'lightgreen',
        fontSize: "20px",
        paddingLeft: "5px",
        paddingRight: "5px",
        borderRadius: "5px"
      }}>{this.puhasta(this.state.vastussonad[v])}</span> <span style={{fontSize: "20px", fontWeight: "bold"}}>|</span>
        <IconButton size="small" variant="contained"
                    onClick={() => this.asenda(this.state.sisukohad[v] - this.state.sisusonad[v].length, this.state.sisusonad[v], this.state.vastussonad[v])}><CheckCircleIcon
          fontSize="large"/></IconButton><br/>
      </Box>
      this.setState({yksikmuutus: vahetus});
    } else {
      this.setState({yksikmuutus: false});
    }
  }

  //upload text to alasisu
  sendTextFromFile(data) {
    this.setState({alasisu: data}, function () {
      this.keepHistory();
    });
  }

  //history for undo and redo
  //called by alaMuutus when a change is made
  keepHistory() {
    currentHistory += 1
    history.push(this.state.alasisu)
  }

  //undo and redo
  handleUndo() {
    if (currentHistory === 0) {
      return;
    }
    currentHistory -= 1
    const previousFromHistory = history[currentHistory]
    this.setState({alasisu: previousFromHistory})
  }

  handleRedo() {
    //if on last change then nothing to redo
    if (currentHistory === history.length - 1) {
      return;
    }
    currentHistory += 1
    const nextFromHistory = history[currentHistory]
    this.setState({alasisu: nextFromHistory})
  }

  render() {
    return (
      <Card raised={true}
            square={true}
            elevation={2}>
        <p/>
        <Box display="flex">
          <div>
            <span className="material-symbols-outlined"
                  onClick={this.handleUndo}>undo</span>
            <span className="material-symbols-outlined"
                  onClick={this.handleRedo}>redo</span>
          </div>
        </Box>

        <div className="correction-container">
          <div>
            <br/><br/>
            <Box>
              <TextUpload sendTextFromFile={this.sendTextFromFile}/>
              <div id="highlights"
                   ref={(e) => this.taust1 = e}>{this.state.taustakood}</div>
              <textarea id="corrector-textarea"
                        onScroll={() => this.kerimine()}
                        ref={(e) => this.ala1 = e}
                        onChange={(event) => this.alaMuutus(event)}
                        value={this.state.alasisu}
                        spellCheck={false}
                        onMouseUp={(event) => this.tekstialaHiir(event)}
                        placeholder={"Kopeeri või kirjuta siia analüüsitav tekst"}

              />
            </Box>
            <Box marginTop="-200px">
              <Button
                variant="contained"
                onClick={() => this.kordama()}>Analüüsi
              </Button>
            </Box>

          </div>
          <div className="corrector-tab-container">
            <TabContext value={this.state.avatudkaart}>
              <TabList centered={true} onChange={this.handleTabChange}>
                <Tab
                  value="korrektuur"
                  label="korrektuur"
                />
                <Tab
                  value="hindamine"
                  label="hindamine"
                />
                <Tab
                  value="keerukus"
                  label="keerukus"
                />
                <Tab
                  value="mitmekesisus"
                  label="mitmekesisus"
                />
              </TabList>

              {!this.state.kordab &&
                <div>
                  <Box marginTop="50px">
                    <Alert severity="info">Rakenduse abil saad parandada oma teksti õigekirja ja vaadata,
                      mis keeleoskustasemele see vastab (A2–C1).
                      Loe lähemalt <a
                        href={"https://github.com/centre-for-educational-technology/evkk/wiki/Demos"}
                        target="_blank">siit</a>.</Alert>
                  </Box>
                </div>
              }
              <TabPanel value="korrektuur">
                {this.state.kordab && this.state.paringlopetatud &&
                this.state.muutuskood.props.children === "puuduvad" ?
                  <span>
                 <div style={{
                   'float': 'left',
                   'margin': '10px',
                   'width': '50%',
                   display: "flex",
                   justifyContent: "center"
                 }}>
                   <h3>Vigu ei leitud!</h3>
                 </div>
               </span>
                  :
                  <span>
             {this.state.kordab && !this.state.paringlopetatud && this.state.alasisu !== this.state.korrektorivastus[1] &&
               <Box display={"flex"} height={"200px"} alignItems={"center"} justifyContent={"center"}
                    width={"100%"}><CircularProgress/> </Box>}<br/>
                    {(this.state.yksikmuutus) ? this.state.yksikmuutus : ""
                    }<br/>
                    {this.state.vastusnahtav &&
                      <span>{this.state.tasemevastus ? this.state.vastuskood : "algus"}</span>}
                    {this.state.kordab && this.state.paringlopetatud ? this.loadErrors() : ""}
             </span>
                }
              </TabPanel>
              <TabPanel value="hindamine">
                {this.state.kordab && <div>
                  <span>{this.renderTase()}</span></div>}
              </TabPanel>
              <TabPanel value="keerukus">
                <div>
                  {this.state.kordab && <div>
                    {(!this.state.keerukusvastus[0] > 0) ?
                      <Box display={"flex"} height={"200px"} alignItems={"center"} justifyContent={"center"}
                           width={"100%"}><CircularProgress/> </Box> : ""}</div>}
                  {this.state.kordab && this.state.keerukusvastus[0] > 0 &&
                    <div style={{marginLeft: "10%", width: "100%"}}><h3>Keerukuse andmed</h3>
                      <table width={"80%"}>
                        <tbody>
                        <tr className="corrector-border-bottom">
                          <td style={{width: "90%"}}>Lauseid</td>
                          <td style={{width: "10%"}}>{this.state.keerukusvastus[0]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td>Sõnu</td>
                          <td>{this.state.keerukusvastus[1]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td>Paljusilbilisi sõnu</td>
                          <td>{this.state.keerukusvastus[2]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td>Silpe</td>
                          <td>{this.state.keerukusvastus[3]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td>Pikki sõnu</td>
                          <td>{this.state.keerukusvastus[4]}</td>
                        </tr>
                        </tbody>
                      </table>
                      <br/><br/>
                      <Box><Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"}
                                       marginTop={"20px"}
                                       gutterBottom>
                        SMOG INDEX: {parseFloat(this.state.keerukusvastus[5]).toFixed()}
                      </Typography>
                      </Box>
                      <Box>
                        <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"} marginTop={"20px"}
                                    gutterBottom>
                          Flesch-Kincaidi indeks: {parseFloat(this.state.keerukusvastus[6]).toFixed()}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"} marginTop={"20px"}
                                    gutterBottom>
                          LIX INDEX: {this.state.keerukusvastus[7]}
                        </Typography>
                      </Box>

                      {/*  TODO      <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"} marginTop={"20px"}
                                gutterBottom>
                      SMOG INDEX
                    </Typography>
                    <Box width={"80%"} height={"50px"} display={"flex"} justifyContent={"center"}>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>0</Typography>
                      </Box>
                      <Box width={"80%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <this.customSlider
                          valueLabelDisplay="on"
                          track={false}
                          disabled={true}
                          min={0}
                          max={20}
                          step={1}
                          defaultValue={parseFloat(this.state.keerukusvastus[5]).toFixed()}
                        />
                      </Box>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>20</Typography>
                      </Box>
                    </Box>
                    <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"} marginTop={"20px"}
                                gutterBottom>
                      Flesch-Kincaidi indeks
                    </Typography>
                    <Box width={"80%"} height={"50px"} display={"flex"} justifyContent={"center"}>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>0</Typography>
                      </Box>
                      <Box width={"80%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <this.customSlider
                          valueLabelDisplay="on"
                          track={false}
                          disabled={true}
                          min={0}
                          max={100}
                          step={1}
                          defaultValue={parseFloat(this.state.keerukusvastus[6]).toFixed()}
                        />
                      </Box>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>100</Typography>
                      </Box>
                    </Box>
                    <Typography alignContent={"center"} fontSize={"20px"} marginBottom={"20px"} marginTop={"20px"}
                                gutterBottom>
                      LIX INDEX
                    </Typography>
                    <Box width={"80%"} height={"50px"} display={"flex"} justifyContent={"center"}>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>20</Typography>
                      </Box>
                      <Box width={"80%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <this.customSlider
                          valueLabelDisplay="on"
                          track={false}
                          disabled={true}
                          min={20}
                          max={60}
                          step={1}
                          defaultValue={this.state.keerukusvastus[7]}
                        />
                      </Box>
                      <Box width={"10%"} height={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"}>
                        <Typography fontSize={"25px"}>60</Typography>
                      </Box>
                    </Box>*/}
                      <div style={{fontSize: "20px", marginTop: "20px"}}>Pakutav
                        keerukustase: {this.state.keerukusvastus[11]}</div>
                    </div>
                  }
                </div>
              </TabPanel>
              <TabPanel value="mitmekesisus">
                <div>
                  {this.state.kordab && this.state.mitmekesisusvastus[10] === 0 ?
                    <Box display={"flex"} height={"200px"} alignItems={"center"} justifyContent={"center"}
                         width={"100%"}><CircularProgress/> </Box> : ""}
                  {this.state.mitmekesisusvastus[10] > 0 &&
                    <div style={{marginLeft: "10%", width: "100%"}}><h3>Sõnavara mitmekesisuse andmed</h3>
                      <table width={"80%"}>
                        <tbody>
                        <tr className="corrector-border-bottom">
                          <td style={{width: "90%"}}>Sõnu</td>
                          <td style={{width: "10%"}}>{this.state.mitmekesisusvastus[10]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td>Lemmasid ehk erinevaid sõnu</td>
                          <td>{this.state.mitmekesisusvastus[11]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td title="lemmade arv / √(2 * sõnade arv)  (Carroll, 1964)">Korrigeeritud lemmade-sõnade
                            suhtarv -
                            KLSS <br/>(ingl Corrected Type-Token Ratio)
                          </td>
                          <td>{this.state.mitmekesisusvastus[0]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td title="lemmade arv /  √(sõnade arv)  (Guiraud, 1960)">Juuritud lemmade-sõnade suhtarv -
                            JLSS <br/>(ingl Root Type-Token Ratio)
                          </td>
                          <td>{this.state.mitmekesisusvastus[1]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td
                            title="Indeks mõõdab lemmade ja sõnade suhtarvu järjestikustes tekstiosades. Algul on suhtarv 1. Iga sõna juures arvutatakse see uuesti, kuni väärtus langeb alla piirarvu 0,72. Tsükkel kordub, kuni teksti lõpus jagatakse sõnade arv selliste tsüklite arvuga. Seejärel korratakse sama, liikudes tekstis tagantpoolt ettepoole. MTLD on nende kahe teksti keskväärtus. (McCarthy &amp; Jarvis, 2010)">MTLD
                            indeks <br/>(ingl Measure of Textual Lexical Diversity)
                          </td>
                          <td>{this.state.mitmekesisusvastus[4]}</td>
                        </tr>
                        <tr className="corrector-border-bottom">
                          <td
                            title="Indeksi arvutamiseks leitakse iga tekstis sisalduva lemma esinemistõenäosus juhuslikus 42-sõnalises tekstiosas. Kuna kõigi võimalike tekstikatkete arv on enamasti väga suur, arvutatakse tõenäosused hüpergeomeetrilise jaotuse funktsiooni abil. Kõigi lemmade esinemistõenäosused summeeritakse. (McCarthy &amp; Jarvis, 2007)">HDD
                            indeks <br/>(ingl Hypergeometric Distribution D)
                          </td>
                          <td>{this.state.mitmekesisusvastus[5]}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>}
                </div>
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </Card>
    );
  }
}

export default Correction;
