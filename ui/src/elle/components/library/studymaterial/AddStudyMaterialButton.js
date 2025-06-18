import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Can from '../../security/Can';
import { useTranslation } from 'react-i18next';

{/* TODO: panna parast stiilid css faili */}
const AddStudyMaterialButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Can requireAuth={true}>
      <Button
        startIcon={<EditIcon />}
        onClick={onClick}
        className="add-study-material-button"
      >
        {t('study_material_add_button')}
      </Button>
    </Can>
  );
};

export default AddStudyMaterialButton;
