import {useEffect, useState} from 'react';
import {Input} from './textinput/Input';
import {WordInfo} from './WordInfo';
import {v4 as uuidv4} from 'uuid';
import './styles/WordAnalyser.css';
import TextUpload from './textupload/TextUpload';
import GrammaticalAnalysis from './GrammaticalAnalysis';
import {Alert, Box, Grid, Tab, Tabs, Typography} from '@mui/material';
import LemmaView from './LemmaView';
import Syllables from './Syllables';
import {useTranslation} from "react-i18next";
import "../../translations/i18n";
import i18n from "i18next";

function WordAnalyser() {
  const [showResults, setShowResults] = useState(false);
  const [analysedInput, setAnalysedInput] = useState({
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
  const [selectedWords, setSelectedWords] = useState(['']);
  const [wordInfo, setWordInfo] = useState('');
  const [textFromFile, setTextFromFile] = useState('');
  const {t} = useTranslation();
  const [newPageSize, setNewPageSize] = useState(10);
  const [newPageIndex, setPageIndex] = useState(0);
  const [newSortHeader, setNewSortHeader] = useState("sagedus");
  const [newSortDesc, setNewSortDesc] = useState(true);

  //get words
  const getWords = async (input) => {
    const response = await fetch("/api/texts/sonad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({tekst: input}),
    });
    const data = await response.json();

    let newData = [];
    for (const element of data) {
      if (element) {
        let item = element.replace(/['*]+/g, '');
        newData.push(item);
      }
    }
    return newData;
  }

  //get lemmas
  const getLemmas = async (input) => {
    const response = await fetch("/api/texts/lemmad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({tekst: input}),
    });

    return await response.json();
  }

  //get sentences
  const getSentences = async (input) => {
    const response = await fetch("/api/texts/laused", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({tekst: input}),
    });
    return await response.json();
  }

  //get word type
  const getWordTypes = async (input) => {
    const response = await fetch("/api/texts/sonaliik", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({tekst: input, language: i18n.language}),
    });
    return await response.json();
  }

  //get syllables
  const getSyllables = async (input) => {
    const response = await fetch("/api/texts/silbid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })
    const data = await response.json();

    let newData = [];
    for (const element of data) {
      if (element) {
        let item = element.replace(/[()'",.]+/g, '');
        if (item) {
          newData.push(item);
        }
      }
    }
    return newData;
  }

  //get word form
  const getWordForm = async (input) => {
    const response = await fetch("/api/texts/vormimargendid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({tekst: input, language: i18n.language}),
    })
    return await response.json();
  }

  //create ids
  const createIds = (words) => {
    let data = [];
    for (const element of words) {
      let id = uuidv4(element);
      data.push(id);
    }
    return data;
  }

  //analyse text
  const analyseInput = async (input) => {
    const wordsAndLemmas = await Promise.all([getLemmas(input), getWords(input)]);
    const rawLemmas = wordsAndLemmas[0];
    const analysedWordsOrig = wordsAndLemmas[1];

    const beautifiedLemmas = [];
    let syllableReadyWords = '';
    for (const element of rawLemmas) {
      if (element) {
        beautifiedLemmas.push(element.replace(/['*_=]+/g, ''));
      }
    }

    for (let i = 0; i < rawLemmas.length; i++) {
      let word = analysedWordsOrig[i];
      // remove "–" symbols before syllabifying, otherwise it crashes
      // replace "_" with "-" because syllabifier doesn't recognize compound words and stanza puts "_" symbol between compound words (when lemmatizing), so the problem can be fixed with this little hack
      if (rawLemmas[i].includes('_')) {
        let index = rawLemmas[i].indexOf('_');
        syllableReadyWords += [word.slice(0, index), '-', word.slice(index)].join('').replaceAll("–", "") + " ";
      } else {
        syllableReadyWords += word + " ";
      }
    }

    const results = await Promise.all([getSyllables(syllableReadyWords), getSentences(input), getWordTypes(input), getWordForm(input)]);
    let analysedSyllables = results[0];
    const analysedSentences = results[1];
    const analysedWordTypes = results[2];
    const analysedWordForms = results[3];
    const createdIds = createIds(analysedWordsOrig);

    for (let i = 0; i < analysedSyllables.length; i++) {
      let word = analysedSyllables[i];
      if (word.charAt(0) === '-') {
        analysedSyllables[i] = word.slice(1);
        word = analysedSyllables[i];
      }
      if (word.charAt(word.length - 1) === '-') {
        analysedSyllables[i] = word.slice(0, word.length - 1);
      }
    }

    let analysedWordsLowerCase = [...analysedWordsOrig];
    for (let i = 0; i < analysedWordsLowerCase.length; i++) {
      if (analysedWordTypes[i] !== "nimisõna (pärisnimi)") {
        analysedWordsLowerCase[i] = analysedWordsLowerCase[i].toLowerCase();
      }
    }

    let analysedSyllablesLowerCase = [...analysedSyllables];
    for (let i = 0; i < analysedSyllablesLowerCase.length; i++) {
      if (analysedWordTypes[i] !== "nimisõna (pärisnimi)") {
        analysedSyllablesLowerCase[i] = analysedSyllablesLowerCase[i].toLowerCase();
      }
    }

    const inputObj = {
      ids: createdIds,
      text: input,
      sentences: analysedSentences,
      wordsOrig: analysedWordsOrig,
      words: analysedWordsLowerCase,
      lemmas: beautifiedLemmas,
      syllables: analysedSyllablesLowerCase,
      wordtypes: analysedWordTypes,
      wordforms: analysedWordForms
    }

    setShowResults(true);
    setAnalysedInput(inputObj);
  }

  //select first word and show wordInfo after loading
  useEffect(() => {
    setSelectedWords([analysedInput.ids[0]]);

    let wordInfoObj = {
      word: analysedInput.words[0],
      lemma: analysedInput.lemmas[0],
      syllables: analysedInput.syllables[0],
      type: analysedInput.wordtypes[0],
      form: analysedInput.wordforms[0],
    }
    setWordInfo(wordInfoObj);
  }, [analysedInput]);

  //highlight the word selected in input
  const showThisWord = (id) => {
    let content = [id];
    setSelectedWords(content);
  }

  //highlight selected word in lemma table
  const showWord = (word) => {
    let content = [];
    for (let i = 0; i < analysedInput.words.length; i++) {
      let analysedWord = analysedInput.words[i];
      let id = analysedInput.ids[i];
      if (analysedWord === word) {
        content.push(id);
      }
    }
    setSelectedWords(content);

    let firstSelectedId;
    for (let i = 0; i < analysedInput.words.length; i++) {
      if (word === analysedInput.words[i]) {
        firstSelectedId = analysedInput.ids[i];
        break;
      }
    }
    showInfo(firstSelectedId);
  }

  const showSyllable = (syllable) => {
    let content = [];
    for (let i = 0; i < analysedInput.words.length; i++) {
      let analysedWord = analysedInput.words[i];
      let analysedSillable = analysedInput.syllables[i];
      let id = analysedInput.ids[i];
      if (analysedWord.indexOf(syllable) >= 0 && (syllable === analysedSillable || analysedSillable.endsWith("-" + syllable) || analysedSillable.startsWith(syllable + "-") || analysedSillable.includes("-" + syllable + "-"))) {
        content.push(id);
      }
    }
    setSelectedWords(content);

    const wordInfoObj = {
      word: "–",
      lemma: "–",
      syllables: syllable,
      type: "–",
      form: "–",
    }
    setWordInfo(wordInfoObj);
  }

  const showType = (type) => {
    let content = [];
    for (let i = 0; i < analysedInput.words.length; i++) {
      let analysedWord = analysedInput.wordtypes[i];
      let id = analysedInput.ids[i];
      if (analysedWord === type) {
        content.push(id);
      }
    }
    setSelectedWords(content);

    const wordInfoObj = {
      word: "–",
      lemma: "–",
      syllables: "–",
      type: type,
      form: "–",
    }
    setWordInfo(wordInfoObj);
  }

  const showForm = (form) => {
    let content = [];
    for (let i = 0; i < analysedInput.words.length; i++) {
      let analysedWord = analysedInput.wordforms[i];
      let id = analysedInput.ids[i];
      if (analysedWord === form) {
        content.push(id);
      }
    }
    setSelectedWords(content);

    const wordInfoObj = {
      word: "–",
      lemma: "–",
      syllables: "–",
      type: "-",
      form: form,
    }
    setWordInfo(wordInfoObj);
  }

  //highlight selected lemma
  const showLemma = (lemma) => {
    let content = [];
    for (let i = 0; i < analysedInput.lemmas.length; i++) {
      let analysedLemma = analysedInput.lemmas[i];
      let id = analysedInput.ids[i];
      if (analysedLemma === lemma) {
        content.push(id);
      }
    }
    setSelectedWords(content);

    let index = "";
    for (let i = 0; i < analysedInput.words.length; i++) {
      if (analysedInput.lemmas[i] === lemma) {
        index = parseInt(i);
        break;
      }
    }
    const wordInfoObj = {
      word: "–",
      lemma: analysedInput.lemmas[index],
      syllables: "–",
      type: analysedInput.wordtypes[index],
      form: "–",
    }
    setWordInfo(wordInfoObj);
  }

  //forward selected word from input to wordInfo
  const showInfo = (selectedId) => {
    let index = "";
    for (let i = 0; i < analysedInput.words.length; i++) {
      if (analysedInput.ids[i] === selectedId.toString()) {
        index = parseInt(i);
        break;
      }
    }

    const wordInfoObj = {
      word: analysedInput.words[index],
      lemma: analysedInput.lemmas[index],
      syllables: analysedInput.syllables[index],
      type: analysedInput.wordtypes[index],
      form: analysedInput.wordforms[index],
    }

    setWordInfo(wordInfoObj);
  }

  const sendTextFromFile = (data) => {
    setTextFromFile(data);
  }

  //resetting
  const resetAnalyser = () => {
    let newInputObj = {
      ids: [''],
      text: '',
      sentences: [''],
      words: [''],
      lemmas: [''],
      syllables: [''],
      wordtypes: [''],
      wordforms: ['']
    };
    setAnalysedInput(newInputObj);
    setShowResults(false);
  }

  //tabs
  function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{p: 3}}>
            <Typography component={`span`}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    setNewSortDesc(true);
    setNewSortHeader("sagedus");
    setPageIndex(0);
  };

  return (
    <Box component='section'
         className="container">
      <Grid container
            columnSpacing={{xs: 0, md: 4}}>
        <Grid item
              xs={12}
              md={12}>
          <TextUpload sendTextFromFile={sendTextFromFile}/>
        </Grid>
        <Grid item
              xs={12}
              md={6}>
          <Input textFromFile={textFromFile}
                 onInsert={analyseInput}
                 onAnalyse={analysedInput}
                 onMarkWords={selectedWords}
                 onWordSelect={showThisWord}
                 onWordInfo={showInfo}
                 onReset={resetAnalyser}/>
        </Grid>
        <Grid item
              xs={12}
              md={6}>
          {showResults ?
            <WordInfo onWordInfo={wordInfo}/> :
            <Alert severity="info">
              {t("infobox_first")}<br/>
              {t("infobox_second")}
            </Alert>}
        </Grid>
        {showResults &&
          <Grid item
                xs={12}
                md={12}>
            <h2>{t("text_analysis")}</h2>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <Tabs value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example">
                <Tab label={t("common_syllables")} {...a11yProps(0)} />
                <Tab label={t("common_lemmas")} {...a11yProps(1)} />
                <Tab label={t("tab_gram_anal")} {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value}
                      index={0}>
              <div>
                {(analysedInput.syllables.length > 1 || analysedInput.syllables[0] !== "") &&
                  <Syllables onAnalyse={analysedInput}
                             onSyllableSelect={showSyllable} newPageSize={newPageSize}
                             setNewPageSize={setNewPageSize}
                             newPageIndex={newPageIndex}
                             setPageIndex={setPageIndex}
                             newSortHeader={newSortHeader}
                             setNewSortHeader={setNewSortHeader} newSortDesc={newSortDesc}
                             setNewSortDesc={setNewSortDesc}/>}
              </div>
            </TabPanel>
            <TabPanel value={value}
                      index={1}>
              <div>
                <LemmaView onAnalyse={analysedInput}
                           onLemmaSelect={showLemma}
                           onWordSelect={showWord}
                           newPageSize={newPageSize}
                           setNewPageSize={setNewPageSize}
                           newPageIndex={newPageIndex}
                           setPageIndex={setPageIndex}
                           newSortHeader={newSortHeader}
                           setNewSortHeader={setNewSortHeader} newSortDesc={newSortDesc}
                           setNewSortDesc={setNewSortDesc}/>
              </div>
            </TabPanel>
            <TabPanel value={value}
                      index={2}>
              <div>
                <GrammaticalAnalysis onTypeSelect={showType}
                                     onFormSelect={showForm}
                                     onWordSelect={showWord}
                                     onAnalyse={analysedInput}
                                     newPageSize={newPageSize}
                                     setNewPageSize={setNewPageSize}
                                     newPageIndex={newPageIndex}
                                     setPageIndex={setPageIndex}
                                     newSortHeader={newSortHeader}
                                     setNewSortHeader={setNewSortHeader} newSortDesc={newSortDesc}
                                     setNewSortDesc={setNewSortDesc}/>
              </div>
            </TabPanel>
          </Grid>
        }
      </Grid>
    </Box>
  )
}

export default WordAnalyser;
