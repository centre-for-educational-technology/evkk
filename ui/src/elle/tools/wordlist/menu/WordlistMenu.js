import React, {useState} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import {MoreHoriz} from "@mui/icons-material";

export default function WordlistMenu({cellProps}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleWordMeaning = () => {
    handleClose();
    window.open(`https://sonaveeb.ee/search/unif/dlall/dsall/${cellProps.row.original.word}/1`);
  }

  const handleWordTranslation = () => {
    handleClose();
    window.open(`https://translate.google.com/?sl=et&text=${cellProps.row.original.word}`);
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHoriz/>
      </IconButton>
      <Menu anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
        <MenuItem onClick={handleClose}
                  disabled>Kasutuskontekst</MenuItem>
        <MenuItem onClick={handleWordMeaning}>Tähendus (Sõnaveeb)</MenuItem>
        <MenuItem onClick={handleWordTranslation}>Tõlge (Google Translate)</MenuItem>
      </Menu>
    </>
  );
}
