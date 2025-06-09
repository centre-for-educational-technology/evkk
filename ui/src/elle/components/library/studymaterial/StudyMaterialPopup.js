import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import ModalBase from '../../modal/ModalBase';


export default function StudyMaterialPopup({ open, onClose, material }) {
  if (!material) return null;

  const fileUrl =
    process.env.NODE_ENV === 'production'
      ? `/api/files/${material.filename}`
      : `http://localhost:9090/api/files/${material.filename}`;

  return (
    <ModalBase isOpen={open} setIsOpen={onClose} title="Õppematerjal">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">{material.title}</Typography>

        {material.description && (
          <Typography variant="body1">{material.description}</Typography>
        )}

        <Typography variant="body2">
          Kategooria: {material.category || '-'}
        </Typography>

        <Typography variant="body2">
          Keeletase: {material.level || '-'}
        </Typography>

        <Button
          variant="contained"
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          sx={{ alignSelf: 'flex-start', backgroundColor: '#9C27B0', color: 'white' }}
        >
          Lae alla
        </Button>
      </Box>
    </ModalBase>
  );
}



