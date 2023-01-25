import {useCallback, useContext, useMemo, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {AnalyseContext} from "../Contexts";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const InputText = ({onMarkWords, onWordSelect, onWordInfo}) => {

  const analyse = useContext(AnalyseContext)[0];
  const markedIds = [];
  const [idNumber, setIdNumber] = useState(0)
  let number = 0

  const handleWord = useCallback((e) => {
    onWordInfo(e);
    onWordSelect(e);
  }, [onWordInfo, onWordSelect]);

  function changeNextColor() {
    if (number < markedIds.length) {
      document.getElementById(markedIds[number]).classList.replace("blue", "marked")


      document.getElementById(markedIds[number + 1]).classList.replace("marked", "blue")
      number++
    }

  }

  const updatedText = useMemo(() => {
    let analysedWords = analyse.wordsOrig;
    let text = analyse.text;
    let ids = analyse.ids;
    let content = [];
    if (analysedWords) {
      for (let i = 0; i < analysedWords.length; i++) {
        let index = text.indexOf(analysedWords[i]);
        let isMarked = false;
        for (const element of onMarkWords) {
          if (ids[i] === element) {
            isMarked = true;
          }
        }
        if (index > 0) {
          let sequence = text.slice(0, index);
          //check for line breaks and preserve them
          let match = /[\r\n]/.exec(sequence);
          while (match) {
            if (match.index > 0) {
              let newSequence = sequence.slice(0, match.index);
              content.push(newSequence);
              content.push(<br key={uuidv4()}/>);
              sequence = sequence.substring(match.index + 1, sequence.length);
              match = /[\r\n]/.exec(sequence);
            } else {
              content.push(<br key={uuidv4()}/>);
              sequence = sequence.substring(1, sequence.length);
              match = /[\r\n]/.exec(sequence);
            }
          }
          content.push(sequence);

          if (isMarked) {
            if (markedIds.length === 0) {
              content.push(<span id={ids[i]}
                                 className="word blue"
                                 key={uuidv4()}
                                 onClick={(e) => {
                                   handleWord(e.target.id)
                                 }}>{analysedWords[i]}</span>);
              markedIds.push(ids[i])

            } else {
              content.push(<span id={ids[i]}
                                 className="word marked"
                                 key={uuidv4()}
                                 onClick={(e) => {
                                   handleWord(e.target.id)
                                 }}>{analysedWords[i]}</span>);
              markedIds.push(ids[i])
            }

          } else {
            content.push(<span id={ids[i]}
                               className="word"
                               key={uuidv4()}
                               onClick={(e) => handleWord(e.target.id)}>{analysedWords[i]}</span>);
          }
          text = text.substring(index + analysedWords[i].length, text.length);
        } else {
          if (isMarked) {
            if (markedIds.length === 0) {
              content.push(<span id={ids[i]}
                                 className="word blue"
                                 key={uuidv4()}
                                 onClick={(e) => {
                                   handleWord(e.target.id)
                                 }}>{analysedWords[i]}</span>);
              markedIds.push(ids[i])

            } else {
              content.push(<span id={ids[i]}
                                 className="word marked"
                                 key={uuidv4()}
                                 onClick={(e) => {
                                   handleWord(e.target.id)
                                 }}>{analysedWords[i]}</span>);
              markedIds.push(ids[i])
            }


          } else {
            content.push(<span id={ids[i]}
                               className="word"
                               key={uuidv4()}
                               onClick={(e) => handleWord(e.target.id)}>{analysedWords[i]}</span>);
          }
          text = text.substring(index + analysedWords[i].length, text.length);
        }
      }
    }
    content.push(text);
    return <>{content}</>;
  }, [analyse, onMarkWords, handleWord, markedIds]);

  console.log(markedIds)

  return (
    <div className="textInputDiv">
      {updatedText}
      <div style={{position: "absolute", left: "45%", top: "34%"}}><KeyboardArrowLeftIcon
        cursor={"pointer"}/><KeyboardArrowRightIcon cursor={"pointer"} onClick={changeNextColor}/></div>
    </div>
  )
}
