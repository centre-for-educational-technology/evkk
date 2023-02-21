import {
  AnalyseContext,
  FormContext,
  LemmaContext,
  SetFormContext,
  SetLemmaContext,
  SetSyllableContext,
  SetSyllableWordContext,
  SetTypeContext,
  SetWordContext,
  SyllableContext,
  SyllableWordContext,
  TabContext,
  TypeContext,
  WordContext
} from "./Contexts";
import {useState} from "react";
import WordAnalyser from "./WordAnalyser";
import GrammaticalAnalysis from "./GrammaticalAnalysis";
import TableComponent from "./TableComponent";
import Syllables from "./Syllables";
import LemmaView from "./LemmaView";
import {Alert, Box, Fade, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Tutorial from "../../components/Tutorial";
import './styles/WordAnalyserParent.css';

export default function WordAnalyserParent() {

  const [wordValue, setWordValue] = useState("");
  const [formValue, setFormValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [border, setBorder] = useState(0);
  const [open, setOpen] = useState(false);
  const [analyseValue, setAnalyseValue] = useState({
    ids: [''],
    text: '',
    sentences: [''],
    words: [''],
    wordsOrig: [''],
    lemmas: [''],
    syllables: [''],
    wordtypes: [''],
    wordforms: ['']
  });
  const [syllableValue, setSyllableValue] = useState("");
  const [syllableWordValue, setSyllableWordValue] = useState("");
  const [lemmaValue, setLemmaValue] = useState("");
  const [tabValue, setTabValue] = useState(0);

  return (
    <>
      <SetWordContext.Provider value={setWordValue}>
        <WordContext.Provider value={wordValue}>
          <FormContext.Provider value={formValue}>
            <SetFormContext.Provider value={setFormValue}>
              <TypeContext.Provider value={typeValue}>
                <SetTypeContext.Provider value={setTypeValue}>
                  <AnalyseContext.Provider value={[analyseValue, setAnalyseValue]}>
                    <SyllableContext.Provider value={syllableValue}>
                      <SetSyllableContext.Provider value={setSyllableValue}>
                        <SyllableWordContext.Provider value={syllableWordValue}>
                          <SetSyllableWordContext.Provider value={setSyllableWordValue}>
                            <LemmaContext.Provider value={lemmaValue}>
                              <SetLemmaContext.Provider value={setLemmaValue}>
                                <TabContext.Provider value={[tabValue, setTabValue]}>
                                  <Box
                                    border={border}
                                    borderColor={"#E1F5FE"}
                                    borderRadius={10}
                                  >
                                    <WordAnalyser/>
                                  </Box>
                                  <Box component={"span"}>
                                    {tabValue === 1 || tabValue === 2 || tabValue === 3 ? <TableComponent/> : null}
                                  </Box>
                                  <Box
                                    padding={"20px"}
                                    border={border}
                                    borderColor={"#E1F5FE"}
                                    borderRadius={10}
                                  >
                                    <Fade in={open}>
                                      <Box className="alertBox">
                                        <Alert
                                          severity={"info"}
                                          action={
                                            <IconButton
                                              aria-label="close"
                                              color="inherit"
                                              size="small"
                                              onClick={() => {
                                                setOpen(false);
                                                setBorder(0)
                                              }}
                                            >
                                              <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                          }
                                          sx={{ mb: 2 }}
                                        >
                                          <Typography color={"#1A237E"} ><strong>Tabelis olevatel väärtustel klõpsides märgitakse väärtused ära ülaoleva kasti tekstis</strong></Typography>
                                        </Alert>
                                      </Box>
                                    </Fade>
                                    {tabValue === 1 ? <Syllables/> : null}
                                    {tabValue === 2 ? <LemmaView/> : null}
                                    {tabValue === 3 ? <GrammaticalAnalysis/> : null}
                                  </Box>
                                  {tabValue !== 0 ? <Tutorial/> : null}
                                </TabContext.Provider>
                              </SetLemmaContext.Provider>
                            </LemmaContext.Provider>
                          </SetSyllableWordContext.Provider>
                        </SyllableWordContext.Provider>
                      </SetSyllableContext.Provider>
                    </SyllableContext.Provider>
                  </AnalyseContext.Provider>
                </SetTypeContext.Provider>
              </TypeContext.Provider>
            </SetFormContext.Provider>
          </FormContext.Provider>
        </WordContext.Provider>
      </SetWordContext.Provider>
    </>
  );
}
