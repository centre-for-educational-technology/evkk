import {
  EXTRA_PUNCTUATION,
  GRAMMARCHECKER,
  MISSING_PUNCTUATION,
  SPELLCHECKER,
  TEXTSPAN,
  WRONG_PUNCTUATION
} from '../const/Constants';

export const resolvePunctuation = (type, error) => {
  if (type === EXTRA_PUNCTUATION) {
    return { acceptText: '', declineText: error.span.value[error.span.value.length - 1] };
  } else if (type === MISSING_PUNCTUATION) {
    return { acceptText: error.replacements[0].value[error.replacements[0].value.length - 1] + ' ', declineText: ' ' };
  } else if (type === WRONG_PUNCTUATION) {
    return {
      acceptText: error.replacements[0].value[error.replacements[0].value.length - 1],
      declineText: error.span.value[error.span.value.length - 1]
    };
  }
};

export const resolveError = (index, errorType, newInnerText, type, setErrorList, errorList, inputText, setInputText, setSpellerAnswer, setGrammarAnswer, grammarAnswer, spellerAnswer, model) => {
  const resolvableElement = document.querySelector(`#${errorType}_${index}`);
  resolvableElement.classList.remove(TEXTSPAN);
  const difference = newInnerText.length - resolvableElement.innerText.length;
  resolvableElement.innerText = newInnerText;

  const array = [];

  let errorIndex = -1;
  grammarAnswer.corrections.reverse().forEach((error) => {
    if (error.errorId !== `${errorType}_${index}`) {
      if (errorIndex > error.index) {
        error.span.start = error.span.start + difference;
        error.span.end = error.span.end + difference;
      }
      array.push(error);
    } else {
      errorIndex = error.index;
    }
  });
  grammarAnswer.corrections = array.reverse();
  if (model === SPELLCHECKER) {
    spellerAnswer.corrections.forEach((error) => {
      if (error.errorId < index) {
        error.span.start = error.span.start + difference;
        error.span.end = error.span.end + difference;
      }
    });
    spellerAnswer.corrections = spellerAnswer.corrections.filter((error) => error.errorId !== index);
  }
  if (model === GRAMMARCHECKER) {
    grammarAnswer.corrections.forEach((error, _) => {
      if (error.errorId < index) {
        error.span.start = error.span.start + difference;
        error.span.end = error.span.end + difference;
      }
    });
    grammarAnswer.corrections = grammarAnswer.corrections.filter((error) => error.errorId !== index);
  }
  setGrammarAnswer(grammarAnswer);
  setSpellerAnswer(spellerAnswer);

  const regex = new RegExp(`<span id="${errorType}_${index}" data-color="[^"]*" class="text-span">(.*?)</span>`, 'g');
  const newInputext = inputText.replace(regex, newInnerText);
  setInputText(newInputext);

  // Clone the element to remove all event listeners on element
  const clonedElement = resolvableElement.cloneNode(true);
  resolvableElement.parentNode.replaceChild(clonedElement, resolvableElement);

  const errors = errorList[type];
  const newList = errors.filter((error) => error.index !== index);
  setErrorList({ ...errorList, [type]: newList });
};
