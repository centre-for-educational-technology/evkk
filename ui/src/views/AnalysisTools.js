import AnalysisTool from "../components/AnalysisTool";
import React, { Component } from "react";
import { Box, Button, TextField } from "@mui/material";

class AnalysisTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleChange(event, isExpanded) {
    this.setState({ expanded: event });
  }

  render() {
    return (
      <div>
        <AnalysisTool
          title="Silbitamine"
          img="/img/silbitamine.png"
          description="jaga sõna silpideks..."
          settings="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget."
          expanded={this.state.expanded === "panel1"}
          onChange={() => this.handleChange("panel1")}
        ></AnalysisTool>
        <AnalysisTool
          title="Keerukuse analüüs"
          img="/img/keerukus.png"
          description="jaga sõna silpideks..."
          settings="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget."
          expanded={this.state.expanded === "panel2"}
          onChange={() => this.handleChange("panel2")}
        ></AnalysisTool>
        <AnalysisTool
          title="Mustrid"
          img="/img/mustrid.png"
          description="jaga sõna silpideks..."
          settings="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget."
          expanded={this.state.expanded === "panel3"}
          onChange={() => this.handleChange("panel3")}
        ></AnalysisTool>
        <hr />
        <TextField
          id="outlined-multiline-flexible"
          label="Analüüsitav tekts"
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
      </div>
    );
  }
}

export default AnalysisTools;
