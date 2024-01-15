import { memo, useContext, useEffect, useRef, useState } from 'react';
import { Input } from './textinput/Input';
import { WordInfo } from './WordInfo';
import './styles/WordAnalyser.css';
import TextUpload from '../../components/TextUpload';
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
import { queryStore } from '../../store/QueryStore';
import { getSelectedTexts } from '../../service/TextService';

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
  const [storeData, setStoreData] = useState();
  const inputRef = useRef();

  useEffect(() => {
    getSelectedTexts(setStoreData);
  }, []);

  useEffect(() => {
    setTextFromFile(storeData);
  }, [storeData]);

  queryStore.subscribe(() => {
    getSelectedTexts(setStoreData);
  });

  const getResponse = (input) => {
    fetch('/api/texts/sonad-lemmad-silbid-laused-sonaliigid-vormimargendid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tekst: input, language: i18n.language})
    })
      .then(data => data.json())
      .then(data => {
        data.sonad = processWordsResponse(data.sonad);
        data.silbid = processSyllablesResponse(data.silbid);
        analyseInput(input, data);
      });
  };

  const processWordsResponse = (data) => {
    let newData = [];

    for (const element of data) {
      if (element) {
        let item = element.replace(/['*]+/g, '');
        newData.push(item);
      }
    }
    return newData;
  };

  const processSyllablesResponse = (data) => {
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
  };

  // create ids
  const createIds = (words) => {
    let data = [];
    let uniqueCounter = 0;
    for (const element of words) {
      let word = element;
      while (data.includes(word)) {
        word = word + uniqueCounter;
        uniqueCounter++;
      }
      data.push(word);
    }
    return data;
  };

  // analyse text
  const analyseInput = (input, data) => {
    const words = data.sonad;
    const lemmas = data.lemmad;
    const syllables = data.silbid;
    // todo kas on vaja?

    // todo sõnaanalüsaatoris võtta maha 1000 sõna piirang, kaotada klõpsamise kast kui > 1001 ning kuvada infokast "Teksti analüüsimine sõna kaupa on võimalik kuni 1000-sõnalise teksti puhul."

    const sentences = data.laused;
    const wordTypes = data.sonaliigid;
    const wordForms = data.vormimargendid;

    const createdIds = createIds(words);

    for (let i = 0; i < syllables.length; i++) {
      let word = syllables[i];
      if (word.charAt(0) === '-') {
        syllables[i] = word.slice(1);
        word = syllables[i];
      }
      if (word.charAt(word.length - 1) === '-') {
        syllables[i] = word.slice(0, word.length - 1);
      }
    }

    let analysedWordsLowerCase = [...words];
    for (let i = 0; i < analysedWordsLowerCase.length; i++) {
      if (wordTypes[i] !== 'nimisõna (pärisnimi)') {
        analysedWordsLowerCase[i] = analysedWordsLowerCase[i].toLowerCase();
      }
    }

    let analysedSyllablesLowerCase = [...syllables];
    for (let i = 0; i < analysedSyllablesLowerCase.length; i++) {
      if (wordTypes[i] !== 'nimisõna (pärisnimi)') {
        analysedSyllablesLowerCase[i] = analysedSyllablesLowerCase[i].toLowerCase();
      }
    }

    const inputObj = {
      ids: createdIds,
      text: input,
      sentences: sentences,
      wordsOrig: words,
      words: analysedWordsLowerCase,
      lemmas: lemmas,
      syllables: analysedSyllablesLowerCase,
      wordtypes: wordTypes,
      wordforms: wordForms
    };

    setShowResults(true);
    setAnalysedInput(inputObj);
    setTableValue(1);

    // select first word and show wordInfo after loading
    setSelectedWords([inputObj.ids[0]]);

    let wordInfoObj = {
      word: inputObj.words[0],
      lemma: inputObj.lemmas[0],
      syllables: inputObj.syllables[0],
      type: inputObj.wordtypes[0],
      form: inputObj.wordforms[0]
    };
    setWordInfo(wordInfoObj);
  };

  // highlight selected word from input
  const showThisWord = (id) => {
    let content = [id];
    setSelectedWords(content);
  };

  // highlight selected syllable from syllable table
  useEffect(() => {
    let content = [];
    for (let i = 0; i < analysedInput.words.length; i++) {
      let analysedWord = analysedInput.words[i];
      let analysedSillable = analysedInput.syllables[i];
      let id = analysedInput.ids[i];
      if (analysedWord.indexOf(syllable) >= 0
        && (syllable === analysedSillable
          || analysedSillable.endsWith(`-${syllable}`)
          || analysedSillable.startsWith(`${syllable}-`)
          || analysedSillable.includes(`-${syllable}-`))) {
        content.push(id);
      }
    }
    setSelectedWords(content);

    const wordInfoObj = {
      word: '–',
      lemma: '–',
      syllables: syllable,
      type: '–',
      form: '–'
    };
    setWordInfo(wordInfoObj);
  }, [syllable, analysedInput]);

  // highlight selected syllable word from syllable table
  useEffect(() => {
    let content = [];
    for (let i = 0; i < analysedInput.words.length; i++) {
      let analysedSyllable = analysedInput.syllables[i];
      let id = analysedInput.ids[i];
      if (syllableWord === analysedSyllable) {
        content.push(id);
      }
    }
    setSelectedWords(content);

    const wordInfoObj = {
      word: '–',
      lemma: '–',
      syllables: syllableWord,
      type: '–',
      form: '–'
    };
    setWordInfo(wordInfoObj);
  }, [syllableWord, analysedInput]);

  // highlight selected lemma from lemma table
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

    let index = '';
    for (let i = 0; i < analysedInput.words.length; i++) {
      if (analysedInput.lemmas[i] === lemma) {
        index = parseInt(i);
        break;
      }
    }
    const wordInfoObj = {
      word: '–',
      lemma: analysedInput.lemmas[index],
      syllables: '–',
      type: analysedInput.wordtypes[index],
      form: '–'
    };
    setWordInfo(wordInfoObj);
  }, [lemma, analysedInput]);

  // highlight selected word from lemma table and grammatical analysis table
  useEffect(() => {
    const index = analysedInput.ids.findIndex((element) => element === word);
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
      form: analysedInput.wordforms[index]
    };

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
      word: '–',
      lemma: '–',
      syllables: '–',
      type: '–',
      form: form
    };
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
      word: '–',
      lemma: '–',
      syllables: '–',
      type: type,
      form: '–'
    };
    setWordInfo(wordInfoObj);
  }, [type, analysedInput]);


  // forward selected word from input to wordInfo
  function showInfo(selectedId) {
    let index = '';
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
      form: analysedInput.wordforms[index]
    };
    setWordInfo(wordInfoObj);
  }

  const sendTextFromFile = (data) => {
    setTextFromFile(data);
  };

  // resetting
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
  };

  return (
    <Box component="section"
         className="container"
         paddingTop={'20px'}
         border={border}
         borderColor={'#E1F5FE'}
         borderRadius={10}
    >
      <Fade in={open}>
        <Box
          paddingX={'10px'}
          width={'65%'}
          borderRadius={5}
          bgcolor={'#E1F5FE'}
          marginTop={'-50px'}
          marginLeft={'auto'}
          marginRight={'auto'}
        >
          <Alert
            severity={'info'}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  setBorder(0);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{mb: 2}}
          >
            <Typography color={'#1A237E'}><strong>Vasakus kastis sõnadel klõpastes ilmub paremale info antud sõna
              kohta</strong></Typography>
          </Alert>
        </Box>
      </Fade>
      <Grid container
            columnSpacing={{xs: 0, md: 4}}>
        <Grid item
              xs={12}
              md={12}>
          <Box display={'flex'}
               justifyContent={'flex-start'}>
            <Box><TextUpload sendTextFromFile={sendTextFromFile} /></Box>
          </Box>
        </Grid>
        <Grid item
              xs={12}
              md={6}>
          <Input textFromFile={textFromFile}
                 onInsert={getResponse}
                 onMarkWords={selectedWords}
                 onWordSelect={showThisWord}
                 onWordInfo={showInfo}
                 onReset={resetAnalyser}
                 ref={inputRef}
          />
        </Grid>
        <Grid item
              xs={12}
              md={6}>
          {showResults ?
            <WordInfo onWordInfo={wordInfo} /> :
            <Alert severity="info">
              {t('word_analysis_infobox_1')}<br />
              {t('word_analysis_infobox_2')}
            </Alert>}
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(WordAnalyser);
