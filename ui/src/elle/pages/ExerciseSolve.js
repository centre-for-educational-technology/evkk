import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import {ElleOuterDivStyle} from "../const/StyleConstants";
import { useNavigate } from 'react-router-dom';

export default function ExerciseSolve() {
  const {id} = useParams();
  const [exercise, setExercise] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9090/api/exercises/${id}`)
      .then(res => res.json())
      .then(setExercise)
      .catch(err => console.error("Harjutuse laadimine ebaõnnestus:", err));
  }, [id]);


  return (
    <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
      <Box className="library-container">
        <Box display="flex" alignItems="center" justifyContent="center" position="relative">
          <Button
            onClick={() => {
              const confirmed = window.confirm(
                'Kas oled kindel, et soovid harjutuse lahendamise katkestada?\nTulemusi ei salvestata!'
              );
              if (confirmed) {
                navigate(-1); // Liigub eelmisele lehele
              }
            }}
            variant="text"
            size="small"
            sx={{ position: 'absolute', left: 0 }}
          >
            Tagasi harjutusi valima
          </Button>
          <h1 style={{ textAlign: 'center' }}>
            {exercise?.title || 'Harjutus'}
          </h1>
        </Box>

        {/* Nupud */}
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              const confirmed = window.confirm(
                'Kas oled kindel, et soovid harjutuse lõpetada?'
              );
              if (confirmed) {
                // Siia saad hiljem panna näiteks navigate('/results') või muu loogika
              }
            }}
          >
            Lõpeta harjutus
          </Button>
        </Stack>
      </Box>
    </Box>
  );

}
