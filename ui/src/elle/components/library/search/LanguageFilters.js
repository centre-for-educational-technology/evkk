import React from 'react';
import {FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export default function LanguageFilters(){
    return (
        <FormGroup>
            <h2>Keeletasemed</h2>
            <FormControlLabel control={<Checkbox />} label="A1" />
            <FormControlLabel control={<Checkbox />} label="A2" />
            <FormControlLabel control={<Checkbox />} label="B1" />
            <FormControlLabel control={<Checkbox />} label="B2" />
            <FormControlLabel control={<Checkbox />} label="C1" />
            <FormControlLabel control={<Checkbox />} label="C2" />
            <FormControlLabel control={<Checkbox />} label="Algajad" />
            <FormControlLabel control={<Checkbox />} label="Edasijõudnud" />
        </FormGroup>
    )
}