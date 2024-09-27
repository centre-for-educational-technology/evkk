import { commonLemmas, stopWords } from '../tabviews/vocabulary/constants/constants';
import { MAIN_NUMERAL, NAME, NOUN, ORDINAL_NUMERAL } from '../const/Constants';

const positionalWords = [NAME, MAIN_NUMERAL, ORDINAL_NUMERAL];

export const calculateAbstractnessAverage = (abstractAnswer) => {
  let abstractCount = 0;
  let abstractnessSum = 0;
  abstractAnswer.forEach((word) => {
    if (word.abstractness !== null && word.pos === 'Nimisõna') {
      abstractCount++;
      abstractnessSum += word.abstractness;
    }
  });
  return (abstractnessSum / abstractCount).toFixed(2);
};

export const calculateUncommonWords = (abstractAnswer, complexityAnswer) => {
  let unCommonCount = 0;

  abstractAnswer.forEach((lemma, index) => {
    if (!positionalWords.includes(lemma.pos) && !commonLemmas.includes(complexityAnswer.lemmad[index]) && lemma.posTag !== 'G') {
      unCommonCount++;
    }
  });
  return unCommonCount;
};

export const calculateContentWord = (abstractAnswer, complexityAnswer) => {
  let contentWordCount = 0;
  abstractAnswer.forEach((lemma, index) => {
    if (!positionalWords.includes(lemma.pos) && !stopWords.includes(complexityAnswer.lemmad[index]) && lemma.posTag !== 'G') {
      contentWordCount++;
    }
  });
  return contentWordCount;
};

export const calculateAbstractWords = (abstractAnswer, complexityAnswer) => {
  let abstractCount = 0;
  abstractAnswer.forEach((word, index) => {
    if (word.abstractness === 3 && word.pos !== NAME && complexityAnswer.sonaliigid[index] === NOUN) {
      abstractCount++;
    }
  });
  return abstractCount;
};

export const calculateTotalWords = (abstractAnswer) => {
  let totalWordCount = 0;
  abstractAnswer.forEach((lemma, _) => {
    if (!positionalWords.includes(lemma.pos) && lemma.posTag !== 'G') {
      totalWordCount++;
    }
  });
  return totalWordCount;
};

