export const regExpReplaceAll = (text) => {
  return text.replaceAll('\\n\\n', ' ').replaceAll('\\n', ' ').replaceAll('&quot;', '"');
};
