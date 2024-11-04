import { commonLemmas, stopWords } from '../tabviews/vocabulary/constants/constants';
import { replaceCombined } from '../../../const/Constants';
import { checkForFullWord } from '../../../util/TextUtils';
import {
  ABSTRACT_WORDS,
  CONTENT_WORDS,
  EXCLUSION_WORDS,
  NOUN,
  NUM,
  PRON,
  PROPN,
  UNCOMMON_WORDS,
  WORD_REPETITION
} from '../const/Constants';

export const handleUncommonWords = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');

  complexityAnswer.sonaliigid.forEach((liik, index) => {
    if (liik !== NUM && liik !== PROPN && !commonLemmas.includes(complexityAnswer.lemmad[index])) {
      const newWord = `<span class="uncommon-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkForFullWord(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleAbstractWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  abstractAnswer.forEach((word, index) => {
    if (word.abstractness === 3 && complexityAnswer.sonaliigid[index] !== PROPN && complexityAnswer.sonaliigid[index] === NOUN) {
      const newWord = `<span class="abstract-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkForFullWord(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleContentWords = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  complexityAnswer.sonaliigid.forEach((liik, index) => {
    if (liik !== NUM && !stopWords.includes(complexityAnswer.lemmad[index].replace('_', ''))) {
      const newWord = `<span class="content-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkForFullWord(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const getRepetitions = (grammarAnswer) => {
  const sentences = grammarAnswer.laused;
  const repetitiveWordsList = [];

  sentences.forEach((sentence, index) => {
    const lemmaMap = new Map();
    grammarAnswer.sonaasukoht[index].forEach((word, wordIndex) => {
      if (!lemmaMap.has(word.lemma)) {
        lemmaMap.set(word.lemma, []);
      }
      lemmaMap.get(word.lemma).push(word);
    });
    repetitiveWordsList.push(lemmaMap);
  });
  return repetitiveWordsList;
};

const checkSameSentenceRepetition = (repetitionArray) => {
  return repetitionArray.flatMap(arr =>
    [...arr].filter(([key, value]) => value.length > 1) // Filter for values with length > 1
      .flatMap(([key, value]) =>
        value.map(valueObj => ({
          ...valueObj,
          type: 'same-sentence-color'
        }))
      )
  ).sort((a, b) => b.start - a.start); // Sort by the 'start' property
};

const processSameWordsForNextSentence = (array, prevArray) => {
  array.forEach(valueObj => {
    const exists = prevArray.some(existingObj => existingObj.start === valueObj.start);
    if (!exists && !EXCLUSION_WORDS.includes(valueObj.lemma) && valueObj.upos !== PRON) {
      prevArray.push({ ...valueObj, type: 'next-sentence-color' });
    }
  });
};

const checkBothSentenceRepetition = (repetitionArray, prevArray) => {
  repetitionArray.forEach((currentMap, index) => {
    if (index < repetitionArray.length - 1) {
      const nextMap = repetitionArray[index + 1];

      currentMap.forEach((value1, key) => {
        if (nextMap.has(key)) {
          const value2 = nextMap.get(key);

          processSameWordsForNextSentence(value1, prevArray);
          processSameWordsForNextSentence(value2, prevArray);
        }
      });
    }
  });

  return prevArray.sort((a, b) => b.start - a.start);
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
    const wordRepetitions = getRepetitions(complexityAnswer);
    const sameSentenceRepetetions = checkSameSentenceRepetition(wordRepetitions);
    const allRepetitions = checkBothSentenceRepetition(wordRepetitions, sameSentenceRepetetions);
    text = replaceMultipleSubstrings(text, allRepetitions);
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
