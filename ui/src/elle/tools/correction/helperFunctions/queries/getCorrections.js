import { loadFetch } from '../../../../service/LoadFetch';

export const getCorrections = async (val, grammarSetter, spellerSetter) => {
  const correctionFetch = async (model) => {
    const answer = await loadFetch(model === 'grammarchecker' ? 'https://api.tartunlp.ai/grammar' : '/api/texts/spellchecker', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model === 'grammarchecker' ? {
        language: 'et',
        text: val
      } : {tekst: val})
    });

    const answerJSON = await answer.json();
    answerJSON.corrections.reverse();
    return answerJSON;
  };

  const grammarResponse = await correctionFetch('grammarchecker');
  const spellerResponse = await correctionFetch('spellchecker');

  grammarSetter(grammarResponse);
  spellerSetter(spellerResponse);
};
