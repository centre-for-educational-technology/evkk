//Original code by Reydan Niineorg

import React, { useContext, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextSelectionContext } from './TextSelectionContext';
import { languageSynthVoices } from '../../const/Constants';
import { useTranslation } from 'react-i18next';
import './TextToSpeechMenu.css';
import { useTextToSpeech } from './hooks/useTextToSpeech';

const sliderMarks = [
  { value: 0.5, label: '0.5' },
  { value: 1, label: '1' },
  { value: 1.5, label: '1.5' },
  { value: 2, label: '2' }
];

export default function TextToSpeechMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedText = useContext(TextSelectionContext);
  const [speed, setSpeed] = useState(1.0);
  const [speaker, setSpeaker] = useState(languageSynthVoices.mari);
  const { playTextToSpeech } = useTextToSpeech();
  const { t } = useTranslation();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handlePlay = (speakerOverride) => {
    playTextToSpeech(
      selectedText,
      speakerOverride || speaker,
      speed
    );
  };


  return (
    <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <VolumeUpIcon
        onClick={handlePlay}
        className="language-synth-icon"
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        onMouseLeave={handlePopoverClose}
      >
        <div style={{ width: 250 }}>
          <Typography sx={{ p: 2 }}>{t('language_synth_speed')}</Typography>
          <div className="language-synth-slider-container">
            <Slider
              sx={{
                color: '#9C27B0'
              }}
              valueLabelDisplay="auto"
              value={speed}
              onChange={(event, newValue) => setSpeed(newValue)}
              min={0.5}
              max={2}
              step={0.1}
              marks={sliderMarks}
            />
          </div>
          <FormControl sx={{ p: 3 }}>
            <FormLabel id="toggle-buttons-group-label">{t('language_synth_voice')}</FormLabel>
            <ToggleButtonGroup
              aria-labelledby="toggle-buttons-group-label"
              value={speaker}
              onChange={(event, newSpeaker) => {
                if (newSpeaker !== null) {
                  setSpeaker(newSpeaker);
                  handlePlay(newSpeaker);
                }
              }}
              exclusive>
              <ToggleButton
                value={languageSynthVoices.mari}
                aria-label={languageSynthVoices.mari}
              >
                {languageSynthVoices.mari}
              </ToggleButton>
              <ToggleButton
                value={languageSynthVoices.albert}
                aria-label={languageSynthVoices.albert}
              >
                {languageSynthVoices.albert}
              </ToggleButton>
              <ToggleButton
                value={languageSynthVoices.kalev}
                aria-label={languageSynthVoices.kalev}
              >
                {languageSynthVoices.kalev}
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
        </div>
      </Popover>
    </div>
  );
};
