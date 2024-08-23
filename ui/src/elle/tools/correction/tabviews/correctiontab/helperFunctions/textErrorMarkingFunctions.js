/*Function to modify string to add punctuation marking spans into right places*/
export const resolvePunctuationMarks = (wrongPunctuation, extraPunctuation, missingPunctuation, correction, errorWord, innerText, index) => {
  let punctuationMarks = {start: 0, end: 0, markedString: ''};
  if (wrongPunctuation || extraPunctuation) {
    punctuationMarks = {
      start: correction.span.end - 1,
      end: correction.span.end,
      markedString: errorWord[errorWord.length - 1]
    };
  }
  if (missingPunctuation) {
    punctuationMarks = {start: correction.span.end, end: correction.span.end + 1, markedString: '&nbsp;'};
  }
  let strArray = innerText.split('');
  strArray.splice(punctuationMarks.start, punctuationMarks.end - punctuationMarks.start, `<span id="punctuation_${index}" data-color="punctuation" class="text-span">${punctuationMarks.markedString}</span>`);
  return strArray.join('');
};

/*Function to add error spans into right places*/
export const resolveErrorMarks = (correction, innerText, markedString, index, wrongPunctuation, extraPunctuation, errorColor) => {
  let markingEnd = correction.span.end;
  let markedWord = markedString;
  if (wrongPunctuation || extraPunctuation) {
    markingEnd = markingEnd - 1;
    markedWord = markedWord.slice(0, -1);
  }
  let strArray = innerText.split('');
  strArray.splice(correction.span.start, markingEnd - correction.span.start, `<span id="errorno_${index}" data-color="${errorColor}" class="text-span">${markedWord}</span>`);
  return strArray.join('');
};

/*Function to specify span color for all errors. Punctuation error color is set in the resolvePunctuationMarks function.*/
export const returnMarkingColor = (spellingError, wordOrderError, missingWordError, extraWordError, wordCountError, multipleErrors) => {
  if (spellingError) return 'red';
  if (wordOrderError) return 'blue';
  if (wordCountError) return 'yellow';
  if (missingWordError || extraWordError) return 'violet';
  if (multipleErrors) return 'orange';
};


