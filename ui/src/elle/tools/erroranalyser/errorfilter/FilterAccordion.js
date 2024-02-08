import { useState } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./../ErrorAnalyser.css";
import { errorTypes, languageLevels } from "./CheckboxData";
import Checkbox from "./Checkbox";

export default function FilterAccordion({ getErrors }) {
  const [filterError, setFilterError] = useState({
    typeError: false,
    levelError: false,
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [selectedErrorTypes, setSelectedErrorTypes] = useState(null);
  const [selectedLanguageLevels, setSelectedLanguageLevels] = useState(null);

  const mapFilterInput = (input) => {
    return input.flatMap((item) => {
      return item.checked
        ? [item.type]
        : item.childrenNodes
            .filter((child) => child.checked)
            .map((child) => child.type);
    });
  };

  const handleSubmit = () => {
    const errorTypeFilter = mapFilterInput(selectedErrorTypes);
    let languageLevelFilter = mapFilterInput(selectedLanguageLevels);
    if (errorTypeFilter.length === 0) {
      setFilterError((filterError) => ({
        ...filterError,
        typeError: true,
      }));
    }

    if (languageLevelFilter.length === 0) {
      setFilterError((filterError) => ({
        ...filterError,
        levelError: true,
      }));
    }

    if (errorTypeFilter.length > 0 && languageLevelFilter.length > 0) {
      if (languageLevelFilter[0] === "all") {
        languageLevelFilter = languageLevels[0].subtype.map(
          (item) => item.type
        );
      }
      getErrors(errorTypeFilter, languageLevelFilter);
      setIsFilterExpanded(false);
    }
  };

  return (
    <Accordion
      expanded={isFilterExpanded}
      onChange={() => setIsFilterExpanded(!isFilterExpanded)}
      className="error-filter"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="error-filter-content"
        id="error-filter-header"
      >
        Vali veatüüp ja keeletase
      </AccordionSummary>
      <AccordionDetails className="filter-container">
        <Box className="filter-item">
          <Typography
            variant="h6"
            style={{ color: filterError.typeError ? "red" : "initial" }}
          >
            Veatüüp *
          </Typography>
          <Paper
            variant="outlined"
            className={`checkbox-container ${
              filterError.typeError ? "checkbox-container-error" : ""
            }`}
          >
            <Checkbox
              data={errorTypes}
              setSelectedItems={setSelectedErrorTypes}
              setFilterError={setFilterError}
            />
          </Paper>
        </Box>
        <Box className="filter-item">
          <Typography
            variant="h6"
            style={{ color: filterError.levelError ? "red" : "initial" }}
          >
            Keeletase *
          </Typography>
          <Paper
            variant="outlined"
            className={`checkbox-container ${
              filterError.levelError ? "checkbox-container-error" : ""
            }`}
          >
            <Checkbox
              data={languageLevels}
              setSelectedItems={setSelectedLanguageLevels}
              setFilterError={setFilterError}
            />
          </Paper>
        </Box>
      </AccordionDetails>
      <AccordionActions>
        <Box>
          <Button variant="contained" onClick={handleSubmit}>
            Esita päring
          </Button>
        </Box>
      </AccordionActions>
    </Accordion>
  );
}
