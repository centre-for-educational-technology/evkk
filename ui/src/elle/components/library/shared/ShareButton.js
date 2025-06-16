import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ShareLinkModal from './ShareLinkModal';

export default function ShareButton({ originalUrl }) {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <Tooltip title="Loo jagatav link">
        <IconButton
          onClick={handleClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#852197',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            padding: '4px',
            zIndex: 1
          }}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <ShareLinkModal
        open={open}
        onClose={() => setOpen(false)}
        originalUrl={originalUrl}
      />
    </>
  );
}
