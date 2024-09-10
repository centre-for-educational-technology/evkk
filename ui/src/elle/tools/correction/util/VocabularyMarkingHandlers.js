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

export const handleUncommonWords = (text, abstractAnswer, complexityAnswer) => {
  let tempText = text.replaceAll(replaceCombined, '');

  abstractAnswer.forEach((lemma, index) => {
    if (!positionalWords.includes(lemma.pos) && !commonLemmas.includes(lemma.lemmas[0].lemma) && lemma.posTag !== 'G') {
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
  const duplicateIndexes = new Set();
  const lemmaMap = new Map();

  sentenceLemmas.forEach((lemma, index) => {
    if (complexityAnswer.sonaliigid[index] !== PRON) {
      if (!lemmaMap.has(lemma)) {
        lemmaMap.set(lemma, []);
      }
      lemmaMap.get(lemma).push(index);
    }
  });

  lemmaMap.forEach((indices, lemma) => {
    if (indices.length > 1) {
      indices.forEach((index) => {
        const word = sentenceWords[index];
        if (EXCLUSION_WORDS.includes(lemma)) {
          if (sentenceWords[indices[0]] === word) {
            duplicateIndexes.add(word);
          }
        } else {
          duplicateIndexes.add(word);
        }
      });
    }
  });

  duplicateIndexes.forEach((wordValue) => {
    let regex1 = new RegExp(`(<span[^>]*>\\s*)?\\b${wordValue}\\b(\\s*</span>)?`, 'g');
    const sentence1Word = `<span class="same-sentence-color" >${wordValue}</span>`;
    tempSentence = tempSentence.replace(regex1, sentence1Word);
  });

  tempText = tempText.replace(sentence, tempSentence);
  return (tempText);
};

export const handleWordRepetition = (sentence1, sentences2, usedIndexes, text, complexityAnswer) => {
  let tempText = text;
  const sliceEnd1 = usedIndexes.end;
  const sliceEnd2 = usedIndexes.end + sentences2.split(' ').length;
  const sentence1Words = complexityAnswer.sonad.slice(usedIndexes.start, sliceEnd1);
  const sentence1Lemmas = complexityAnswer.lemmad.slice(usedIndexes.start, sliceEnd1);
  const sentence2Words = complexityAnswer.sonad.slice(sliceEnd1, sliceEnd2);
  const sentence2Lemmas = complexityAnswer.lemmad.slice(sliceEnd1, sliceEnd2);
  const sentence1Map = new Map();

  sentence1Lemmas.forEach((lemma, index) => {
    if (!EXCLUSION_WORDS.includes(lemma) && complexityAnswer.sonaliigid[index] !== PRON) {
      sentence1Map.set(lemma, { word: sentence1Words[index], index });
    }
  });

  sentence2Lemmas.forEach((lemma, index2) => {
    if (sentence1Map.has(lemma)) {
      const sentence1Word = sentence1Map.get(lemma);
      const sentence2Word = sentence2Words[index2];

      if (!sentence1Word.word.toLowerCase().localeCompare(sentence2Word.toLowerCase())) {
        const sentence1Regex = new RegExp(`(<span[^>]*>)?\\b${sentence1Word.word}\\b(</span>)?`, 'gi');
        const sentence2Regex = new RegExp(`(<span[^>]*>)?\\b${sentence2Word}\\b(</span>)?`, 'gi');

        tempText = tempText.replace(sentence1Regex, match => {
          if (/same-sentence-color/.test(match)) {
            return `<span class="both-sentence-color">${sentence1Word.word}</span>`;
          } else if (/both-sentence-color/.test(match)) {
            return `<span class="both-sentence-color">${sentence1Word.word}</span>`;
          } else {
            return `<span class="next-sentence-color">${sentence1Word.word}</span>`;
          }
        });

        tempText = tempText.replace(sentence2Regex, match => {
          if (/same-sentence-color/.test(match)) {
            return `<span class="both-sentence-color">${sentence2Word}</span>`;
          } else if (/both-sentence-color/.test(match)) {
            return `<span class="both-sentence-color">${sentence2Word}</span>`;
          } else {
            return `<span class="next-sentence-color">${sentence2Word}</span>`;
          }
        });
      }
    }
  });
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
      text = handleContentWords(text, complexityAnswer);
    }
  });
  setNewRef(text);
  setRenderTrigger(renderTrigger => !renderTrigger);
};
