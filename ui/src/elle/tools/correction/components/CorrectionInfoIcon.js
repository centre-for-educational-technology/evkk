import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';

export default function CorrectionInfoIcon({ inputText }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="info" color="red" onClick={openPopover}>
        <InfoIcon className="elle-dark-text" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <div style={{ maxWidth: '600px', padding: '1rem' }}>{inputText}</div>
      </Popover>
    </div>
  );
};
