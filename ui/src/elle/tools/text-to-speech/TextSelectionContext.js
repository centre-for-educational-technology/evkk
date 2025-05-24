// Original code by Reydan Niineorg

import React, { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const TextSelectionContext = createContext();

export const TextSelectionProvider = ({ children }) => {
  const { t } = useTranslation();
  const [selectedText, setSelectedText] = useState(t('text_to_speech_text'));

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection.toString().length > 0) {
        setSelectedText(selection.toString());
      }
    };

    // Mouse events for desktop
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('dblclick', handleSelectionChange);

    // Touch events for mobile
    document.addEventListener('touchend', handleSelectionChange);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('dblclick', handleSelectionChange);
      document.removeEventListener('touchend', handleSelectionChange);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <TextSelectionContext.Provider value={selectedText}>
      {children}
    </TextSelectionContext.Provider>
  );
};
