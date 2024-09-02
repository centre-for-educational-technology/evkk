import { commonLemmas, stopWords } from '../tabviews/vocabulary/constants/constants';

const positionalWords = ['Pärisnimi', 'Põhiarvsõna', 'Järgarvsõna'];

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

  abstractAnswer.wordAnalysis.forEach((lemma, _) => {
    if (!positionalWords.includes(lemma.pos) && !commonLemmas.includes(lemma.lemmas[0].lemma) && lemma.posTag !== 'G') {
      unCommonCount++;
    }
  });
  return unCommonCount;
};

export const calculateContentWord = (abstractAnswer) => {
  let contentWordCount = 0;
  abstractAnswer.wordAnalysis.forEach((lemma, _) => {
    if (!positionalWords.includes(lemma.pos) && !stopWords.includes(lemma.lemmas[0].lemma) && lemma.posTag !== 'G') {
      contentWordCount++;
    }
  });
  return contentWordCount;
};

export const calculateAbstractWords = (abstractAnswer, complexityAnswer) => {
  let abstractCount = 0;
  abstractAnswer.wordAnalysis.forEach((word, index) => {
    if (word.abstractness === 3 && word.pos !== 'Pärisnimi' && complexityAnswer.sonaliigid[index] === 'NOUN') {
      abstractCount++;
    }
  });
  return abstractCount;
};

export const calculateTotalWords = (abstractAnswer) => {
  let totalWordCount = 0;
  abstractAnswer.wordAnalysis.forEach((lemma, _) => {
    if (!positionalWords.includes(lemma.pos) && lemma.posTag !== 'G') {
      totalWordCount++;
    }
  });
  return totalWordCount;
};

