import React, {Component, useEffect, useState} from 'react';
import './adding.css';
import { withStyles } from "@material-ui/core/styles";
import {Checkbox, Button, TextField, RadioGroup, FormControlLabel, Radio, Typography, Grid, Box, InputLabel, FormControl} from "@material-ui/core";

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
		height: 0
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
		height: 26,
		width: 160
	},
	checkBox: {
		color: "#3898ec",
		height: 0,
	},
	holder: {
		paddingTop: 5
	}
});

const tekstiLiik = [
	{value: 'akadeemiline', label: 'akadeemiline'}, {value: 'mitteakadeemiline', label: 'mitteakadeemiline'}
]
const oppeaste = [
	{value: 'õppeaste', label: 'õppeaste'}, {value: 'teaduskraad', label: 'teaduskraad'},
]
const eriala = [
	{value: 'Bio- ja keskkonnateadused', label: 'Bio- ja keskkonnateadused'}, {value: 'Ühiskonnateadused ja kultuur', label: 'Ühiskonnateadused ja kultuur'}, {value: "Terviseuuringud", label: "Terviseuuringud"}, {value: "Loodusteadused ja tehnika", label: "Loodusteadused ja tehnika"}
]
const emakeel = [
	{value: "eesti", label: "eesti"}, {value: "heebrea", label: "heebrea"}, {value: "hollandi", label: "hollandi"}, {value: "inglise", label: "inglise"}, {value: "itaalia", label: "itaalia"}, {value: "jaapani", label: "jaapani"}, {value: "jidiš", label: "jidiš"}, {value: "katalaani", label: "katalaani"}, {value: "leedu", label: "leedu"}, {value: "läti", label: "läti"}, {value: "poola", label: "poola"}, {value: "prantsuse", label: "prantsuse"}, {value: "rootsi", label: "rootsi"}, {value: "saksa", label: "saksa"}, {value: "sloveenia", label: "sloveenia"}, {value: "soome", label: "soome"}, {value: "tšehhi", label: "tšehhi"}, {value: "ukraina", label: "ukraina"}, {value: "ungari", label: "ungari"}, {value: "valgevene", label: "valgevene"}, {value: "vene", label: "vene"}
]
const teineKeel = [
	{value: "eesti", label: "eesti"}, {value: "heebrea", label: "heebrea"}, {value: "hollandi", label: "hollandi"}, {value: "inglise", label: "inglise"}, {value: "itaalia", label: "itaalia"}, {value: "jaapani", label: "jaapani"}, {value: "jidiš", label: "jidiš"}, {value: "katalaani", label: "katalaani"}, {value: "leedu", label: "leedu"}, {value: "läti", label: "läti"}, {value: "poola", label: "poola"}, {value: "prantsuse", label: "prantsuse"}, {value: "rootsi", label: "rootsi"}, {value: "saksa", label: "saksa"}, {value: "sloveenia", label: "sloveenia"}, {value: "soome", label: "soome"}, {value: "tšehhi", label: "tšehhi"}, {value: "ukraina", label: "ukraina"}, {value: "ungari", label: "ungari"}, {value: "valgevene", label: "valgevene"}, {value: "vene", label: "vene"}
]
const elukohariik = [
	{value: "eesti", label: "Eesti"}, {value: "leedu", label: "Leedu"}, {value: "läti", label: "Läti"}, {value: "rootsi", label: "Rootsi"}, {value: "saksa", label: "Saksa"}, {value: "soome", label: "Soome"}, {value: "venemaa", label: "Venemaa"}
]

class Adding extends Component {

