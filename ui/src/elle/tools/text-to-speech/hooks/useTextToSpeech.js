import { useState } from 'react';
import { useGetTextToSpeech } from '../../../hooks/service/TextToSpeechService';

export const useTextToSpeech = () => {
  const { getTextToSpeechData } = useGetTextToSpeech();
  const [isPlaying, setIsPlaying] = useState(false);

  const playTextToSpeech = async (selectedText, currentSpeaker, speed) => {
    if (!selectedText) return;

    setIsPlaying(true);

    const requestBody = {
      text: selectedText,
      speaker: currentSpeaker,
      speed: speed.toFixed(1)
    };

    try {
      const base64String = await getTextToSpeechData(requestBody);

      const audioElement = document.createElement('audio');
      audioElement.src = 'data:audio/wav;base64,' + base64String;
      audioElement.preload = 'auto';

      audioElement.oncanplay = () => {
        audioElement
          .play()
          .finally(() => {
            setIsPlaying(false);
          });
      };
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    }
  };

  return { playTextToSpeech, isPlaying };
};
