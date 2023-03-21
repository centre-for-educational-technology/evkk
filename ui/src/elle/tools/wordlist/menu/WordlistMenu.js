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
    window.open("https://sonaveeb.ee/search/unif/dlall/dsall/" + cellProps.row.original.word + "/1");
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
        <MenuItem onClick={handleWordMeaning}>Sõna tähendus (sonaveeb.ee)</MenuItem>
        <MenuItem onClick={handleClose}>Sõna tõlge</MenuItem>
      </Menu>
    </>
  );
}
