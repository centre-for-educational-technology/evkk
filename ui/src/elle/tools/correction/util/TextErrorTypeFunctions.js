/* Function that runs all error checks and returns if checks are true or false as an object */
export const checkAllErrors = (errorWord, correctedWord) => {
  let spellingError = false;
  let wordOrderError = false;
  let missingWordError = false;
  let extraWordError = false;
  let multipleErrors = false;

  const wrongPunctuation = checkForWrongPunctuationError(errorWord, correctedWord);
  const extraPunctuation = checkForExtraPunctuationError(errorWord, correctedWord);
  const missingPunctuation = checkForMissingPunctuationError(errorWord, correctedWord);

  const wordCountError = checkIfOneOrTwoWords(errorWord, correctedWord);

  if (!wordCountError) {
    missingWordError = checkForMissingWordError(errorWord, correctedWord);
    extraWordError = checkForExtraWordError(errorWord, correctedWord);
  }

  if (!missingWordError && !extraWordError && !wordCountError) {
    spellingError = checkIfSpellingError(errorWord, correctedWord);
    wordOrderError = checkForWordOrderError(errorWord, correctedWord);
  }

  if (!spellingError && !wordOrderError && !missingWordError && !extraWordError && !wordCountError && errorWord.split(' ').length > 1) {
    multipleErrors = true;
  }

  return {
    spellingError,
    wordOrderError,
    missingWordError,
    extraWordError,
    wordCountError,
    multipleErrors,
    wrongPunctuation,
    extraPunctuation,
    missingPunctuation
  };
};

const punctuations = ['.', ',', '!', '?'];
const removePunctuationFromEnd = (str) => str.replace(/[.,?!]$/, '');

/* Function that checks if the word should be one or two words */
const checkIfOneOrTwoWords = (errorWord, correctedWord) =>
  ((removePunctuationFromEnd(errorWord).replace(' ', '') === removePunctuationFromEnd(correctedWord) || removePunctuationFromEnd(errorWord) === removePunctuationFromEnd(correctedWord).replace(' ', '')) && (errorWord.split(' ').length > 1 || correctedWord.split(' ').length > 1));

/* Function that checks for spelling errors */
const checkIfSpellingError = (errorWord, correctedWord) => {
  const errorWords = removePunctuationFromEnd(errorWord);
  const correctedWords = removePunctuationFromEnd(correctedWord);
  if ((errorWords.match(/,/g) || []).length !== (correctedWords.match(/,/g) || []).length) return false;

  let isSpellingError = true;
  const splitErrorWords = errorWords.split(' ').sort();
  const splitCorrectedWords = correctedWords.split(' ').sort();

  if (splitErrorWords.length !== splitCorrectedWords.length) return false;

  splitErrorWords.forEach((word, index) => {
    if (word === splitCorrectedWords[index]) isSpellingError = false;
  });

  return isSpellingError;
};

const checkForExtraPunctuationError = (errorWord, correctedWord) => {
  if (errorWord.split(' ').length !== correctedWord.split(' ').length) return false;
  const errorLastChar = errorWord[errorWord.length - 1];
  const correctedLastChar = correctedWord[correctedWord.length - 1];
  return punctuations.includes(errorLastChar) && !punctuations.includes(correctedLastChar);
};

const checkForMissingPunctuationError = (errorWord, correctedWord) => {
  const errorLastChar = errorWord[errorWord.length - 1];
  const correctedLastChar = correctedWord[correctedWord.length - 1];
  return punctuations.includes(correctedLastChar) && !punctuations.includes(errorLastChar);
};

const checkForWrongPunctuationError = (errorWord, correctedWord) => {
  const errorLastChar = errorWord[errorWord.length - 1];
  const correctedLastChar = correctedWord[correctedWord.length - 1];
  return punctuations.includes(errorLastChar) && punctuations.includes(correctedLastChar) && errorLastChar !== correctedLastChar;
};

const checkForWordOrderError = (errorWord, correctedWord) => {
  const errorWords = removePunctuationFromEnd(errorWord).toLowerCase().split(' ');
  const correctedWords = removePunctuationFromEnd(correctedWord).toLowerCase().split(' ');
  if (errorWords.length !== correctedWords.length) return false;
  if (errorWords.length === 1) return false;

  let isWordOrderError = true;
  const sortedErrorWords = errorWords.sort();
  const sortedCorrectedWords = correctedWords.sort();
  sortedErrorWords.forEach((word, index) => {
    if (word !== sortedCorrectedWords[index]) isWordOrderError = false;
  });

  return isWordOrderError;
};

const checkForExtraWordError = (errorWord, correctedWord) => {
  const errorWords = removePunctuationFromEnd(errorWord).split(' ');
  const correctedWords = removePunctuationFromEnd(correctedWord).split(' ');
  if (errorWords.length === correctedWords.length || errorWords.length < correctedWords.length) return false;
  return correctedWords.every((word) => errorWords.includes(word));
};

const checkForMissingWordError = (errorWord, correctedWord) => {
  const errorWords = errorWord.split(' ');
  const correctedWords = correctedWord.split(' ');
  if (errorWords.length === correctedWords.length || errorWords.length > correctedWords.length) return false;

  return errorWords.every((word) => correctedWords.includes(word));
};
