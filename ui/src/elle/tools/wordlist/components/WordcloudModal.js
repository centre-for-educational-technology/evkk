import { DefaultButtonStyle } from '../../../const/Constants';
import BrushIcon from '@mui/icons-material/Brush';
import { Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalBase from '../../../components/ModalBase';
import WordCloud from 'wordcloud';

export default function WordcloudModal({ data }) {

  const { t } = useTranslation();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [canvas, setCanvas] = useState(null);
  // todo use isLoading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (modalOpen && canvas) {
      canvas.addEventListener('wordcloudstop', () => {
        setIsLoading(false);
      });

      const list = data.map(({ word, frequencyCount }) => [word, frequencyCount]);
      WordCloud(canvas, {
        list: list,
        backgroundColor: '#FCFCFC',
        drawOutOfBound: false,
        shrinkToFit: true,
        weightFactor: (size) => size * 36
      });
    }

    return (() => {
      canvas?.removeEventListener('wordcloudstop', () => {
        setIsLoading(false);
      });
    });
  }, [modalOpen, data, canvas]);

  const handleClick = () => {
    setTooltipOpen(false);
    setModalOpen(true);
  };

  return (
    <Tooltip title={t('wordlist_wordcloud')}
             open={tooltipOpen}
             placement="top">
      <Button
        style={DefaultButtonStyle}
        variant="contained"
        onClick={handleClick}
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
      >
        <BrushIcon fontSize="large" />
      </Button>
      <ModalBase
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        innerClassName="wordcloud-modal"
        title="wordlist_wordcloud"
      >
        <canvas
          ref={setCanvas}
          height="475"
          width="1275"
        ></canvas>
      </ModalBase>
    </Tooltip>
  );
}
