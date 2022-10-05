import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";

class AnalysisTool extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Accordion
        disableGutters
        elevation={0}
        square
        expanded={this.props.expanded}
        onChange={this.props.onChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel1a-header"
          sx={{ backgroundColor: "#e6f4fe" }}
        >
          <Box
            sx={{
              marginRight: 2,
            }}
          >
            <img src={this.props.img} alt={this.props.title} />
          </Box>
          <Box>
            <Typography variant="h5" component="div">
              <Link to="#" underline="hover" color="inherit">
                {this.props.title}
              </Link>
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {this.props.description}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#f9fcff" }}>
          <Typography>{this.props.settings}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default AnalysisTool;
