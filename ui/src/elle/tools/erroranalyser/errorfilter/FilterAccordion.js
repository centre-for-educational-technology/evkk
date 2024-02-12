import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./../ErrorAnalyser.css";
import { errorTypes, languageLevels } from "./CheckboxData";
import Checkbox from "./Checkbox";

export default function FilterAccordion({ getErrors, setErrorData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [filterEnums, setFilterEnums] = useState(null);
  const [filterError, setFilterError] = useState({
    typeError: false,
    levelError: false,
  });
  const [isExpanded, setIsExpanded] = useState({
    accordion: true,
    optionalFilters: false,
  });
  const [selectedErrorTypes, setSelectedErrorTypes] = useState(null);
  const [selectedLanguageLevels, setSelectedLanguageLevels] = useState(null);

  const transformFilterEnums = (data) => {
    let enums = {};
    for (const [key, values] of Object.entries(data)) {
      enums[key] = values.map((value) => {
        return { type: value, label: value == null ? "määramata" : value };
      });
    }
    console.log(enums);

    return enums;
  };

  const getFilterEnums = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:9090/api/errors/getFilterEnums"
      );
      const data = await response.json();
      const transformedData = transformFilterEnums(data);
      setFilterEnums(transformedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilterEnums();
  }, []);

  useEffect(() => {
    if (filterEnums) {
      //TODO
    }
  }, [filterEnums]);

  const mapFilterInput = (input) => {
    return input.flatMap((item) => {
      return item.checked
        ? [item.type]
        : item.childrenNodes
            .filter((child) => child.checked)
            .map((child) => child.type);
    });
  };

  const handleIsExpanded = (key) => {
    setIsExpanded({
      ...isExpanded,
      [key]: !isExpanded[key],
    });
  };

  const handleSubmit = () => {
    setErrorData(null);
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
      handleIsExpanded("accordion");
    }
  };

  return (
    <>
      {isLoading ? (
        <Box className="spinner-container">
          <CircularProgress />
        </Box>
      ) : (
        <Accordion
          expanded={isExpanded.accordion}
          onChange={() => handleIsExpanded("accordion")}
          className="error-filter"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="error-filter-content"
            id="error-filter-header"
          >
            Vali veatüüp ja keeletase
          </AccordionSummary>

          <AccordionDetails>
            <Box className="filter-container">
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
            </Box>

            <Box className="filter-item">
              <Typography variant="body1">
                Filtreeri emakeele ja keeletaseme järgi
              </Typography>

              {isExpanded.optionalFilters ? (
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleIsExpanded("optionalFilters");
                  }}
                >
                  Sulge täpsem otsing
                </Link>
              ) : (
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    handleIsExpanded("optionalFilters");
                  }}
                >
                  Ava täpsem otsing
                </Link>
              )}
              {isExpanded.optionalFilters && (
                <Box className="filter-container">
                  <Box className="filter-item">
                    <Typography
                      variant="h6"
                      style={{
                        color: filterError.levelError ? "red" : "initial",
                      }}
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
                        data={filterEnums.languageLevels}
                        setSelectedItems={setSelectedLanguageLevels}
                        setFilterError={setFilterError}
                      />
                    </Paper>
                  </Box>
                  <Box className="filter-item">
                    <Typography
                      variant="h6"
                      style={{
                        color: filterError.levelError ? "red" : "initial",
                      }}
                    >
                      Emakeel *
                    </Typography>
                    <Paper
                      variant="outlined"
                      className={`checkbox-container ${
                        filterError.levelError ? "checkbox-container-error" : ""
                      }`}
                    >
                      <Checkbox
                        data={filterEnums.nativeLanguages}
                        setSelectedItems={setSelectedLanguageLevels}
                        setFilterError={setFilterError}
                      />
                    </Paper>
                  </Box>
                </Box>
              )}
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
      )}
    </>
  );
}
