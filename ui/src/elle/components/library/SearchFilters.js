//filtrid

import React from 'react';
import {FormGroup, FormControlLabel, Checkbox } from '@mui/material';


class SearchFilters {
    CategoryFilters(){
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

    LanguageFilters(){
        return (
            <FormGroup>
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
}

export const {CategoryFilters, LanguageFilters} = new SearchFilters();