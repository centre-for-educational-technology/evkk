export const sanitizeTexts = (text) => {
  return text.replaceAll('\\n\\n', ' ').replaceAll('\\n', ' ').replaceAll('&quot;', '"');
};

export const checkIfWordExistsInText = (word) => new RegExp(`(?<=\\s|\\()${word}(?=[\\s!?,.)])`);
export const removeEmptySpans = new RegExp(/<span\b[^>]*><\/span>/g, '');
