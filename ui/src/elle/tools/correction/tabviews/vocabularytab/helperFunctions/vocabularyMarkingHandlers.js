import { commonLemmas, stopWords } from '../constants/constants';
import { replaceCombined } from '../../../../../const/Constants';

export const handleUncommonWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  const usedWords = [];

  abstractAnswer.wordAnalysis.forEach((lemma, index) => {
    if (lemma.pos !== 'Pärisnimi' && !commonLemmas.includes(lemma.lemmas[0].lemma) && !usedWords.includes(abstractAnswer.wordAnalysis[index].word)) {
      usedWords.push(complexityAnswer.sonad[index]);
      let regex = new RegExp('\\b' + complexityAnswer.sonad[index] + '\\b', 'g');
      const newWord = `<span class="uncommon-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replaceAll(regex, newWord);
    }
  });
  return tempText;
};

export const handleAbstractWords = (text, abstractAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  const usedWords = [];
  abstractAnswer.wordAnalysis.forEach((word) => {
    if (word.abstractness === 3 && word.pos !== 'Pärisnimi' && !usedWords.includes(word.word)) {
      usedWords.push(word.word);
      let regex = new RegExp('\\b' + word.word + '\\b', 'g');
      const newWord = `<span class="abstract-word-color">${word.word}</span>`;
      tempText = tempText.replaceAll(regex, newWord);
    }
  });
  return tempText;
};

export const handleContentWords = (text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  const usedWords = [];
  complexityAnswer.lemmad.forEach((lemma, index) => {
    if (!stopWords.includes(lemma) && !usedWords.includes(complexityAnswer.sonad[index])) {
      usedWords.push(complexityAnswer.sonad[index]);
      let regex = new RegExp('\\b' + complexityAnswer.sonad[index] + '\\b', 'g');
      const newWord = `<span class="content-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replaceAll(regex, newWord);
    }
  });
  return tempText;
};

export const handleWordRepetition = (sentence, sentences, index, text, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  const sentence1Length = sentence.length;
  const sentence2Length = sentences[index + 1].length;
  const sentence1Words = complexityAnswer.sonad.slice(0, sentence1Length);
  const sentence1Lemmas = complexityAnswer.lemmad.slice(0, sentence1Length);
  const sentence2Words = complexityAnswer.sonad.slice(sentence1Length, sentence1Length + sentence2Length);
  const sentence2Lemmas = complexityAnswer.lemmad.slice(sentence1Length, sentence1Length + sentence2Length);

  sentence1Lemmas.forEach((lemma, index) => {
    sentence2Lemmas.forEach((lemma2, index2) => {
      if (lemma === lemma2 && lemma !== 'ja' && lemma !== 'olema' && lemma !== 'ei' && lemma !== 'et') {
        let regex1 = new RegExp('\\b' + sentence1Words[index] + '\\b', 'g');
        const sentence1Word = `<span class="word-repetition-color">${sentence1Words[index]}</span>`;
        let regex2 = new RegExp('\\b' + sentence2Words[index2] + '\\b', 'g');
        const sentence2Word = `<span class="word-repetition-color">${sentence2Words[index2]}</span>`;

        tempText = tempText.replace(regex1, sentence1Word);
        tempText = tempText.replace(regex2, sentence2Word);
      }
    });
  });
  return tempText;
};
