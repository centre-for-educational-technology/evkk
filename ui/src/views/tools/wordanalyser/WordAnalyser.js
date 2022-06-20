import { useState, useEffect } from 'react'
import { Input } from './textinput/Input'
import { WordInfo } from './WordInfo'
import { v4 as uuidv4 } from 'uuid'
import './styles/WordAnalyser.css'
import TextUpload from './textupload/TextUpload'
import GrammaticalAnalysis from './GrammaticalAnalysis'
import { Alert, Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import LemmaView from './LemmaView'
import Syllables from './Syllables'

function App() {
  const [showResults, setShowResults] = useState(false)
  const [textTooLong, setTextTooLong] = useState(false)
  const [analysedInput, setAnalysedInput] = useState({ids: [''], text: '', sentences: [''], words: [''], wordsOrig: [''], lemmas: [''], syllables: [''], wordtypes: [''],  wordforms: [''] })
  const [selectedWords, setSelectedWords] = useState([''])
  const [wordInfo, setWordInfo] = useState('')
  const [textFromFile, setTextFromFile] = useState('')

  //get words
  const getWords = async (input) => {
    const response = await fetch("/api/texts/sonad", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })
    const data = await response.json()

    let newData = []
    for(let i=0; i<data.length; i++){
      if(data[i]){
        let item = data[i].replace(/['*]+/g, '')
        newData.push(item)
      }
    }
    return newData
  }

  //get lemmas
  const getLemmas = async (input) => {
    const response = await fetch("/api/texts/lemmad", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })

    const data = await response.json()
    let newData = []
    for(let i=0; i<data.length; i++){
      if(data[i]){
        let item = data[i].replace(/['*_=]+/g, '')
        newData.push(item)
      }
    }
    return newData
  }

  //get sentences
  const getSentences = async (input) => {
    const response = await fetch("/api/texts/laused", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })
    const data = await response.json()
    return data
  }

  //get word type
  const getWordTypes = async (input) => {
    const response = await fetch("/api/texts/sonaliik", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })
    const data = await response.json()
    return data
  }

  //get syllables
  const getSyllables = async (input) => {
    const response = await fetch("/api/texts/silbid", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })
    const data = await response.json()

    let newData = []
    for(let i=0; i<data.length; i++){
      if(data[i]){
        let item = data[i].replace(/[()'",.]+/g, '')
        if(item){
          newData.push(item)
        }
      }
    }
    return newData
  }

  //get word form
  const getWordForm = async (input) => {
    const response = await fetch("/api/texts/vormimargendid", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })
    const data = await response.json()
    return data
  }

  //create ids
  const createIds = (words) => {
    let data = []
    for(let i=0; i<words.length; i++){
      let id = uuidv4()
      data.push(id)
    }
    return data
  }

  //analyse text
  const analyseInput = async (input)=> {
    const analysedSentences = await getSentences(input)
    const analysedWordsOrig = await getWords(input)
    const analysedLemmas = await getLemmas(input)
    const analysedSyllables = await getSyllables(input)
    const analysedWordTypes = await getWordTypes(input)
    const analysedWordForms = await getWordForm(input)
    const createdIds = createIds(analysedWordsOrig)
    
    let analysedWordsLowerCase = [...analysedWordsOrig]
    for(let i=0; i<analysedWordsLowerCase.length; i++){
      if( analysedWordTypes[i]!=="nimisõna (pärisnimi)"){
        let currentWord =analysedWordsLowerCase[i].toLowerCase()
        analysedWordsLowerCase[i]= currentWord
      }
    }

    let analysedSyllablesLowerCase = [...analysedSyllables]
    for(let i=0; i<analysedSyllablesLowerCase.length; i++){
      if( analysedWordTypes[i]!=="nimisõna (pärisnimi)"){
        let currentItem =analysedSyllablesLowerCase[i].toLowerCase()
        analysedSyllablesLowerCase[i]=  currentItem
      }
    }

    const inputObj = {
      ids: createdIds,
      text: input,
      sentences: analysedSentences,
      wordsOrig: analysedWordsOrig,
      words: analysedWordsLowerCase,
      lemmas: analysedLemmas,
      syllables: analysedSyllablesLowerCase,
      wordtypes: analysedWordTypes,
      wordforms: analysedWordForms
    }
    
    setShowResults(true)
    if(inputObj.ids.length>100){
      setTextTooLong(true)
    }
    setAnalysedInput(inputObj)
  }

  //select first word and show wordInfo after loading
  useEffect(() => {
    setSelectedWords([analysedInput.ids[0]])
    
    let wordInfoObj = {
      word: analysedInput.words[0],
      lemma: analysedInput.lemmas[0],
      syllables: analysedInput.syllables[0],
      type: analysedInput.wordtypes[0],
      form: analysedInput.wordforms[0],
    }
    setWordInfo(wordInfoObj)
  }, [analysedInput])

  //highlight the word selected in input
  const showThisWord = (id) => {
    let content = [id]
    setSelectedWords(content)
  }
 
  //highlight selected word in lemma table
  const showWord = (word) => {
    let content = []
    for(let i=0; i<analysedInput.words.length; i++){
      let analysedWord = analysedInput.words[i]
      let id = analysedInput.ids[i]
      if(analysedWord===word){
        content.push(id)
      }
    }
    setSelectedWords(content)
    
    let firstSelectedId
    for(let i=0; i<analysedInput.words.length; i++){
      if(word===analysedInput.words[i]){
        firstSelectedId = analysedInput.ids[i]
        break
      }
    }
    showInfo(firstSelectedId)
  }

  //praegu otsib ainult kas sõna sisaldaba seda täheühendit, aga peaks looma eraldi massiivi, kui sõna ja tema sibid massiivis
  const showSyllable = (syllable) =>{
    let content = []
    for(let i=0; i<analysedInput.words.length; i++){
      let analysedWord = analysedInput.words[i]
      let id = analysedInput.ids[i]
      console.log(analysedWord.indexOf(syllable))
      if(analysedWord.indexOf(syllable)>=0){
        content.push(id)
      }
    }
    setSelectedWords(content)

    const wordInfoObj = {
      word: "–",
      lemma: "–",
      syllables: syllable,
      type:"–",
      form: "–",
    }
    setWordInfo(wordInfoObj)
  }

  const showType = (type) => {
    let content = []
    for(let i=0; i<analysedInput.words.length; i++){
      let analysedWord = analysedInput.wordtypes[i]
      let id = analysedInput.ids[i]
      if(analysedWord===type){
        content.push(id)
      }
    }
    setSelectedWords(content)

    const wordInfoObj = {
      word: "–",
      lemma: "–",
      syllables: "–",
      type: type,
      form: "–",
    }
    setWordInfo(wordInfoObj)
  }

  const showForm = (form) => {
    let content = []
    for(let i=0; i<analysedInput.words.length; i++){
      let analysedWord = analysedInput.wordforms[i]
      let id = analysedInput.ids[i]
      if(analysedWord===form){
        content.push(id)
      }
    }
    setSelectedWords(content)
    
    const wordInfoObj = {
      word: "–",
      lemma: "–",
      syllables: "–",
      type: "-",
      form: form,
    }
    setWordInfo(wordInfoObj)
  }

  //highlight selected lemma
  const showLemma = (lemma) => {
    let content = []
    for(let i=0; i<analysedInput.lemmas.length;i++){
      let analysedLemma = analysedInput.lemmas[i]
      let id = analysedInput.ids[i]
      if(analysedLemma===lemma){
        content.push(id)
      }
    }
    setSelectedWords(content)
    
    let index = ""
    for(let i=0; i<analysedInput.words.length; i++){
      if(analysedInput.lemmas[i]===lemma){
        index = parseInt(i)
        break
      }
    }
    const wordInfoObj = {
      word: "–",
      lemma: analysedInput.lemmas[index],
      syllables:  "–",
      type: analysedInput.wordtypes[index],
      form:  "–",
    }
    setWordInfo(wordInfoObj)
  }

  //forward selected word from input to wordInfo
  const showInfo = (selectedId) => {
    let index = ""
    for(let i=0; i<analysedInput.words.length; i++){
      if(analysedInput.ids[i]===selectedId.toString()){
        index = parseInt(i)
        break
      }
    }

    const wordInfoObj = {
      word: analysedInput.words[index],
      lemma: analysedInput.lemmas[index],
      syllables: analysedInput.syllables[index],
      type: analysedInput.wordtypes[index],
      form: analysedInput.wordforms[index],
    }

    setWordInfo(wordInfoObj)
  }

  const sendTextFromFile = (data) => {
    setTextFromFile(data);
  }

  //resetting
  const resetAnalyser = () => {
    let newInputObj = {ids: [''], text: '', sentences: [''], words: [''], lemmas: [''], syllables: [''], wordtypes: [''],  wordforms: [''] }
    setAnalysedInput(newInputObj)
    setShowResults(false)
    setTextTooLong(false)
  }

  //tabs
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component='section' className="container">
      <Grid container columnSpacing={{ xs: 0, md: 4 }}>
        <Grid item xs={12} md={12}>
          <TextUpload sendTextFromFile={sendTextFromFile} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Input textFromFile={textFromFile} onInsert={analyseInput} onAnalyse={analysedInput} onMarkWords={selectedWords} onWordSelect={showThisWord} onWordInfo={showInfo} onReset={resetAnalyser}/>
        </Grid>
        <Grid item xs={12} md={6}>
          {showResults && <WordInfo onWordInfo={wordInfo}/>}
        </Grid>

        {showResults && textTooLong &&
          <Grid item xs={12} md={12}>
            <Alert severity="warning">Tekst on analüüsi kuvamiseks liiga pikk!</Alert>
          </Grid>
        }

        {showResults && !textTooLong &&
        <Grid item xs={12}  md={12}>
          <h2>Tekstianalüüs</h2>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Silbid" {...a11yProps(0)} />
              <Tab label="Algvormid" {...a11yProps(1)} />
              <Tab label="Grammatiline analüüs" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div>
              {(analysedInput.syllables.length > 1 || analysedInput.syllables[0] !== "") && <Syllables onAnalyse={analysedInput}  onSyllableSelect={showSyllable} />}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <LemmaView onAnalyse={analysedInput} onLemmaSelect={showLemma} onWordSelect={showWord} />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div>
              <GrammaticalAnalysis onTypeSelect={showType} onFormSelect={showForm} onWordSelect={showWord} onAnalyse={analysedInput} />
            </div>
          </TabPanel>
        </Grid>
        }
      </Grid>
    </Box>
  )
}

export default App;
