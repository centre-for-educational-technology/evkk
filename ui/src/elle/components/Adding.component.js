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
      avalikkusValik: "privaatne",
      liik: "akadeemiline",
      oppematerjal: "",
      akadOppematerjal: "",
      mitteakadAlamliik: "",
      akadAlamliik: "",
      autoriVanus: "",
      autoriSugu: "",
      autoriOppeaste: "",
      autoriHaridus: "",
      autoriEriala: "",
      autoriEmakeel: "",
      autorKakskeelne: false,
      autoriMuudKeeled: "",
      autoriElukohariik: "eesti",
      nousOlek: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formDataElement = React.createRef();
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
                                    label="Hoia privaatsena"/>
                  <FormControlLabel value="avalik"
                                    control={<Radio/>}
                                    label="Avalikusta korpusesse"/>
                </RadioGroup>
              </Grid>
              {this.state.avalikkusValik === "avalik" && <>
                <Grid>
                  <FormControl>
                    <InputLabel>Teksti liik</InputLabel>
                    <Select
                      name="liik"
                      value={this.state.liik}
                      label="Teksti liik"
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
                      <InputLabel id="eriala-select-label">Autori eriala</InputLabel>
                      <Select
                        labelId="eriala-select-label"
                        name="autoriEriala"
                        value={this.state.autoriEriala}
                        label="Eriala"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"biojakeskkonnateadused"}>bio- ja keskkonnateadused</MenuItem>
                        <MenuItem value={"yhiskondjakultuur"}>Ühiskonnateadused ja kultuur</MenuItem>
                        <MenuItem value={"terviseuuringud"}>Terviseuuringud</MenuItem>
                        <MenuItem value={"loodustehnika"}>Loodusteadused ja tehnika</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>}
                {this.state.liik === "mitteakadeemiline" && <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel id="mitteakad-alamliik-select-label">Teksti alamliik</InputLabel>
                    <Select
                      labelId="mitteakad-alamliik-select-label"
                      name="mitteakadAlamliik"
                      value={this.state.mitteakadAlamliik}
                      label="Alamliik"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"amtkiri"}>Ametlik kiri</MenuItem>
                      <MenuItem value={"isikiri"}>Isiklik kiri</MenuItem>
                      <MenuItem value={"essee"}>Essee</MenuItem>
                      <MenuItem value={"referaat"}>Referaat</MenuItem>
                      <MenuItem value={"analyys"}>Analüüs</MenuItem>
                      <MenuItem value={"vastkys"}>Vastus küsimusele</MenuItem>
                      <MenuItem value={"ymberjutustus"}>Ümberjutustus</MenuItem>
                      <MenuItem value={"tolge"}>Tõlge</MenuItem>
                      <MenuItem value={"harjutus"}>Harjutus</MenuItem>
                      <MenuItem value={"arvamuslugu"}>Arvamuslugu</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>}
                {this.state.liik === "akadeemiline" && <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel id="akad-alamliik-select-label">Teksti alamliik</InputLabel>
                    <Select
                      labelId="akad-alamliik-select-label"
                      name="akadAlamliik"
                      value={this.state.akadAlamliik}
                      label="Alamliik"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"doktoritoo"}>Doktoritöö</MenuItem>
                      <MenuItem value={"vaitekirja_kokkuvote"}>Võõrkeelse väitekirja eestikeelne kokkuvõte</MenuItem>
                      <MenuItem value={"magistritoo"}>Magistritöö</MenuItem>
                      <MenuItem value={"bakalaureusetoo"}>Bakalaureusetöö</MenuItem>
                      <MenuItem value={"diplomitoo"}>Diplomitöö</MenuItem>
                      <MenuItem value={"referaat"}>Referaat</MenuItem>
                      <MenuItem value={"essee"}>Essee</MenuItem>
                      <MenuItem value={"uurimus"}>Uurimus</MenuItem>
                      <MenuItem value={"artikli_kasikiri"}>Artikli käsikiri</MenuItem>
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
                    <InputLabel id="sugu-select-label">sugu</InputLabel>
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
                    <InputLabel>Muud õppe- või töökeeled:</InputLabel>
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
                      <MenuItem value={"oppeaste"}
                                disabled>Õppeaste</MenuItem>
                      <MenuItem value={"bakalaureuseope"}>bakalaureuseõpe</MenuItem>
                      <MenuItem value={"magistriope"}>magistriõpe</MenuItem>
                      <MenuItem value={"doktoriope"}>doktoriõpe</MenuItem>
                      <MenuItem value={"teaduskraad"}
                                disabled>Teaduskraad</MenuItem>
                      <MenuItem value={"ma"}>MA</MenuItem>
                      <MenuItem value={"msc"}>MSc</MenuItem>
                      <MenuItem value={"phd"}>PhD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>}
                {this.state.liik === "mitteakadeemiline" && <Grid>
                  <FormControl sx={{m: 1, minWidth: 240}}>
                    <InputLabel id="haridus-select-label">Autori omandatud haridus</InputLabel>
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
                      <Checkbox name="nousOlek"
                                checked={this.state.nousOlek}
                                onChange={this.handleChange}/>
                    </Grid>
                    <Grid item>
                      <Typography>Teksti üles laadides nõustun <u>ELLE kasutustingimustega</u>.</Typography>
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
