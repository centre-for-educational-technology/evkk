import { useGetTextToSpeech } from '../../../hooks/service/TextToSpeechService';

export const useTextToSpeech = () => {
  const { getTextToSpeechData } = useGetTextToSpeech();

  const playTextToSpeech = async (selectedText, currentSpeaker, speed) => {
    if (!selectedText) return;

    const requestBody = {
      text: selectedText,
      speaker: currentSpeaker,
      speed: speed.toFixed(1)
    };

    const base64String = await getTextToSpeechData(requestBody);
    const audioElement = document.createElement('audio');

    audioElement.src = 'data:audio/wav;base64,' + base64String;
    audioElement.preload = 'auto';
    audioElement.oncanplay = () => audioElement.play();
  };

  return { playTextToSpeech };
};
