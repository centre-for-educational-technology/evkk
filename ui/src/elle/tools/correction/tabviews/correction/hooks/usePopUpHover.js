import { useEffect } from 'react';
import {
  ERROR_NO,
  EXTRA_PUNCTUATION,
  EXTRA_WORD_ERROR,
  MISSING_PUNCTUATION,
  MISSING_WORD_ERROR,
  MULTIPLE_ERRORS,
  PUNCTUATION,
  SPELLING_ERROR,
  WORD_COUNT_ERROR,
  WORD_ORDER_ERROR,
  WRONG_PUNCTUATION
} from '../../../const/Constants';

/* A custom hook that adds mouseenter and mouseleave event listeners to elements with the given class name. */
export default function usePopUpHover(className, inputText, errorList, setPopperAnchor, setPopperValue) {
  useEffect(() => {
    const mouseExitListener = document.querySelector('.mouseaway-listener');
    const handleMouseEnter = (event) => {

      let hoveredError = {};
      for (const key of Object.keys(errorList)) {
        errorList[key].forEach((error) => {
          if (key === EXTRA_PUNCTUATION || key === MISSING_PUNCTUATION || key === WRONG_PUNCTUATION) {
            if (error.errorId.includes(ERROR_NO)) error.errorId = error.errorId.replace(ERROR_NO, PUNCTUATION);
          }
          if (key === SPELLING_ERROR || key === WORD_ORDER_ERROR || key === MISSING_WORD_ERROR || key === EXTRA_WORD_ERROR || key === WORD_COUNT_ERROR || key === MULTIPLE_ERRORS) {
            if (error.errorId.includes(PUNCTUATION)) error.errorId = error.errorId.replace(PUNCTUATION, ERROR_NO);
          }

          if (error.errorId === event.target.id) {
            hoveredError.error = error;
            hoveredError.type = key;
          }
        });
      }
      mouseExitListener.style.display = 'block';
      setPopperAnchor(event.target);
      setPopperValue(hoveredError);
    };

    const handleMouseLeave = () => {
      mouseExitListener.style.display = 'none';
      setPopperAnchor(null);
      setPopperValue(null);
    };

    // Query all elements with the specified class name
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
      // Attach event listeners
      element.addEventListener('mouseenter', handleMouseEnter);
    });

    mouseExitListener.addEventListener('mouseenter', handleMouseLeave);


    // Cleanup function to remove the event listeners
    return () => {
      elements.forEach(element => {
        // Remove event listeners
        element.removeEventListener('mouseenter', handleMouseEnter);
      });
      mouseExitListener.removeEventListener('mouseenter', handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, errorList]); // Re-run the effect when dependencies change
};
