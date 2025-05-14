//sorteerimise nupp

import React from 'react';
import {Button, Menu, MenuItem} from '@mui/material';

export default function SortButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <div>
        <Button
            id="sort-button"
            aria-controls={open ? 'sort-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            Sorteerimine
        </Button>
        <Menu
            id="sort-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'sort-button',
            }}
        >
            <MenuItem onClick={handleClose}>Populaarsemad enne</MenuItem>
            <MenuItem onClick={handleClose}>Vanemad enne</MenuItem>
            <MenuItem onClick={handleClose}>Uuemad enne</MenuItem>
        </Menu>
        </div>
    )
}
