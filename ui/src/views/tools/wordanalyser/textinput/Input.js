import { InputText } from './InputText'
import { useState, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid'

export const Input = ({ onInsert, onAnalyse, onMarkWords, onWordSelect, onWordInfo, textFromFile }) => {

    const [input, setInput] = useState('')
    const [selectedWords, setSelectedWords] = useState(onMarkWords)
    const [showAnalyseBtn, setShowAnalyseBtn] = useState(true)
    const [showRefreshBtn, setShowRefreshBtn] = useState(false)
    const onSubmit = (e) =>{
        e.preventDefault()
        if(input.length>0){
          setShowAnalyseBtn(false)
          setShowRefreshBtn(true)
          onInsert(input)
        }
    }

    useEffect(() => {
      setInput(textFromFile);
    }, [textFromFile]);

    useCallback(() => {
      if (JSON.stringify(selectedWords)!==JSON.stringify(onMarkWords)) {
        setSelectedWords(onMarkWords);
      }
    }, [onMarkWords, selectedWords]);

  return (
    <>
        {showAnalyseBtn ? 
          <Grid item>
            <form>
                <label className="textInputContainer">
                  <textarea className='textInput' name='textInput' value={input} onChange={(e)=>setInput(e.target.value)}/>
                </label>
                <button className="mainBtn" type="button" onClick={onSubmit}>Analüüsi</button>
            </form>
          </Grid> 
          : 
          <Grid item>
            <InputText onMarkWords={onMarkWords} onWordSelect={onWordSelect} onAnalyse={onAnalyse} onWordInfo={onWordInfo}/>
            {showRefreshBtn && <button className="mainBtn" type="button" onClick={() => window.location.reload(false)}>Uus päring</button>}
          </Grid >
        }
    </>
  )
}
