import React, {Component} from 'react';
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import TextUpload from '../tools/wordanalyser/textupload/TextUpload';
import "../components/styles/Adding.css"

class Adding extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avalikkusNupp: true,
      pealkiri: "",
      kirjeldus: "",
      sisu: "",
      liik: "akadeemiline",
      oppematerjal: "",
      akadOppematerjal: [],
      akadOppematerjalMuu: "",
      mitteakadAlamliik: "",
      akadKategooria: "",
      akadAlamliik: "",
      artikkelValjaanne: "",
      artikkelAasta: "",
      artikkelNumber: "",
      artikkelLehekyljed: "",
      autoriVanus: "",
      autoriSugu: "",
      autoriOppeaste: "",
      autoriTeaduskraad: "",
      autoriHaridus: "",
      autoriEriala: "",
      autoriEmakeel: "",
      autorKakskeelne: false,
      autoriMuudKeeled: "",
      muukeel: "",
      autoriElukohariik: "eesti",
      elukohariikMuu: "",
      nousOlek: false,
      ennistusNupp: false
    };
    this.startingstate = {...this.state};
    this.previous = {...this.state};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendTextFromFile = this.sendTextFromFile.bind(this);
    this.formDataElement = React.createRef();
  }

  kuvaTingimused() {
    alert("LUBA\n" +
      "Luban kasutada oma teksti ja taustaandmeid õppejõududel ja üliõpilastel, " +
      "õpetajatel ja õppijatel, teadustöötajatel ja tarkvaraarendajatel erialase töö ning " +
      "keeleõppe vajadustel. \n" +
      "Isikuandmed on eemaldatud, autorit pole andmebaasis märgitud. Kui korpusesse soovitakse " +
      "lisada avalikult kättesaadav tekst, siis tuleb järgida väljaande litsentsitingimusi. Kõik " +
      "autoriõigused on tagatud. ");
  }

  handleChange(event) {
    if (event.target.type === "checkbox") {
      this.setState({[event.target.name]: event.target.checked});
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.previous = {...this.state};
    const request_test = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      },
    };
    this.setState(this.startingstate);
    this.setState({ennistusnupp: true});
    fetch("/api/texts/lisatekst", request_test).then(() => alert("salvestatud"));
  }

  taastaVormiSisu() {
    this.setState(this.previous, () => this.setState(
      {"pealkiri": "", "kirjeldus": "", "sisu": "", "ennistusnupp": false}));
  }

  sendTextFromFile(tekst) {
    this.setState({sisu: tekst});
  }

  render() {
    return (
      <div className='add-container'>
        <div style={{width: "100%", textAlign: "center"}}>
          <Typography marginBottom="50px" variant="h5"><strong>Lisa uus tekst</strong></Typography>
        </div>
        <form onSubmit={this.handleSubmit}
              id="f1"
              ref={this.formDataElement}>
          <Grid container xs={12}>
            <Grid
              item
              xs={6}
              direction="column">
              <Grid item>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet"/>
                {/*       <input type="file"
                       name="file"
                       onChange={(e) => this.readFile(e.target.form)}/> */}
                <TextUpload sendTextFromFile={this.sendTextFromFile}/>

              </Grid>
              <Grid item xs={2}>
                <div>
                  <TextField required
                             multiline
                             size="small"
                             helperText="Kirjuta siia teksti pealkiri"
                             label="Pealkiri"
                             variant="outlined"
                             name="pealkiri"
                             value={this.state.pealkiri}
                             onChange={this.handleChange}
                             style={{width: "75%"}}></TextField>
                </div>
                {this.state.avalikkusNupp && <div>
                  <TextField multiline
                             rows={2}
                             helperText="Kirjuta siia ülesande kirjeldus"
                             label="Ülesande kirjeldus"
                             variant="outlined"
                             name="kirjeldus"
                             value={this.state.kirjeldus}
                             onChange={this.handleChange}
                             style={{width: "75%", marginTop: 20}}></TextField>
                </div>}
                <div>
                  <TextField required
                             multiline
                             rows={8}
                             helperText="Laadi tekst üles või kirjuta see siia tekstikasti"
                             label="Tekst"
                             variant="outlined"
                             name="sisu"
                             value={this.state.sisu}
                             onChange={this.handleChange}
                             style={{width: "90%", marginTop: 20}}></TextField>
                </div>
              </Grid>
            </Grid>
            <Grid container
                  item
                  xs={6}
                  direction="column"
                  style={{padding: "20px"}}>
              {this.state.avalikkusNupp && <div style={{width: "100%"}}>
                <Grid container item xs={12} spacing={2}>
                <Grid container item direction="column" style={{width: "100%"}} xs={6}>
                  <Grid>
                    <div><h5>Teksti andmed</h5></div>
                    <FormControl size="small" className="form-control">
                      <InputLabel>Tekst</InputLabel>
                      <Select
                        name="liik"
                        value={this.state.liik}
                        label="Tekst"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"akadeemiline"}>Akadeemiline</MenuItem>
                        <MenuItem value={"mitteakadeemiline"}>Mitteakadeemiline</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {this.state.liik === "akadeemiline" && <Grid>
                    <Grid>
                      <FormControl size="small" className="form-control">
                        <InputLabel id="valdkond-select-label">Valdkond</InputLabel>
                        <Select
                          label="Valdkond"
                          labelId="valdkond-select-label"
                          name="autoriEriala"
                          value={this.state.autoriEriala}
                          onChange={this.handleChange}
                          required
                        >
                          <MenuItem value={"biojakeskkonnateadused"}>Bio- ja keskkonnateadused</MenuItem>
                          <MenuItem value={"yhiskondjakultuur"}>Ühiskonnateadused ja kultuur</MenuItem>
                          <MenuItem value={"terviseuuringud"}>Terviseuuringud</MenuItem>
                          <MenuItem value={"loodustehnika"}>Loodusteadused ja tehnika</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>}
                  {this.state.liik === "mitteakadeemiline" && <Grid>
                    <FormControl size="small" className="form-control">
                      <InputLabel id="mitteakad-alamliik-select-label">Tekstiliik</InputLabel>
                      <Select
                        labelId="mitteakad-alamliik-select-label"
                        name="mitteakadAlamliik"
                        value={this.state.mitteakadAlamliik}
                        label="Tekstiliik"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"k2eesti_riiklik_eksamitoo"}>K2 riiklik eksamitöö</MenuItem>
                        <MenuItem value={"k2eesti_ol-loovkirjutis"}>K2 olümpiaaditöö loovkirjutis</MenuItem>
                        <MenuItem value={"k2eesti_keeleope"} disabled>K2 keeleõpe</MenuItem>
                        <MenuItem value={"k2eesti_tolge"}>Tõlge</MenuItem>
                        <MenuItem value={"k2eesti_eksamitoo"}>Eksamitöö</MenuItem>
                        <MenuItem value={"k2eesti_kontrolltoo_test"}>Kontrolltöö/test</MenuItem>
                        <MenuItem value={"k2eesti_loovkirjutis"}>Loovkirjutis</MenuItem>
                        <MenuItem value={"k2eesti_kiri"} disabled>K2 kiri</MenuItem>
                        <MenuItem value={"k2eesti_kiri_isiklik"}>Isiklik</MenuItem>
                        <MenuItem value={"k2eesti_kiri_poolametlik"}>(Pool)ametlik</MenuItem>
                        <MenuItem value={"k2eesti_harjutus"} disabled>K2 Harjutus</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_dialoog"}>Dialoog</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_etteutlus"}>Etteütlus</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_juhend"}>Juhend</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_kirjeldus"}>Kirjeldus</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_kuulutus"}>Kuulutus</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_kone"}>Kõne</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_laused"}>Laused</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_leping"}>Leping</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_lunktekst"}>Lünktekst</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_menuu"}>Menüü</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_reklaam"}>Reklaam</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_retsept"}>Retsept</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_teejuht"}>Teejuht</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_vastused"}>Vastused küsimustele</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_umberjutustus"}>Ümberjutustus</MenuItem>
                        <MenuItem value={"k2eesti_harjutus_ots"} disabled>K1 eesti keel</MenuItem>
                        <MenuItem value={"k1eesti_arvamuslugu"}>Arvamuslugu</MenuItem>
                        <MenuItem value={"k1eesti_eksamitoo"}>Eksamitöö</MenuItem>
                        <MenuItem value={"k1eesti_harjutus"}>Harjutus</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>}
                  {this.state.liik === "akadeemiline" && <Grid>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="akad-kategooria-select-label">Kategooria</InputLabel>
                      <Select
                        labelId="akad-kategooria-select-label"
                        name="akadKategooria"
                        value={this.state.akadKategooria}
                        label="Kategooria"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"ak_erialaopingud"}>Erialaõpingud</MenuItem>
                        <MenuItem value={"ak_uurimused"}>Uurimused</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>}
                  {this.state.liik === "akadeemiline" && this.state.akadKategooria === "ak_erialaopingud" && <Grid>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="akad-alamliik-select-label">Tekstiliik</InputLabel>
                      <Select
                        labelId="akad-alamliik-select-label"
                        name="akadAlamliik"
                        value={this.state.akadAlamliik}
                        label="Alamliik"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"ak_analuus"}>Analüüs</MenuItem>
                        <MenuItem value={"ak_eriala_essee"}>Essee</MenuItem>
                        <MenuItem value={"ak_eriala_kursusetoo"}>Kursusetöö</MenuItem>
                        <MenuItem value={"ak_eriala_referaat"}>Referaat</MenuItem>
                        <MenuItem value={"ak_eriala_retsensioon"}>Retsensioon</MenuItem>
                        <MenuItem value={"ak_eriala_seminaritoo"}>Seminaritöö</MenuItem>
                        <MenuItem value={"ak_eriala_ulevaade"}>Ülevaade</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>}
                  {this.state.liik === "akadeemiline" && this.state.akadKategooria === "ak_uurimused" && <><Grid>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="akad-alamliik-select-label">Tekstiliik</InputLabel>
                      <Select
                        labelId="akad-alamliik-select-label"
                        name="akadAlamliik"
                        value={this.state.akadAlamliik}
                        label="Alamliik"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"ak_uurimus_artikkel"}>Artikkel</MenuItem>
                        <MenuItem value={"ak_uurimus_ettekanne"}>Ettekanne</MenuItem>
                        <MenuItem value={"ak_uurimus_kokkuvote"}>Kokkuvõte</MenuItem>
                        <MenuItem value={"ak_uurimus_batoo"}>Bakalaureusetöö</MenuItem>
                        <MenuItem value={"ak_uurimus_diplomitoo"}>Diplomitöö</MenuItem>
                        <MenuItem value={"ak_uurimus_matoo"}>Magistritöö</MenuItem>
                        <MenuItem value={"ak_uurimus_phdtoo"}>Doktoritöö</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                    {this.state.akadAlamliik === "ak_uurimus_artikkel" && <>
                        <Grid>
                          <FormControl className="form-control" size="small">
                            <TextField
                              multiline required
                              label="Väljaanne "
                              variant="outlined"
                              name="artikkelValjaanne"
                              value={this.state.artikkelValjaanne}
                              onChange={this.handleChange}
                              style={{width: "75%"}}></TextField>
                          </FormControl>
                        </Grid>
                        <Grid>
                          <FormControl className="form-control" size="small">
                            <TextField
                              multiline required
                              label="Aasta "
                              variant="outlined"
                              name="artikkelAasta"
                              value={this.state.artikkelAasta}
                              onChange={this.handleChange}
                              style={{width: "75%"}}></TextField>
                          </FormControl>
                        </Grid>
                        <Grid>
                          <FormControl className="form-control" size="small">
                            <TextField
                              multiline
                              label="Number"
                              variant="outlined"
                              name="artikkelNumber"
                              value={this.state.artikkelNumber}
                              onChange={this.handleChange}
                              style={{width: "75%"}}></TextField>
                          </FormControl>
                        </Grid>
                        <Grid>
                          <FormControl className="form-control" size="small">
                            <TextField
                              multiline
                              label="Leheküljed"
                              variant="outlined"
                              name="artikkelLehekyljed"
                              value={this.state.artikkelLehekyljed}
                              onChange={this.handleChange}
                              style={{width: "75%"}}></TextField>
                          </FormControl>
                        </Grid>

                      </>
                    }
                  </>
                  }
                  <Grid>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="sugu-materjalid-label">Kasutatud õppe- või abimaterjale</InputLabel>
                      <Select
                        labelId="sugu-materjalid-label"
                        name="oppematerjal"
                        value={this.state.oppematerjal}
                        label="Kasutatud õppe- või abimaterjale"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"jah"}>jah</MenuItem>
                        <MenuItem value={"ei"}>ei</MenuItem>
                      </Select>
                    </FormControl>
                    {this.state.oppematerjal === "jah" && this.state.liik === "akadeemiline" && <><Grid>
                      <FormControl className="form-control" size="small">
                        <InputLabel>Abimaterjal</InputLabel>
                        <Select multiple
                                labelId="akad-materjalid-label"
                                name="akadOppematerjal"
                                value={this.state.akadOppematerjal}
                                label="Abimaterjal"
                                onChange={this.handleChange}
                        >
                          <MenuItem value={"tolkesonastik"}>Tõlkesõnastik/masintõlge</MenuItem>
                          <MenuItem value={"ykskeelnesonastik"}>Ükskeelne sõnastik (k.a. veebisõnastikud)</MenuItem>
                          <MenuItem value={"terminisonastik"}>Erialane terminisõnastik või -baas</MenuItem>
                          <MenuItem value={"kasiraamat"}>Erialane käsiraamat või teatmik</MenuItem>
                          <MenuItem value={"automaatkontroll"}>Automaatkontroll</MenuItem>
                          <MenuItem value={"muu"}>Muu</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                      {this.state.akadOppematerjal.indexOf("muu") !== -1 &&
                        <Grid>
                          <FormControl className="form-control" size="small">
                            <TextField
                              multiline
                              label="Muu õppematerjal"
                              variant="outlined"
                              size="small"
                              name="akadOppematerjalMuu"
                              value={this.state.akadOppematerjalMuu}
                              onChange={this.handleChange}
                              ></TextField>
                          </FormControl>
                        </Grid>
                      }
                    </>}
                  </Grid>
                </Grid>
                <Grid container item direction="column" style={{width: "100%"}} xs={6}>
                  <Grid>
                    <h5>Teksti autori andmed</h5>
                    <TextField className="form-control" size="small"
                               type="number"
                               label="Vanus:"
                               variant="outlined"
                               name="autoriVanus"
                               value={this.state.autoriVanus}
                               onChange={this.handleChange}></TextField><br/>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="sugu-select-label">Sugu</InputLabel>
                      <Select
                        labelId="sugu-select-label"
                        name="autoriSugu"
                        value={this.state.autoriSugu}
                        label="Sugu"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"m"}>mees</MenuItem>
                        <MenuItem value={"n"}>naine</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <FormControl className="form-control" size="small">

                      <TextField
                        size="small"
                        multiline required
                        label="Emakeel"
                        variant="outlined"
                        name="autoriEmakeel"
                        value={this.state.autoriEmakeel}
                        onChange={this.handleChange}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <FormControl className="form-control" size="small">

                      <TextField
                        size="small"
                        multiline
                        label="Muud õppe-, töö- või suhtluskeeled"
                        variant="outlined"
                        title={"Sisesta keeled komaga eraldatult, märkides esimesena keele, mida kõige paremini oskad"}
                        name="autoriMuudKeeled"
                        value={this.state.autoriMuudKeeled}
                        onChange={this.handleChange}></TextField>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="elukohariik">Elukohariik:</InputLabel>
                      <Select value={this.state.autoriElukohariik}
                              onChange={this.handleChange}
                              name="autoriElukohariik"
                              label="Elukohariik:"
                              labelId="elukohariik">
                        <MenuItem value={"eesti"}>Eesti</MenuItem>
                        <MenuItem value={"leedu"}>Leedu</MenuItem>
                        <MenuItem value={"läti"}>Läti</MenuItem>
                        <MenuItem value={"rootsi"}>Rootsi</MenuItem>
                        <MenuItem value={"soome"}>Soome</MenuItem>
                        <MenuItem value={"venemaa"}>Venemaa</MenuItem>
                        <MenuItem value={"muu"}>Muu</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {this.state.autoriElukohariik === "muu" &&
                    <Grid>
                      <FormControl className="form-control" size="small">
                        <TextField
                          multiline
                          label="Elukohariik"
                          variant="outlined"
                          name="elukohariikMuu"
                          value={this.state.elukohariikMuu}
                          onChange={this.handleChange}
                          style={{width: "75%"}}></TextField>
                      </FormControl>
                    </Grid>}
                  {this.state.liik === "akadeemiline" && <Grid>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="oppeaste-select-label">Õppeaste</InputLabel>
                      <Select
                        labelId="oppeaste-select-label"
                        name="autoriOppeaste"
                        value={this.state.autoriOppeaste}
                        label="Õppeaste"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"bakalaureuseope"}>Bakalaureuseõpe</MenuItem>
                        <MenuItem value={"magistriope"}>Magistriõpe</MenuItem>
                        <MenuItem value={"doktoriope"}>Doktoriõpe</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>}
                  {this.state.liik === "akadeemiline" && <Grid>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="teaduskraad-select-label">Teaduskraad</InputLabel>
                      <Select
                        labelId="teaduskraad-select-label"
                        name="autoriTeaduskraad"
                        value={this.state.autoriTeaduskraad}
                        label="Teaduskraad"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"ba"}>Bakalaureusekraad</MenuItem>
                        <MenuItem value={"ma"}>Magistrikraad</MenuItem>
                        <MenuItem value={"phd"}>Doktorikraad</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>}
                  {this.state.liik === "mitteakadeemiline" && <Grid>
                    <FormControl className="form-control" size="small">
                      <InputLabel id="haridus-select-label">Autori haridus</InputLabel>
                      <Select
                        labelId="haridus-select-label"
                        name="autoriHaridus"
                        value={this.state.autoriHaridus}
                        label="Haridus"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"alusharidus"}>alusharidus</MenuItem>
                        <MenuItem value={"pohiharidus"}>põhiharidus</MenuItem>
                        <MenuItem value={"keskharidus"}>keskharidus</MenuItem>
                        <MenuItem value={"keskeriharidus"}>keskeriharidus</MenuItem>
                        <MenuItem value={"rakenduskorgharidus"}>rakenduskõrgharidus</MenuItem>
                        <MenuItem value={"korgharidus"}>kõrgharidus</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>}
                </Grid>
                </Grid>
              </div>}
            </Grid>
          </Grid>
          <Grid marginTop="20px" item>
            <FormGroup style={{width: "20%"}}>
              <FormControlLabel control={<Switch color="success" checked={this.state.avalikkusNupp} value="privaatne" name="avalikkusNupp"
                                                 onChange={this.handleChange}/>} label={"Avalikusta tekst"}/>
            </FormGroup>
          </Grid>
          <div className="buttonHolder">
            <Grid style={{paddingTop: "20px"}}  container
                  spacing={1}>
              <Grid item>
                <Alert severity="info"><Typography fontSize={12}>Teksti üles laadides nõustun <u style={{cursor: "pointer"}}
                                                                                                 onClick={() => this.kuvaTingimused()}>ELLE
                  kasutustingimustega</u>.</Typography></Alert>
              </Grid>
            </Grid>
            <div style={{paddingTop: "10px", paddingBottom: "50px"}}>
              <Button type="submit"
                      variant="text"
                      style={{
                        background: "#3898ec",
                        border: 0,
                        borderRadius: 4,
                        height: 48,
                        width: 160,
                        color: "white",
                        fontSize: 16
                      }}>Laadi üles</Button> &nbsp;
              {this.state.ennistusnupp && <Button type="button" onClick={() => this.taastaVormiSisu()}
                                                  variant="text"
                                                  style={{
                                                    background: "#3898ec",
                                                    border: 0,
                                                    borderRadius: 4,
                                                    height: 48,
                                                    width: 160,
                                                    color: "white",
                                                    fontSize: 16
                                                  }}>Ennista andmed</Button>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Adding;
