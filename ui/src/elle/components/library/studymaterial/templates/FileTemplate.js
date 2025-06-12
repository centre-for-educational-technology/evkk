import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

export default function FileTemplate({ filename }) {
  if (!filename) return null;

  const fileUrl =
    process.env.NODE_ENV === 'production'
      ? `/api/files/${filename}`
      : `http://localhost:9090/api/files/${filename}`;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="body2"><strong>Fail:</strong> {filename}</Typography>
      <Button
        variant="contained"
        href={fileUrl}
        rel="noopener noreferrer"
        download
        endIcon={<DownloadIcon />}
        sx={{ backgroundColor: '#9C27B0', color: 'white' }}
      >
        Lae alla
      </Button>
    </Box>
  );
}
