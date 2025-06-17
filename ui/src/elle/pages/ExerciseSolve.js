import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import {ElleOuterDivStyle} from "../const/StyleConstants";
import { useNavigate } from 'react-router-dom';
import ExerciseResultModal from '../components/library/exercises/ExerciseResultModal'
import H5PPlayer from '../components/library/exercises/H5PPlayer';
import ShareButton from "../components/library/shared/ShareButton";


export default function ExerciseSolve() {
  const {id} = useParams();

  const [exercise, setExercise] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9090/api/exercises/${id}`)
      .then(res => res.json())
      .then(setExercise)
      .catch(err => console.error("Harjutuse laadimine ebaõnnestus:", err));
  }, [id]);


  return (
    <Box className="adding-rounded-corners" sx={ElleOuterDivStyle}>
      <Box
        className="library-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 100px)', // kogu sisuala kõrgus
          overflow: 'hidden'
        }}
      >
        {/* Header + Tagasi nupp */}
        <Box display="flex" alignItems="center" justifyContent="center" position="relative">
          <Button
            onClick={() => {
              const confirmed = window.confirm(
                'Kas oled kindel, et soovid harjutuse lahendamise katkestada?\nTulemusi ei salvestata!'
              );
              if (confirmed) {
                navigate(-1);
              }
            }}
            variant="text"
            size="small"
            sx={{position: 'absolute', left: 0}}
          >
            Tagasi harjutusi valima
          </Button>
          <ShareButton
            originalUrl={`http://localhost:3000/library/exercises/${id}`}
            sx={{ right: 10, top: 20, fontSize: '1.8rem', padding: '6px',  }}
          />
          <h1 style={{ textAlign: 'center' }}>
            {exercise?.title || 'Harjutus'}
          </h1>
        </Box>

        {/* Keritav harjutuse sisu */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            paddingTop: '1rem'
          }}
        >
          {exercise && (
            <H5PPlayer externalId={exercise.externalId}/>
          )}
        </Box>

        {/* Lõpeta harjutus nupp */}
        <Stack direction="row" spacing={2} justifyContent="center" mt={2} mb={2}>
          <Button
            sx={{
              backgroundColor: '#9C27B0',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#7B1FA2'
              }
            }}
            onClick={() => {
              const confirmed = window.confirm(
                'Kas oled kindel, et soovid harjutuse lõpetada?'
              );
              if (confirmed) {
                setShowModal(true);
              }
            }}
          >
            Lõpeta harjutus
          </Button>
        </Stack>

        <ExerciseResultModal isOpen={showModal} setIsOpen={setShowModal}/>
      </Box>
    </Box>
  );
}
