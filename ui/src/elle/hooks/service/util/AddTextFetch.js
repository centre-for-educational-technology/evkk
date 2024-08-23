import { useEffect } from 'react';
import { useAddText } from '../TextService';

const AddTextFetch = ({ request, onComplete }) => {
  const { addText } = useAddText();

  useEffect(() => {
    addText(request, onComplete);
  }, [addText, onComplete, request]);

  return null;
};

export default AddTextFetch;
