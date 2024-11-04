import { commonLemmas, stopWords } from '../tabviews/vocabulary/constants/constants';
import { NOUN, NUM, PROPN } from '../const/Constants';

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

export const calculateUncommonWords = (complexityAnswer) => {
  let unCommonCount = 0;

  complexityAnswer.lemmad.forEach((lemma, index) => {
    if (complexityAnswer.sonaliigid !== NUM && !commonLemmas.includes(lemma)) {
      unCommonCount++;
    }
  });
  return unCommonCount;
};

export const calculateContentWord = (complexityAnswer) => {
  let contentWordCount = 0;
  complexityAnswer.lemmad.forEach((lemma, index) => {
    if (complexityAnswer.sonaliigid[index] !== NUM && !stopWords.includes(lemma)) {
      contentWordCount++;
    }
  });
  return contentWordCount;
};

export const calculateAbstractWords = (abstractAnswer, complexityAnswer) => {
  let abstractCount = 0;
  abstractAnswer.forEach((word, index) => {
    if (word.abstractness === 3 && complexityAnswer.sonaliigid[index] !== PROPN && complexityAnswer.sonaliigid[index] === NOUN) {
      abstractCount++;
    }
  });
  return abstractCount;
};

export const calculateTotalWords = (complexityAnswer) => {
  let totalWordCount = 0;
  complexityAnswer.sonaliigid.forEach(liik => {
    if (liik !== NUM) {
      totalWordCount++;
    }
  });
  return totalWordCount;
};

