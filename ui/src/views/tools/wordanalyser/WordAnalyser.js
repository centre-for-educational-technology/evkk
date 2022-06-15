import { useState, useEffect } from 'react'
import { Input } from './textinput/Input'
import { WordInfo } from './WordInfo'
import { Stats } from './lemmastats/Stats'
import { v4 as uuidv4 } from 'uuid'
import './styles/WordAnalyser.css'
import TextUpload from './textupload/TextUpload'
import GrammaticalAnalysis from './GrammaticalAnalysis'


function App() {
  const [showStats, setShowStats] = useState(false)
  const [analysedInput, setAnalysedInput] = useState({ids: [''], text: '', sentences: [''], words: [''], lemmas: [''], })
  const [selectedWords, setSelectedWords] = useState([''])
  const [wordInfo, setWordInfo] = useState('')
  const [showWordInfo, setShowWordInfo] = useState(false)
  const [textFromFile, setTextFromFile] = useState('');

  //get words
  const getWords = async (input) => {
    const response = await fetch("http://localhost:3000/api/texts/sonad", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })
    const data = await response.json()
    return data
  }

  //get lemmas
  const getLemmas = async (input) => {
    const response = await fetch("http://localhost:3000/api/texts/lemmad", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tekst: input}),
    })

    const data = await response.json()
    return data
  }

  //get sentences
  const getSentences = async (input) => {
    const response = await fetch("http://localhost:3000/api/texts/laused", {
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
  //kas sisu peaks enne Stanzasse saatmist ära puhastama? html-märgenditest jmt
  const analyseInput = async (input)=> {
    const analysedSentences = await getSentences(input)
    const analysedWords = await getWords(input)
    const analysedLemmas = await getLemmas(input)
    const createdIds = createIds(analysedWords)

    const inputObj = {
      ids: createdIds,
      text: input,
      sentences: analysedSentences,
      words: analysedWords,
      lemmas: analysedLemmas,
    }
    setShowStats(!showStats)
    setAnalysedInput(inputObj)
    //showInfo([inputObj.ids[0]])
    //setSelectedWords([inputObj.ids[0]])
    
  }

  //select first word and show wordInfo after loading
  useEffect(() => {
    setSelectedWords([analysedInput.ids[0]])
    
    let wordInfoObj = {
      word: analysedInput.words[0].toLowerCase(),
      lemma: analysedInput.lemmas[0],
    }
    setWordInfo(wordInfoObj)
    setShowWordInfo(true)
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
      let analysedWord = analysedInput.words[i].toLowerCase()
      let id = analysedInput.ids[i]
      if(analysedWord===word){
        content.push(id)
      }
    }
    setSelectedWords(content)
    setShowWordInfo(false)
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
    setShowWordInfo(false)
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

    let wordInfoObj = {
      word: '',
      lemma: '',
    }

    if(Number.isInteger(index)){
      wordInfoObj = {
        word: analysedInput.words[index].toLowerCase(),
        lemma: analysedInput.lemmas[index],
      }
    } 
    setWordInfo(wordInfoObj)
    setShowWordInfo(true)
  }

  const sendTextFromFile = (data) => {
    setTextFromFile(data);
  }

  return (
    <div className="container">
      <TextUpload sendTextFromFile={sendTextFromFile} />
      <Input textFromFile={textFromFile} onInsert={analyseInput} onAnalyse={analysedInput} onMarkWords={selectedWords} onWordSelect={showThisWord} onWordInfo={showInfo}/>
      {showStats && <WordInfo onShowWordInfo={showWordInfo} onWordInfo={wordInfo}/>}
      {showStats && <Stats onAnalyse={analysedInput} onLemmaSelect={showLemma} onWordSelect={showWord}/>}
      <br/><br/>
      <h3>Grammatiline analüüs</h3>
      <GrammaticalAnalysis />
    </div>
  );
}

export default App;
