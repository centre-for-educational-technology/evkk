import React from 'react';
import ModalBase from '../../modal/ModalBase';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../modal/ConfirmationModal';

export default function ExerciseSolveModal({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    setIsOpen(false);
    navigate('/library/exercises');
  };

  return (
    <>
      <ModalBase
        isOpen={isOpen}
        requireConfirmation={true}
        title="Harjutuse tulemus"
      >
      </ModalBase>
      <ConfirmationModal
        message="Kas oled kindel, et soovid lahkuda? \nsind suunatakse harjutuste lehele!"
        onConfirm={handleConfirm}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}