	constructor(props) {
		super(props);
		this.state = {pealkiri:"", kirjeldus:"", sisu:"", liik:"", oppematerjal:"", autoriVanus:"", autoriSugu:"", autoriOppeaste:"", autoriEriala:"", autoriEmakeel:"", autoriMuudKeeled:"", autoriElukohariik:""};
		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
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

    render() {
		const { classes } = this.props;

        return (
			<Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
				<div style={{ textAlign:"center"}}>
					<Typography variant="h5"><strong>Lisa uus tekst</strong></Typography>
				</div>
				<form onSubmit={this.handleSubmit} style={{paddingTop: 10}}>
					<Grid container >
						<Grid item xs={3}></Grid>
						<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
						<span class="material-icons" > upload_file </span>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={3}></Grid>
						<Grid item>
							<Typography><strong>Pealkiri*</strong></Typography>
							<div>
								<TextField required className={classes.textArea} id="outlined" multiline label="Kirjuta siia teksti pealkiri" variant="outlined" name="pealkiri" value={this.state.pealkiri} onChange={this.handleChange} style={{width: 500}}></TextField>
							</div>
							<div>
								<Typography style={{paddingTop: 10}}><strong>Ülesande kirjeldus</strong></Typography>
								<TextField className={classes.textArea} id="outlined" multiline rows={4} label="Kirjuta siia ülesande kirjeldus" variant="outlined" name="kirjeldus" value={this.state.kirjeldus} onChange={this.handleChange} style={{width: 500}}></TextField>
							</div>
							<div>
								<Typography style={{paddingTop: 10}}><strong>Tekst*</strong></Typography>
								<TextField required className={classes.textArea} id="outlined" multiline rows={20} label="Laadi tekst üles või kirjuta see siia tekstikasti" variant="outlined" name="sisu" value={this.state.sisu} onChange={this.handleChange} style={{width: 500}}></TextField>
							</div>
						</Grid>
						<Grid item>
							<Typography><strong>Teksti andmed:</strong></Typography>
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography>Teksti liik:*</Typography>
									</Grid>
									<Grid item>
										<TextField value={this.state.liik} onChange={this.handleChange} className={classes.textArea} InputProps={{className: classes.input}} select name="liik" variant="outlined">
											{tekstiLiik.map((option) => (
												<option value={option.value}>{option.label}</option>
											))}
										</TextField>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography>Kasutatud õppematerjale:*</Typography>
									</Grid>
									<Grid item>
										<FormControl component="fieldset" className={classes.formControl}>
											<RadioGroup name="oppematerjal" row value={this.state.oppematerjal} onChange={this.handleChange}>
												<FormControlLabel value="jah" control={<Radio className={classes.radio} color="default"/>} label="jah"/>
												<FormControlLabel value="ei" control={<Radio className={classes.radio} color="default"/>} label="ei"/>
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
											<span class="material-icons"> expand_more </span>
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
									<Grid item>
										<Typography>Vanus:*</Typography>
									</Grid>
									<Grid item>
										<TextField placeholder="Lisa vanus" size="small" className={classes.textArea} InputProps={{className: classes.input}} type="number" variant="outlined" value={this.state.autoriVanus} onChange={this.handleChange} name="autoriVanus"></TextField>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography>Sugu:*</Typography>
									</Grid>
									<Grid item>
										<FormControl component="fieldset" control={<Radio required={true} />} >
											<RadioGroup required name="autoriSugu" row value={this.state.autoriSugu} onChange={this.handleChange}>
												<FormControlLabel value="mees" control={<Radio className={classes.radio} color="default"/>} label="mees"/>
												<FormControlLabel value="naine" control={<Radio className={classes.radio} color="default"/>} label="naine"/>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography>Õppeaste/teaduskraad:*</Typography>
									</Grid>
									<Grid item>
										<TextField value={this.state.autoriOppeaste} onChange={this.handleChange} name="autoriOppeaste" className={classes.textArea} InputProps={{className: classes.input}} select variant="outlined">
											{oppeaste.map((option) => (
												<option value={option.value}>{option.label}</option>
											))}
										</TextField>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography >Eriala:*</Typography>
									</Grid>
									<Grid item>
										<TextField value={this.state.autoriEriala} onChange={this.handleChange} name="autoriEriala" className={classes.textArea} InputProps={{className: classes.input}} select variant="outlined">
											{eriala.map((option) => (
												<option value={option.value}>{option.label}</option>
											))}
										</TextField>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography>Emakeel:*</Typography> 
									</Grid>
									<Grid item>
										<TextField value={this.state.autoriEmakeel} onChange={this.handleChange} name="autoriEmakeel" className={classes.textArea} InputProps={{className: classes.input}} select variant="outlined">
											{emakeel.map((option) => (
												<option value={option.value}>{option.label}</option>
											))}
										</TextField>
									</Grid>
									<Grid item>
										<FormControlLabel control={<Checkbox className={classes.checkBox} />} label="Olen kakskeelne" />
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography>Muud õppe- või töökeeled:</Typography>
									</Grid>
									<Grid item>
										<TextField value={this.state.autoriMuudKeeled} onChange={this.handleChange} name="autoriMuudKeeled" className={classes.textArea} InputProps={{className: classes.input}} select variant="outlined">
											{teineKeel.map((option) => (
												<option value={option.value}>{option.label}</option>
											))}
										</TextField>
									</Grid>
									<Grid item>
										<Button style={{height: 5}}>
											<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
											<span class="material-icons-outlined" > add </span>
										</Button>
									</Grid>
								</Grid>
							</label>
							<br />
							<label>
								<Grid container spacing={1} className={classes.holder}>
									<Grid item>
										<Typography>Elukohariik:</Typography>
									</Grid>
									<Grid item>
										<TextField value={this.state.autoriElukohariik} onChange={this.handleChange} name="autoriElukohariik" className={classes.textArea} InputProps={{className: classes.input}} select variant="outlined">
											{elukohariik.map((option) => (
												<option value={option.value}>{option.label}</option>
											))}
										</TextField>
									</Grid>
								</Grid>
							</label>
							<br />
							<div class="buttonHolder">
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
									<Button type="submit" variant="text" className={classes.button}>Laadi üles</Button>
								</div>
							</div>
						</Grid>
					</Grid>
				</form>
			</Box>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Adding);
