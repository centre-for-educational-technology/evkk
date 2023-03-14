import ToolCard from "../components/ToolCard";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Grid} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Query from "../components/Query";
import {AccordionStyle} from "../utils/constants";

function Tools() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [onlyOutletVisible, setOnlyOutletVisible] = useState(true);

  useEffect(() => {
    setExpanded(location.pathname === '/tools');
    setOnlyOutletVisible(!location.pathname.includes('adding'));
  }, [location]);

  const tools = [
    {
      title: "Sõnaloend",
      img: require("../resources/images/tools/sonaloend.png").default,
      description: "Kuva kõik tekstis kasutatud sõnad sageduse või tähestiku järjekorras",
      route: "wordlist",
      action: () => toolSelect("wordlist")
    },
    {
      title: "Mustrid",
      img: require("../resources/images/tools/mustrileidja.png").default,
      description: "Mustrid ehk n-grammid aitavad tekstist leida tüüpilisemad sõnajärjendid",
      route: "clusterfinder",
      action: () => toolSelect("clusterfinder")
    },
    {
      title: "Sõnaanalüüs",
      img: require("../resources/images/tools/sonaanalyys.png").default,
      description: "Leia sõnade silbid, algvormid ja grammatilised vormid",
      route: "wordanalyser",
      action: () => toolSelect("wordanalyser")
    }
  ];

  function toolSelect(tool) {
    navigate(tool);
  }

  return (
    <>
      {onlyOutletVisible ?
        <Card raised={true}
              square={true}
              elevation={2}>
          <CardContent sx={{p: 3}}>
            <Grid container
                  spacing={2}>
              <Grid item
                    xs={12}
                    sm={12}
                    md={12}>
                <Query/>
                <Accordion
                  sx={AccordionStyle}
                  expanded={expanded}
                  style={{marginTop: '1em'}}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    onClick={() =>
                      setExpanded(!expanded)
                    }
                  >
                    Analüüsivahendid
                  </AccordionSummary>
                  <AccordionDetails style={{minWidth: '350px'}}>
                    <Box sx={{display: "flex", flexWrap: "wrap"}}>
                      {tools.map(tool => {
                        return [
                          <ToolCard
                            key={tool.route}
                            tool={tool}
                          />
                        ]
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            <Outlet/>
          </CardContent>
        </Card>
        : <Outlet/>}
    </>
  );
}

export default Tools;
