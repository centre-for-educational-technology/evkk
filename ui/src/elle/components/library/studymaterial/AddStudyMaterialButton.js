import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Can from '../../security/Can';

{/* TODO: panna parast stiilid css faili */}
const AddStudyMaterialButton = ({ onClick }) => {
  return (
    <Can requireAuth={true}>
      <Button
        startIcon={<EditIcon />}
        onClick={onClick}
        style={{
          backgroundColor: '#9C27B0',
          color: 'white',
          borderRadius: '5px',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '14px',
          height: '33px',
          width: '215px',
          boxShadow: 'none',
          paddingLeft: '16px',
          paddingRight: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '7px',
        }} >
        LISA ÕPPEMATERJAL
      </Button>
    </Can>
  );
};

export default AddStudyMaterialButton;
