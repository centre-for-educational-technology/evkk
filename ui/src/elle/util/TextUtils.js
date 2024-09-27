export const sanitizeTexts = (text) => {
  return text.replaceAll('\\n\\n', ' ').replaceAll('\\n', ' ').replaceAll('&quot;', '"');
};

export const checkForFullWord = (word) => new RegExp(`(?<=\\s)${word}(?=[\\s!?,.])`);
