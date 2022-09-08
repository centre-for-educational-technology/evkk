import React, {Component, useEffect, useState} from 'react';
import { withStyles } from "@material-ui/core/styles";
import {Checkbox, Button, TextField, RadioGroup, FormControlLabel, Radio, Typography, Grid, Box, FormControl, Select, MenuItem, InputLabel} from '@mui/material'

const styles = theme => ({
	root: {
		backgroundColor: "white",
	},
	form: {
		paddingLeft: "17%"
	},
	button: {
		background: "#3898ec",
		border: 0,
		borderRadius: 4,
		height: 48,
		width: 160,
		color: "white",
		fontSize: 16,
	},
	radio: {
		'&$checked': {
            color: "#3898ec",
        },
		color: "#3898ec",
		height: 20,
		width: 20,
		paddingLeft: 3
	},
	textArea: {
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#3898ec"
		},
		"& .MuiInputLabel-outlined.Mui-focused": {
			color: "#3898ec"
		},
	},
	input: {
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#3898ec"
		},
		"& .MuiInputLabel-outlined.Mui-focused": {
			color: "#3898ec"
		},
		height: 40,
		width: 160
	},
	checkBox: {
		color: "#3898ec",
		height: 0,
		width: 0
	},
	holder: {
		paddingTop: 5
	}
});

const User = () => {
	return <FormControl sx={{ m: 0, width: 240}} size="small">
	<InputLabel id="autoriMuudKeeledLisa">Muud õppe- või töökeeled:</InputLabel>
	<Select name="autoriMuudKeeledLisa" label="Muud õppe- või töökeeled:" labelId="autoriMuudKeeledLisa">
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
}

class Adding extends Component {

	constructor(props) {
		super(props);
		this.state = {pealkiri:"", kirjeldus:"", sisu:"", liik:"Akadeemiline", oppematerjal:"", autoriVanus:"", autoriSugu:"", autoriOppeaste:"", autoriEriala:"", autoriEmakeel:"", autoriMuudKeeled:"", autoriElukohariik:"eesti"};
		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {users: []};
		this.formDataElement = React.createRef();

  	}


