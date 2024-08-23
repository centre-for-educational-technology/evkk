import { useEffect } from 'react';

/*A custom hook that adds mouseenter and mouseleave event listeners to elements with the given class name.*/
export default function usePopUpHover(className, inputText, errorList, setPopperAnchor, setPopperValue) {
  useEffect(() => {
    const mouseExitListener = document.querySelector('.mouseaway-listener');
    const handleMouseEnter = (event) => {

      let hoveredError = {};
      for (const key of Object.keys(errorList)) {
        errorList[key].forEach((error) => {
          if (key === 'extraPunctuation' || key === 'missingPunctuation' || key === 'wrongPunctuation') {
            if (error.errorId.includes('errorno')) error.errorId = error.errorId.replace('errorno', 'punctuation');
          }
          if (key === 'spellingError' || key === 'wordOrderError' || key === 'missingWordError' || key === 'extraWordError' || key === 'wordCountError' || key === 'multipleErrors') {
            if (error.errorId.includes('punctuation')) error.errorId = error.errorId.replace('punctuation', 'errorno');
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
