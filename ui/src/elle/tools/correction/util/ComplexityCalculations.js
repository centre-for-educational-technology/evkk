import { NOUN, VERB } from '../const/Constants';

export const calculateNounCount = (val, setNounCount) => {
  let nounCount = 0;
  val.sonaliigid.forEach((word, _) => {
    if (word === NOUN) {
      nounCount++;
    }
  });
  setNounCount(nounCount);
};

export const verbAndNounRelation = (complexityAnswer) => {
  let nounCount = 0;
  let verbCount = 0;
  complexityAnswer.sonaliigid.forEach((word) => {
    if (word === NOUN) {
      nounCount++;
    }
    if (word === VERB) {
      verbCount++;
    }
  });

  return (nounCount / verbCount).toFixed(2);
};
