import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function WordlistMenu({word, type, keepCapitalization, showCollocatesButton}) {

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
    navigate(`../wordcontext?word=${word}&type=${type}&keepCapitalization=${keepCapitalization}`);
  };

  const handleCollocates = () => {
    handleClose();
    navigate(`../collocates?word=${word}&type=${type}&keepCapitalization=${keepCapitalization}`);
  };

  const handleWordMeaning = () => {
    handleClose();
    window.open(`https://sonaveeb.ee/search/unif/dlall/dsall/${word}/1`);
  };

  const handleWordTranslation = () => {
    handleClose();
    window.open(`https://translate.google.com/?sl=et&text=${word}`);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHoriz/>
      </IconButton>
      <Menu anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
        <MenuItem onClick={handleWordContext}>Kasutuskontekstid</MenuItem>
        {showCollocatesButton && <MenuItem onClick={handleCollocates}>Naabersõnad</MenuItem>}
        <MenuItem onClick={handleWordMeaning}>Tähendus (Sõnaveeb)</MenuItem>
        <MenuItem onClick={handleWordTranslation}>Tõlge (Google Translate)</MenuItem>
      </Menu>
    </>
  );
}
