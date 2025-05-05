import { useState } from 'react';
import { useGetLanguageSynth } from '../../../hooks/service/LanguageSynthService';

export const useTextToSpeech = () => {
  const { getSynthData } = useGetLanguageSynth();
  const [isPlaying, setIsPlaying] = useState(false);

  const playTextToSpeech = async (selectedText, currentSpeaker, speed) => {
    if (!selectedText) return;

    document.body.style.cursor = 'wait';
    setIsPlaying(true);

    const requestBody = {
      tekst: selectedText,
      speaker: currentSpeaker,
      speed: speed.toFixed(1)
    };

    try {
      const base64String = await getSynthData(requestBody);

      const audioElement = document.createElement('audio');
      audioElement.src = 'data:audio/wav;base64,' + base64String;
      audioElement.preload = 'auto';

      audioElement.oncanplay = () => {
        audioElement
          .play()
          .finally(() => {
            document.body.style.cursor = 'auto';
            setIsPlaying(false);
          });
      };
    } catch (error) {
      console.error('Playback error:', error);
      document.body.style.cursor = 'auto';
      setIsPlaying(false);
    }
  };

  return { playTextToSpeech, isPlaying };
};
