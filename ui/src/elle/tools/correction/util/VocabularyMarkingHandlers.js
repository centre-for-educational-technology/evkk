import { commonLemmas, stopWords } from '../tabviews/vocabulary/constants/constants';
import { replaceCombined } from '../../../const/Constants';
import { checkForFullWord } from '../../../util/TextUtils';
import {
  ABSTRACT_WORDS,
  CONTENT_WORDS,
  EXCLUSION_WORDS,
  MAIN_NUMERAL,
  NAME,
  NOUN,
  ORDINAL_NUMERAL,
  PRON,
  UNCOMMON_WORDS,
  WORD_REPETITION
} from '../const/Constants';

const positionalWords = [NAME, MAIN_NUMERAL, ORDINAL_NUMERAL];

const mapWords = (sentenceLemmas, checkLemmas, complexityAnswer) => {
  const sentenceMap = new Map();
  const duplicateIndexes = [];
  sentenceLemmas.forEach((lemma, index) => {
    if (!EXCLUSION_WORDS.includes(lemma) && complexityAnswer[index] !== PRON) {
      if (!sentenceMap.has(lemma)) {
        sentenceMap.set(lemma, []);
      }
      sentenceMap.get(lemma).push(index);
    }
  });

  sentenceMap.forEach((indices, lemma) => {
    if (checkLemmas.includes(lemma)) {
      duplicateIndexes.push(...indices);
    }
  });

  return duplicateIndexes;
};

const markRepetition = (duplicateIndexes, sentenceWords, inputText) => {
  let outputText = inputText;
  duplicateIndexes.forEach(wordValue => {
    const sentence1Regex = new RegExp(`(<span[^>]*>)?\\b${sentenceWords[wordValue]}\\b(</span>)?`, 'gi');
    outputText = inputText.replace(sentence1Regex, match => {
      if (/same-sentence-color/.test(match) || /both-sentence-color/.test(match)) {
        return `<span class="both-sentence-color">${sentenceWords[wordValue]}</span>`;
      }
      return `<span class="next-sentence-color">${sentenceWords[wordValue]}</span>`;
    });
  });
  return outputText;
};

