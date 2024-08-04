import { Box, IconButton, Modal, Tooltip } from '@mui/material';
import { modalStyle } from '../../const/StyleConstants';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/ModalBase.css';
import { QuestionMark } from '@mui/icons-material';

export default function ModalBase({
                                    isOpen,
                                    setIsOpen,
                                    innerClassName,
                                    title,
                                    titleTooltip,
                                    disableComfortClosing = false,
                                    disableCloseButton = false,
                                    children
                                  }) {

  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      onClose={(_, reason) => {
        if (disableComfortClosing && reason === 'backdropClick') {
          return;
        }
        setIsOpen(false);
      }}
      disableAutoFocus
      disableEscapeKeyDown={disableComfortClosing}
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
        {!disableCloseButton && (
          <IconButton
            aria-label="close"
            onClick={() => {
              setIsOpen(false);
            }}
            className="close-button"
          >
            <CloseIcon />
          </IconButton>
        )}
        <br />
        <div>
          {children}
        </div>
      </Box>
    </Modal>
  );
}
