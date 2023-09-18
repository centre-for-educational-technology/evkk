import React from 'react';
import {Button} from "@mui/material";
import './styles/DonateText.css'
import BackupIcon from '@mui/icons-material/Backup';
import {useNavigate} from "react-router-dom";

const DonateText = () => {

  const navigate = useNavigate();

  return (
    <Button variant="contained"
            id="donate-text-button"
            className="donate-text-button"
            onClick={(e) => {
              navigate("/adding")
            }}>
      <BackupIcon
        style={{fontSize: "40px", marginRight: "10px"}}/><span
      className={"donate-text-font"}>Loovuta meile oma tekst</span>
    </Button>
  );
};

export default DonateText;