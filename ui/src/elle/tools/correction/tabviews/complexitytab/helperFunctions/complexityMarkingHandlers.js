export const handleNounMarking = (text, complexityAnswer) => {
  let tempText = text;
  let nounList = [];

  complexityAnswer.sonaliigid.forEach((word, index) => {
    if (word === 'NOUN') {
      if (!nounList.includes(complexityAnswer.sonad[index])) {
        nounList.push(complexityAnswer.sonad[index]);
      }
    }
  });
  nounList.forEach(noun => {
    const newWord = `<span id="text-span" class="noun-color">${noun}</span>`;
    tempText = tempText.replaceAll(noun, newWord);
  });

  return tempText;
};

export const handleLongWordMarking = (text, complexityAnswer) => {
  let tempText = text;
  complexityAnswer.sonad.forEach(word => {
    if (word.length > 6) {
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
