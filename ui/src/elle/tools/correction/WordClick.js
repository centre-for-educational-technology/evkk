import { Box, Button, ClickAwayListener } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import './Correction.css';

export default function WordClick(props) {

  const content = props.content;
  const answer = props.answer;
  const wordIndex = props.index;
  const [parentElementRef, setParentElementRef] = useState(null);
  const [open, setOpen] = useState(false);
  const [topOffset, setTopOffset] = useState();
  const [widthOffset, setWidthOffset] = useState(0);
  const Yref = useRef();

  const changePunctuationMarks = (word) => {
    return word.replace(/[^0-9a-zA-ZõäöüÕÄÖÜ]+$/, '');
  };

  const correctionPopup = (vm, sm, i) => {
    const Yoffset = topOffset;
    if (Yoffset < -71 || Yoffset > 145) {
      setOpen(false);
    }
    return (
      <Box
        id={vm[i] + 'id'}
        key={vm[i]}
        className="correction-popup"
        style={{transform: `translate(${widthOffset}px) translate(-50%)`, top: `${Yoffset}px`}}
      >
        <Box display="flex" justifyContent="center">
          <Box
            id={sm[i]}
            key={vm[i]}
            className="replacement-popup"
          >
            <Box
              id={sm[i]}
              className="popup-container"
            >
                                <span
                                  style={{
                                    backgroundColor: 'lightpink'
                                  }}
                                  className="small-error-word-container"
                                >
                                  {changePunctuationMarks(sm[i])}
                                </span>{' '}
              <EastIcon/>{' '}
              <span
                style={{
                  backgroundColor: 'lightgreen'
                }}
                className="small-error-word-container"
              >
                                  {changePunctuationMarks(vm[i])}
                                </span>{' '}
              <span style={{fontWeight: 'bold'}}>|</span>
              <Box display="flex" gap="15px">
                <Button
                  size="20px"
                  color="success"
                  className="popup-icon-button"
                  variant="contained"
                  onClick={() => {
                    props.replace(sm, vm, i);
                  }}
                >
                  <DoneIcon fontSize="small"/>
                </Button>
                <Button
                  size="20px"
                  color="error"
                  className="popup-icon-button"
                  variant="contained"
                  onClick={() => props.noReplace(sm, vm, i)}
                >
                  <CloseIcon fontSize="small"/>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    const newId = document.getElementById(`s${wordIndex}`).parentElement.id;
    setParentElementRef(document.getElementById(newId));
  }, [wordIndex]);

  const handleWordClick = (e) => {
    const parentElement = parentElementRef.getBoundingClientRect();
    const w = Yref.current.offsetWidth;
    const h = e.target.getBoundingClientRect();
    const documentOffset = document.documentElement.scrollTop;
    const changeSomething = () => {
      const offset = documentOffset - document.documentElement.scrollTop;
      const h = e.target.getBoundingClientRect();
      setTopOffset(h.top - parentElement.top - 50 - offset);
    };

    parentElementRef.addEventListener('scroll', changeSomething);
    setWidthOffset(w / 2);
    setTopOffset(h.top - parentElement.top - 50);
    setOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={() => handleClickAway()}>
      <span id={'s' + wordIndex}
            key={'s' + wordIndex}>
        <Box className="flex-case" key={wordIndex}>
          <button
            id={wordIndex.toString()}
            key={wordIndex.toString()}
            ref={Yref}
            className="corrector-marked-text"
            onClick={handleWordClick}
          >
            {content[wordIndex]}
          </button>
        </Box>
        {open ? (correctionPopup(answer, content, wordIndex)) : null}
        <span> </span>
      </span>
    </ClickAwayListener>
  );
}
