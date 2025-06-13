import React from 'react';
import ModalBase from '../../modal/ModalBase';
import { useNavigate } from 'react-router-dom';

export default function ExerciseSolveModal({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  // Kinnitav sulgemine – X nupu või tausta kliki korral
  const handleSetIsOpen = (value) => {
    if (!value) {
      const confirmed = window.confirm('Kas oled kindel, et soovid lahkuda? \nSind suunatakse harjutuste lehele!');
      if (confirmed) {
        setIsOpen(false);
        navigate('/library/exercises');
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <ModalBase
      isOpen={isOpen}
      setIsOpen={handleSetIsOpen}
      title="Harjutuse tulemus"
    >
    </ModalBase>
  );
}


