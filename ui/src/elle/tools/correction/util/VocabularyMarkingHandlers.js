import { commonLemmas, stopWords } from '../tabviews/vocabulary/constants/constants';
import { replaceCombined } from '../../../const/Constants';
import { checkIfWordExistsInText } from '../../../util/TextUtils';
import { ABSTRACT_WORDS, CONTENT_WORDS, NOUN, NUM, PROPN, UNCOMMON_WORDS, WORD_REPETITION } from '../const/Constants';

export const handleUncommonWords = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');

  complexityAnswer.sonaliigid.forEach((liik, index) => {
    if (liik !== NUM && liik !== PROPN && !commonLemmas.includes(complexityAnswer.lemmad[index])) {
      const newWord = `<span class="uncommon-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkIfWordExistsInText(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleAbstractWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  abstractAnswer.forEach((word, index) => {
    if (word.abstractness === 3 && complexityAnswer.sonaliigid[index] !== PROPN && complexityAnswer.sonaliigid[index] === NOUN) {
      const newWord = `<span class="abstract-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkIfWordExistsInText(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleContentWords = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  complexityAnswer.sonaliigid.forEach((liik, index) => {
    if (liik !== NUM && !stopWords.includes(complexityAnswer.lemmad[index].replace('_', ''))) {
      const newWord = `<span class="content-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkIfWordExistsInText(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

const replaceMultipleSubstrings = (str, replacements) => {
  let modifiedString = str;

  replacements.forEach(({ start, end, text, type }) => {
    modifiedString =
      modifiedString.substring(0, start) +
      `<span class=${type} >${text}</span>` +
      modifiedString.substring(end);
  });

  return modifiedString;
};

export const markText = (complexityAnswer, inputText, model, abstractWords, setNewRef, setRenderTrigger) => {
  if (!complexityAnswer) return;
  let text = inputText.replaceAll(replaceCombined, '').replaceAll('  ', ' ');
  if (model === WORD_REPETITION) {
    text = replaceMultipleSubstrings(text, complexityAnswer.sonavara);
  } else if (model === UNCOMMON_WORDS && complexityAnswer) {
    text = handleUncommonWords(text, complexityAnswer);
  } else if (model === ABSTRACT_WORDS && abstractWords) {
    text = handleAbstractWords(text, abstractWords, complexityAnswer);
  } else if (model === CONTENT_WORDS) {
    text = handleContentWords(text, complexityAnswer);
  }
  setNewRef(text);
  setRenderTrigger(renderTrigger => !renderTrigger);
};
