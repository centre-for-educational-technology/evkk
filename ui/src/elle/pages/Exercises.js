import React, { Component } from 'react';
import {Box, Button, TextField} from '@mui/material';
import './styles/Home.css';
import './styles/Library.css';
import { withTranslation } from 'react-i18next';
import { ElleOuterDivStyle } from '../const/StyleConstants';
import { Link } from 'react-router-dom'
import SortButton from '../components/library/SortButton'
import { CategoryFilters, LanguageFilters } from '../components/library/SearchFilters'

class Exercise extends Component {
    render(){
        return (
            <div>
                <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
                    <Box className="library-container">
                        <h1 style={{textAlign: 'center'}}>Harjutused</h1>
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
                        <div className="library-menu">
                                <nav>
                                    <ul>
                                        <Link to="/library/exercises">Harjutused</Link>
                                        <br></br>
                                        <Link to="/library/studymaterial">Õppematerjalid</Link>
                                    </ul>
                                </nav>
                        </div>
                        <div className="libary-exercise-container">
                            <div className="library-exercise-filters">
                                <h2>Kategooriad</h2>
                                <CategoryFilters />
                                <br/>
                                <h2>Keeletasemed</h2>
                                <LanguageFilters />
                            </div>
                        </div>
                        <div className="library-exercise-infoContainer">
                            <SortButton/>
                            <div className="library-exercise-results">
                                <Box style={{border: '1px solid black'}}>tulemus 1</Box>
                            </div>
                        </div>
                    </Box>
                </Box>
            </div>
        )
    }
}


export default withTranslation()(Exercise)