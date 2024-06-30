import { replaceCombined } from '../../../const/Constants';

export const handleModelChange = (setModel, event) => {
  setModel(event.target.value);
};

export const handleInput = (e, h, textBoxValueRef) => {
  textBoxValueRef.current = h;
};

export const handlePaste = (event, textBoxValueRef, setInputText) => {
  event.preventDefault();
  if (!textBoxValueRef.current) {
    const text = event.clipboardData.getData('text/plain');
    textBoxValueRef.current = text;
  } else {
    const selection = document.getSelection();
    if (selection.type === 'Range') {
      selection.deleteFromDocument();
    }
    const text = event.clipboardData.getData('text/plain');
    const start = selection.anchorOffset;
    const newText = textBoxValueRef.current.replace(replaceCombined, '');
    textBoxValueRef.current = newText.slice(0, start) + text + newText.slice(start);
  }
  setInputText(textBoxValueRef.current);
};
