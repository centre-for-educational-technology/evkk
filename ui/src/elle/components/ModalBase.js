import { Box, IconButton, Modal, Tooltip } from '@mui/material';
import { modalStyle } from '../const/Constants';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import './styles/ModalBase.css';
import { QuestionMark } from '@mui/icons-material';

export default function ModalBase({
                                    isOpen,
                                    setIsOpen,
                                    innerClassName,
                                    title,
                                    titleTooltip,
                                    children
                                  }) {

  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      disableAutoFocus
    >
      <Box
        sx={modalStyle}
        className={innerClassName || ''}
      >
        <div className="modal-head">
          {t(title)}
          {titleTooltip &&
            <Tooltip
              title={t(titleTooltip)}
              placement="right">
              <QuestionMark className="tooltip-icon" />
            </Tooltip>}
        </div>
        <IconButton
          aria-label="close"
          onClick={() => {
            setIsOpen(false);
          }}
          className="close-button"
        >
          <CloseIcon />
        </IconButton>
        <br />
        <div>
          {children}
        </div>
      </Box>
    </Modal>
  );
}