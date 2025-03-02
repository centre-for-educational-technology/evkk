import { useEffect } from 'react';

export function useGlobalClickListener(setSelectedText) {
  useEffect(() => {
    const handleGlobalClick = () => {
      setSelectedText(null);
    };

    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

