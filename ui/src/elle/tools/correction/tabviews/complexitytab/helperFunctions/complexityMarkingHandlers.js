import { checkForFullWord, replaceCombined } from '../../../../../const/Constants';

export const handleNounMarking = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  let nounList = [];

  complexityAnswer.sonaliigid.forEach((word, index) => {
    if (word === 'NOUN') {
      if (!nounList.includes(complexityAnswer.sonad[index])) {
        nounList.push(complexityAnswer.sonad[index]);
      }
    }
  });
  complexityAnswer.sonaliigid.forEach((word, index) => {
    if (word === 'NOUN') {
      const noun = complexityAnswer.sonad[index];
      const newWord = `<span id="text-span" class="noun-color">${noun}</span>`;
      tempText = tempText.replace(checkForFullWord(noun), newWord);
    }
  });
  return tempText;
};

export const handleLongWordMarking = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  complexityAnswer.sonad.forEach(word => {
    if (word.length > 6) {
      const newWord = `<span id="text-span" class="long-word-color">${word}</span>`;
      tempText = tempText.replace(checkForFullWord(word), newWord);
    }
  });
  return tempText;
};

export const handleLongSentenceMarking = (text, sentence) => {
  const newSentence = `<span id="text-span" class="long-sentence-color" >${sentence}</span>`;
  return text.replaceAll(sentence, newSentence);
};

export const markText = (inputText, model, complexityAnswer, setNewRef, setRenderTrigger) => {
  let text = inputText.replaceAll(replaceCombined, '').replaceAll('  ', ' ');
  const sentences = text.split(/(?<=[.!?])\s+/);
  sentences.forEach((sentence) => {
    const words = sentence.split(' ');
    if (words.length > 15 && model === 'longsentence') {
      text = handleLongSentenceMarking(text, sentence);
    }
    if (model === 'longword') {
      text = handleLongWordMarking(text, complexityAnswer);
    }
    if (model === 'nouns') {
      text = handleNounMarking(text, complexityAnswer);
    }
  });
  setNewRef(text);
  setRenderTrigger(renderTrigger => !renderTrigger);
};
