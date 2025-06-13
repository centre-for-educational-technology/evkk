//sorteerimise nupp

import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import '../../../pages/styles/Library.css';
import { useTranslation } from 'react-i18next';

export default function SortButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
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
                variant="contained"
                className="library-container-sortbutton"
            >
              {t('sort_button')}
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
                <MenuItem onClick={handleClose}>{t('sort_popular_first')}</MenuItem>
                <MenuItem onClick={handleClose}>{t('sort_older_first')}</MenuItem>
                <MenuItem onClick={handleClose}>{t('sort_newer_first')}</MenuItem>
            </Menu>
        </div>
    )
}
