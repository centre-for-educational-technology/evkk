import { replaceCombined, replaceSpaces, replaceSpaceTags } from '../../../const/Constants';
import { Bookmark, InternalHyperlink, Paragraph, ShadingType, SymbolRun, TextRun, UnderlineType } from 'docx';
import { correctorDocxColors } from '../../../const/StyleConstants';
import { accordionDetails, errorTypes } from '../const/TabValuesConstant';
import {
  CORRECTION,
  EXTRA_PUNCTUATION,
  EXTRA_WORD_ERROR,
  GRAMMAR,
  MISSING_PUNCTUATION,
  MISSING_WORD_ERROR,
  MULTIPLE_ERRORS,
  SPELLING_ERROR,
  TEXTSPAN,
  WORD_COUNT_ERROR,
  WORD_ORDER_ERROR,
  WRONG_PUNCTUATION
} from '../const/Constants';
import { checkAllErrors } from './TextErrorTypeFunctions';
import { resolveErrorMarks, resolvePunctuationMarks, returnMarkingColor } from './TextErrorMarkingFunctions';

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

export const processGrammarResponseIndexes = (grammarResponse, grammarSetter) => {
  grammarResponse.corrections.reverse();
  grammarResponse.corrections.forEach((error, index) => {
    error.errorId = index;
  });
  grammarSetter(grammarResponse);
};

export const processFetchText = (textBoxRef) => {
  if (!textBoxRef) return '';
  const textBoxValue = textBoxRef.current.innerText.replace(replaceCombined, '').replaceAll('  ', ' ');
  const boxNoSpaceTags = textBoxValue.replace(replaceSpaceTags, ' ');
  return boxNoSpaceTags.replace(replaceSpaces, ' ');
};

export const processCorrectorText = (fetchInputText) => {
  return Array.isArray(fetchInputText) ? fetchInputText[0] : fetchInputText.trim().replaceAll(replaceCombined, '').replace(/\s+/g, ' ');
};

export const levelAccordionValueCheck = (value, complexityAnswer, arrayValues) => {
  return complexityAnswer[arrayValues[value]][0] < 1.01 && complexityAnswer[arrayValues[value]][0] > 0.009;
};

export const setComplexityAnswerIndex = (index, value, complexityAnswer, arrayValues) => {
  return complexityAnswer[arrayValues[index]][value];
};

export const queryCaller = (textBoxRef, inputText, setRequestingText, setGrammarAnswer, setSpellerAnswer, setInputText, newRef, setComplexityAnswer, setAbstractWords, getCorrectorResult, newValue, setValue, mainButton) => {
  if (textBoxRef.current.innerText.replaceAll('\u00A0', ' ') !== inputText.replaceAll(replaceCombined, '').replaceAll('\n', ' ').replaceAll('\u00A0', ' ') || mainButton) {
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
        processGrammarResponseIndexes(answer.grammatika, setGrammarAnswer);
        processGrammarResponseIndexes(answer.speller, setSpellerAnswer);
        setAbstractWords(answer.abstraktsus);
      }).then(() => setRequestingText(null));
  } else if (setValue !== null && newValue !== null) {
    setValue(newValue);
  }
};

export const parseHtmlForDocx = (htmlString, type) => {
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
      } else {
        colorClass = node.className || null;
      }

      if (type === GRAMMAR) {
        result.push(
          new Bookmark({
            id: node.id,
            children: [
              new TextRun({
                text: node.textContent,
                size: 20,
                shading: {
                  type: ShadingType.SOLID,
                  color: correctorDocxColors[colorClass],
                  fill: 'FF0000'
                }
              })]
          })
        );
      } else {
        result.push(
          new TextRun({
            text: node.textContent,
            size: 20,
            shading: {
              type: ShadingType.SOLID,
              color: correctorDocxColors[colorClass],
              fill: 'FF0000'
            }
          }));
      }

    }
  }

  tempDiv.childNodes.forEach(node => {
    processNode(node);
  });

  return result;
};

