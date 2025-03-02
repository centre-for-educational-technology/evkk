import { replaceCombined, replaceSpaces, replaceSpaceTags } from '../../../const/Constants';
import { InternalHyperlink, Paragraph, ShadingType, SymbolRun, TextRun, UnderlineType } from 'docx';
import {
  correctionTooltipComponentsProps,
  correctionTooltipSlotProps,
  correctorDocxColors
} from '../../../const/StyleConstants';
import { accordionDetails, errorTypes } from '../const/TabValuesConstant';
import { CORRECTION, SPELLCHECKER, TEXTSPAN } from '../const/Constants';
import { Paper, Tooltip } from '@mui/material';
import SingleError from '../tabviews/correction/components/SingleError';
import React from 'react';

export const handleCopy = (event) => {
  event.preventDefault();

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let selectedText = range.toString();

    selectedText = selectedText
      .replaceAll(replaceCombined, '')
      .replaceAll('  ', ' ');

    navigator.clipboard.writeText(selectedText);
  }
};

export const handlePaste = (event, newRef, setNewRef, setInputText) => {
  event.preventDefault();
  if (!newRef) {
    const text = event.clipboardData.getData('text/plain');
    setNewRef(text);
    setInputText(text);
  } else {
    const selection = document.getSelection();
    const text = event.clipboardData.getData('text/plain');
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (!range.collapsed) {
        range.deleteContents();
      }

      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);

      const updatedText = range.startContainer.textContent;
      setNewRef(updatedText);
      setInputText(updatedText);
    } else if (selection.type === 'Caret') {
      const start = selection.anchorOffset;
      const newText = newRef.replace(replaceCombined, '');
      const newValue = newText.slice(0, start) + text + newText.slice(start);

      setNewRef(newValue);
      setInputText(newValue);
    }
  }
};

export const levelAccordionValueCheck = (value, complexityAnswer, arrayValues) => {
  return complexityAnswer[arrayValues[value]][0] < 1.01 && complexityAnswer[arrayValues[value]][0] > 0.009;
};

export const setComplexityAnswerIndex = (index, value, complexityAnswer, arrayValues) => {
  return complexityAnswer[arrayValues[index]][value];
};

export const queryCaller = (textBoxRef, inputText, setRequestingText, setGrammarAnswer, setSpellerAnswer, setInputText, newRef, setComplexityAnswer, setAbstractWords, getCorrectorResult, newValue, setValue, mainButton, setGrammarErrorList, setSpellerErrorList) => {
  if (textBoxRef.current.innerText.replaceAll('\u00A0', ' ') !== inputText.replaceAll(replaceCombined, '').replaceAll('\n', ' ').replaceAll('\u00A0', ' ') || mainButton) {
    setSpellerAnswer(null);
    setGrammarAnswer(null);
    setGrammarErrorList(null);
    setSpellerErrorList(null);
    setRequestingText(textBoxRef.current.innerText);
    if (setValue !== null && newValue !== null) {
      setValue(newValue);
    }
    setInputText(textBoxRef.current.innerText);
    const fetchInputText = processFetchText(textBoxRef);
    setInputText(fetchInputText);
    getCorrectorResult(JSON.stringify({ tekst: processCorrectorText(fetchInputText) }))
      .then(answer => {
        setComplexityAnswer(answer);
        setGrammarAnswer(answer.grammatika);
        setSpellerAnswer(answer.speller);
        setAbstractWords(answer.abstraktsus);
        setGrammarErrorList(answer.grammatikaVead);
        setSpellerErrorList(answer.spelleriVead);
      }).then(() => setRequestingText(null));
  } else if (setValue !== null && newValue !== null) {
    setValue(newValue);
  }
};

export const parseHtmlForDocx = (htmlString) => {
  const tempDiv = document.createElement('div');
  const result = [];
  tempDiv.innerHTML = htmlString;

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      result.push(new TextRun({ text: node.textContent, size: 20 }));
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
      let colorClass;
      if (node.className === TEXTSPAN) {
        colorClass = node.getAttribute('data-color') || null;
      } else if (Array.from(node.children).some(child => child.tagName.toLowerCase() === 'span')) {
        const colorVal = errorTypes[node.className].color;
        colorClass = Object.keys(correctorDocxColors).find(key => correctorDocxColors[key] === colorVal.slice(1)) || null;
      } else {
        colorClass = node.className || null;
      }

      if (Object.keys(correctorDocxColors).includes(colorClass)) {
        result.push(
          new TextRun({
            text: node.textContent,
            size: 20,
            shading: {
              type: ShadingType.SOLID,
              color: correctorDocxColors[colorClass],
              fill: 'FF0000'
            }
          })
        );
      } else {
        result.push(
          new TextRun({
            text: node.textContent,
            size: 20
          }));
      }

    }
  }

  tempDiv.childNodes.forEach(node => {
    processNode(node);
  });

  return result;
};

