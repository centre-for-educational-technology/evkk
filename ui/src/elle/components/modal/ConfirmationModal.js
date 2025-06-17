import { useTranslation } from "react-i18next";
import { modalConfirmationStyle } from "../../const/StyleConstants";
import { Box, Button, Modal } from "@mui/material";


export default function ConfirmationModal({
  confirmationOpen,
  setConfirmationOpen,
  onConfirm,
  onClose,
  message = "U sure?"
}) {
  const { t } = useTranslation();

  const handleCancel = () => {
    setConfirmationOpen(false);
    onClose?.();
  }

  const handleConfirm = () => {
    setConfirmationOpen(false);
    onConfirm?.();
  }

  return (
    <Modal open={confirmationOpen} onClose={handleCancel}>
      <Box sx={modalConfirmationStyle}>
        <h5>{message}</h5>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button onClick={handleCancel}>{t('common_cancel')}</Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            {t('common_confirm')}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}