const processGrammarAnswer = (returnArray, errorList, grammarLabel) => {
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
                    text: `${errorObj.span.value}`,
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
                    text: `${errorObj.replacements[0].value}`
                  })
                ],
                anchor: `${errorObj.errorId}`
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
          text: `${labels[0]} : ${textLevel.uuskeeletase.level}`,
          bold: true,
          break: 1
        }),
        new TextRun({
          text: `${labels[1]} : ${getLevelPercentage(accordionDetails[1].arrayValues)}`,
          bold: true,
          break: 1
        }),
        new TextRun({
          text: `${labels[2]} : ${getLevelPercentage(accordionDetails[2].arrayValues)}`,
          bold: true,
          break: 1
        }),
        new TextRun({
          text: `${labels[3]} : ${getLevelPercentage(accordionDetails[3].arrayValues)}`,
          bold: true,
          break: 1
        })
      ]
    })
  );
  return returnArray;
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
      children: parseHtmlForDocx(innerHtml.current.innerHTML, GRAMMAR)
    })
  );
  return returnArray;
};

export const processTextCorrections = (responseText, textBoxRef, textBoxValueRef, setErrorList, pasteReset = null) => {
  // Avoid resetting input text on tab change
  if (!responseText) return;
  if (!textBoxRef) return;
  if (pasteReset) return setErrorList(null);

  const corrections = {
    spellingError: [],
    wordOrderError: [],
    missingWordError: [],
    extraWordError: [],
    wordCountError: [],
    multipleErrors: [],
    wrongPunctuation: [],
    extraPunctuation: [],
    missingPunctuation: []
  };

  let innerText = textBoxRef.replace(replaceCombined, '');
  let mainIndex = 0;
  responseText.corrections.forEach((correction, _) => {
    const errorWord = correction.span.value;
    const correctedWord = correction.replacements[0].value;
    const errorTypes = checkAllErrors(errorWord, correctedWord);
    const {
      spellingError,
      wordOrderError,
      missingWordError,
      extraWordError,
      wordCountError,
      multipleErrors,
      wrongPunctuation,
      extraPunctuation,
      missingPunctuation
    } = errorTypes;

    if (wrongPunctuation || extraPunctuation || missingPunctuation) {
      const correctionCopy = { ...correction };
      innerText = resolvePunctuationMarks(wrongPunctuation, extraPunctuation, missingPunctuation, correctionCopy, errorWord, innerText, mainIndex);
      correctionCopy.errorId = `punctuation_${mainIndex}`;
      correctionCopy.index = mainIndex;
      const punctuationErrors = [wrongPunctuation, extraPunctuation, missingPunctuation];
      const punctuationString = [WRONG_PUNCTUATION, EXTRA_PUNCTUATION, MISSING_PUNCTUATION];
      punctuationErrors.forEach((errorType, index) => {
        if (errorType) {
          corrections[punctuationString[index]].push(correctionCopy);
        }
      });
      mainIndex++;
    }

    if (spellingError || wordOrderError || missingWordError || extraWordError || wordCountError || multipleErrors) {
      const errorColor = returnMarkingColor(spellingError, wordOrderError, missingWordError, extraWordError, wordCountError, multipleErrors);
      if (spellingError && errorWord.split(' ').length !== 1) {
        const errorWords = errorWord.split(' ').reverse();
        const newSpan = correction.span.value.split(' ').reverse();
        const replaceWords = correction.replacements[0].value.split(' ').reverse();
        let endVal = correction.span.end;
        let wrongPunctuationCopy = wrongPunctuation;
        let extraPunctuationCopy = extraPunctuation;
        errorWords.forEach((word, errorIndex) => {
          if (errorIndex > 0) {
            wrongPunctuationCopy = false;
            extraPunctuationCopy = false;
          }
          const correctionCopy = { ...correction };
          correctionCopy.span = { start: endVal - word.length, end: endVal, value: newSpan[errorIndex] };
          correctionCopy.replacements = [{ value: replaceWords[errorIndex] }];
          innerText = resolveErrorMarks(correctionCopy, innerText, word, mainIndex, wrongPunctuationCopy, extraPunctuationCopy, errorColor);
          correctionCopy.errorId = `errorno_${mainIndex}`;
          correctionCopy.index = mainIndex;
          endVal = correctionCopy.span.end - word.length - 1;
          corrections[SPELLING_ERROR].push(correctionCopy);
          mainIndex++;
        });
      } else {
        const correctionCopy = { ...correction };
        innerText = resolveErrorMarks(correctionCopy, innerText, errorWord, mainIndex, wrongPunctuation, extraPunctuation, errorColor);
        correctionCopy.errorId = `errorno_${mainIndex}`;
        correctionCopy.index = mainIndex;
        const spellingErrors = [spellingError, wordOrderError, missingWordError, extraWordError, wordCountError, multipleErrors];
        const spellingString = [SPELLING_ERROR, WORD_ORDER_ERROR, MISSING_WORD_ERROR, EXTRA_WORD_ERROR, WORD_COUNT_ERROR, MULTIPLE_ERRORS];
        spellingErrors.forEach((errorType, index) => {
          if (errorType) {
            corrections[spellingString[index]].push(correctionCopy);
          }
        });
        mainIndex++;
      }
    }
  });

  setErrorList(corrections);
  textBoxValueRef(innerText);
};

