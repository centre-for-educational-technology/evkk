import { InputText } from './InputText'
import { useState, useEffect } from 'react'
import { Alert, Button, CircularProgress } from '@mui/material'

export const Input = ({ onInsert, onAnalyse, onMarkWords, onWordSelect, onWordInfo, onReset }) => {
  const [input, setInput] = useState('')
  const [selectedWords, setSelectedWords] = useState(onMarkWords)
  const [showAnalyseBtn, setShowAnalyseBtn] = useState(true)
  const [showResetBtn, setShowResetBtn] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  
  const onSubmit = (e) =>{
    e.preventDefault()
    if(input.length>0){
      setShowAnalyseBtn(false)
      onInsert(input)
      setShowAlert(false)
      setShowLoading(true)
    } else {
      setShowAlert(true)
    }
  }

  useEffect(() => {
    if (JSON.stringify(selectedWords)!==JSON.stringify(onMarkWords)) {
      setSelectedWords(onMarkWords);
    }
  }, [onMarkWords, selectedWords]);

  useEffect(() => {
    setShowLoading(false)
    if(onAnalyse.ids[0].length>0){
      setShowResetBtn(true)
    }
  }, [onAnalyse]);

  const resetAnalyser = () => {
    setShowAnalyseBtn(true)
    setShowResetBtn(false)
    setInput('')
    onReset()
  }


  return (
    <div className="containerItem">
        {showAnalyseBtn ? 
            <form>
                <label className="textInputContainer">
                  <textarea className='textInput' name='textInput' value={input} onChange={(e)=>setInput(e.target.value)}/>
                </label>
                <Button variant="contained" onClick={onSubmit}>Analüüsi</Button>
                {showAlert && <Alert severity="warning">Analüüsimiseks sisesta esmalt tekst!</Alert>}
            </form>
          : 
            <InputText onMarkWords={onMarkWords} onWordSelect={onWordSelect} onAnalyse={onAnalyse} onWordInfo={onWordInfo}/>
        }
        {showLoading && <CircularProgress />}
        {showResetBtn && <Button variant="contained" className="mainBtn" onClick={resetAnalyser}>Lähtesta</Button>}
    </div>
  )
}
