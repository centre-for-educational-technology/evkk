import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import './styles/Publications.css';

function Publications() {
  return (
    <Box>
      <Box>
        <Typography id={"lõputööd"}
                    style={{
                      padding: '1rem'
                    }}
                    variant={"h3"}>Lõputööd</Typography>
      </Box>

      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/86HP71viN5"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Berner, S. (2022). <i>Eestikeelse teksti sõnavara mitmekesisuse mõõtmine</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/ouIdXtuhMx"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Liiva, K. (2022). <i>Automaatne tekstianalüüs: Klastrileidja arendamise põhimõtted ja veebirakendus</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/lJUVYT21Wl"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Petrov, H. (2022). <i>Rakendus võtmesõnade leidmiseks eestikeelsetest tekstidest</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/y4AfC43cJr"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Sepp, C. (2022). <i>Eestikeelse teksti keerukuse automaatne hindamine</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/ywvp987Ket"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Norak, K. (2021). <i>Õppijakeele korpuse virtuaalse õpikeskkonna prototüübi disain</i> [Magistritöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/xraMVgzZXU"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Tarvas, M. (2020). <i>Eesti vahekeele korpuse uue platvormi arendus ning teenuste liidestamine</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/2wo3d3Bx8b"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Kossinski, J. (2018). <i>Masinõppel rajaneva tarkvararakenduse loomine keeleoskustaseme ennustamiseks</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/zoom/41276/view"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Voolaid, K. (2018). <i>Vene ja soome lähtekeelega õppijate eesti keele kasutusmustrid (B1-tase)</i> [Magistritöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/I1PMiX2COn"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Allkivi-Metsoja, K. (2016). <i>C1-tasemega eesti keele õppijate kirjalik keelekasutus võrdluses emakeelekõnelejatega: samalaadsusi ja nihkeid verbist paremal paiknevas kontekstis</i> [Magistritöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FiberManualRecordIcon/>
          </ListItemIcon>
          <ListItemButton href="https://www.etera.ee/s/Rgd8RyF2rF"
                          target="_blank"
                          rel="noopener noreferrer">
            <ListItemText disableTypography
                          primary={
                            <span>Hallik, V. (2016). <i>Eesti vahekeele korpuse klasteranalüüsi vahendite kasutamine teksti keeletaseme prognoosimisel</i> [Bakalaureusetöö, Tallinna Ülikool].</span>
                          }/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default Publications;
