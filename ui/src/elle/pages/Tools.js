import ToolCard from "../components/ToolCard";
import React, {Component} from "react";
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

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selected: "",
      selectedTool: null,
    };
  }

  render() {
    // kui ühtegi tööriista pole valitud, siis ära näita midagi
    let SelectedTool = () => {
      return <div></div>;
    };
    // kui midagi on valitud, siis näita seda tööriista
    if (this.state.selectedTool) {
      SelectedTool = components[this.state.selectedTool];
    }

    return (
      <Card raised={true}
            square={true}
            elevation={2}>
        <CardContent sx={{p: 3}}>
          <Grid container
                spacing={2}>
            <Grid item
                  xs={4}>
              <Accordion
                disableGutters
                elevation={0}
                square
                sx={{w: 10}}
                expanded={this.state.expanded}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  onClick={() =>
                    this.setState({expanded: !this.state.expanded})
                  }
                >
                  Analüüsivahendid
                </AccordionSummary>
                <AccordionDetails style={{minWidth: '350px'}}>
                  <ToolCard
                    title="Mustrid"
                    img={require("../resources/images/tools/mustrid.png").default}
                    description="Mustrid ehk n-grammid aitavad tekstist leida tüüpilisemad sõnajärjendid"
                    action={() => this.setState({selectedTool: "clusterfinder", expanded: false})}
                  ></ToolCard>
                  <ToolCard
                    title="Sõnaanalüüs"
                    img={require("../resources/images/tools/silbitamine.png").default}
                    description="Leia sõnade silbid, algvormid ja grammatilised vormid"
                    action={() => this.setState({selectedTool: "wordanalyser", expanded: false})}
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
}

export default Tools;
