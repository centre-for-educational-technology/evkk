import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function WordlistMenu({cellProps, type, keepCapitalization}) {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWordContext = () => {
    handleClose();
    navigate(`../wordcontext?word=${cellProps.row.original.word}&type=${type}&keepCapitalization=${keepCapitalization}`);
  };

  const handleWordMeaning = () => {
    handleClose();
    window.open(`https://sonaveeb.ee/search/unif/dlall/dsall/${cellProps.row.original.word}/1`);
  };

  const handleWordTranslation = () => {
    handleClose();
    window.open(`https://translate.google.com/?sl=et&text=${cellProps.row.original.word}`);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHoriz/>
      </IconButton>
      <Menu anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
        <MenuItem onClick={handleWordContext}>Kasutuskontekst</MenuItem>
        <MenuItem onClick={handleWordMeaning}>Tähendus (Sõnaveeb)</MenuItem>
        <MenuItem onClick={handleWordTranslation}>Tõlge (Google Translate)</MenuItem>
      </Menu>
    </>
  );
}