export const handleUncommonWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');

  abstractAnswer.forEach((lemma, index) => {
    if (!positionalWords.includes(lemma.pos) && !commonLemmas.includes(complexityAnswer.lemmad[index]) && lemma.posTag !== 'G') {
      const newWord = `<span class="uncommon-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkForFullWord(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleAbstractWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  abstractAnswer.forEach((word, index) => {
    if (word.abstractness === 3 && word.pos !== NAME && complexityAnswer.sonaliigid[index] === NOUN) {
      const newWord = `<span class="abstract-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkForFullWord(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleContentWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');
  abstractAnswer.forEach((lemma, index) => {
    if (!positionalWords.includes(lemma.pos) && !stopWords.includes(complexityAnswer.lemmad[index].replace('_', '')) && lemma.posTag !== 'G') {
      const newWord = `<span class="content-word-color">${complexityAnswer.sonad[index]}</span>`;
      tempText = tempText.replace(checkForFullWord(complexityAnswer.sonad[index]), newWord);
    }
  });
  return tempText;
};

export const handleSameWordRepetition = (sentence, text, usedIndexes, complexityAnswer) => {
  let tempText = text;
  let tempSentence = sentence;
  const complexityAnswerSliced = complexityAnswer.sonaliigid.slice(usedIndexes.start, usedIndexes.end);
  const sentenceWords = complexityAnswer.sonad.slice(usedIndexes.start, usedIndexes.end);
  const sentenceLemmas = complexityAnswer.lemmad.slice(usedIndexes.start, usedIndexes.end);
  const duplicateIndexes = [];
  const lemmaMap = new Map();

  sentenceLemmas.forEach((lemma, index) => {
    if (complexityAnswerSliced[index] !== PRON) {
      if (!lemmaMap.has(lemma)) {
        lemmaMap.set(lemma, []);
      }
      lemmaMap.get(lemma).push(index);
    }
  });

  sentenceWords.forEach((word, index) => {
    if (complexityAnswerSliced[index] === PRON) {
      if (!lemmaMap.has(word.toLowerCase())) {
        lemmaMap.set(word.toLowerCase(), []);
      }
      lemmaMap.get(word.toLowerCase()).push(index);
    }
  });

  lemmaMap.forEach((indices, lemma) => {
    if (indices.length > 1) {
      duplicateIndexes.push(...indices);
    }
  });

  duplicateIndexes.forEach(wordValue => {
    let regexMatchFullWord = new RegExp(`(<span[^>]*>\\s*)?\\b${sentenceWords[wordValue]}\\b(\\s*</span>)?`, 'g');
    const sentence1Word = `<span class="same-sentence-color" >${sentenceWords[wordValue]}</span>`;
    tempSentence = tempSentence.replace(regexMatchFullWord, sentence1Word);
  });

  tempText = tempText.replace(sentence, tempSentence);
  return (tempText);
};

export const handleWordRepetition = (sentence1, sentences2, usedIndexes, text, complexityAnswer) => {
  let tempText = text;
  const sliceEnd1 = usedIndexes.end;
  const sliceEnd2 = usedIndexes.end + sentences2.split(' ').length;
  const complexityAnswer1 = complexityAnswer.sonaliigid.slice(usedIndexes.start, sliceEnd1);
  const complexityAnswer2 = complexityAnswer.sonaliigid.slice(sliceEnd1, sliceEnd2);
  const sentence1Words = complexityAnswer.sonad.slice(usedIndexes.start, sliceEnd1);
  const sentence1Lemmas = complexityAnswer.lemmad.slice(usedIndexes.start, sliceEnd1);
  const sentence2Words = complexityAnswer.sonad.slice(sliceEnd1, sliceEnd2);
  const sentence2Lemmas = complexityAnswer.lemmad.slice(sliceEnd1, sliceEnd2);
  const duplicateIndexes1 = mapWords(sentence1Lemmas, sentence2Lemmas, complexityAnswer1);
  const duplicateIndexes2 = mapWords(sentence2Lemmas, sentence1Lemmas, complexityAnswer2);

  tempText = markRepetition(duplicateIndexes1, sentence1Words, tempText);
  tempText = markRepetition(duplicateIndexes2, sentence2Words, tempText);

  return tempText;
};

export const markText = (complexityAnswer, inputText, model, abstractWords, setNewRef, setRenderTrigger) => {
  if (!complexityAnswer) return;
  let text = inputText.replaceAll(replaceCombined, '').replaceAll('  ', ' ');
  const sentences = text.split(/(?<=[.!?])\s+/);
  let currentWordIndex = 0;
  sentences.forEach((sentence, index) => {
    if (model === WORD_REPETITION) {
      const usedIndexes = { start: currentWordIndex, end: currentWordIndex + sentence.split(' ').length };
      const tempSentence = text.split(/(?<=[.!?])\s+/)[index];
      text = handleSameWordRepetition(tempSentence, text, usedIndexes, complexityAnswer);
      if (index < sentences.length - 1) {
        currentWordIndex = usedIndexes.end;
        text = handleWordRepetition(tempSentence, sentences[index + 1], usedIndexes, text, complexityAnswer);
      }
    } else if (model === UNCOMMON_WORDS && complexityAnswer) {
      text = handleUncommonWords(text, abstractWords, complexityAnswer);
    } else if (model === ABSTRACT_WORDS && abstractWords) {
      text = handleAbstractWords(text, abstractWords, complexityAnswer);
    } else if (model === CONTENT_WORDS) {
      text = handleContentWords(text, abstractWords, complexityAnswer);
    }
  });
  setNewRef(text);
  setRenderTrigger(renderTrigger => !renderTrigger);
};
