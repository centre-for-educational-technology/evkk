import {useCallback, useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';

export const InputText = ({onAnalyse, onMarkWords, onWordSelect, onWordInfo}) => {

  const handleWord = useCallback((e) => {
    onWordInfo(e.target.id);
    onWordSelect(e.target.id);
  }, [onWordInfo, onWordSelect]);

  const updatedText = useMemo(() => {
    let analysedWords = onAnalyse.wordsOrig;
    let text = onAnalyse.text;
    let ids = onAnalyse.ids;
    let content = [];
    if (analysedWords) {
      for (let i = 0; i < analysedWords.length; i++) {
        let index = text.indexOf(analysedWords[i]);
        let isMarked = false;
        for (let j = 0; j < onMarkWords.length; j++) {
          if (ids[i] === onMarkWords[j]) {
            isMarked = true;
          }
        }
        if (index > 0) {
          let sequence = text.slice(0, index);
          //check for line breaks and preserve them
          let match = /\r|\n/.exec(sequence);
          while (match) {
            if (match.index > 0) {
              let newSequence = sequence.slice(0, match.index);
              content.push(newSequence);
              content.push(<br key={uuidv4()}/>);
              sequence = sequence.substring(match.index + 1, sequence.length);
              match = /\r|\n/.exec(sequence);
            } else {
              content.push(<br key={uuidv4()}/>);
              sequence = sequence.substring(1, sequence.length);
              match = /\r|\n/.exec(sequence);
            }
          }
          content.push(sequence);

          if (isMarked) {
            content.push(<span id={ids[i]} className="word marked" key={uuidv4()}
                               onClick={(e) => handleWord(e)}>{analysedWords[i]}</span>);
          } else {
            content.push(<span id={ids[i]} className="word" key={uuidv4()}
                               onClick={(e) => handleWord(e)}>{analysedWords[i]}</span>);
          }
          text = text.substring(index + analysedWords[i].length, text.length);
        } else {
          if (isMarked) {
            content.push(<span id={ids[i]} className="word marked" key={uuidv4()}
                               onClick={(e) => handleWord(e)}>{analysedWords[i]}</span>);
          } else {
            content.push(<span id={ids[i]} className="word" key={uuidv4()}
                               onClick={(e) => handleWord(e)}>{analysedWords[i]}</span>);
          }
          text = text.substring(index + analysedWords[i].length, text.length);
        }
      }
    }
    content.push(text);
    let output = <>{content}</>
    return output;
  }, [onAnalyse, onMarkWords, handleWord])

  return (
    <div className="textInputDiv" >
        {updatedText}
    </div>
  )
}
