import { replaceCombined, replaceSpaces, replaceSpaceTags } from '../../../const/Constants';
import { ShadingType, TextRun } from 'docx';
import { correctorDocxColors } from '../../../const/StyleConstants';

export const handleInput = (e, h, setNewRef, setInputText) => {
  setNewRef(h);
  setInputText(h);
};

export const handleCopy = (event) => {
  event.preventDefault();

  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let selectedText = range.toString();

    // Apply your replacements to the selected text
    selectedText = selectedText
      .replaceAll(replaceCombined, '')
      .replaceAll('  ', ' ');

    // Copy the modified selected text to clipboard
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

      // Check if it's a "Range" type selection (some text selected)
      if (!range.collapsed) {
        // Delete the selected content
        range.deleteContents();
      }

      // Insert the new text into the document
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);

      // Collapse the range to the end of the inserted text (so the cursor moves after the paste)
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);

      const updatedText = range.startContainer.textContent;
      // Update the state
      setNewRef(updatedText);
      setInputText(updatedText);
    } else if (selection.type === 'Caret') {
      // If there is no selection, insert the text at the cursor position (caret)
      const start = selection.anchorOffset;

      // Manipulate the new text based on the current `newRef`
      const newText = newRef.replace(replaceCombined, '');

      // Insert the pasted text at the current cursor position (without removing anything)
      const newValue = newText.slice(0, start) + text + newText.slice(start);

      // Update the state with the new text
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

export const queryCaller = (textBoxRef, inputText, setRequestingText, setGrammarAnswer, setSpellerAnswer, setInputText, newRef, setComplexityAnswer, setAbstractWords, getCorrectorResult, newValue, setValue, mainButton) => {
  if (textBoxRef.current.innerText.replaceAll('\u00A0', ' ') !== inputText.replaceAll(replaceCombined, '').replaceAll('\n', ' ').replaceAll('\u00A0', ' ') || mainButton) {
    setRequestingText(textBoxRef.current.innerHTML);
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
  // Create a temporary div element to parse the HTML string
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // Array to store the result
  const result = [];

  // Function to process nodes recursively
  function processNode(node) {
    // Handle text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      // Add text nodes as { text: [val], color: null } (ignore empty nodes)
      result.push(new TextRun({ text: node.textContent, size: 20 }));
    }

    // Handle element nodes, specifically <span>
    else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
      // Check for class name and handle accordingly
      let colorClass;
      if (node.className === 'text-span') {
        // If the class is "text-span", use data-color attribute
        colorClass = node.getAttribute('data-color') || null;
      } else {
        // For other spans, use class name as color
        colorClass = node.className || null;
      }

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

  // Iterate over the child nodes of the temporary div
  tempDiv.childNodes.forEach(node => {
    processNode(node);
  });

  return result;
};
