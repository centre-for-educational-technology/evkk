import React, { createContext, useEffect, useState } from 'react';

export const TextSelectionContext = createContext();

export const TextSelectionProvider = ({ children }) => {
  const [selectedText, setSelectedText] = useState('teksti häälduse kuulamiseks aktiveeri tekst');

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if(selection.toString().length >0) {
        const text = selection.toString();
        setSelectedText(text);
      }
    };

    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('dblclick', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('dblclick', handleSelectionChange);
    };
  }, []);

  return (
    <TextSelectionContext.Provider value={selectedText}>
      {children}
    </TextSelectionContext.Provider>
  );
};

