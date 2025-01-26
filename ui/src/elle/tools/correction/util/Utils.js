import { replaceCombined, replaceSpaces, replaceSpaceTags } from '../../../const/Constants';
import { InternalHyperlink, Paragraph, ShadingType, SymbolRun, TextRun, UnderlineType } from 'docx';
import { correctorDocxColors } from '../../../const/StyleConstants';
import { accordionDetails, errorTypes } from '../const/TabValuesConstant';
import { CORRECTION, TEXTSPAN } from '../const/Constants';
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

export const processTextCorrections = (responseText, textBoxRef, textBoxValueRef, setErrorList, pasteReset = null) => {
  // Avoid resetting input text on tab change
  if (!responseText || !textBoxRef) return;
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

  responseText.corrections.forEach(correction => {
    const errorWord = correction.span.value;
    const correctedWord = correction.replacements[0].value;
    const errorTypes = checkAllErrors(errorWord, correctedWord);

    if (checkForPunctuationErrorType(errorTypes)) {
      const punctuationResult = processPunctuationError(correction, errorWord, innerText, mainIndex);
      innerText = punctuationResult.innerText;
      processPunctuationTypes(punctuationResult, corrections);

      mainIndex++;
    }

    if (checkForOtherErrorType(errorTypes)) {
      const errorColor = returnMarkingColor(errorTypes);
      if (errorTypes.spellingError && errorWord.split(' ').length !== 1) {
        const multiWordResult = processMultiWordSpellingError(correction, errorWord, innerText, mainIndex, errorColor);
        innerText = multiWordResult.innerText;
        corrections.spellingError.push(...multiWordResult.corrections);
        mainIndex = multiWordResult.newIndex;
      } else {
        const singleWordResult = processSingleWordError(correction, errorWord, innerText, mainIndex, errorColor);
        innerText = singleWordResult.innerText;
        processSingleWordCorrections(singleWordResult, corrections);
        mainIndex++;
      }
    }
  });

  setErrorList(corrections);
  textBoxValueRef(innerText);
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

const processGrammarResponseIndexes = (grammarResponse, grammarSetter) => {
  grammarResponse.corrections.reverse();
  grammarResponse.corrections.forEach((error, index) => {
    error.errorId = index;
  });
  grammarSetter(grammarResponse);
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

const processPunctuationError = (correction, errorWord, innerText, mainIndex) => {
  const correctionCopy = { ...correction };
  const {
    wrongPunctuation,
    extraPunctuation,
    missingPunctuation
  } = checkAllErrors(errorWord, correction.replacements[0].value);

  innerText = resolvePunctuationMarks(
    wrongPunctuation,
    extraPunctuation,
    missingPunctuation,
    correctionCopy,
    errorWord,
    innerText,
    mainIndex
  );

  correctionCopy.errorId = `punctuation_${mainIndex}`;
  correctionCopy.index = mainIndex;

  return {
    innerText,
    correctionCopy,
    errorTypes: { wrongPunctuation, extraPunctuation, missingPunctuation }
  };
};

const processMultiWordSpellingError = (correction, errorWord, innerText, mainIndex, errorColor) => {
  const corrections = [];
  const errorWords = errorWord.split(' ').reverse();
  const newSpan = correction.span.value.split(' ').reverse();
  const replaceWords = correction.replacements[0].value.split(' ').reverse();
  let endVal = correction.span.end;

  errorWords.forEach((word, errorIndex) => {
    const correctionCopy = { ...correction };
    correctionCopy.span = {
      start: endVal - word.length,
      end: endVal,
      value: newSpan[errorIndex]
    };
    correctionCopy.replacements = [{ value: replaceWords[errorIndex] }];

    innerText = resolveErrorMarks(
      correctionCopy,
      innerText,
      word,
      mainIndex + errorIndex,
      errorIndex === 0 ? correction.wrongPunctuation : false,
      errorIndex === 0 ? correction.extraPunctuation : false,
      errorColor
    );

    correctionCopy.errorId = `errorno_${mainIndex + errorIndex}`;
    correctionCopy.index = mainIndex + errorIndex;
    endVal = correctionCopy.span.end - word.length - 1;

    corrections.push(correctionCopy);
  });

  return { innerText, corrections, newIndex: mainIndex + errorWords.length };
};

const processSingleWordError = (correction, errorWord, innerText, mainIndex, errorColor) => {
  const correctionCopy = { ...correction };
  const errorTypes = checkAllErrors(errorWord, correction.replacements[0].value);

  innerText = resolveErrorMarks(
    correctionCopy,
    innerText,
    errorWord,
    mainIndex,
    errorTypes.wrongPunctuation,
    errorTypes.extraPunctuation,
    errorColor
  );

  correctionCopy.errorId = `errorno_${mainIndex}`;
  correctionCopy.index = mainIndex;

  return { innerText, correctionCopy, errorTypes };
};

const processPunctuationTypes = (punctuationResult, corrections) => {
  if (punctuationResult.errorTypes.wrongPunctuation) corrections.wrongPunctuation.push(punctuationResult.correctionCopy);
  if (punctuationResult.errorTypes.extraPunctuation) corrections.extraPunctuation.push(punctuationResult.correctionCopy);
  if (punctuationResult.errorTypes.missingPunctuation) corrections.missingPunctuation.push(punctuationResult.correctionCopy);
};

const checkForPunctuationErrorType = (errorTypes) => {
  return errorTypes.wrongPunctuation || errorTypes.extraPunctuation || errorTypes.missingPunctuation;
};

const checkForOtherErrorType = (errorTypes) => {
  return errorTypes.spellingError || errorTypes.wordOrderError || errorTypes.missingWordError || errorTypes.extraWordError || errorTypes.wordCountError || errorTypes.multipleErrors;
};

const processSingleWordCorrections = (singleWordResult, corrections) => {
  Object.entries(singleWordResult.errorTypes).forEach(([errorType, hasError]) => {
    if (hasError) {
      corrections[errorType].push(singleWordResult.correctionCopy);
    }
  });
};

const setCaretAtStart = (element, range, selection) => {
  let firstNode = element;
  while (firstNode.firstChild && firstNode.firstChild.nodeType === Node.ELEMENT_NODE) {
    firstNode = firstNode.firstChild;
  }

  range.setStart(firstNode.firstChild || firstNode, 0);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  element.focus();
};

const findCaretPosition = (node, position) => {
  let currentPos = 0;
  let targetNode = null;
  let targetOffset = 0;

  const traverseNodesForSetCaretPosition = (node) => {
    if (currentPos >= position) return true;

    if (node.nodeType === Node.TEXT_NODE) {
      const length = node.textContent.length;
      if (currentPos + length >= position) {
        targetNode = node;
        targetOffset = position - currentPos;
        return true;
      }
      currentPos += length;
    } else if (node.nodeType === Node.ELEMENT_NODE && !node.childNodes.length) {
      if (currentPos === position) {
        targetNode = node;
        targetOffset = 0;
        return true;
      }
      currentPos += 1;
    }

    for (const child of node.childNodes) {
      if (traverseNodesForSetCaretPosition(child)) return true;
    }
    return false;
  };

  traverseNodesForSetCaretPosition(node);
  return { targetNode, targetOffset };
};

const setCaretAtPosition = (element, range, selection, targetNode, targetOffset) => {
  if (targetNode) {
    try {
      range.setStart(targetNode, targetOffset);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      element.focus();
    } catch (e) {
      console.error('Error setting caret position:', e);
      setCaretAtStart(element, range, selection);
    }
  }
};

const setCaretPosition = (element, position) => {
  if (!element) return;

  const range = document.createRange();
  const selection = window.getSelection();

  if (position === 0) {
    setCaretAtStart(element, range, selection);
  } else {
    const { targetNode, targetOffset } = findCaretPosition(element, position);
    setCaretAtPosition(element, range, selection, targetNode, targetOffset);
  }
};

const processTextNodesForSetCaretPosition = (node, range, state) => {
  if (node === range.startContainer) {
    state.currentPos += range.startOffset;
    state.found = true;
  }
};

const processChildNodesForSetCaretPosition = (node, range, state, traverseNodesForGetCaretPosition) => {
  if (!node.childNodes.length && node.nodeType === Node.ELEMENT_NODE) {
    state.currentPos += 1;
    if (node === range.startContainer && range.startOffset === 0) {
      state.found = true;
      return;
    }
  }

  for (const child of node.childNodes) {
    traverseNodesForGetCaretPosition(child);
    if (state.found) break;
  }
};

const getCaretPosition = (element) => {
  if (!element) return 0;

  const selection = window.getSelection();
  if (!selection.rangeCount) return 0;

  const range = selection.getRangeAt(0);

  if (range.startOffset === 0 && (!range.startContainer.textContent ||
    range.startContainer === element ||
    range.startContainer.nodeType === Node.ELEMENT_NODE)) {
    return 0;
  }

  const state = { currentPos: 0, found: false };

  const traverseNodesForGetCaretPosition = (node) => {
    if (state.found) return;

    if (node.nodeType === Node.TEXT_NODE) {
      if (node === range.startContainer) {
        processTextNodesForSetCaretPosition(node, range, state);
        return;
      }
      state.currentPos += node.textContent.length;
    } else {
      processChildNodesForSetCaretPosition(node, range, state, traverseNodesForGetCaretPosition);
    }
  };

  traverseNodesForGetCaretPosition(element);
  return state.currentPos;
};

const validatePosition = (element, position) => {
  if (!element) return 0;
  const totalLength = getTotalLengthOfNodeTexts(element);
  return Math.max(0, Math.min(position, totalLength));
};

const getTotalLengthOfNodeTexts = (element) => {
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
