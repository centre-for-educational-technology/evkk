import { InputText } from './InputText'
import { useState, useCallback, useEffect } from 'react'

export const Input = ({ onInsert, onAnalyse, onMarkWords, onWordSelect, onWordInfo, textFromFile }) => {

    const [input, setInput] = useState('')
    const [selectedWords, setSelectedWords] = useState(onMarkWords)
    const [btnHidden, hideBtn] = useState(false)
    const onSubmit = (e) =>{
        e.preventDefault()
        hideBtn(true)
        onInsert(input)
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
      {btnHidden === true ? <InputText onMarkWords={onMarkWords} onWordSelect={onWordSelect} onAnalyse={onAnalyse} onWordInfo={onWordInfo}/> : 
      <form onSubmit={onSubmit}>
          <label>
            <textarea className='textInput' name='textInput' value={input} onChange={(e)=>setInput(e.target.value)}/>
          </label>
          <br />       
          <input className='analyseBtn' type="submit" value="Analüüsi" hidden={btnHidden}/>
      </form>
    }
  </>
    
  )
}
