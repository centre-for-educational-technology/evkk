import React, { useState } from 'react';
import ModalBase from '../../modal/ModalBase';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../modal/ConfirmationModal';
import { Box, LinearProgress, Typography } from '@mui/material';

export default function ExerciseResultModal({ isOpen, setIsOpen, results }) {
  const navigate = useNavigate();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const percentage = (results.score / results.maxScore) * 100;

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
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1">Punktid:</Typography>
          <Typography variant="body1" fontWeight="bold">
            {results.score} / {results.maxScore}
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#eee',
            '& .MuiLinearProgress-bar': {
              backgroundColor: percentage >= 70 ? 'green' : 'orange',
            },
          }}
        />

        <Typography
          variant="caption"
          display="block"
          align="center"
          mt={1}
          color="textSecondary"
        >
          {Math.round(percentage)}% saavutatud
        </Typography>
        <Box
          mt={3}
          p={2}
          bgcolor="#f5f5f5"
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="body2" color="textSecondary">
            Kestvus:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {results.duration ? formatISODuration(results.duration) : '0 sec'}
          </Typography>
        </Box>
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

function formatISODuration(iso) {
  const match = iso.match(/PT(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/);
  if (!match) return iso;

  const [, minutes, seconds] = match;
  let result = '';

  if (minutes) result += `${minutes} min `;
  if (seconds) result += `${parseFloat(seconds).toFixed(2)} sec`;

  return result.trim();
};

