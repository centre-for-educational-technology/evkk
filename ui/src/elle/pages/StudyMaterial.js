import React, { Component } from 'react';
import {Box, Button, TextField} from '@mui/material';
import './styles/Home.css';
import './styles/Library.css';
import { withTranslation } from 'react-i18next';
import { ElleOuterDivStyle } from '../const/StyleConstants';
import { Outlet, Link } from 'react-router-dom';

class StudyMaterial extends Component {
    /*constructor(props){
        super(props);
    }*/
    render(){
        return (
            <div>
                <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
                    <Box className="library-container">
                        <h1 style={{textAlign: 'center'}}>Õppematerjalid</h1>
                        <div className="library-search-container">
                            <div className="library-search-box">
                            <TextField label="Otsing"
                                    variant="outlined"
                                    name="otsing"
                                    style={{width: '100%', maxWidth: '50%'}}
                                    ></TextField>
                            <Button>Otsi</Button>
                            </div>
                        </div>
                        <div>
                            <nav>
                                <ul>
                                    <Link to="/exercises">Harjutused</Link>
                                    <br></br>
                                    <Link to="/studymaterial">Õppematerjalid</Link>
                                </ul>
                            </nav>
                            <Outlet />
                        </div>
                    </Box>
                </Box>
            </div>
        )
    }
}


export default withTranslation()(StudyMaterial)