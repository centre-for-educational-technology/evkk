import { commonLemmas, stopWords } from '../constants/constants';
import { checkForFullWord, replaceCombined } from '../../../../../const/Constants';

const positionalWords = ['Pärisnimi', 'Põhiarvsõna', 'Järgarvsõna'];

const findDuplicates = (arr) => {
  const countMap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(countMap).filter(key => countMap[key] > 1);
};

const extractHslValue = (text, word) => {
  const regex = new RegExp(`<span[^>]*style="[^"]*hsl\\((\\d+)\\s+66%\\s+76%\\)"[^>]*>${word}</span>`, 'i');
  const match = text.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};

export const handleUncommonWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');

  abstractAnswer.wordAnalysis.forEach((lemma, index) => {
    if (!positionalWords.includes(lemma.pos) && !commonLemmas.includes(lemma.lemmas[0].lemma) && lemma.posTag !== 'G') {
      const newWord = `<span class="uncommon-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkForFullWord(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleAbstractWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  abstractAnswer.wordAnalysis.forEach((word, index) => {
    if (word.abstractness === 3 && word.pos !== 'Pärisnimi' && complexityAnswer.sonaliigid[index] === 'NOUN') {
      const newWord = `<span class="abstract-word-color">${word.word}</span>`;
      tempText = tempText.replace(checkForFullWord(word.word), newWord);
    }
  });
  return tempText;
};

export const handleContentWords = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  complexityAnswer.lemmad.forEach((lemma, index) => {
    if (!positionalWords.includes(lemma.pos) && !stopWords.includes(lemma) && lemma.posTag !== 'G') {
      const newWord = `<span class="content-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkForFullWord(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleSameWordRepetition = (sentence, text, usedIndexes, complexityAnswer) => {
  let tempText = text;
  let tempSentence = sentence;
  const sentenceWords = complexityAnswer.sonad.slice(usedIndexes.start, usedIndexes.end);
  const sentenceLemmas = complexityAnswer.lemmad.slice(usedIndexes.start, usedIndexes.end);

  const duplicateIndexes = {};
  sentenceLemmas.forEach((lemma, index) => {
    if (sentenceLemmas.indexOf(lemma) !== index) {
      if (!(lemma in duplicateIndexes)) {
        duplicateIndexes[lemma] = {words: [sentenceWords[index]]};
      }
      duplicateIndexes[lemma].words.push(sentenceWords[index]);
    }
  });

  Object.keys(duplicateIndexes).forEach((key) => {
    const randomHue = Math.floor(Math.random() * 360);
    if (key === 'ja' || key === 'mina' || key === 'olema' || key === 'ei' || key === 'et') {
      const duplicates = findDuplicates(duplicateIndexes[key].words);
      let regex1 = new RegExp('\\b' + duplicates[0] + '\\b', 'g');
      const sentence1Word = `<span class="word-repetition-color" style="background: hsl(${randomHue} 66% 76%)">${duplicates[0]}</span>`;
      tempSentence = tempSentence.replace(regex1, sentence1Word);
    } else {
      let regex1 = new RegExp('\\b' + duplicateIndexes[key].words[0] + '\\b', 'g');
      const sentence1Word = `<span class="word-repetition-color" style="background: hsl(${randomHue} 66% 76%)">${duplicateIndexes[key].words[0]}</span>`;
      tempSentence = tempSentence.replace(regex1, sentence1Word);
    }
  });

  tempText = tempText.replace(sentence, tempSentence);
  return (tempText);
};

export const handleWordRepetition = (sentence1, sentences2, usedIndexes, text, complexityAnswer) => {
  let tempText = text;
  const sentence1Words = complexityAnswer.sonad.slice(usedIndexes.start, usedIndexes.end);
  const sentence1Lemmas = complexityAnswer.lemmad.slice(usedIndexes.start, usedIndexes.end);
  const sentence2Words = complexityAnswer.sonad.slice(usedIndexes.end, usedIndexes.end + sentences2.split(' ').length);
  const sentence2Lemmas = complexityAnswer.lemmad.slice(usedIndexes.end, usedIndexes.end + sentences2.split(' ').length);

  sentence1Lemmas.forEach((lemma, index) => {
    sentence2Lemmas.forEach((lemma2, index2) => {
      if (lemma === lemma2 && lemma !== 'ja' && lemma !== 'mina' && lemma !== 'olema' && lemma !== 'ei' && lemma !== 'et') {
        let randomHue = Math.floor(Math.random() * 360);
        let regex1 = new RegExp('\\b' + sentence1Words[index] + '\\b', 'g');
        const regexCheck = new RegExp(sentence1Words[index] + '\\s*</span>');
        if (regexCheck.test(tempText)) {
          randomHue = extractHslValue(tempText, sentence1Words[index]);
        } else {
          const sentence1Word = `<span class="word-repetition-color" style="background: hsl(${randomHue} 66% 76%)">${sentence1Words[index]}</span>`;
          tempText = tempText.replace(regex1, sentence1Word);
        }
        let regex2 = new RegExp('\\b' + sentence2Words[index2] + '\\b', 'g');
        const sentence2Word = `<span class="word-repetition-color" style="background: hsl(${randomHue} 66% 76%)">${sentence2Words[index2]}</span>`;
        tempText = tempText.replace(regex2, sentence2Word);
      }
    });
  });
  return tempText;
};
