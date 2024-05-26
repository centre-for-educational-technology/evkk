import { commonLemmas, stopWords } from '../constants/constants';

export const calculateAbstractnessAverage = (abstractAnswer) => {
  let abstractCount = 0;
  let abstractnessSum = 0;
  abstractAnswer.wordAnalysis.forEach((word) => {
    if (word.abstractness !== null && word.pos === 'Nimisõna') {
      abstractCount++;
      abstractnessSum += word.abstractness;
    }
  });
  return (abstractnessSum / abstractCount).toFixed(2);
};

export const calculateUncommonWords = (abstractAnswer) => {
  let unCommonCount = 0;
  abstractAnswer.wordAnalysis.forEach((lemma, index) => {
    if (lemma.pos !== 'Pärisnimi' && lemma.pos !== 'Järgarvsõna' && !commonLemmas.includes(lemma.lemmas[0].lemma)) {
      unCommonCount++;
    }
  });
  return unCommonCount;
};

export const calculateContentWord = (abstractAnswer) => {
  let contentWordCount = 0;
  abstractAnswer.wordAnalysis.forEach((lemma, index) => {
    if (lemma.pos !== 'Pärisnimi' && lemma.pos !== 'Järgarvsõna' && !stopWords.includes(lemma.lemmas[0].lemma)) {
      contentWordCount++;
    }
  });
  return contentWordCount;
};

export const calculateAbstractWords = (abstractAnswer) => {
  let abstractCount = 0;
  abstractAnswer.wordAnalysis.forEach((word) => {
    if (word.abstractness === 3 && word.pos !== 'Pärisnimi') {
      abstractCount++;
    }
  });
  return abstractCount;
};

