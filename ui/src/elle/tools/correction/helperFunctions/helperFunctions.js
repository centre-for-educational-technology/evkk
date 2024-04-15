export const handleModelChange = (setModel, event) => {
  setModel(event.target.value);
};

export const handleInput = (e, h, textBoxValueRef) => {
  textBoxValueRef.current = h;
};

export const handlePaste = (event, textBoxValueRef, setInputText) => {
  event.preventDefault();
  const text = event.clipboardData.getData('text/plain');
  textBoxValueRef.current = text;
  setInputText(text);
};
