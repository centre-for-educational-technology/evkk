import React, { useState } from 'react';
import './correction.css';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ElleOuterDivStyle } from '../../const/Constants';
import CorrectionTab from './tabviews/correctiontab/CorrectionTab';
import ComplexityTab from './tabviews/complexitytab/ComplexityTab';
import VocabularyTab from './tabviews/vocabularytab/VocabularyTab';
import TextLevelTab from './tabviews/textleveltab/TextLevelTab';

const Correction = () => {

  const [value, setValue] = React.useState('1');
  const [inputText, setInputText] = useState('');
  const [errorList, setErrorList] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={ElleOuterDivStyle} className="correction-container-outer">
      <div className="mouseaway-listener"></div>
      <div className="correction-container">
        <Box sx={{width: '100%'}}>
          <TabContext value={value}>
            <Box>
              <TabList centered onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Korrektuur" value="1"/>
                <Tab label="Tasemehinnang" value="2"/>
                <Tab label="Keerukus" value="3"/>
                <Tab label="Sõnavara" value="4"/>
              </TabList>
            </Box>
            <TabPanel value="1"><CorrectionTab inputText={inputText} setInputText={setInputText} errorList={errorList}
                                               setErrorList={setErrorList}/></TabPanel>
            <TabPanel value="2"><TextLevelTab inputText={inputText} setInputText={setInputText} errorList={errorList}
                                              setErrorList={setErrorList}/></TabPanel>
            <TabPanel value="3"><ComplexityTab inputText={inputText} setInputText={setInputText}/></TabPanel>
            <TabPanel value="4"><VocabularyTab inputText={inputText} setInputText={setInputText}/></TabPanel>
          </TabContext>
        </Box>
      </div>
    </Box>
  );
};

export default Correction;
