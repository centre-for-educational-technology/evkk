import { useMemo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const InputText = ({ onAnalyse, onMarkWords, onWordSelect, onWordInfo }) => {

  const handleWord = useCallback((e) => {
    onWordInfo(e.target.id)
    onWordSelect(e.target.id)
  }, [onWordInfo, onWordSelect]);

  //kas siin on turvaaugud? (peaks JSONit vmt kasutama)
  const updatedText = useMemo(() => {
    let analysedWords = onAnalyse.words
    let text = onAnalyse.text
    let ids =  onAnalyse.ids
    let content = []
    for(let i=0; i<analysedWords.length; i++){
      let index = text.indexOf(analysedWords[i])
      let isMarked = false
      for(let j=0; j<onMarkWords.length; j++){
        if(ids[i]===onMarkWords[j])
        isMarked = true
      }

      if(index>0){
        let sequence = text.slice(0, index)
        content.push(sequence)
        if(isMarked){
          content.push(<span id={ ids[i] }  className="marked" style={{backgroundColor: 'yellow'}} key={ uuidv4() } onClick={(e) => handleWord(e)}>{analysedWords[i]}</span>)
        } else {
          content.push(<span id={ ids[i] }  key={ uuidv4() } onClick={(e) => handleWord(e)}>{analysedWords[i]}</span>)
        }
        text = text.substring(index+analysedWords[i].length, text.length)
      } else {
        if(isMarked){
          content.push(<span id={ ids[i] }  className="marked" style={{backgroundColor: 'yellow'}} key={ uuidv4() } onClick={(e) => handleWord(e)}>{analysedWords[i]}</span>)
        } else {
          content.push(<span id={ ids[i] }  key={ uuidv4() } onClick={(e) => handleWord(e)}>{analysedWords[i]}</span>)
        }
        text = text.substring(index+analysedWords[i].length, text.length)
      }
    }
    content.push(text)
    let output = <>{content}</>
    return output
  }, [onAnalyse, onMarkWords, handleWord])

  return (
    <div className="textInputDiv" >
        {updatedText}
    </div>
  )
}
