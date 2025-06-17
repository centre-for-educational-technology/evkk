import React, { useState } from 'react';
import ModalBase from '../../modal/ModalBase';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../modal/ConfirmationModal';

export default function ExerciseResultModal({ isOpen, setIsOpen, results }) {
  const navigate = useNavigate();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleSetIsOpen = (value) => {
    if (!value) {
      setConfirmationOpen(true);
    } else {
      setIsOpen(true);
    };
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setConfirmationOpen(false);
    navigate('/library/exercises');
  };

  return (
    <>
      <ModalBase
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
        title="Harjutuse tulemus"
      >
      </ModalBase>
      <ConfirmationModal
        confirmationOpen={confirmationOpen}
        setConfirmationOpen={setConfirmationOpen}
        message="Kas oled kindel, et soovid lahkuda? Sind suunatakse harjutuste lehele!"
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmationOpen(false);
        }}
      />
    </>
  );
}


