import React, {Component} from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'

class Adding extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pealkiri: "",
      kirjeldus: "",
      sisu: "",
      avalikkusValik: "avalik",
      liik: "akadeemiline",
      oppematerjal: "",
      akadOppematerjal: "",
      mitteakadAlamliik: "",
      akadKategooria: "",
      akadAlamliik: "",
      autoriVanus: "",
      autoriSugu: "",
      autoriOppeaste: "",
      autoriTeaduskraad: "",
      autoriHaridus: "",
      autoriEriala: "",
      autoriEmakeel: "",
      autorKakskeelne: false,
      autoriMuudKeeled: "",
      autoriElukohariik: "eesti",
      elukohariikMuu: "",
      nousOlek: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formDataElement = React.createRef();
  }

  kuvaTingimused() {
    alert("LUBA\n" +
      "Luban kasutada oma tekste õppejõududel ja üliõpilastel, õpetajatel ja õppijatel, " +
      "teadustöötajatel ja tarkvaraarendajatel erialase töö ning keeleõppe vajadustel. Tekstid " +
      "säilitatakse ELLE arhiivis. Kõik autoriõigused on tagatud.");
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
    const request_test = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      },
    }

    fetch("/api/texts/lisatekst", request_test).then(() => alert("salvestatud"));
  }

  readFile() {
    let oData = new FormData(this.formDataElement.current);
    const request_test = {
      method: "POST",
      body: oData
    }

    fetch("/api/textfromfile", request_test)
      .then(response => response.text())
      .then(data => {
        this.setState({sisu: data});
      });
  }

  render() {
    return (
      <div className={'container'}>
        <div style={{textAlign: "center"}}>
          <Typography variant="h5"><strong>Lisa uus tekst</strong></Typography>
        </div>
        <form onSubmit={this.handleSubmit}
              id="f1"
              ref={this.formDataElement}>
          <Grid container
                columns={12}>
            <Grid container
                  item
                  xs={6}
                  direction="column"
                  style={{padding: "20px"}}>
              <Grid item>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet"/>
                <input type="file"
                       name="file"
                       onChange={(e) => this.readFile(e.target.form)}/>
              </Grid>
              <Grid item>
                <Typography><strong>Pealkiri*</strong></Typography>
                <div>
                  <TextField required
                             multiline
                             label="Kirjuta siia teksti pealkiri"
                             variant="outlined"
                             name="pealkiri"
                             value={this.state.pealkiri}
                             onChange={this.handleChange}
                             style={{width: "75%"}}></TextField>
                </div>
                {this.state.avalikkusValik === "avalik" && <div>
                  <Typography style={{paddingTop: 10}}><strong>Ülesande kirjeldus</strong></Typography>
                  <TextField multiline
                             rows={4}
                             label="Kirjuta siia ülesande kirjeldus"
                             variant="outlined"
                             name="kirjeldus"
                             value={this.state.kirjeldus}
                             onChange={this.handleChange}
                             style={{width: "75%"}}></TextField>
                </div>}
                <div>
                  <Typography style={{paddingTop: 10}}><strong>Tekst*</strong></Typography>
                  <TextField required
                             multiline
                             rows={20}
                             label="Laadi tekst üles või kirjuta see siia tekstikasti"
                             variant="outlined"
                             name="sisu"
                             value={this.state.sisu}
                             onChange={this.handleChange}
                             style={{width: "75%"}}></TextField>
                </div>
              </Grid>
            </Grid>
            <Grid container
                  item
                  xs={6}
                  direction="column"
                  style={{padding: "20px"}}>
              <Grid>
                <RadioGroup
                  value={this.state.avalikkusValik}
                  name="avalikkusValik"
                  onChange={this.handleChange}
                >
                  <FormControlLabel value="privaatne"
                                    control={<Radio/>}
                                    label="Hoia privaatsena" disabled/>
                  <FormControlLabel value="avalik"
                                    control={<Radio/>}
                                    label="Avalikusta korpusesse"/>
                </RadioGroup>
              </Grid>
              {this.state.avalikkusValik === "avalik" && <>
                <Grid>
                  <FormControl>
                    <InputLabel>Tekst</InputLabel>
                    <Select
                      name="liik"
                      value={this.state.liik}
                      label="Tekst"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"akadeemiline"}>akadeemiline</MenuItem>
                      <MenuItem value={"mitteakadeemiline"}>mitteakadeemiline</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {this.state.liik === "akadeemiline" && <Grid>
                  <Grid>
                    <FormControl sx={{m: 1, minWidth: 240}}>
                      <InputLabel id="valdkond-select-label">Valdkond</InputLabel>
                      <Select
                        labelId="valdkond-select-label"
                        name="autoriEriala"
                        value={this.state.autoriEriala}
                        label="Eriala"
                        onChange={this.handleChange}
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
                  <FormControl sx={{m: 1, minWidth: 240}}>
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
                  <FormControl sx={{m: 1, minWidth: 240}}>
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
                  <FormControl sx={{m: 1, minWidth: 240}}>
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
                {this.state.liik === "akadeemiline" && this.state.akadKategooria === "ak_uurimused" && <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
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
                </Grid>}
                <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel id="sugu-materjalid-label">Kasutatud õppe- või abimaterjale</InputLabel>
                    <Select
                      labelId="sugu-materjalid-label"
                      name="oppematerjal"
                      value={this.state.oppematerjal}
                      label="Oppematerjal"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"jah"}>jah</MenuItem>
                      <MenuItem value={"ei"}>ei</MenuItem>
                    </Select>
                  </FormControl>
                  {this.state.oppematerjal === "jah" && this.state.liik === "akadeemiline" && <Grid>
                    <FormControl sx={{m: 1, minWidth: 240}}>
                      <InputLabel>Abimaterjal</InputLabel>
                      <Select
                        labelId="akad-materjalid-label"
                        name="akadOppematerjal"
                        value={this.state.akadOppematerjal}
                        label="Akadeemiline õppematerjal"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={"tolkesõnastik"}>Tõlkesõnastik/masintõlge</MenuItem>
                        <MenuItem value={"ykskeelnesonastik"}>Ükskeelne sõnastik (k.a. veebisõnastikud)</MenuItem>
                        <MenuItem value={"terminisonastik"}>Erialane teriminisõnastik või -baas</MenuItem>
                        <MenuItem value={"kasiraamat"}>Erialane käsiraamat või teatmik</MenuItem>
                        <MenuItem value={"automaatkontroll"}>Automaatkontroll</MenuItem>
                        <MenuItem value={"muu"}>Muu</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>}
                  <h3>Teksti autori andmed</h3>
                  <TextField size="small"
                             type="number"
                             label="Vanus:"
                             variant="outlined"
                             name="autoriVanus"
                             value={this.state.autoriVanus}
                             onChange={this.handleChange}></TextField><br/>
                </Grid>
                <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
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
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel>Emakeel:</InputLabel>
                    <Select value={this.state.autoriEmakeel}
                            onChange={this.handleChange}
                            name="autoriEmakeel"
                            label="Emakeel:*"
                            labelId="emakeel">
                      <MenuItem value={"eesti"}>eesti</MenuItem>
                      <MenuItem value={"heebrea"}>heebrea</MenuItem>
                      <MenuItem value={"hollandi"}>hollandi</MenuItem>
                      <MenuItem value={"inglise"}>inglise</MenuItem>
                      <MenuItem value={"itaalia"}>itaalia</MenuItem>
                      <MenuItem value={"jaapani"}>jaapani</MenuItem>
                      <MenuItem value={"jidiš"}>jidiš</MenuItem>
                      <MenuItem value={"katalaani"}>katalaani</MenuItem>
                      <MenuItem value={"leedu"}>leedu</MenuItem>
                      <MenuItem value={"läti"}>läti</MenuItem>
                      <MenuItem value={"poola"}>poola</MenuItem>
                      <MenuItem value={"prantsuse"}>prantsuse</MenuItem>
                      <MenuItem value={"rootsi"}>rootsi</MenuItem>
                      <MenuItem value={"saksa"}>saksa</MenuItem>
                      <MenuItem value={"sloveenia"}>sloveenia</MenuItem>
                      <MenuItem value={"soome"}>soome</MenuItem>
                      <MenuItem value={"tšehhi"}>tšehhi</MenuItem>
                      <MenuItem value={"ukraina"}>ukraina</MenuItem>
                      <MenuItem value={"ungari"}>ungari</MenuItem>
                      <MenuItem value={"valgevene"}>valgevene</MenuItem>
                      <MenuItem value={"vene"}>vene</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel id="kakskeelne">Kakskeelne:</InputLabel>
                    <Checkbox checked={this.state.autorKakskeelne}
                              onChange={this.handleChange}
                              name="autorKakskeelne"/>
                  </FormControl>
                </Grid>
                {this.state.autorKakskeelne && <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel>Muu õppe- või töökeel:</InputLabel>
                    <Select value={this.state.autoriMuudKeeled}
                            onChange={this.handleChange}
                            name="autoriMuudKeeled"
                            label="Muud õppe- või töökeeled:"
                            labelId="muudkeeled">
                      <MenuItem value={"eesti"}>eesti</MenuItem>
                      <MenuItem value={"heebrea"}>heebrea</MenuItem>
                      <MenuItem value={"hollandi"}>hollandi</MenuItem>
                      <MenuItem value={"inglise"}>inglise</MenuItem>
                      <MenuItem value={"itaalia"}>itaalia</MenuItem>
                      <MenuItem value={"jaapani"}>jaapani</MenuItem>
                      <MenuItem value={"jidiš"}>jidiš</MenuItem>
                      <MenuItem value={"katalaani"}>katalaani</MenuItem>
                      <MenuItem value={"leedu"}>leedu</MenuItem>
                      <MenuItem value={"läti"}>läti</MenuItem>
                      <MenuItem value={"poola"}>poola</MenuItem>
                      <MenuItem value={"prantsuse"}>prantsuse</MenuItem>
                      <MenuItem value={"rootsi"}>rootsi</MenuItem>
                      <MenuItem value={"saksa"}>saksa</MenuItem>
                      <MenuItem value={"sloveenia"}>sloveenia</MenuItem>
                      <MenuItem value={"soome"}>soome</MenuItem>
                      <MenuItem value={"tšehhi"}>tšehhi</MenuItem>
                      <MenuItem value={"ukraina"}>ukraina</MenuItem>
                      <MenuItem value={"ungari"}>ungari</MenuItem>
                      <MenuItem value={"valgevene"}>valgevene</MenuItem>
                      <MenuItem value={"vene"}>vene</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>}
                <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
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
                      <MenuItem value={"saksa"}>Saksa</MenuItem>
                      <MenuItem value={"soome"}>Soome</MenuItem>
                      <MenuItem value={"venemaa"}>Venemaa</MenuItem>
                      <MenuItem value={"muu"}>Muu</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {this.state.autoriElukohariik === "muu" &&
                  <Grid>
                    <FormControl sx={{m: 1, minWidth: 240}}>

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
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel id="oppeaste-select-label">Autori õppeaste</InputLabel>
                    <Select
                      labelId="oppeaste-select-label"
                      name="autoriOppeaste"
                      value={this.state.autoriOppeaste}
                      label="Oppeaste"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"bakalaureuseope"}>Bakalaureuseõpe</MenuItem>
                      <MenuItem value={"magistriope"}>Magistriõpe</MenuItem>
                      <MenuItem value={"doktoriope"}>Doktoriõpe</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>}
                {this.state.liik === "akadeemiline" && <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel id="teaduskraad-select-label">Autori teaduskraad</InputLabel>
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
                  <FormControl sx={{m: 1, minWidth: 240}}>
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
                <div className="buttonHolder">
                  <Grid container
                        spacing={1}>
                    <Grid item>
                      <Typography>Teksti üles laadides nõustun <u style={{cursor: "pointer"}}
                                                                  onClick={() => this.kuvaTingimused()}>ELLE
                        kasutustingimustega</u>.</Typography>
                    </Grid>
                  </Grid>
                  <br/>
                  <div style={{textAlign: "center"}}>
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
                            }}>Laadi üles</Button>
                  </div>
                </div>
              </>}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Adding;
