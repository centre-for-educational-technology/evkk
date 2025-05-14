import React from 'react';
import {FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export default function CategoryFilters(){
    return(
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Võõrsönad" />
            <FormControlLabel control={<Checkbox />} label="Käänded" />
            <FormControlLabel control={<Checkbox />} label="Kokku- ja lahkukirjutamine" />
            <FormControlLabel control={<Checkbox />} label="Suur- ja väike algustäht" />
            <FormControlLabel control={<Checkbox />} label= "Liitlause" />
        </FormGroup>
    )
}