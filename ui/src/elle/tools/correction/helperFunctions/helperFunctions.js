import { replaceCombined } from '../../../const/Constants';

export const handleModelChange = (setModel, event) => {
  setModel(event.target.value);
};

export const handleInput = (e, h, setNewRef, setInputText) => {
  setNewRef(h);
  setInputText(h);
};

export const handleCopy = (event) => {
  event.preventDefault();  // Prevent the default copy behavior

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

export const handlePaste = (event, newRef, setnewRef, setInputText) => {
  event.preventDefault();
  if (!newRef) {
    const text = event.clipboardData.getData('text/plain');
    setnewRef(text);
    setInputText(text);
  } else {
    const selection = document.getSelection();
    const text = event.clipboardData.getData('text/plain');
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);  // Get the current selection range

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
      setnewRef(updatedText);
      setInputText(updatedText);
    } else if (selection.type === 'Caret') {
      // If there is no selection, insert the text at the cursor position (caret)
      const start = selection.anchorOffset;

      // Manipulate the new text based on the current `newRef`
      const newText = newRef.replace(replaceCombined, '');

      // Insert the pasted text at the current cursor position (without removing anything)
      const newValue = newText.slice(0, start) + text + newText.slice(start);

      // Update the state with the new text
      setnewRef(newValue);
      setInputText(newValue);
    }
  }
};