export const processErrorListForDocx = (tab, textLevel, errorList, innerHtml, labels, grammarLabel) => {
  const returnArray = [];
  tab === CORRECTION && textLevel.keeletase
    ? processGrammarAnswer(returnArray, errorList, grammarLabel)
    : processTextLevelAnswer(returnArray, textLevel, labels);
  returnArray.push(new Paragraph({ spacing: { after: 120 } }));
  returnArray.push(
    new Paragraph({
      spacing: { line: 300 },
      alignment: 'both',
      children: parseHtmlForDocx(innerHtml.current.innerHTML)
    })
  );
  return returnArray;
};

const processFetchText = (textBoxRef) => {
  if (!textBoxRef) return '';
  const textBoxValue = textBoxRef.current.innerText.replace(replaceCombined, '').replaceAll('  ', ' ');
  const boxNoSpaceTags = textBoxValue.replace(replaceSpaceTags, ' ');
  return boxNoSpaceTags.replace(replaceSpaces, ' ');
};

const processCorrectorText = (fetchInputText) => {
  return Array.isArray(fetchInputText) ? fetchInputText[0] : fetchInputText.trim().replaceAll(replaceCombined, '').replace(/\s+/g, ' ');
};

const processGrammarAnswer = (returnArray, errorList, grammarLabel) => {
  console.log(errorList);
  console.log(grammarLabel);
  console.log(returnArray);
  Object.entries(errorList).forEach((error, index) => {
    if (error[1].length !== 0) {
      returnArray.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${grammarLabel[index]} (${error[1].length})`,
              size: 24,
              bold: true,
              underline: {
                type: UnderlineType.THICK,
                color: errorTypes[error[0]].color
              },
              shading: {
                type: ShadingType.SOLID,
                color: errorTypes[error[0]].color
              }
            })
          ],
          spacing: { after: 120 }
        })
      );
      error[1].forEach((errorObj) => {
        returnArray.push(
          new Paragraph({
            children: [
              new InternalHyperlink({
                children: [
                  new TextRun({
                    text: `${errorObj.text}`,
                    color: '#676767',
                    strike: true
                  }),
                  new TextRun({
                    text: ' ',
                    bold: true
                  }),
                  new SymbolRun({
                    char: '2192'
                  }),
                  new TextRun({
                    text: ' ',
                    bold: true
                  }),
                  new TextRun({
                    text: `${errorObj.corrected_text}`
                  })
                ],
                anchor: `${errorObj.error_id}`
              })
            ]
          })
        );
      });
      returnArray.push(new Paragraph({ spacing: { after: 120 } }));
    }
  });
};

const processTextLevelAnswer = (returnArray, textLevel, labels) => {
  const getLevelPercentage = (levelArray) => {
    const returnArray = [];
    levelArray.forEach((value, index) => {
      if (levelAccordionValueCheck(index, textLevel.keeletase, levelArray)) {
        returnArray.push(`${setComplexityAnswerIndex(index, 1, textLevel.keeletase, levelArray)} - ${(setComplexityAnswerIndex(index, 0, textLevel.keeletase, levelArray) * 100).toFixed(0)}%`);
      }
    });
    return returnArray.join(' / ');
  };
  returnArray.push(
    new Paragraph({
      spacing: { line: 300 },
      alignment: 'left',
      children: [
        new TextRun({
          text: `${labels[0]}: ${textLevel.uuskeeletase.level}`,
          bold: true,
          break: 1
        }),
        new TextRun({
          text: `${labels[1]}: ${getLevelPercentage(accordionDetails[1].arrayValues)}`,
          bold: true,
          break: 1
        }),
        new TextRun({
          text: `${labels[2]}: ${getLevelPercentage(accordionDetails[2].arrayValues)}`,
          bold: true,
          break: 1
        }),
        new TextRun({
          text: `${labels[3]}: ${getLevelPercentage(accordionDetails[3].arrayValues)}`,
          bold: true,
          break: 1
        })
      ]
    })
  );
  return returnArray;
};

export const iterateCorrectionArray = (input, hoveredId, setInnerValue, newRef, setHoveredId, setErrorList, model, setSpellerAnswer, setGrammarAnswer) => {
  if (input) {
    const innerVal = input.map(val => {
      if (val.corrected) {
        const classValue = errorTypes[val.correction_type].classValue;
        const classes = hoveredId === val.error_id || hoveredId === `${val.error_id}_inner` ? `${classValue} ${classValue}-hover` : classValue;
        return (
          <span key={val.error_id} id={val.error_id} className={val.correction_type}>
                <Tooltip
                  slotProps={correctionTooltipSlotProps}
                  componentsProps={correctionTooltipComponentsProps}
                  key={`${val.error_id}_tooltip`}
                  placement={'top'}
                  title={
                    <Paper>
                      <SingleError
                        error={val}
                        setHoveredId={setHoveredId}
                        setErrorList={setErrorList}
                        setInputType={model === SPELLCHECKER ? setSpellerAnswer : setGrammarAnswer}
                      />
                    </Paper>}
                >
                <span
                  id={`${val.error_id}_inner`}
                  className={classes}
                  onMouseOver={() => setHoveredId(val.error_id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {val.text}
                </span>
              </Tooltip>
            </span>
        );
      } else {
        return (
          <span key={val.error_id} id={val.error_id} className="uncorrected">
              {val.text}
            </span>
        );
      }
    });
    setInnerValue(innerVal);
  } else {
    setInnerValue(newRef);
  }
};

export const processCorrectorKeyDown = (selectedText, noExtraText, triggerCondition, e, extraTextValue, inputType, setInputType, setErrorsToRemove, setSelectedText) => {
  if (selectedText?.size > 1) {
    if (triggerCondition) {
      e.preventDefault();

      const mapKeys = Array.from(selectedText.keys());
      const firstKey = mapKeys[0];
      const lastKey = mapKeys[mapKeys.length - 1];

      const inputTypeCopy = inputType.map(obj => ({ ...obj }));
      const extraText = noExtraText ? '' : extraTextValue;
      const mappedInput = inputTypeCopy.map(obj => {
        let newText = obj.text;


        if (obj.error_id === firstKey || `${obj.error_id}_inner` === firstKey) {
          newText = obj.text.replace(new RegExp(selectedText.get(firstKey) + '$'), '') + extraText;
        }
        if (obj.error_id === lastKey || `${obj.error_id}_inner` === lastKey) {
          newText = obj.text.replace(new RegExp('^' + selectedText.get(lastKey)), '');
        }

        // If the new text is empty, remove the object (return null)
        if (newText.length === 0) return null;


        // Replace first & last objects with a new format
        if (obj.error_id === firstKey || `${obj.error_id}_inner` === firstKey || obj.error_id === lastKey || `${obj.error_id}_inner` === lastKey) {
          return {
            corrected: false,
            error_id: obj.error_id.includes('_unmarked') ? obj.error_id : `${obj.error_id}_unmarked`, // Generate unique ID
            text: newText
          };
        }

        return obj; // Keep other objects unchanged
      }).filter(obj => obj !== null);
      const filteredInput = mappedInput.filter(obj => (obj.error_id === firstKey || obj.error_id === `${firstKey}_unmarked` || obj.error_id === `${lastKey}_unmarked`) || obj.error_id === lastKey || !mapKeys.includes(obj.error_id));

      setErrorsToRemove(mapKeys);
      setInputType(filteredInput);
      setSelectedText(null);

      setTimeout(() => {
        const element = document.getElementById(`${firstKey}_unmarked`) || document.getElementById(firstKey);
        if (element) {
          const range = document.createRange();
          const selection = window.getSelection();
          const textNode = element.lastChild; // Use lastChild to handle both text and element nodes

          if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            range.setStart(textNode, textNode.length); // Move cursor to end of text
          } else {
            range.setStart(element, element.childNodes.length); // If no text node, move after last child
          }

          // Position cursor at the beginning of the element
          range.collapse(true);

          // Apply the new selection
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 0);
    }
  }
};

export const handleCorrectorKeyDown = (e, selectedText, setSelectedText, inputType, setInputType, setErrorsToRemove) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    setSelectedText(null);
    return;
  }

  const triggerCodition = ((e.key === 'Backspace' || e.key === 'Delete') || (e.key.length === 1 && e.key.match(/^[\w\s]$/))) && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey;
  processCorrectorKeyDown(selectedText, e.key === 'Backspace' || e.key === 'Delete', triggerCodition, e, e.key, inputType, setInputType, setErrorsToRemove, setSelectedText);

  const selection = window.getSelection();
  if (!selection.rangeCount) return null;

  let node = selection.anchorNode; // The node where the cursor is
  if (node.nodeType === 3) {
    node = node.parentNode; // Get the parent if it's a text node
  }

  if (e.key === 'Backspace' || e.key === 'Delete') {
    if (selectedText?.size === 1) {
      e.preventDefault();
      const deletableId = selectedText.keys().next().value;
      setErrorsToRemove([deletableId]);
      setInputType((prevList) => prevList.filter((element) => `${element.error_id}_inner` !== deletableId && element.error_id !== deletableId));
    } else if (node.innerText.length === 1 || node.innerText.length === 0) {
      e.preventDefault();
      setInputType((prevList) => prevList.filter((element) => `${element.error_id}_inner` !== node.id && element.error_id !== node.id));
    }
  }
};

export const handleCorrectionTextSelection = (setSelectedText) => {
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {

    const range = selection.getRangeAt(0);
    const selectedHtml = range.cloneContents();

    const div = document.createElement('div');
    div.appendChild(selectedHtml);
    const spans = div.querySelectorAll('span');
    const spanMap = new Map(
      Array.from(spans).filter(span => span.id).map(span => [span.id, span.innerText])
    );

    if (spans.length > 0) {
      setSelectedText(spanMap);
    } else if (selection.getRangeAt(0).endOffset - selection.getRangeAt(0).startOffset === selection.baseNode.parentNode.innerText.length) {
      setSelectedText(new Map([[selection.baseNode.parentNode.id, selection.baseNode.parentNode.innerText]]));
    }
  }
};


