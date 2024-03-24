export const resolvePunctuation = (type, error) => {
  if (type === 'extraPunctuation') {
    return {acceptText: '', declineText: error.span.value[error.span.value.length - 1]};
  } else if (type === 'missingPunctuation') {
    return {acceptText: error.replacements[0].value[error.replacements[0].value.length - 1], declineText: ''};
  } else if (type === 'wrongPunctuation') {
    return {
      acceptText: error.replacements[0].value[error.replacements[0].value.length - 1],
      declineText: error.span.value[error.span.value.length - 1]
    };
  }
};

export const resolveError = (index, errorType, newInnerText, type, setErrorList, errorList, inputText, setInputText) => {
  const resolvableElement = document.querySelector(`#${errorType}_${index}`);
  resolvableElement.classList.remove('text-span');
  resolvableElement.innerText = newInnerText;

  const regex = new RegExp(`<span id="${errorType}_${index}" data-color="[^"]*" class="text-span">(.*?)</span>`, 'g');
  const newInputext = inputText.replace(regex, newInnerText);
  setInputText(newInputext);

  // Clone the element to remove all event listeners on element
  const clonedElement = resolvableElement.cloneNode(true);
  resolvableElement.parentNode.replaceChild(clonedElement, resolvableElement);

  const errors = errorList[type];
  const newList = errors.filter((error) => error.index !== index);
  setErrorList({...errorList, [type]: newList});
};
