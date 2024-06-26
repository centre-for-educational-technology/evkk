import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AnalyseContext } from '../Contexts';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box } from '@mui/material';

function changeNextColor(idNumber, setIdNumber, markedIds, onWordInfo) {
  if (idNumber < markedIds.length - 1) {
    onWordInfo(markedIds[idNumber + 1]);
    setIdNumber(idNumber + 1);
  }
}

function changePreviousColor(idNumber, setIdNumber, markedIds, onWordInfo) {
  if (idNumber > 0) {
    onWordInfo(markedIds[idNumber - 1]);
    setIdNumber(idNumber - 1);
  }
}

export const InputText = ({onMarkWords, onWordSelect, onWordInfo}) => {
  const analyse = useContext(AnalyseContext)[0];
  const markedIds = [];
  const [idNumber, setIdNumber] = useState(0);
  const handleWord = useCallback((e) => {
    onWordInfo(e);
    onWordSelect(e);
  }, [onWordInfo, onWordSelect]);

  useEffect(() => {
    setIdNumber(0);
    if (markedIds.length > 0) {
      onWordInfo(markedIds[0]);
    }
    // eslint-disable-next-line
  }, [onMarkWords]);

  const handleIsMarked = (ids, i, analysedWords, markedIds, idNumber) => {
    if (ids[i] === markedIds[idNumber]) {
      return (
        <span id={ids[i]}
              className="word blue"
              key={ids[i]}
              onClick={(e) => {
                handleWord(e.target.id);
              }}>{analysedWords[i]}</span>
      );
    } else {
      return (
        <span id={ids[i]}
              className="word marked"
              key={ids[i]}
              onClick={(e) => {
                handleWord(e.target.id);
              }}>{analysedWords[i]}</span>
      );
    }
  };

  const handleIsNotMarked = (ids, i, analysedWords, syllable) => {
    return (
      <span id={ids[i]}
            className={'word'}
            key={ids[i]}
            onClick={(e) => handleWord(e.target.id)}
      >
        {analysedWords[i]}
      </span>
    );
  };

  const updatedText = useMemo(() => {
    let analysedWords = analyse.wordsOrig;
    let text = analyse.text;
    let ids = analyse.ids;
    let syllable = analyse.syllables;
    let content = [];
    if (analysedWords) {
      for (let i = 0; i < analysedWords.length; i++) {
        let index = text.indexOf(analysedWords[i]);
        let isMarked = false;
        for (const element of onMarkWords) {
          if (ids[i] === element) {
            isMarked = true;
            markedIds.push(ids[i]);
          }
        }
        if (index > 0) {
          let sequence = text.slice(0, index);
          // check for line breaks and preserve them
          let match = /[\r\n]/.exec(sequence);
          while (match) {
            if (match.index > 0) {
              let newSequence = sequence.slice(0, match.index);
              content.push(newSequence);
              content.push(<br key={index}/>);
              sequence = sequence.substring(match.index + 1, sequence.length);
              match = /[\r\n]/.exec(sequence);
            } else {
              content.push(<br key={index}/>);
              sequence = sequence.substring(1, sequence.length);
              match = /[\r\n]/.exec(sequence);
            }
          }
          content.push(sequence);
          if (isMarked) {
            content.push(handleIsMarked(ids, i, analysedWords, markedIds, idNumber));
          } else {
            content.push(handleIsNotMarked(ids, i, analysedWords, syllable));
          }
          text = text.substring(index + analysedWords[i].length, text.length);
        } else {
          if (isMarked) {
            content.push(handleIsMarked(ids, i, analysedWords, markedIds, idNumber));
          } else {
            content.push(handleIsNotMarked(ids, i, analysedWords, syllable));
          }
          text = text.substring(index + analysedWords[i].length, text.length);
        }
      }
    }
    content.push(text);
    return <>{content}</>;
    // eslint-disable-next-line
  }, [analyse, onMarkWords, handleWord, markedIds, idNumber]);

  return (
    <>
      <div className="textInputDiv">
        {updatedText}
      </div>
      <span className="wordHighlightButtons">
        {idNumber > 0 ? (
          <KeyboardArrowLeftIcon fontSize={'large'} cursor={'pointer'}
                                 onClick={() => changePreviousColor(idNumber, setIdNumber, markedIds, onWordInfo)}/>
        ) : (
          <Box width={'24px'} height={'24px'}></Box>
        )}
        {idNumber < markedIds.length - 1 ? (
          <KeyboardArrowRightIcon fontSize={'large'} cursor={'pointer'}
                                  onClick={() => changeNextColor(idNumber, setIdNumber, markedIds, onWordInfo)}/>
        ) : null}
      </span>
    </>
  );
};
