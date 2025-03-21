import { memo, useContext, useEffect, useRef, useState } from 'react';
import { Input } from './textinput/Input';
import { WordInfo } from './WordInfo';
import './styles/WordAnalyser.css';
import { Alert, Box, Fade, Grid, IconButton, Typography } from '@mui/material';
import '../../translations/i18n';
import i18n from 'i18next';
import {
  AnalyseContext,
  AnalyseContextWithoutMissingData,
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
import { WORDANALYSER_MAX_WORD_COUNT_FOR_WORDINFO } from '../../const/Constants';
import { useTranslation } from 'react-i18next';
import { useGetWordAnalyserResult } from '../../hooks/service/ToolsService';
import { loadingEmitter } from '../../../App';
import { LoadingSpinnerEventType } from '../../components/LoadingSpinner';

function WordAnalyser() {
  const [analysedInput, setAnalysedInput] = useContext(AnalyseContext);
  const [, setModifiedAnalysedInput] = useContext(AnalyseContextWithoutMissingData);
  const [showResults, setShowResults] = useState(false);
  const [selectedWords, setSelectedWords] = useState(['']);
  const [wordInfo, setWordInfo] = useState('');
  const [isTextTooLong, setIsTextTooLong] = useState(false);
  const [isFinishedLoading, setIsFinishedLoading] = useState(false);
  const setTableValue = useContext(TabContext)[1];
  const type = useContext(TypeContext);
  const form = useContext(FormContext);
  const word = useContext(WordContext);
  const syllable = useContext(SyllableContext);
  const syllableWord = useContext(SyllableWordContext);
  const lemma = useContext(LemmaContext);
  const [open, setOpen] = useState(false);
  const [border, setBorder] = useState(0);
  const inputRef = useRef();
  const previousStoreStateRef = useRef(queryStore.getState());
  const { t } = useTranslation();
  const { getWordAnalyserResult } = useGetWordAnalyserResult();

  useEffect(() => {
    getResponse();

    const unsubscribe = queryStore.subscribe(() => {
      const currentStoreState = queryStore.getState();
      const previousStoreState = previousStoreStateRef.current;

      if (currentStoreState !== previousStoreState
        && !(currentStoreState.corpusTextIds == null
          && currentStoreState.ownTexts == null)) {
        getResponse();
      }

      previousStoreStateRef.current = currentStoreState;
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getResponse = () => {
    resetAnalyser();
    setIsFinishedLoading(false);
    getWordAnalyserResult(generateRequestData())
      .then(response => {
        loadingEmitter.emit(LoadingSpinnerEventType.LOADER_START_SHRINK_DISABLED);
        setTimeout(() => { // for a visual cue when rendering takes longer
          setIsFinishedLoading(true);
          analyseInput(response);
          loadingEmitter.emit(LoadingSpinnerEventType.LOADER_END);
        }, 0);
      });
  };

  const generateRequestData = () => {
    const storeState = queryStore.getState();
    return JSON.stringify({
      corpusTextIds: storeState.corpusTextIds || null,
      ownTexts: storeState.ownTexts || null,
      language: i18n.language
    });
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
  const analyseInput = (data) => {
    const words = data.sonad;
    const lemmas = data.lemmad;
    const syllables = data.silbid;
    const wordTypes = data.sonaliigid;
    const wordForms = data.vormimargendid;

    const textTooLong = words.length > WORDANALYSER_MAX_WORD_COUNT_FOR_WORDINFO;
    setIsTextTooLong(textTooLong);

    const createdIds = createIds(words);
    const analysedWordsLowerCase = processWordsLowerCase([...words], wordTypes);
    const analysedSyllablesLowerCase = processSyllableLowerCase([...syllables], analysedWordsLowerCase, wordTypes);

    const inputObj = {
      ids: createdIds,
      text: data.tekst,
      wordsOrig: words,
      words: analysedWordsLowerCase,
      lemmas: lemmas,
      syllables: analysedSyllablesLowerCase,
      wordtypes: wordTypes,
      wordforms: wordForms
    };

    setShowResults(true);
    setAnalysedInput(inputObj);
    setModifiedAnalysedInput(createModifiedInputObj(inputObj));
    setTableValue(1);

    // select first word and show wordInfo after loading, if the wordcount limit has not been exceeded
    if (!textTooLong) {
      setSelectedWords([inputObj.ids[0]]);

      let wordInfoObj = {
        word: inputObj.words[0],
        lemma: inputObj.lemmas[0],
        syllables: inputObj.syllables[0],
        type: inputObj.wordtypes[0],
        form: inputObj.wordforms[0]
      };
      setWordInfo(wordInfoObj);
    }
  };

  const createModifiedInputObj = (inputObj) => {
    const deepCopiedInputObj = JSON.parse(JSON.stringify(inputObj));
    const filteredIndices = deepCopiedInputObj.syllables.map((element, index) => element === '–' ? index : null).filter(index => index !== null);
    filteredIndices.forEach((index, offset) => {
      deepCopiedInputObj.ids.splice(index - offset, 1);
      deepCopiedInputObj.wordsOrig.splice(index - offset, 1);
      deepCopiedInputObj.words.splice(index - offset, 1);
      deepCopiedInputObj.lemmas.splice(index - offset, 1);
      deepCopiedInputObj.syllables.splice(index - offset, 1);
      deepCopiedInputObj.wordtypes.splice(index - offset, 1);
      deepCopiedInputObj.wordforms.splice(index - offset, 1);
    });
    return deepCopiedInputObj;
  };

  const processWordsLowerCase = (words, wordTypes) => {
    for (let i = 0; i < words.length; i++) {
      if (wordTypes[i] !== 'nimisõna (pärisnimi)') {
        words[i] = words[i].toLowerCase();
      }
    }
    return words;
  };

  const processSyllableLowerCase = (syllables, analysedWordsLowerCase, wordTypes) => {
    for (let i = 0; i < syllables.length; i++) {
      if (wordTypes[i] === 'nimisõna (pärisnimi)') {
        if (analysedWordsLowerCase[i].includes('-')) {
          let result = '';
          let hyphenCounter = 0;
          const nameWithoutHyphens = analysedWordsLowerCase[i].replaceAll('-', '');
          for (let j = 0; j < nameWithoutHyphens.length; j++) {
            if (syllables[i][j + hyphenCounter] === '-') {
              result += '-';
              hyphenCounter++;
            }
            result += nameWithoutHyphens[j];
          }
          syllables[i] = result;
        }
        syllables[i] = syllables[i][0].toUpperCase() + syllables[i].slice(1);
      }
    }
    return syllables;
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
      let analysedSyllable = analysedInput.syllables[i];
      let id = analysedInput.ids[i];
      if (analysedWord.indexOf(syllable) >= 0
        && analysedSyllable
        && (syllable === analysedSyllable
          || analysedSyllable.endsWith(`-${syllable}`)
          || analysedSyllable.startsWith(`${syllable}-`)
          || analysedSyllable.includes(`-${syllable}-`))) {
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

  // resetting
  const resetAnalyser = () => {
    let newInputObj = {
      ids: [''],
      text: '',
      words: [''],
      lemmas: [''],
      syllables: [''],
      wordtypes: [''],
      wordforms: ['']
    };
    setAnalysedInput(newInputObj);
    setModifiedAnalysedInput(newInputObj);
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
            sx={{ mb: 2 }}
          >
            <Typography color={'#1A237E'}>
              <strong>Vasakus kastis sõnadel klõpastes ilmub paremale info antud sõna kohta</strong>
            </Typography>
          </Alert>
        </Box>
      </Fade>
      <Grid className="position-relative" container
            columnSpacing={{ xs: 0, md: 4 }}>
        {isTextTooLong &&
          <Alert severity="info"
                 className="textTooLongInfobox"
          >
            {t('word_analyser_text_too_long_infobox')}
          </Alert>
        }
        <Grid item
              xs={12}
              md={12}>
          <Box display={'flex'}
               justifyContent={'flex-start'}>
          </Box>
        </Grid>
        <Grid item
              xs={12}
              md={6}>
          <Input isTextTooLong={isTextTooLong}
                 isFinishedLoading={isFinishedLoading}
                 onSubmit={getResponse}
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
          {showResults && !isTextTooLong &&
            <WordInfo onWordInfo={wordInfo} />
          }
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(WordAnalyser);
