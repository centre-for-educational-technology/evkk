import { replaceCombined } from '../../../../../const/Constants';

export const handleNounMarking = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  let nounList = [];
  const usedWords = [];

  complexityAnswer.sonaliigid.forEach((word, index) => {
    if (word === 'NOUN') {
      if (!nounList.includes(complexityAnswer.sonad[index])) {
        nounList.push(complexityAnswer.sonad[index]);
      }
    }
  });
  nounList.forEach(noun => {
    if (!usedWords.includes(noun)) {
      usedWords.push(noun);
      const newWord = `<span id="text-span" class="noun-color">${noun}</span>`;
      tempText = tempText.replaceAll(noun, newWord);
    }
  });

  return tempText;
};

export const handleLongWordMarking = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  const usedWords = [];
  complexityAnswer.sonad.forEach(word => {
    if (word.length > 6 && !usedWords.includes(word)) {
      usedWords.push(word);
      const newWord = `<span id="text-span" class="long-word-color">${word}</span>`;
      tempText = tempText.replaceAll(word, newWord);
    }
  });

  return tempText;
};

export const handleLongSentenceMarking = (text, sentence) => {
  const newSentence = `<span id="text-span" class="long-sentence-color" >${sentence}</span>`;
  return text.replaceAll(sentence, newSentence);
};
