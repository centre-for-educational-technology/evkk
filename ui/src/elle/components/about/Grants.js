import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Box, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import React from 'react';

export default function Grants() {

  return (
    <Box>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="SF 0132493s03 Eesti keelekeskkonna arengu analüüs, modelleerimine ja juhtimine (2003–2007)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="ETF6151 Koodivahetuse, eesti vahekeele ning lastekeele andmekorpuse koostamine ja üldkirjeldus (2005–2008)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="EKRM05-51 Koodivahetuse, vahe- ning lastekeele korpuste töötlemine ja haldamine (2004–2008)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="EKKTT08-26 VAKO - Eesti vahekeele korpuse keeletarkvara ja keeletehnoloogilise ressursi arendamine (2006–2010)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="EKKM09-98 REKKi käsikirjaliste materjalide digiteerimine, Eesti vahekeele korpuse alamkorpuste loomine ja korpuse kasutusvõimaluste populariseerimine (2009–2013)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="ETF8240 Keeltevaheline mõju ja teise keele omandamine (korpuspõhine uurimus)(2010–2013)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="ETF8222 Ülekantud tähenduses fraasid eesti keele korpustes"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="EKKM15-419 Eesti õppijakeele tervikkäsitlus (2015−2018)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="TF2019 Tallinna Ülikooli eesti vahekeele korpuse uue platvormi prototüübi arendamine õppijakorpuseks (2019−2021)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="TF2621 ELLE: eesti keele õpet toetav keeletehnoloogiline ressurss (2021−2023)"/>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemText
            primary="EKTB Eestikeelse teksti automaatkorrektuur (2021−2023, koostöös Tartu Ülikooliga)"/>
        </ListItem>
      </List>
    </Box>
  )
}
