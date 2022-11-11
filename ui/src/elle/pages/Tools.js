import ToolCard from "../components/ToolCard";
import React, {useState} from "react";
import {Box, Card, CardContent, Grid} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Outlet, useNavigate} from "react-router-dom";

function Tools() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const tools = [
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
    setExpanded(false);
    navigate(tool)
  }

  return (
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
            <Accordion
              disableGutters
              elevation={0}
              square
              sx={{w: 10}}
              expanded={expanded}
            >
              <AccordionSummary
                className="tools-accordion"
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
        <hr/>
        <Outlet/>
      </CardContent>
    </Card>
  );
}

export default Tools;