	addField = () => {
		this.setState({
			users: [...this.state.users, <User />]
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]:event.target.value});
	}

	handleSubmit(event) {
		const { pealkiri, kirjeldus, sisu, liik, oppematerjal, tekstiAutor, autoriVanus, autoriSugu, autoriOppeaste, autoriEriala, autoriEmakeel, autoriMuudKeeled, autoriElukohariik, nousOlek } = this.state
		event.preventDefault()
		alert(`
		pealkiri : ${pealkiri}
		kirjeldus : ${kirjeldus}
		sisu : ${sisu}
		liik : ${liik}
		oppematerjal : ${oppematerjal}
		tekstiAutor : ${tekstiAutor}
		autoriVanus : ${autoriVanus}
		autoriSugu : ${autoriSugu}
		autoriOppeaste : ${autoriOppeaste}
		autoriEriala : ${autoriEriala}
		autoriEmakeel : ${autoriEmakeel}
		autoriMuudKeeled : ${autoriMuudKeeled}
		autoriElukohariik : ${autoriElukohariik}
		nousOlek : ${nousOlek}
		`)

		console.log(sisu.match(/(\w+)/g).length);
	}

	readFile(f){
       console.log(this.formDataElement.current);
	   let oData = new FormData(this.formDataElement.current);
	   const request_test = {
		 method: "POST",
		 body: oData
	   }
   
	   fetch("/api/textfromfile", request_test)
		 .then(response => response.text())
		 .then(data => {
			 console.log(data);
			 this.setState({sisu: data});
		   //props.sendTextFromFile(data);
		 });
/*
	   fetch("/api/textfromfile", {method:"POST",
	   headers: {
		 'Accept': 'application/json',
		 'Content-Type': 'application/json',
		 'enctype': 'multipart/form-data'
	   },
	   body: JSON.stringify(f)});*/
	}

    readFile2(form){
		var oData = new FormData(form);
        console.log(oData);
	}


    render() {
		const { classes } = this.props;

        return (
			<div className={'container'}>
				<div style={{ textAlign:"center"}}>
					<Typography variant="h5"><strong>Lisa uus tekst</strong></Typography>
				</div>
						<form onSubmit={this.handleSubmit} id="f1" ref={this.formDataElement}>
					<Grid container spacing={1}>
						<Grid item xs={1}></Grid>
						<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
						
						<input type="file" name="file" onChange={(e) => this.readFile(e.target.form)}/>
					</Grid>
					<Grid container spacing={1}>
						<Grid item xs={1}></Grid>
						<Grid item>
							<Typography><strong>Pealkiri*</strong></Typography>
							<div>
								<TextField required className={classes.textArea} multiline label="Kirjuta siia teksti pealkiri" variant="outlined" name="pealkiri" value={this.state.pealkiri} onChange={this.handleChange} style={{width: 500}}></TextField>
							</div>
							<div>
								<Typography style={{paddingTop: 10}}><strong>Ülesande kirjeldus</strong></Typography>
								<TextField className={classes.textArea} multiline rows={4} label="Kirjuta siia ülesande kirjeldus" variant="outlined" name="kirjeldus" value={this.state.kirjeldus} onChange={this.handleChange} style={{width: 500}}></TextField>
							</div>
							<div>
								<Typography style={{paddingTop: 10}}><strong>Tekst*</strong></Typography>
								<TextField required className={classes.textArea} multiline rows={20} label="Laadi tekst üles või kirjuta see siia tekstikasti" variant="outlined" name="sisu" value={this.state.sisu} onChange={this.handleChange} style={{width: 500}}></TextField>
							</div>
						</Grid>
						<Grid item>
							<Typography><strong>Teksti andmed:</strong></Typography>
							<label>
								<Grid container spacing={1} className={classes.holder}>
									{/* <Grid item>
										<Typography>Teksti liik:*</Typography>
									</Grid> */}
									<Grid item>
										<FormControl sx={{ m: 0, width: 240}} size="small">
											<InputLabel id="liik">Teksti liik:*</InputLabel>
											<Select value={this.state.liik} onChange={this.handleChange} label="Teksti liik:*" labelId="liik"  name="liik" required>
												<MenuItem value={"Akadeemiline"}>Akadeemiline</MenuItem>
												<MenuItem value={"Mitte akadeemiline"}>Mitteakadeemiline</MenuItem>
											</Select>
										</FormControl>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography style={{paddingRight: 10}}>Kasutatud õppematerjale:*</Typography>
									</Grid>
									<Grid item>
										<FormControl component="fieldset" className={classes.formControl}>
											<RadioGroup name="oppematerjal" row value={this.state.oppematerjal} onChange={this.handleChange}>
												<FormControlLabel value="jah" control={<Radio className={classes.radio}/>} label="jah"/>
												<FormControlLabel value="ei" control={<Radio className={classes.radio}/>} label="ei"/>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography>Vaata automaatselt määratud teksti andmeid</Typography>
									</Grid>
									<Grid item>
										<Button style={{width: 2, height: 10}}>
											<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
											<span className="material-icons"> expand_more </span>
										</Button>
									</Grid>
								</Grid>
							</label>
							<div>
								<Typography><strong>Teksti autori andmed:</strong></Typography>
							</div>
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Checkbox className={classes.checkBox} name="tekstiAutor"></Checkbox>
									</Grid>
									<Grid item>
										<Typography>Olen teksti autor</Typography>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									{/* <Grid item>
										<Typography>Vanus:*</Typography>
									</Grid> */}
									<Grid item>
										<FormControl sx={{ m: 0, width: 240}}>
											<TextField size="small" required className={classes.textArea} type="number" label="Vanus:" variant="outlined" name="autoriVanus" value={this.state.autoriVanus} onChange={this.handleChange}></TextField>
										</FormControl>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography style={{paddingRight: 10}}>Sugu:*</Typography>
									</Grid>
									<Grid item>
										<FormControl component="fieldset" control={<Radio required={true} />} >
											<RadioGroup required name="autoriSugu" row value={this.state.autoriSugu} onChange={this.handleChange}>
												<FormControlLabel value="mees" control={<Radio className={classes.radio}/>} label="mees"/>
												<FormControlLabel value="naine" control={<Radio className={classes.radio}/>} label="naine"/>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									{/* <Grid item>
										<Typography>Õppeaste/teaduskraad:*</Typography>
									</Grid> */}
									<Grid item>
									<FormControl sx={{ m: 0, width: 240}} size="small">
										<InputLabel id="oppeaste">Õppeaste/teaduskraad:*</InputLabel>
										<Select value={this.state.autoriOppeaste} label="Õppeaste/teaduskraad:*" labelId="oppeaste" onChange={this.handleChange}  name="autoriOppeaste">
											<MenuItem value={"oppeaste"}>õppeaste</MenuItem>
											<MenuItem value={"teaduskraad"}>teaduskraad</MenuItem>
										</Select>
									</FormControl>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									{/* <Grid item>
										<Typography>Eriala:*</Typography>
									</Grid> */}
									<Grid item>
										<FormControl sx={{ m: 0, width: 240}} size="small">
											<InputLabel id="eriala">Eriala*</InputLabel>
											<Select required value={this.state.autoriEriala} onChange={this.handleChange} name="autoriEriala" label="Eriala:*" labelId="eriala">
												<MenuItem value={'Bio- ja keskkonnateadused'}>Bio- ja keskkonnateadused</MenuItem>
												<MenuItem value={'Ühiskonnateadused ja kultuur'}>Ühiskonnateadused ja kultuur</MenuItem>
												<MenuItem value={"Terviseuuringud"}>Terviseuuringud</MenuItem>
												<MenuItem value={"Loodusteadused ja tehnika"}>Loodusteadused ja tehnika</MenuItem>
											</Select>
										</FormControl>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									{/* <Grid item>
										<Typography>Emakeel:*</Typography>
									</Grid> */}
									<Grid item>
										<FormControl sx={{ m: 0, width: 240}} size="small">
											<InputLabel id="emakeel">Emakeel:*</InputLabel>
											<Select required value={this.state.autoriEmakeel} onChange={this.handleChange} name="autoriEmakeel" label="Emakeel:*" labelId="emakeel">
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
									<Grid item>
										<FormControlLabel control={<Checkbox className={classes.checkBox} />} label="Olen kakskeelne" style={{paddingLeft: 10}}/>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									{/* <Grid item>
										<Typography>Muud õppe- või töökeeled:</Typography>
									</Grid> */}
									<Grid item>
										<FormControl sx={{ m: 0, width: 240}} size="small">
											<InputLabel id="autoriMuudKeeled">Muud õppe- või töökeeled:</InputLabel>
											<Select value={this.state.autoriMuudKeeled} onChange={this.handleChange} name="autoriMuudKeeled" label="Muud õppe- või töökeeled:" labelId="autoriMuudKeeled">
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
									<Grid item>
										<Button style={{height: 38}} onClick={this.addField}>
											<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
											<span className="material-icons-outlined"> add </span>
										</Button>
									</Grid>
								</Grid>
								{this.state.users}
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									{/* <Grid item>
										<Typography>Elukohariik:</Typography>
									</Grid> */}
									<Grid item>
										<FormControl sx={{ m: 0, width: 240}} size="small">
											<InputLabel id="elukohariik">Elukohariik:</InputLabel>
											<Select value={this.state.autoriElukohariik} onChange={this.handleChange} name="autoriElukohariik" label="Elukohariik:" labelId="elukohariik">
												<MenuItem value={"eesti"}>Eesti</MenuItem>
												<MenuItem value={"leedu"}>Leedu</MenuItem>
												<MenuItem value={"läti"}>Läti</MenuItem>
												<MenuItem value={"rootsi"}>Rootsi</MenuItem>
												<MenuItem value={"saksa"}>Saksa</MenuItem>
												<MenuItem value={"soome"}>Soome</MenuItem>
												<MenuItem value={"venemaa"}>Venemaa</MenuItem>
											</Select>
										</FormControl>
									</Grid>
								</Grid>
							</label>
							<br />
							<div className="buttonHolder">
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Checkbox className={classes.checkBox}  name="nousOlek"/>
									</Grid>
									<Grid item>
										<Typography>Teksti üles laadides nõustun <u>ELLE kasutustingimustega</u>.</Typography>
									</Grid>
								</Grid>
								<br />
								<div style={{textAlign: "center"}}>
									<Button type="submit" variant="text" className={classes.button} style={{background: "#3898ec", border: 0, borderRadius: 4, height: 48, width: 160, color: "white", fontSize: 16}}>Laadi üles</Button>
								</div>
							</div>
						</Grid>
					</Grid>
				</form>
			</div>
        );
    }
}



export default withStyles(styles, { withTheme: true })(Adding);
