export const sanitizeTexts = (text) => {
  return text.replaceAll('\\n\\n', ' ').replaceAll('\\n', ' ').replaceAll('&quot;', '"');
};

export const checkForFullWord = (word) => new RegExp(`(?<=\\s|\\()${word}(?=[\\s!?,.)])`);
export const removeEmptySpans = new RegExp(/<span\b[^>]*><\/span>/g, '');
