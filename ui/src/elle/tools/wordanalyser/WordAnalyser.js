import { memo, useContext, useEffect, useState } from 'react';
import { Input } from './textinput/Input';
import { WordInfo } from './WordInfo';
import { v4 as uuidv4 } from 'uuid';
import './styles/WordAnalyser.css';
import TextUpload from '../../components/textupload/TextUpload';
import { Alert, Box, Fade, Grid, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../../translations/i18n';
import i18n from 'i18next';
import {
  AnalyseContext,
  FormContext,
  LemmaContext,
  SyllableContext,
  SyllableWordContext,
  TabContext,
  TypeContext,
  WordContext
} from './Contexts';
import CloseIcon from '@mui/icons-material/Close';

function WordAnalyser() {
  const [analysedInput, setAnalysedInput] = useContext(AnalyseContext);
  const [showResults, setShowResults] = useState(false);
  const [selectedWords, setSelectedWords] = useState(['']);
  const [wordInfo, setWordInfo] = useState('');
  const [textFromFile, setTextFromFile] = useState('');
  const setTableValue = useContext(TabContext)[1];
  const type = useContext(TypeContext);
  const form = useContext(FormContext);
  const word = useContext(WordContext);
  const syllable = useContext(SyllableContext);
  const syllableWord = useContext(SyllableWordContext);
  const lemma = useContext(LemmaContext);
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const [border, setBorder] = useState(0);

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
      if (rawLemmas[i].includes('_')) {
        let index = rawLemmas[i].indexOf('_');
        syllableReadyWords += [word.slice(0, index), '-', word.slice(index)].join('').replaceAll("–", "") + " ";
      } else {
        syllableReadyWords += word + " ";
      }
    }

    const results = await Promise.all([getSyllables(syllableReadyWords), getSentences(input), getWordTypes(input), getWordForm(input)]);
    const analysedSyllables = results[0];
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
    setTableValue(1);

    //select first word and show wordInfo after loading
    setSelectedWords([inputObj.ids[0]]);

    let wordInfoObj = {
      word: inputObj.words[0],
      lemma: inputObj.lemmas[0],
      syllables: inputObj.syllables[0],
      type: inputObj.wordtypes[0],
      form: inputObj.wordforms[0],
    }
    setWordInfo(wordInfoObj);
  }

  //highlight selected word from input
  const showThisWord = (id) => {
    let content = [id];
    setSelectedWords(content);
  }

  //highlight selected syllable from syllable table
  useEffect(() => {
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
  }, [syllable, analysedInput]);

  //highlight selected syllable word from syllable table
  useEffect(() => {
    let content = []
    for (let i = 0; i < analysedInput.words.length; i++) {
      let analysedSyllable = analysedInput.syllables[i];
      let id = analysedInput.ids[i];
      if (syllableWord === analysedSyllable) {
        content.push(id)
      }
    }
    setSelectedWords(content);

    const wordInfoObj = {
      word: "–",
      lemma: "–",
      syllables: syllableWord,
      type: "–",
      form: "–",
    }
    setWordInfo(wordInfoObj);
  }, [syllableWord, analysedInput]);

  //highlight selected lemma from lemma table
  useEffect(() => {
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
  }, [lemma, analysedInput]);

  //highlight selected word from lemma table and grammatical analysis table
  useEffect(() => {
    const index = analysedInput.ids.findIndex((element) => element === word)
    let content = [];

    for (let i = 0; i < analysedInput.words.length; i++) {
      let id = analysedInput.ids[i];
      if (analysedInput.words[i] === analysedInput.words[index]
        && analysedInput.wordtypes[i] === analysedInput.wordtypes[index]
        && analysedInput.wordforms[i] === analysedInput.wordforms[index] //see peaks ka ikka olema
      ) {
        content.push(id);
      }
    }
    setSelectedWords(content);

    const wordInfoObj = {
      word: analysedInput.words[index],
      lemma: analysedInput.lemmas[index],
      syllables: analysedInput.syllables[index],
      type: analysedInput.wordtypes[index],
      form: analysedInput.wordforms[index],
    }

    setWordInfo(wordInfoObj);

  }, [word, analysedInput]);

  // highlight selected word form from grammatical analysis table
  useEffect(() => {
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
      type: "–",
      form: form,
    }
    setWordInfo(wordInfoObj);
  }, [form, analysedInput]);

  // highlight selected word type from grammatical analysis table
  useEffect(() => {
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
  }, [type, analysedInput]);


  //forward selected word from input to wordInfo
  function showInfo(selectedId) {
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
    setTableValue(0);
    setShowResults(false);
  }

  return (
    <Box component='section'
         className="container"
         paddingTop={"20px"}
         border={border}
         borderColor={"#E1F5FE"}
         borderRadius={10}
    >
      <Fade in={open}>
      <Box
        paddingX={"10px"}
        width={"65%"}
        borderRadius={5}
        bgcolor={"#E1F5FE"}
      marginTop={"-50px"}
      marginLeft={"auto"}
      marginRight={"auto"}
      >
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
          <Typography color={"#1A237E"} ><strong>Vasakus kastis sõnadel klõpastes ilmub paremale info antud sõna kohta</strong></Typography>
        </Alert>
      </Box>
      </Fade>
      <Grid container
            columnSpacing={{xs: 0, md: 4}}>
        <Grid item
              xs={12}
              md={12}>
          <Box display={"flex"}
          justifyContent={"flex-start"}>
            <Box><TextUpload sendTextFromFile={sendTextFromFile}/></Box>
          </Box>
        </Grid>
        <Grid item
              xs={12}
              md={6}>
          <Input textFromFile={textFromFile}
                 onInsert={analyseInput}
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
      </Grid>
    </Box>
  )
}

export default memo(WordAnalyser);
