import ToolCard from "../components/ToolCard";
import React, {useState} from "react";
import {Card, CardContent, Grid} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ClusterFinder from "../tools/ClusterFinder";
import WordAnalyser from "../tools/wordanalyser/WordAnalyser";

const components = {
  clusterfinder: ClusterFinder,
  wordanalyser: WordAnalyser
};

function Tools() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // kui ühtegi tööriista pole valitud, siis ära näita midagi
  let SelectedTool = () => {
    return <div></div>;
  };
  // kui midagi on valitud, siis näita seda tööriista
  if (selectedTool) {
    SelectedTool = components[selectedTool];
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
                md={12}
                lg={4}
                xl={3}>
            <Accordion
              disableGutters
              elevation={0}
              square
              sx={{w: 10}}
              expanded={expanded}
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
                <ToolCard
                  title="Mustrid"
                  img={require("../resources/images/tools/mustrileidja.png").default}
                  description="Mustrid ehk n-grammid aitavad tekstist leida tüüpilisemad sõnajärjendid"
                  action={() => {
                    setSelectedTool("clusterfinder");
                    setExpanded(false);
                  }}
                ></ToolCard>
                <ToolCard
                  title="Sõnaanalüüs"
                  img={require("../resources/images/tools/sonaanalyys.png").default}
                  description="Leia sõnade silbid, algvormid ja grammatilised vormid"
                  action={() => {
                    setSelectedTool("wordanalyser");
                    setExpanded(false);
                  }}
                ></ToolCard>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <hr/>
        <SelectedTool/>
      </CardContent>
    </Card>
  );
}

export default Tools;
