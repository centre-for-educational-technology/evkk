import { replaceCombined } from '../../../const/Constants';
import { checkForFullWord } from '../../../util/TextUtils';
import {
  COMPLEXITY_MARKING_LONG_WORD_LIMIT,
  COMPLEXITY_MARKING_MINIMUM_WORDS_IN_LONG_SENTENCE,
  LONG_SENTENCE,
  LONG_WORD,
  NOUN,
  NOUNS
} from '../const/Constants';

export const markText = (inputText, model, complexityAnswer, setNewRef, setRenderTrigger) => {
  let text = inputText.replaceAll(replaceCombined, '').replaceAll('  ', ' ');
  const sentences = text.split(/(?<=[.!?])\s+/);
  sentences.forEach((sentence) => {
    const words = sentence.split(' ');
    if (words.length > COMPLEXITY_MARKING_MINIMUM_WORDS_IN_LONG_SENTENCE && model === LONG_SENTENCE) {
      text = handleLongSentenceMarking(text, sentence);
    }
    if (model === LONG_WORD) {
      text = handleLongWordMarking(text, complexityAnswer);
    }
    if (model === NOUNS) {
      text = handleNounMarking(text, complexityAnswer);
    }
  });
  setNewRef(text);
  setRenderTrigger(renderTrigger => !renderTrigger);
};

const handleNounMarking = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');

  complexityAnswer.sonaliigid.forEach((word, index) => {
    if (word === NOUN) {
      const noun = complexityAnswer.sonad[index];
      const newWord = `<span id="text-span" class="noun-color">${noun}</span>`;
      tempText = tempText.replace(checkForFullWord(noun), newWord);
    }
  });
  return tempText;
};

const handleLongWordMarking = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');

  complexityAnswer.sonad.forEach(word => {
    if (word.length > COMPLEXITY_MARKING_LONG_WORD_LIMIT) {
      const newWord = `<span id="text-span" class="long-word-color">${word}</span>`;
      tempText = tempText.replace(checkForFullWord(word), newWord);
    }
  });
  return tempText;
};

const handleLongSentenceMarking = (text, sentence) => {
  const newSentence = `<span id="text-span" class="long-sentence-color">${sentence}</span>`;
  return text.replaceAll(sentence, newSentence);
};