export const setCaretPosition = (element, position) => {
  if (!element) return;

  const range = document.createRange();
  const selection = window.getSelection();

  if (position === 0) {
    let firstNode = element;
    while (firstNode.firstChild && firstNode.firstChild.nodeType === Node.ELEMENT_NODE) {
      firstNode = firstNode.firstChild;
    }

    range.setStart(firstNode.firstChild || firstNode, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
    return;
  }

  let currentPos = 0;
  let targetNode = null;
  let targetOffset = 0;

  const traverseNodes = (node) => {
    if (currentPos >= position) {
      return true;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const length = node.textContent.length;
      if (currentPos + length >= position) {
        targetNode = node;
        targetOffset = position - currentPos;
        return true;
      }
      currentPos += length;
    } else {
      if (!node.childNodes.length && node.nodeType === Node.ELEMENT_NODE) {
        if (currentPos === position) {
          targetNode = node;
          targetOffset = 0;
          return true;
        }
        currentPos += 1;
      }

      for (const child of node.childNodes) {
        if (traverseNodes(child)) {
          return true;
        }
      }
    }
    return false;
  };

  traverseNodes(element);

  if (targetNode) {
    try {
      range.setStart(targetNode, targetOffset);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      element.focus();
    } catch (e) {
      console.error('Error setting caret position:', e);
      setCaretPosition(element, 0);
    }
  }
};

export const getCaretPosition = (element) => {
  if (!element) return 0;

  const selection = window.getSelection();
  if (!selection.rangeCount) return 0;

  const range = selection.getRangeAt(0);

  if (range.startOffset === 0 && (!range.startContainer.textContent ||
    range.startContainer === element ||
    range.startContainer.nodeType === Node.ELEMENT_NODE)) {
    return 0;
  }

  let currentPos = 0;
  let found = false;

  const traverseNodes = (node) => {
    if (found) return;

    if (node.nodeType === Node.TEXT_NODE) {
      if (node === range.startContainer) {
        currentPos += range.startOffset;
        found = true;
        return;
      }
      currentPos += node.textContent.length;
    } else {
      if (!node.childNodes.length && node.nodeType === Node.ELEMENT_NODE) {
        currentPos += 1;
        if (node === range.startContainer && range.startOffset === 0) {
          found = true;
          return;
        }
      }

      for (const child of node.childNodes) {
        traverseNodes(child);
        if (found) break;
      }
    }
  };

  traverseNodes(element);
  return currentPos;
};

export const validatePosition = (element, position) => {
  if (!element) return 0;
  const totalLength = getTotalLength(element);
  return Math.max(0, Math.min(position, totalLength));
};

const getTotalLength = (element) => {
  let length = 0;
  const traverse = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      length += node.textContent.length;
    } else {
      if (!node.childNodes.length && node.nodeType === Node.ELEMENT_NODE) {
        length += 1;
      }
      for (const child of node.childNodes) {
        traverse(child);
      }
    }
  };
  traverse(element);
  return length;
};

export const saveCaretPosition = (element) => {
  const position = getCaretPosition(element);
  return validatePosition(element, position);
};

export const restoreCaretPosition = (element, savedPosition) => {
  const validPosition = validatePosition(element, savedPosition);
  setCaretPosition(element, validPosition);
};

export const getSpanIds = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const spans = doc.querySelectorAll('span[id]');
  return Array.from(spans).map(span => span.id);
};
