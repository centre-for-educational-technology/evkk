import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ShareLinkModal from './ShareLinkModal';

export default function ShareButton({ originalUrl, sx = {} }) {
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
            top: 15,
            right: 15,
            color: '#852197',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            zIndex: 1,
            ...sx
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
