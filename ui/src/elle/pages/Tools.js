import ToolCard from "../components/ToolCard";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Grid} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ClusterFinder from "../tools/ClusterFinder";
import {useNavigate, useParams} from "react-router-dom";
import WordAnalyserParent from "../tools/wordanalyser/WordAnalyserParent";

const components = {
  clusterfinder: ClusterFinder,
  wordanalyser: WordAnalyserParent
};

function Tools() {
  const {id} = useParams();
  const [selectedTool, setSelectedTool] = useState(id ? id : null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // kui ühtegi tööriista pole valitud, siis ära näita midagi
  let SelectedTool = () => {
    return <div></div>;
  };
  // kui midagi on valitud, siis näita seda tööriista
  if (selectedTool) {
    SelectedTool = components[selectedTool];
  }

  useEffect(() => {
    if (selectedTool) {
      navigate(`/tools/` + selectedTool);
    }
  }, [selectedTool]);

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
                </Box>
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
