import { useFetch } from '../useFetch';
import { useCallback } from 'react';

export const useGetWordlistResult = () => {
  const { fetchData } = useFetch();

  const getWordlistResult = useCallback(body => {
    return fetchData('/api/tools/wordlist', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getWordlistResult };
};

export const useGetCollocatesResult = () => {
  const { fetchData } = useFetch();

  const getCollocatesResult = useCallback(body => {
    return fetchData('/api/tools/collocates', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getCollocatesResult };
};

export const useGetWordContextResult = () => {
  const { fetchData } = useFetch();

  const getWordContextResult = useCallback(body => {
    return fetchData('/api/tools/wordcontext', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getWordContextResult };
};

export const useGetWordAnalyserResult = () => {
  const { fetchData } = useFetch();

  const getWordAnalyserResult = useCallback(body => {
    return fetchData('/api/texts/sonad-lemmad-silbid-sonaliigid-vormimargendid', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getWordAnalyserResult };
};

export const useGetCorrectorResult = () => {
  const { fetchData } = useFetch();

  const getCorrectorResult = useCallback(body => {
    return fetchData('/api/texts/keerukus-sonaliigid-mitmekesisus', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getCorrectorResult };
};

export const useGetGrammarResults = () => {
  const { fetchData } = useFetch();

  const getGrammarResults = useCallback(body => {
    return fetchData('https://api.tartunlp.ai/grammar', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getGrammarResults };
};

export const useGetSpellerResults = () => {
  const { fetchData } = useFetch();

  const getSpellerResults = useCallback(body => {
    return fetchData('/api/texts/spellchecker', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getSpellerResults };
};

export const useGetAbstractResult = () => {
  const { fetchData } = useFetch();

  const getAbstractResult = useCallback(body => {
    return fetchData('https://kiirlugemine.keeleressursid.ee/api/analyze', {
      method: 'POST',
      body
    });
  }, [fetchData]);

  return { getAbstractResult };
};
