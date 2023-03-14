import {queryStore} from "../../store/QueryStore";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./Wordlist.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import {AccordionStyle} from "../../utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {QuestionMark} from "@mui/icons-material";

export default function Wordlist() {

  const navigate = useNavigate();
  const [paramsExpanded, setParamsExpanded] = useState(true);
  const [typeValue, setTypeValue] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [stopwordsChecked, setStopwordsChecked] = useState(false);
  const [customStopwords, setCustomStopwords] = useState('');

  useEffect(() => {
    if (!queryStore.getState()) {
      navigate(-1);
    }
  }, [navigate]);

  const handleTypeChange = (event) => {
    setTypeValue(event.target.value);
    setTypeError(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypeError(!typeValue);
    if (typeValue) {
      setParamsExpanded(false);
    }
  }

  return (
    <div className="wordlist-wrapper">
      <h2 className="tool-title">Sõnaloend</h2>
      <Accordion sx={AccordionStyle}
                 expanded={paramsExpanded}
                 onChange={() => setParamsExpanded(!paramsExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="wordlist-filters-header"
        >
          <Typography>
            Analüüsi parameetrid
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <div className="queryContainer">
              <div>
                <FormControl sx={{m: 3}}
                             error={typeError}
                             variant="standard">
                  <FormLabel id="type-radios">Otsi</FormLabel>
                  <RadioGroup
                    aria-labelledby="type-radios"
                    name="type"
                    value={typeValue}
                    onChange={handleTypeChange}
                  >
                    <FormControlLabel value="sonad"
                                      control={<Radio/>}
                                      label="sõnavormid"/>
                    <FormControlLabel value="lemmad"
                                      control={<Radio/>}
                                      label="algvormid"/>
                  </RadioGroup>
                  {typeError && <FormHelperText>Väli on kohustuslik!</FormHelperText>}
                  <Button sx={{mt: 1, mr: 1}}
                          className="wordlist-analyse-button"
                          type="submit"
                          variant="contained">
                    Analüüsi
                  </Button>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{m: 3}}
                             variant="standard">
                  <FormLabel id="stopwords">Välista stoppsõnad</FormLabel>
                  <FormControlLabel control={
                    <Checkbox
                      checked={stopwordsChecked}
                      onChange={(e) => setStopwordsChecked(e.target.checked)}
                    ></Checkbox>
                  }
                                    label={<>
                                      vaikimisi loendist
                                      <Tooltip title={<>Stoppsõnadena kasutatakse Kristel Uiboaedi loodud listi. See
                                        sisaldab sidesõnu, asesõnu, grammatilise tähendusega tegusõnu, sisutühjasid
                                        määrsõnu jms. Täielik nimekiri on kättesaadav Tartu Ülikooli
                                        andmerepositooriumis klikkides <a href={"https://datadoi.ee/handle/33/78"}
                                                                          target="_blank"
                                                                          rel="noopener noreferrer">siia</a>.</>}
                                               placement="right">
                                        <QuestionMark className="stopwords-tooltip-icon"/>
                                      </Tooltip></>}
                  />
                  <TextField label="Kirjuta siia oma stoppsõnad (nt koer, kodu)"
                             variant="outlined"
                             size="small"
                             value={customStopwords}
                             onChange={(e) => setCustomStopwords(e.target.value)}
                             style={{width: "350px"}}/>
                </FormControl>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
