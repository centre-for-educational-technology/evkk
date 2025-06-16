import { Box, Button, IconButton, Modal, Tooltip } from '@mui/material';
import { modalConfirmationStyle, modalStyle } from '../../const/StyleConstants';
import React, { useState } from 'react';
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
                                    requireConfirmation = false,
                                    children
                                  }) {

  const { t } = useTranslation();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleClose = (reason) => {
    if (disableComfortClosing && reason === 'backdropClick') return;

    if (requireConfirmation) {
      setConfirmationOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  const confirmClose = () => {
    setConfirmationOpen(false);
    setIsOpen(false);
  };

  const cancelClose = () => {
    setConfirmationOpen(false);
  };


  return (
    <>
      <Modal
        open={isOpen}
        onClose={(_, reason) => {
          handleClose(reason);
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
              onClick={handleClose}
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

      {/* Confirmation Modal */}
      <Modal open={confirmationOpen} onClose={cancelClose}>
        <Box sx={modalConfirmationStyle}>
          <h5>{t('modal_close_confirmation_popup')}</h5>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button onClick={cancelClose}>{t('common_cancel')}</Button>
            <Button onClick={confirmClose} color="error" variant="contained">
              {t('common_confirm')}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
