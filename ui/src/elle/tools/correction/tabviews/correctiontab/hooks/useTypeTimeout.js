import { useEffect } from 'react';
import { replaceCombined } from '../../../../../const/Constants';

export default function useTypeTimeout(timer, setTimer, fetchCorrection, setComplexityAnswer, textBoxRef, setInputValue, model = null) {
  useEffect(() => {
    // Handler to call on key press or paste event
    const startTimerCountDown = () => {
      // Clear the existing timer on each key press or paste event
      if (timer) clearTimeout(timer);

      // Set a new timer
      const newTimer = setTimeout(() => {
        fetchCorrection(textBoxRef.current.innerHTML.replace(replaceCombined, ''), setComplexityAnswer);
        setInputValue(textBoxRef.current.innerHTML.replace(replaceCombined, ''));
      }, 2000); // 1000ms = 1s

      setTimer(newTimer);
    };

    // Add event listener for keydown and paste events
    document.addEventListener('keydown', startTimerCountDown);
    document.addEventListener('paste', startTimerCountDown);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener('keydown', startTimerCountDown);
      document.removeEventListener('paste', startTimerCountDown);
      if (timer) clearTimeout(timer);
    };
  }, [timer, model]);
}