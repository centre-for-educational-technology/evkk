import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material';
import { HashLink } from 'react-router-hash-link';

export const useStyles = makeStyles((_theme) => ({
  formControl: {
    margin: 1,
    width: 300
  },
  indeterminateColor: {
    color: '#f50057'
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  }
}));

export const AccordionStyle = {
  '&:before': {
    backgroundColor: 'transparent !important'
  }
};

export const DefaultButtonStyle = {
  backgroundColor: '#9C27B0',
  fontWeight: 'bold',
  lineHeight: '30px',
  borderRadius: '15px',
  '&:hover': {
    backgroundColor: '#852197'
  },
  '&:disabled': {
    backgroundColor: 'lightgray'
  }
};

export const DefaultSliderStyle = {
  color: '#9C27B0',
  '& .MuiSlider-rail': {
    backgroundColor: 'rgba(255, 208, 253, 1)'
  },
  '& .MuiSlider-track': {
    backgroundColor: '#9C27B0'
  }
};

export const DefaultInputStyle = {
  '& .MuiInputBase-input': {
    padding: '10px',
    transition: '0.3s',
    borderBottom: 'solid #FFCFFD 1px',
    '&:hover': {
      borderBottom: 'solid #CCA8FE 1px'
    },
    '&:focus': {
      borderBottom: 'solid #852197 1px'
    }
  }
};

export const DefaultButtonStyleSmall = {
  backgroundColor: '#9C27B0',
  fontWeight: 'bold',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#852197'
  },
  '&:disabled': {
    backgroundColor: 'lightgray'
  }
};

export const CorrectorCustomSlider = {
  height: 10,
  '& .MuiSlider-thumb': {
    height: 0,
    width: 0
  },
  '.MuiSlider-rail': {
    borderRadius: '3px',
    opacity: 0.8,
    background: '#e5e6e4'
  },
  '.MuiSlider-valueLabel': {
    lineHeight: 15,
    fontSize: 15,
    textAlign: 'center',
    width: 50,
    height: 50,
    borderRadius: '25px 25px 25px 3px',
    backgroundColor: '#9C27B0',
    transformOrigin: 'bottom',
    transform: 'rotate(-45deg)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(40%, -90%) rotate(-45deg)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
};

export const DefaultCircularProgressStyle = {
  color: '#9C27B0'
};

export const MenuLink = styled(HashLink)({
  fontWeight: 600,
  fontSize: 16,
  color: '#1B1B1B',
  textDecoration: 'none',
  fontFamily: ['\'Exo 2\'', 'sans-serif'].join(','),
  '&:hover': {
    color: '#9C27B0',
    textDecoration: 'none'
  },
  '&.active': {
    color: '#9C27B0',
    textDecoration: 'none'
  }
});

export const FooterLink = styled(HashLink)({
  color: '#1B1B1BDD',
  fontSize: '0.9rem',
  fontWeight: 100,
  textDecoration: 'none',
  marginBottom: '0.5rem',
  '&:hover': {
    color: '#9C27B0',
    textDecoration: 'none'
  },
  '&.active': {
    color: '#9C27B0',
    textDecoration: 'none'
  }
});

export const TabStyle = {
  '& button:hover': { backgroundColor: 'rgba(204, 168, 253, 1)', transition: '0.5s' },
  '& button:active': { backgroundColor: '#9C27B0' },
  '& button': {
    backgroundColor: 'rgba(255, 208, 253, 1)',
    display: 'inline-block',
    color: 'black',
    fontWeight: 'bold',
    height: '60px',
    borderBottom: '4px solid #9C27B0',
    borderTop: '4px solid #9C27B0',
    transition: '0.5s'
  },
  '& button:first-of-type': {
    borderRadius: '25px 0 0 25px',
    paddingLeft: '25px',
    borderLeft: '4px solid #9C27B0'
  },
  '& button:last-child': {
    borderRadius: '0 25px 25px 0',
    paddingRight: '25px',
    borderRight: '4px solid #9C27B0'
  },
  '& button.Mui-selected': {
    backgroundColor: '#9C27B0',
    color: 'white',
    borderColor: 'rgba(204, 168, 253, 1)',
    transition: '0.5s'
  },
  '& .MuiTabs-flexContainer': {
    border: 'none',
    borderBottom: 'none'
  },
  '& .MuiTabs-root': {
    border: 'none',
    borderBottom: 'none'
  },
  '& .MuiTab-root': {
    textTransform: 'none'
  }
};

export const ElleOuterDivStyle = {
  background: 'linear-gradient(315deg, rgba(156, 39, 176, 1) 0%, rgba(156, 39, 176, 1) 33%, rgba(204, 168, 253, 1) 33%, rgba(204, 168, 253, 1) 67%, rgba(255, 208, 253, 1) 67%, rgba(255, 208, 253, 1) 100%)',
  height: '100%',
  width: '100%',
  padding: '7px'
};

export const ITEM_HEIGHT = 48;

export const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 11.5 + ITEM_PADDING_TOP,
      width: 425
    }
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center'
  },
  variant: 'menu'
};

export const ElleDefaultChip = {
  borderColor: '#9C27B0',
  '& .MuiChip-deleteIcon:hover': {
    color: '#EB0014'
  }
};

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  bgcolor: '#FCFCFC',
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
  maxHeight: '80vh',
  overflow: 'auto'
};
