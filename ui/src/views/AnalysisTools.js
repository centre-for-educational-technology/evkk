import AnalysisTool from "../components/AnalysisTool";
import React, { Component } from "react";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

class AnalysisTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selected: "",
    };
  }

  clicked(item) {
    this.setState({ expanded: false, selected: item });
  }

  render() {
    return (
      <Card raised={true} square={true} elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Accordion
                disableGutters
                elevation={0}
                square
                sx={{ w: 10 }}
                expanded={this.state.expanded}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  onClick={() => this.setState({ expanded: true })}
                >
                  Analüüsivahendid
                </AccordionSummary>
                <AccordionDetails>
                  <AnalysisTool
                    title="Silbitamine"
                    img="/img/silbitamine.png"
                    description="jaga sõna silpideks..."
                    action={() => this.clicked("Silbitamine")}
                  ></AnalysisTool>
                  <AnalysisTool
                    title="Keerukuse analüüs"
                    img="/img/keerukus.png"
                    description="jaga sõna silpideks..."
                    action={() => this.clicked("keerukus")}
                  ></AnalysisTool>
                  <AnalysisTool
                    title="Mustrid"
                    img="/img/mustrid.png"
                    description="jaga sõna silpideks..."
                    action={() => this.clicked("Mustrid")}
                  ></AnalysisTool>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>

          <hr />
          <h3>{this.state.selected}</h3>
          <TextField
            id="outlined-multiline-flexible"
            label="Analüüsitav tekst"
            multiline
            rows={10}
            fullWidth
            margin="normal"
          />
          <Box textAlign="center" sx={{ m: 2 }}>
            <Button
              variant="contained"
              sx={{ py: 2, px: 4, backgroundColor: "#2196F3" }}
            >
              Analüüsi
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default AnalysisTools;
